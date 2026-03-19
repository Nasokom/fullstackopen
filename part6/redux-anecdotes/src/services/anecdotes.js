const BASE_URL = "http://localhost:3001/anecdotes"

const getAll = async () => {

    const response = await fetch(BASE_URL)

    if(!response.ok){
        throw new Error('Failed to fetch anecdotes')
    }

    const data = await response.json()
    console.log(data)
    return data 
}

const saveAnecdote = async (content) =>{

    const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes:0 }),
  }

    const response = await fetch(BASE_URL,options)
  console.log(response)
    if(!response.ok){
        throw new Error("Failed to saved anecdote")
    }

    const data = await response.json()
    console.log(data)
    return data 
}

export default {getAll,saveAnecdote}