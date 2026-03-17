import { useDispatch,useSelector } from "react-redux"
import { voteAction} from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({anecdotes,filter}) => anecdotes.filter(a => a.content.includes(filter)).sort((a,b)=>b.votes-a.votes))
    const vote = id => ()=>dispatch(voteAction(id))

  return (
   <div>
     {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
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