const { test,beforeEach,after,describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose  = require('mongoose')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helpers')

const api = supertest(app)
const url = '/api/users'

beforeEach(async() => {

  await User.deleteMany({})

})

test('POST user missing content => 400 && error msg', async () => {

  const { body } = await api
    .post(url)
    .send({})
    .expect(400)

  assert(body.error.includes('missing'))
})

test('POST user invalid content => 400 && error msg', async () => {

  const { body } = await api
    .post(url)
    .send({ name:'error',username:'no',password:'no' })
    .expect(400)

  assert(body.error.includes('3'))

})

test('POST duplicate user => 400 && error msg', async () => {

  const duplicateUser = { name:'duplicate',username:'duplicate',password:'duplicate' }

  await new User(duplicateUser).save()

  const { body } = await api
    .post(url)
    .send(duplicateUser)
    .expect(400)

  assert(body.error.includes('duplicate'))

})

test('POST valid content => 201 && {name,username,id}',async () => {
  const { body } = await api
    .post(url)
    .send(helper.singleUser)
    .expect(201)
    .expect('Content-Type',/application\/json/)
  //verify got id
  assert(body.hasOwnProperty('id'))
  //no password || hash
  assert(!body.hasOwnProperty('passwordHash') || !body.hasOwnProperty('password') )
})

test('GET users => 200 && type:app/json ', async () => {
  await api
    .get(url)
    .expect(200)
})



after(async () => {
  await User.deleteMany({})
  await mongoose.connection.close()
})