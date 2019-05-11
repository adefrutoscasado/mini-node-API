// @ts-ignore
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const usersRouter = require('./routes/users')

const app = express()

interface Error{
  status?: number,
}

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/user', usersRouter)

// 404 Not Found Errors
// @ts-ignore
app.use((req, res, next) => {
  const err = new Error('Endpoint not Found')
  err.status = 404
  next(err)
})

// 500 Internal Errors
// @ts-ignore
app.use((err, req, res, next) => {
  console.log(err.message)
  console.log(err.stack)
  res.status(err.status || 500)
  res.send({
    message: err.message || 'Undefined error',
    errors: err.errors
  })
})

module.exports = app
