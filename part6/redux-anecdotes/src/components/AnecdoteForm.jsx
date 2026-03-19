import {createAction} from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
   const newData =  await anecdoteService.saveAnecdote(content)
   
       event.target.content.value = ''
       dispatch(createAction(newData))
       dispatch(setNotification(`'${newData.content}' just added`))

  }

  return (
    <>
    <h2>create new</h2>
     <form onSubmit={create}>
        <div>
          <input name='content'/>
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm