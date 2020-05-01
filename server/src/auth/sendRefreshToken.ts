import { Response } from 'express'
import config from '~/config'

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie(config.auth.cookieName, token, { httpOnly: true })
}
