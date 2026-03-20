import { useMutation,useQueryClient } from "@tanstack/react-query"
import { createAnecdotes } from "../request"
import { useNotificationContext } from "../NotificationContext"

const AnecdoteForm = () => {

   const {triggerNotification} = useNotificationContext()

  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn:createAnecdotes,
    onError:(error)=>{
      triggerNotification(error.message)
    },
    onSuccess:(newData)=>{
      const notes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], notes.concat(newData))  
      triggerNotification(`${newData.content} just added`)
    }

  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
     createMutation.mutate(content)
    console.log('new anecdote')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
