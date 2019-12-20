import express from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { errorHandler as queryErrorHandler } from 'querymen'
import { errorHandler as bodyErrorHandler } from 'bodymen'
import { env } from '../../config'

import path from 'path'

export default (apiRoot, routes) => {
  const app = express()

  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    app.use(cors())
    app.use(compression())
    app.use(morgan('dev'))
  }

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(apiRoot, routes)
  app.use(queryErrorHandler())
  app.use(bodyErrorHandler())

  // ########## Server Static Files ################ //
  app.use(express.static(path.dirname('') + '/webapp'))
  app.get('/', function (req, res) {
    res.sendFile(path.resolve(path.dirname('') + '/webapp/index.html')) // load the single view file (angular will handle the page changes on the front-end)
  })
  // ########## Server Static Files ################ //

  return app
}
