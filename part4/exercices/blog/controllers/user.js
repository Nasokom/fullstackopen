const User = require('../models/user')
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')

userRouter.get('/',async (request,response) => {

  const users = await User.find({})
    .populate('blogs',{ url:1,title:1 })
  response.status(200).json(users)
})

userRouter.post('/',async (request,response) => {

  const { username,name,password } = request.body

  if(!username || !password ){
    return response.status(400).json({ error:'missing username || password' })
  }

  if(password.length < 3){
    return response.status(400).json({ error: 'Password should be more than 3 character' })
  }
  const passwordHash= await bcrypt.hash(password,10)
  const savedUser = await new User({ username,name,passwordHash }).save()

  response.status(201).json(savedUser)

})

module.exports = userRouter