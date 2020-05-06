import { Application } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

export const setupServerOptions = (app: Application) => {
  app.disable('x-powered-by')
  app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
  }))
  app.use(cookieParser())
}
