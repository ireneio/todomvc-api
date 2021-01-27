import express, { Application, Request, Response } from "express"
import createError from 'http-errors'
import * as path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import indexRouter from './routes/index'

const app: Application = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// CORS Headers
app.use(function(req: Request, res: Response, next: Function): void {
  res.setHeader('Access-Control-Allow-Origin', process.env.NODE_APP_CORS_URL || 'http://localhost:3001')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', ['Authorization', 'Content-Type'])
  next()
})

app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: Function): void {
  next(createError(404))
})

// error handler
app.use(function(err: any, req: Request, res: Response, next: Function): void {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
