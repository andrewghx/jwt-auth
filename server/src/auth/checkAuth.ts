import { MiddlewareFn } from 'type-graphql'
import { Context } from '~/types/context'
import { verify } from 'jsonwebtoken'

export const checkAuth: MiddlewareFn<Context> = ({ context }, next) => {
  const auth = context.req.headers['authorization']  
  if (!auth) throw new Error('not authenticated')

  try {
    const token = auth.split(' ')[1]
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!)
    context.payload = payload as any
  } catch (err) {
    console.log(err)
    throw new Error('not authenticated')
  }
  return next()
}
