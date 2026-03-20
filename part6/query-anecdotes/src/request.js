const base_url = 'http://localhost:3001/anecdotes/'

export const getAll = async ()=>{

    const response = await fetch(base_url)

    if(!response.ok){
        throw new Error('Problem fetching data')
    }
    return response.json()
}

export const createAnecdotes = async (content) =>{

const newData = {content,votes:0}

    const options = {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(newData),
    }

    const response = await fetch(base_url,options)

    if(!response.ok){
            const {error} = await response.json()
        throw new Error(error) 
    }   
    return await response.json()

}

export const voteAnecdotes= async (content)=>{

const patch = {votes:Number(content.votes)+1}
const options = {
    method:"PATCH",
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(patch)
}

const response = await fetch(base_url+content.id,options)

if(!response.ok){
    throw new Error('pb on patch')
}

return response.json()
}