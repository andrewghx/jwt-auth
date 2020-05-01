import 'dotenv/config'
import 'reflect-metadata'
import express from 'express'
import { createConnection } from 'typeorm'
import { setupApolloServer } from '~/setupApollo'
import config from '~/config'
import routes from '~/routes'
import { setupServerOptions } from '~/setupServer'

(async () => {
  const app = express()
  setupServerOptions(app)
  routes(app)
  await createConnection()
  setupApolloServer(app)

  app.listen(config.port, () => {
    console.log(`Server ready at port ${config.port}`)
  })
})()  
