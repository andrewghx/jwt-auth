import { Application } from 'express'
import { UserResolver } from './resolvers/user'
import { Context } from '~/types/context'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'

export const setupApolloServer = async (app: Application) => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver]
    }),
    context: ({ req, res }: Context) => ({ req, res })
  })
  
  apolloServer.applyMiddleware({ app, cors: false })
}


