import { useMutation,useQueryClient } from "@tanstack/react-query"
import { createAnecdotes } from "../request"

const AnecdoteForm = () => {


  const queryClient = useQueryClient()
  
  const createMutation = useMutation({
    mutationFn:createAnecdotes,
    onSuccess:(newData)=>{
      const notes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], notes.concat(newData))  
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
