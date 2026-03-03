import axios from 'axios'
const BLOG_URL = '/api/blogs'
const LOGIN_URL = '/api/login'
const USER_URL = '/api/users'

const getAll = () => {
  const request = axios.get(BLOG_URL)
  return request.then(response => response.data)
}

const login = async (user) => {

  const request = await  axios.post(LOGIN_URL,user)

  return request
}


const saveUser = (data) => {
  const serialize = JSON.stringify(data)
  window.localStorage.setItem('user',serialize)
}

const getUser =  () => {
  const data =  window.localStorage.getItem('user')
  return JSON.parse(data)

}

const updateBlog = async (blog) => {

  const request = await axios.put(BLOG_URL+'/'+blog.id,blog)
  return request
}

const postBlog = (content,token) => {
  const request = axios.post(BLOG_URL,content,
    { headers:{
      'Authorization': `Bearer ${token}`
    } })
  return request
}

const deleteBlog = async (id,token) => {
  const request = await axios.delete(BLOG_URL+'/'+id,
    { headers:{
      'Authorization': `Bearer ${token}`
    } })
  return request
}

const logout = () => window.localStorage.clear()

export default {
  getAll,
  login,
  getUser,
  saveUser,
  logout,
  postBlog,
  updateBlog,
  deleteBlog
}



