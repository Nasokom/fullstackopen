const assert = require('node:assert')
const { test,after, beforeEach, describe } = require('node:test')
const supertest = require('supertest')
const helper = require('./test_helpers')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const { default: mongoose } = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  await Blog.insertMany(helper.blogs)
  await new User(helper.singleUser).save()
})

describe('HTTP GET request to api/blogs',() => {
  test('Should return blogpost as JSON', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type',/application\/json/)
  })

  test('Should return the correct amount of post', async () => {

    const blogs = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type',/application\/json/)

    assert.strictEqual(blogs.body.length, helper.blogs.length)
  })

  test('Post store should have \'id\' property as unique identifier', async () => {

    const { body } = await api.get('/api/blogs')

    assert.strictEqual(body[0].hasOwnProperty('id'),true)
    assert(ObjectId.isValid(body[0].id))

  })
})

describe('HTTP POST request to api/blogs', () => {

  test('when post successfully create return 201 and the saved post',async () => {
    await api
      .post('/api/blogs')
      .send(helper.blogObject)
      .set('Authorization',`Bearer ${await helper.getUserToken()}`)
      .expect(201)
      .expect('Content-Type',/application\/json/)

    const postAtEnd = await helper.dataInDb()

    assert.strictEqual(postAtEnd.length, helper.blogs.length+1)

    assert(postAtEnd.find(post => post.title+post.author === helper.blogObject.title+post.author ))
  })

  test('when post missing token => 401 and error msg',async () => {
    const { body }= await api
      .post('/api/blogs')
      .send(helper.blogObject)
      .expect(401)
      .expect('Content-Type',/application\/json/)

    assert(body.error.includes('Unauthorized'))
  })


  test('When new post is missing \'likes\' propertie =>  assign likes:0 as default value ',async () => {
    const newPost = await api
      .post('/api/blogs')
      .send({ ...helper.blogObject, likes : undefined })
      .set('Authorization',`Bearer ${await helper.getUserToken()}`)
      .expect(201)
      .expect('Content-Type',/application\/json/)

    assert.strictEqual(newPost.body.likes, 0)
  })

  test('when missing title || url => send 400 Bad Request' ,async () => {

    await api
      .post('/api/blogs')
      .send({ ...helper.blogObject,title:undefined })
      .expect(400)

    await api
      .post('/api/blogs')
      .send({ ...helper.blogObject,url:undefined })
      .expect(400)

  })
})
describe('HTTP DELETE request to api/blogs/:id',() => {
  test('when missing token => 401 && error msg',async () => {
    const result = await api.
      delete('/api/blogs/42')
      .expect(401)
    assert(result.error.text.includes('Unauthorized '))
  })

  test('when malformatted id => 400 && error msg',async () => {
    const result = await api.
      delete('/api/blogs/42')
      .set('Authorization',`Bearer ${await helper.getUserToken()}`)
      .expect(400)
    assert(result.error.text.includes('malformatted'))
  })

  test('when valid id but not found  ',async () => {
    await api
      .delete('/api/blogs/699708de2863926917e2084a')
      .set('Authorization',`Bearer ${await helper.getUserToken()}`)
      .expect(404)
  })

  test('when success delete => 204 ',async () => {
    // the user should post
    const [user] = await helper.usersInDb()
    const target = await new Blog({ ...helper.blogObject, user:user.id.toString() }).save()

    console.log('#########LOOOOG########')
    console.log(target._id.toString())
    console.log('#########LOOOOG########')
    await api
      .delete(`/api/blogs/${target._id.toString()}`)
      .set('Authorization',`Bearer ${await helper.getUserToken()}`)
      .expect(204)
  })
})

describe('HTTP PUT request to api/blogs/:id',() => {

  test('when missing properties => 400 && error msg ',async () => {
    const result = await api.put('/api/blogs/699708de2863926917e2084a')
      .expect(400)
      .send({ url:'asd' })

    assert(result.error.text.includes('missing'))
  })

  test('when malformatted id  => 400 && error msg',async () => {
    const result = await api.put('/api/blogs/42')
      .expect(400)
      .send(helper.blogObject)
    assert(result.error.text.includes('malformatted'))
  })

  test('when valid id but not found  ',async () => {
    await api.put('/api/blogs/699708de2863926917e2084a')
      .expect(404)
      .send(helper.blogObject)
  })

  test('when success Update => 204 & updated post',async () => {
    const [firstItem]= await helper.dataInDb()
    const result = await api.put(`/api/blogs/${firstItem.id}`)
      .expect(200)
      .send(helper.blogObject)
    assert.deepStrictEqual({ ...helper.blogObject,id:result.body.id }, result.body)

  })
})

after( async () => {
  mongoose.connection.close()
})