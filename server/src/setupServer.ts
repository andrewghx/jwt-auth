import { Application } from 'express'
import cookieParser from 'cookie-parser'

export const setupServerOptions = (app: Application) => {
  app.use(cookieParser())

}