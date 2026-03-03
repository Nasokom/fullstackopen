import React,{useState} from 'react'


const CreateBlog = ({handleCreate}) => {

    const [formData,setFormData] = useState({title:'',author:'',url:''})

  return (
   <form onSubmit={handleCreate(formData)} style={{display:'flex',flexDirection:'column',alignItems:'start'}}>
    <h2>Create new</h2>
        <label>
            title:
            <input name='title' value={formData.title} onChange={(e)=>setFormData({...formData, title:e.target.value})}/>
        </label>
        <label>
            author:
            <input name='author' value={formData.author} onChange={(e)=>setFormData({...formData,author:e.target.value})}/>
        </label>
        <label>
            url
            <input name='url' value={formData.url} onChange={(e)=>setFormData({...formData,url:e.target.value})}/>
        </label>
        <input type="submit" value={'create'} />
    </form>
  )
}

export default CreateBlog