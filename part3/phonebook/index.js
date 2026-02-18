require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

morgan.token('body', req => {
  return JSON.stringify(req.body)
})

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body',{
}))

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
    Person.find({}).then( persons =>{
        response.json(persons)
    })
})

app.get('/api/persons/:id',(request,response,next)=>{
    const id = request.params.id
    console.log(id)
    Person.findById(id)
    .then(result => response.json(result))
    .catch(error => next(error)
)    
})

app.delete('/api/persons/:id',(request,response,next)=>{
    const id = request.params.id
    if(!id){
      return   response.status(400).send('id is missing').end()
    }

    Person.findByIdAndDelete(id).then(target =>{
        if(!target){
            return response.status(404).json({error:`No person with the id ${id}`}).end()
        }
        response.json(target)
    })
    .catch(error => next(error))
     

})

app.post('/api/persons',(request,response)=>{
    const body = request.body
    
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

    // if(persons.findOne(person => person.name === body.name)){

    //  return response.status(409).json(errors.exist).end()
    // }   
    const newPerson = new Person(body)
    newPerson.save().then(person =>{
            response.json(person)
        })
        .catch( err => response.status(404).json({error:err}).end)
})

app.put('/api/persons/:id',(request,response,next)=>{
    const id = request.params.id
    const body = request.body

    Person.findById(id)
    .then( target => {

        if(!target){
            response.status(404).json({error:"No one with id: "+id})
        }
        target.name = body.name
        target.number = body.number
        target.save()
        .then( data => response.send(data))
    })
    .catch(error => next(error))
})

app.get('/info',(request,response)=>{

    Person.find({}).then(persons =>{
        response.send(
            `
            <p>Phonebook has info for ${persons.length} people ${persons.length > 0 ? "'s":''}</p>  
            <p>${new Date()}</p>
            `
        )
    })
    .catch(error=>response.status(404).json(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}
// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = 3001

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
