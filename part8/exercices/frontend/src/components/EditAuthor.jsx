import React ,{useState}from 'react'
import { useMutation } from '@apollo/client/react'
import { EDIT_AUTHOR,ALL_AUTHOR} from '../queries'
const EditAuthor = ({authors}) => {
    
    const [born,setBorn] = useState('')
    const [name,setName] = useState('')
    const [error,setError] = useState('')
    
const [editAuthor] = useMutation(EDIT_AUTHOR)

      const handleEdit = async (e) =>{
    e.preventDefault()
    editAuthor({
      variables:{name,setBornTo:new Number(born)},
      onCompleted:(data=>data.editAuthor?null:setError('Select an author ')),
      refetchQueries:[{query:ALL_AUTHOR}]
    })

    setBorn('')
  }

  return (
    <div>
     <h3>Set birth year</h3>
      {error && <p>{error}</p>}
      <form onSubmit={handleEdit}>

      <label>
        name <select onChange={e=>setName(e.target.value)}> 
          <option>select name</option>
          {authors.map(author => <option key={author.id} value={author.name}>{author.name}</option>)}
          </select>
      </label>
          <label>
        born <input type="number" value={born} onChange={e=>setBorn(e.target.value)}/>
      </label>
        <button type="submit">update author</button>
    </form>
</div>
  )
}

export default EditAuthor