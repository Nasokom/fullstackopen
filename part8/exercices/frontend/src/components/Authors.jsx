import { useQuery,useMutation } from "@apollo/client/react"
import {useState} from 'react'
import { ALL_AUTHOR,EDIT_AUTHOR } from "../queries"
import EditAuthor from "./EditAuthor"

const Authors = ({token}) => {
    const {loading,error,data} = useQuery(ALL_AUTHOR,{pollInterval: 0,})
  
  

  if(loading) return <p>loading ...</p>
  if(error) return <p>Error:{error.message}</p>
  console.log(data)


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthor.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token && <EditAuthor authors={data.allAuthor}/>}
    
    </div>
  )
}

export default Authors
