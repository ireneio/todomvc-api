import express, { Application, Request, Response } from 'express'
import * as path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import HttpResponse from './utils/http'
import cors from 'cors'

import initLocalPg from './db/local'

import indexRouter from './routes/index'

import initGql from './gql/index'

// Connect to DB
try {
  await initLocalPg()
  console.log('[DB] Connection Success.')
} catch(e) {
  console.log('[DB] Error: ' + e.message)
}

// Init Express
export const app: Application = express()

// Init GraphQL
initGql(app)

// Cors
const corsOptions = {
  origin: process.env.NODE_APP_CORS_URL || 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

// 403 all other routes
app.use('*', function(req: Request, res: Response, next: Function): void {
  res.send(new HttpResponse(403, 'forbidden'))
})

export default app
