import { renewToken } from '~/auth/renewToken'
import { Application } from 'express'

const routes = (app: Application) => {
  app.post('/renew_token', (req, res) => {renewToken(req, res)})
}

export default routes
