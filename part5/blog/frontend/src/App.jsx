import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Test from './components/Test'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user,setUser] = useState(null)
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [notification,setNotification] = useState('')

  const handleLogin = async (e) =>{
    e.preventDefault()

    try{
      const {data} = await blogService.login({username,password})
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

   const handleCreate = (blogForm,set) =>  async(e)=> {
        e.preventDefault()
        try{
          const response = await blogService.postBlog(blogForm,user.token)
          setBlogs([...blogs,response.data])
          setNotification(`a new blog ${response.data.author} by ${response.data.author} added`)
          set({author:'',title:'',url:''})
        }catch(error){
          if(error.response){
            const msg = error.response.data.error
            setNotification('error: '+msg)
          }
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
    <Login handleSubmit={handleLogin} field={{username,password,setPassword,setUsername}}/>
     : 
     <> 
             <h2>blogs</h2>
     <p>{user.user} is logged in <button onClick={handleLogout}>logout</button>
     </p>
     
     <CreateBlog handleCreate={handleCreate}/>
   
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </>
    }
    </div>
  )
}

export default App