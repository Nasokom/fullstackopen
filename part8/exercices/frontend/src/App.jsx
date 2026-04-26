import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Routes,Route,NavLink } from 'react-router'
import LoginForm from './components/LoginForm'
import { useApolloClient,useSubscription } from '@apollo/client/react'
import { useNavigate } from 'react-router'
import Recommend from './components/Recommend'
import { useQuery } from '@apollo/client/react'

import {ME,BOOK_ADDED, ALL_BOOKS} from "./queries"
import { addBookToCache } from './utils/apolloCache'

const App = () => {
  useQuery(ALL_BOOKS)
  const client = useApolloClient()
  const navigate = useNavigate()
  const [token,setToken] = useState(localStorage.getItem('library-user-token'))
  const {data,loading,error} = useQuery(ME)

  const logout = () =>{
    setToken(null)
    localStorage.clear()
    client.resetStore()
    navigate('/login')
  }

   useSubscription(BOOK_ADDED, {
    onData: async ({ data }) => {
    const  bookToAdd= data.data.bookAdded
    alert(`new book add : ${bookToAdd.title}`)
    addBookToCache(client.cache, bookToAdd)
    },
  })

  return (
    <div>
      <div>
        <NavLink to={'/'}>
            <button>authors</button>
        </NavLink>
        <NavLink to={'books'}>
            <button >books</button>
        </NavLink>
        {token &&
        <>
          <NavLink to={'add'}>
            <button>add book</button>
          </NavLink>

          <NavLink to={'recommend'}>
            <button>recommend</button>
          </NavLink>
        </>

        }
        {
          !token ?
          <NavLink to={'login'}>
          <button>login</button>
          </NavLink>
          : <button onClick={logout}>logout</button>
        }
      </div>

    <Routes>
      <Route path={'/'} element={<Authors token={token}/>}/>
      <Route path={'books'} element={<Books client={client}/>}/>
      <Route path={'add'} element={token ? <NewBook/> : <LoginForm setToken={setToken}/>}/>  
      <Route path='recommend' element={ loading ?  <p>...loading</p> : <Recommend me={data.me} />}/>
      <Route path={'login'} element={<LoginForm setToken={setToken} client={client}/>}/>         
    </Routes>      
    </div>
  )
}

export default App
