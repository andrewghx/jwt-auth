import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware, Int } from 'type-graphql'
import { User } from '~/orm/entity/User'
import { hash, compare } from 'bcryptjs'
import { Context } from '~/types/context'
import { createRefreshToken, createAccessToken } from '~/auth/createTokens'
import { checkAuth } from '~/auth/checkAuth'
import { sendRefreshToken } from '~/auth/sendRefreshToken'
import { revokeRefreshToken } from '~/auth/revokeRefreshToken'
import { UserDetails, LoginResponse } from './objectTypes'

@Resolver()
export class UserResolver {
  @Query (() => String)
  hello(){
    return 'hi!'
  }

  @Query(() => UserDetails)
  @UseMiddleware(checkAuth)
  async userDetails(
    @Ctx() { payload }: Context
  ) {
    const user = await User.findOne({ id: Number(payload!.userId) })
    if (!user) return { ok: false }
    return { email: user.email, id: user.id }
  }

  @Mutation(() => Boolean)
  async revokeToken(
    @Arg('id', () => Int) id: number
  ) {
    revokeRefreshToken(id)
    return true
  }

  @Mutation(() => Boolean)
  async register(
    @Arg('email', () => String) email: string,
    @Arg('password', () => String) password: string,
  ) {
    const hashedPassword = await hash(password, 12)

    try {
      await User.insert({
        email,
        password: hashedPassword
      })
    } catch (err) {
      console.log(err)
      return false
    }

    return true
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('email', () => String) email: string,
    @Arg('password', () => String) password: string,
    @Ctx() { res }: Context
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: {email} })
    if (!user) throw new Error('Username does not exist')
    
    const valid = await compare(password, user.password)
    if (!valid) throw new Error('Invalid password')
    
    sendRefreshToken(res, createRefreshToken(user))

    return {
      accessToken: createAccessToken(user)
    } 
  }
}

