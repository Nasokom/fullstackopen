const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user',{ name:1,username:1, })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  if(!request.body.title || !request.body.url){
    return response.status(400).send({ error:'Missing title || url properties' })
  }

  if(!request.token){
    return response.status(401).json({ error:'Unauthorized request' })
  }

  const user = await request.user

  const newPost = new Blog({
    ...request.body,
    likes: request.body.likes || 0,
    user:user.id
  })

  const savedPost = await newPost.save()


  user.blogs.push(savedPost.id)

  await user.save()


  response.status(201).json(savedPost)
})

blogRouter.delete('/:id', async (request,response) => {

  const id = request.params.id

  const token = request.token

  if(!token){
    return response.status(401).json({ error:'Unauthorized request' })
  }

  const userAuth = request.user

  const user = await User.findById(userAuth.id)

  const x =  await Blog.findByIdAndDelete(id)

  user.blogs = user.blogs.filter(a => a !== id)
  await user.save()

  if(!x){
    return response.status(404).send({ error:`No item found with the id: ${id}` }).end()
  }
  response.status(204).end()

})


blogRouter.put('/:id', async (request,response) => {

  const id = request.params.id
  const body = request.body
  delete body.id

  if(!body.url || !body.title || !body.author){
    return response.status(400).json({ error:'Bad Request missing properties' })
  }

  //const result = await Blog.findByIdAndUpdate(id,body)

  const target = await Blog.findById(id)
  if(!target){
    return response.status(404).json({ error:`No blog post found with the id ${id}` })
  }
  for(const [key,val] of Object.entries(body)){
    target[key] = val
  }
  const result = await target.save()
  response.status(200).json(result)
})

module.exports = blogRouter