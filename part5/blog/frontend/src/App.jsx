import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Login from './components/Login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user,setUser] = useState(null)
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [notification,setNotification] = useState('')
  const createFormRef = useRef(null)

  const handleLogin = async (e) => {
    e.preventDefault()

    try{
      const { data } = await blogService.login({ username,password })
      setUser(data)
      blogService.saveUser(data)
      setNotification('Welcome '+data.user)
      setPassword('')
      setUsername('')
    }
    catch{
      setNotification('error: wrong login or password')
    }
  }

  const handleLogout = () => {
    setUser('')
    window.localStorage.clear()
  }

  const handleCreate = (blogForm) =>  async(e) => {
    e.preventDefault()
    try{
      const response = await blogService.postBlog(blogForm,user.token)
      setBlogs([...blogs,response.data])
      setNotification(`a new blog ${response.data.author} by ${response.data.author} added`)
      createFormRef.current.handleToggle()
    }catch(error){
      if(error.response){
        const msg = error.response.data.error
        setNotification('error: '+msg)
      }
    }

  }

  const updatePost = async (targetedBlog) => {
    try{
      const { data } = await blogService.updateBlog(targetedBlog)
      setBlogs(blogs.map(blog => {
        if(blog.id === data.id){
          return { ...data }
        }
        return blog
      }))
      setNotification(`the post ${data.title} by ${data.author} just gain 1 like`)
    }catch(error){
      console.log(error)
      setNotification(`error: ${error}`)
    }
  }

  const removeBlog = async (id) => {
    try{
      const request = await blogService.deleteBlog(id,user.token)
      console.log(request)
      setNotification('blog delete with success')
      setBlogs(blogs.filter(blog => blog.id !== id))
    }catch(error){
      console.log(error)
      setNotification('error:'+error)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
    const token = blogService.getUser()
    if(token){
      setUser(token)
    }
  }, [])



  return (
    <div>
      {
        notification.length > 1 &&
       <Notification setNotification={setNotification} notification={notification}/>
      }
      {!user
        ?
        <Login handleSubmit={handleLogin} field={{ username,password,setPassword,setUsername }}/>
        :
        <>
          <h2>blogs</h2>
          <p>{user.username} is logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel={'create new blog'} ref={createFormRef}>
            <CreateBlog handleCreate={handleCreate}/>
          </Togglable>

          {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} updatePost={updatePost} remove={removeBlog}/>
          )}
        </>
      }
    </div>
  )
}

export default App