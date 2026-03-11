const testingRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')


testingRouter.post('/reset',async (request,response)=>{
    await User.deleteMany({})
    await Blog.deleteMany({})
    console.log('sucess : db reset ')
    response.status(204).end()
})


testingRouter.post('/post',async (request,response)=>{
    const id = '5a422aa71b54a676234d17f8'
    const blogs = []
    for(let i = 0 ; i < 4 ; i++){
        blogs.push({title:'title'+i,url:'url'+i,likes:Math.round(Math.random()*100),author:'author'+i,user:id})
    }
    try{

        const savedBlogs = await Blog.insertMany(blogs)
        
        console.log('sucess : isert many', savedBlogs)
        response.status(204).end()
    }catch(err){
        console.log(err)
    }
})

module.exports = testingRouter