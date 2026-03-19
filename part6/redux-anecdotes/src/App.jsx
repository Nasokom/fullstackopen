import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import anecdotesService from './services/anecdotes'
import { setAction } from './reducers/anecdoteReducer'
const App = () => {
 const dispatch = useDispatch()

  useEffect(()=>{
    anecdotesService.getAll().then(data=>dispatch(setAction(data)))
  },[dispatch])
 
  return (
    <div>
      <h2>Anecdotes</h2>
        <Notification/>
        <Filter/>
        <AnecdoteList/>
        <AnecdoteForm/>
    </div>
  )
}

export default App
