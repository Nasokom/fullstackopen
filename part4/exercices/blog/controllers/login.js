const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


loginRouter.post('/',async (request,response) => {

  const { username,password } = request.body

  const user = await User.findOne({ username })

  const hash = await bcrypt.compare(password,user.passwordHash)

  if(!hash){
    return response.status(404).json({ error:'invalid username or password' })
  }

  const token = jwt.sign({ username:user.username,id:user.id },process.env.SECRET)

  return response.json(token)

})

module.exports = loginRouter