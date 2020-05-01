import { User } from '~/orm/entity/User'
import { sign } from 'jsonwebtoken'
import config from '~/config'

export const createAccessToken = (user: User) => {
  return sign({ 
    userId: user.id 
  }, 
  process.env.ACCESS_TOKEN_SECRET!,
  { 
    expiresIn: config.tokenExpiry.access 
  })
}

export const createRefreshToken = (user: User) => {
  return sign({ 
    userId: user.id,
    tokenVersion: user.tokenVersion
  },
  process.env.REFRESH_TOKEN_SECRET!,
  { 
    expiresIn: config.tokenExpiry.refresh
  })   
}
