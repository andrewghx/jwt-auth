import { Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { User } from '~/orm/entity/User'
import { sendRefreshToken } from '~/auth/sendRefreshToken'
import { createRefreshToken, createAccessToken } from '~/auth/createTokens'
import config from '~/config'

export const renewToken = async (req: Request, res: Response) => {
  const token = req.cookies[config.auth.cookieName]
  if (!token) return res.send({ ok: false, accessToken: '' })

  let payload: any = null
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET!)
  } catch (err) {
    return console.log(err)
  }

  const user = await User.findOne({ id: payload.userId })
  if (!user) return res.send({ ok: false, accessToken: '' })

  if (user.tokenVersion !== payload.tokenVersion) return res.send({ ok: false, accessToken: '' })

  sendRefreshToken(res, createRefreshToken(user))
  res.send({ ok: true, accessToken: createAccessToken(user)})
}
