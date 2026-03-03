import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog ,updatePost,remove}) => {

  const [toggle,setToggle] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    updatePost({...blog,likes:blog.likes+1})
  }

  const handleDelete = () => {
    if (window.confirm("Do you want to open in new tab?")) {
      remove(blog.id)
  } 

  }

  return (
  <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={()=>setToggle(!toggle)}>{toggle?'hide':'view'}</button>
      </div>

      {
        toggle 
        &&
        <div>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button onClick={handleLike}>like</button></p>
         { blog.user && <p>{blog.user.username} </p>}
          {blog.user && blog.user.username  === blogService.getUser().username &&  <button onClick={handleDelete}>remove</button> }
        </div>
        }
  </div>
)}

export default Blog