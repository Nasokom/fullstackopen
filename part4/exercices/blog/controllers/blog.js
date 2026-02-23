const blogRouter = require('express').Router()
const { error } = require('../../../courseinfo/utils/logger')
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response,next) => {

  if(!request.body.title || !request.body.url){
     return response.status(400).send({error:"Missing title || url properties"})
  }

  const newPost = new Blog({
    ...request.body,
    likes: request.body.likes || 0
    })
  const savedPost = await newPost.save()

  response.status(201).json(savedPost)
})

blogRouter.delete('/:id', async (request,response,next)=>{

    const id = request.params.id 
     const x =  await Blog.findByIdAndDelete(id)
     if(!x){
      return response.status(404).send({error:`No item found with the id: ${id}`}).end()
     }
    response.status(204).end()

})


blogRouter.put('/:id', async (request,response,next)=>{

  const id = request.params.id
  const body = request.body 
  delete body.id
  
  if(!body.url || !body.title || !body.author){
      return response.status(400).json({error:"Bad Request missing properties"})
  }

  //const result = await Blog.findByIdAndUpdate(id,body)

  const target = await Blog.findById(id)
  if(!target){
    return response.status(404).json({error:`No blog post found with the id ${id}`})
  }
  for(const [key,val] of Object.entries(body)){
      target[key] = val
  }
  const result = await target.save()
  response.status(200).json(result)
})

module.exports = blogRouter