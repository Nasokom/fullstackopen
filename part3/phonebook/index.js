const express = require('express')
const morgan = require('morgan')
const app = express()

morgan.token('body', req => {
  return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body',{
}))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "wMary Poppendieck", 
      "number": "39-23-6423122"
    }
]
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
//app.use(requestLogger)



app.get('/',(request,response)=>{
    response.send('Welcome to the server')
})


app.get('/api/persons',(request,response)=>{
    response.json(persons)
})


app.get('/api/persons/:id',(request,response)=>{
    const id = Number(request.params.id)
    console.log(id)
    const person = persons.find(p => Number(p.id) === id)

    if(!person){
        return response.status(404).end()
    }
    return response.json(person)
    
})

app.delete('/api/persons/:id',(request,response)=>{
    const id = request.params.id
    if(!id){
      return   response.status(400).send('id is missing').end()
    }
    const target = persons.find(person => Number(person.id) === Number(id))

    if(!target){
        return response.status(404).json({error:`No person with the id ${id}`}).end()
    }

    persons = persons.filter(person => Number(person.id) !== Number(target.id) )

    console.log(persons)
 
    response.send(`${target.name} successfully delete`)

})

function generateId(){
    return Math.round(Math.random() * 1000000000 )

}


app.post('/api/persons',(request,response)=>{
    const body = request.body
    //console.log(body)
    const errors= {
                body:{ error: 'no content send' },
                missing:{ error: 'The name or number is missing' },
                exist:{ error: 'The name already exists in the phonebook' }
                }
    if(!body){
      //  console.log(errors.body)
      return  response.status(400).json(errors.body).end()
    }
    
    if(!body.name || !body.number){
        //console.log(errors.missing)
       return response.status(400).json(errors.missing).end()
    }

    if(persons.find(person => person.name === body.name)){
        //console.log(errors.exist)
     return response.status(409).json(errors.exist).end()
    }  
        const newPerson = {id:generateId(),...body}
        persons.push(newPerson)
        //console.log(persons)
        response.json(`${newPerson.name} successfully added to the phonebook`)
})

app.get('/info',(request,response)=>{
    response.send(
    `
    <p>Phonebook has info for 2 peoples</p>  
    <p>${new Date()}</p>
    `
)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
