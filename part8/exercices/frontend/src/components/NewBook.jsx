import { useState } from 'react'
import { useMutation,useQuery } from '@apollo/client/react'
import { ADD_BOOKS,ALL_BOOKS,ALL_AUTHOR} from '../queries'

const NewBook = (props) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('') 
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])


  const [addBook,{data,loading,error}] = useMutation(ADD_BOOKS,{

    refetchQueries: [{ query: ALL_BOOKS},{ query: ALL_AUTHOR}],
  })

  const submit = async (event) => {
    event.preventDefault()
    addBook(  {  variables:{
      title,published:new Number(published),author,genres
    }})
    console.log('add book...')

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }
  if (loading) return "Submitting...";


  return (
    <div>
      {loading && <p>Loading ...</p>}
      { error && <p>Error : {error.message}</p>}
      {data && <p>{data.addBook.title} added</p>}


      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
