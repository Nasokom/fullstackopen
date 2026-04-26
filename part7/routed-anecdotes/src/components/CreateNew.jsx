
import { useField } from "../hooks"

const CreateNew = (props) => {

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content:content.value,
      author:author.value,
      info:info.value,
      votes: 0
    })
}

const resetAll = (e)=>{
    e.preventDefault()
    content.method.reset()
    author.method.reset()
    info.method.reset()
}


  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content.field} />
        </div>
        <div>
          author
          <input name='author' {...author.field} />
        </div>
        <div>
          url for more info
          <input name='info' {...info.field} />
        </div>
        <button>create</button>
        <button onClick={resetAll}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew