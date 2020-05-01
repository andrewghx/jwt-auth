import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string
}

@ObjectType()
export class UserDetails {
  @Field()
  id: number

  @Field()
  email: string
}