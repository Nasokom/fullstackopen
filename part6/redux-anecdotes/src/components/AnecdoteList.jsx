import { useDispatch,useSelector } from "react-redux"
import {voteAnecdotes} from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({anecdotes,filter}) => anecdotes.filter(a => a.content && a.content.includes(filter)).sort((a,b)=>b.votes-a.votes))
    const vote = id => ()=>{
        dispatch(voteAnecdotes(id))
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