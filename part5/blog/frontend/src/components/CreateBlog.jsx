import React,{ useState,useEffect } from 'react'


const CreateBlog = ({ handleCreate }) => {

  const [formData,setFormData] = useState({ title:'',author:'',url:'' })
  const handleSubmit = (event) => {
    event.preventDefault()
    handleCreate(formData)
  }
  useEffect(() => {},[])


  return (
    <form onSubmit={handleSubmit} style={{ display:'flex',flexDirection:'column',alignItems:'start' }}>
      <h2>Create new</h2>
      <label>
            title:
        <input name='title' value={formData.title} onChange={(e) => setFormData({ ...formData, title:e.target.value })}/>
      </label>
      <label>
            author:
        <input name='author' value={formData.author} onChange={(e) => setFormData({ ...formData,author:e.target.value })}/>
      </label>
      <label>
            url
        <input name='url' value={formData.url} onChange={(e) => setFormData({ ...formData,url:e.target.value })}/>
      </label>
      <button type="submit" name='create'>create</button>
    </form>
  )
}

export default CreateBlog