const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const helper = require('./test_helpers')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

const listWithOneBlog = helper.listWithOneBlog
const blogs = helper.blogs

describe('total likes', () => {

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

    test('when list has multiples posts, equals the most liked', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 36)
  })

   test('when list has no blog, return 0', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

})

describe('favorite blog',()=>{

  test('when the list has one blog, return it',()=>{
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result,listWithOneBlog[0])
  })

  test('when list have multiples posts,return the famous one', ()=>{
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result,blogs[2])
  })
  
})
describe('Author with most blogs',()=>{
  
    test('when the list has one blog',()=>{
    const result = listHelper.mostBlogs(listWithOneBlog)
    assert.deepStrictEqual(result,{author:"Edsger W. Dijkstra",blogs: 1})
  })

  test('when the list has multiple blogs',()=>{
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result,{author: "Robert C. Martin",blogs: 3})
  })

 })

describe('Author with most Likes',()=>{


  test('when the list has one blog',()=>{
    const result = listHelper.mostLikes(listWithOneBlog)
    assert.deepStrictEqual(result,{ author: "Edsger W. Dijkstra",likes: 5})
  })
  

  test('when the list has multiple blogs',()=>{
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result,{ author: "Edsger W. Dijkstra",likes: 17})
  })

})
