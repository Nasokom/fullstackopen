import { Routes,Route, useParams,useNavigate} from 'react-router-dom'
import { useState } from 'react'
import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import About from './components/About'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])


  const [notification, setNotification] = useState('')

  const navigate = useNavigate()

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    console.log(anecdote)
    setAnecdotes(anecdotes.concat(anecdote))
    navigate('/anecdotes') 
    setNotification(`a new anecdote ${anecdote.content} created !`)
    setTimeout(()=>{
      setNotification('')
    },5000)
  }

  
  const anecdoteById = (id) => anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const Anecdote = () =>{
     const id = useParams().id
      const anecdote = anecdoteById(Number(id))

      if(!anecdote){
        return null
      }

return (
      <div>
        <h1>{anecdote.content}</h1>
        <p>has {anecdote.votes} votes</p>

        <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
      </div>
    )
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification && <p>{notification}</p>}
      <Routes>

      <Route path={'/anecdotes'} element={<AnecdoteList anecdotes={anecdotes} />} />
      <Route path={'/anecdotes/:id'} element={<Anecdote/>} />
      <Route path='/about' element={<About />}/>
      <Route path="/create" element={<CreateNew addNew={addNew}/>}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
