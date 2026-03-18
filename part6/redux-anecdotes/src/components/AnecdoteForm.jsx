import {createAction} from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

  const create = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(createAction(content))
    dispatch(setNotification(`'${content}' just added`))
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