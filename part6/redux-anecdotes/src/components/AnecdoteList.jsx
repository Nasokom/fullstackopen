import { useDispatch,useSelector } from "react-redux"
import { voteAction} from '../reducers/anecdoteReducer'
import { setNotification} from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({anecdotes,filter}) => anecdotes.filter(a => a.content.includes(filter)).sort((a,b)=>b.votes-a.votes))
    const vote = id => ()=>{
        dispatch(voteAction(id))
        dispatch(setNotification(`You voted '${anecdotes.find(a => a.id === id).content}'`))
    }

  return (
   <div>
     {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div onClick={()=>dispatch(removeNotification())}>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
   </div>
  )
}

export default AnecdoteList