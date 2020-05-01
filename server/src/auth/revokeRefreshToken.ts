import { getConnection } from 'typeorm'
import { User } from '~/orm/entity/User'

export const revokeRefreshToken = (id: number) => {
  getConnection().getRepository(User).increment({ id }, 'tokenVersion', 1)
}
