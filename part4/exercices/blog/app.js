const express = require('express')
const mongoose = require('mongoose')
const { mongoUrl } = require('./utils/config')
const blogRouter = require('./controllers/blog')
const app = express()
const middleware = require('./utils/middleware')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
mongoose.connect(mongoUrl, { family: 4 })

app.use(express.json())

app.use(middleware.tokenExtractor)
app.use('/api/users',userRouter)
app.use('/api/login',loginRouter)
app.use('/api/blogs',middleware.userExtractor,blogRouter)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app