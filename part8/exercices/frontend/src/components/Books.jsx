import { useQuery,useSubscription,useApolloClient } from "@apollo/client/react"
import { ALL_BOOKS,ALL_GENRES,BOOK_ADDED } from "../queries"
import { useState } from "react"
import { addBookToCache } from "../utils/apolloCache"

const Books = () => {

  const [genre,setGenre] = useState('')
  const {data:genres, loading:loadGenre, error:errorGenre} = useQuery(ALL_GENRES)
  const {loading,error,data} = useQuery(ALL_BOOKS
  ,{variables: {genre}}
  )


  return (
    <div>
      <h2>books</h2>
      <p>{genre ? 'in genre '+genre : 'all books' }</p>
      <div> 
        {genres && genres.allGenres.map(g => <button key={g} onClick={()=>setGenre(g)}>{g}</button>)}
        <button onClick={()=>setGenre('')}>all</button>
      </div>

  {errorGenre && <p>{JSON.stringify(errorGenre)}</p>}
{loading ? <p>...loading</p> :
data && 

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
}
    </div>
  )
}

export default Books
