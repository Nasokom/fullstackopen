import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery,useMutation,useQueryClient, QueryClient } from '@tanstack/react-query'
import { getAll,voteAnecdotes } from './request'
import { useNotificationContext } from './NotificationContext'

const App = () => {

  const {triggerNotification} = useNotificationContext()

  const queryClient = useQueryClient()

  const {data,isPending,error} = useQuery({
    queryKey:['anecdotes'],
    queryFn:getAll,
    retry: 1
  })

  const voteMutation = useMutation({
    mutationFn:voteAnecdotes,
    onSuccess:(newData)=>{
      queryClient.invalidateQueries('anecdotes')
      triggerNotification(`anecdote '${newData.content}' voted`)
    }
  })

  const handleVote = async (anecdote) => {
    await voteMutation.mutate(anecdote)
  }
  const anecdotes = data

  if(isPending) return 'Loading...'

  if(error) return 'anecdote service not available due to problems in server :'+error.message


  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div onClick={()=>dispatchNotification(actionsCreator.display(anecdote.content))}>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
