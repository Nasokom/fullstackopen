import { useState, useEffect} from 'react'
import axios from 'axios'
import personServices from './services/persons'

const Filter = (props) => {
  return (
       <div>
            <span>Filter shown with</span><input {...props}/>
      </div>
  )
}

const Notification = ({message,success})=>{
   if(message === null){
        return null 
    }

  return (
    <div className={`notification ${message.includes('server') || message.includes('failed')? 'error' :'success'}`}>
      {message}
    </div>
  )
}

const PersonForm = ( {handleSubmit, handleChange, newPerson}) => {

  return(
    <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newPerson.name} onChange={handleChange('name')}/>
           <div>number: <input  value={newPerson.number} onChange={handleChange('number')}/></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
  </form>
  )
}

const Persons = ({filteredPerson,handleDelete})=>{

  return(
     <table>
          <tbody>
          {filteredPerson.map( person => {
            return(
              <tr key={person.id}>
                  <td>{person.name}</td>
                  <td>{person.number}</td>
                  <td>
                    <button onClick={()=>handleDelete(person)}>delete</button>
                  </td>

              </tr>
            )
          })
        }
        </   tbody>
      </table>   
  )
}

const App = () => {
  
 const [persons, setPersons] = useState([])
 const [message,setMessage] = useState(null)

  useEffect(()=>{
    personServices
    .getAll()
    .then(response=> setPersons(response))
  },[])



  console.log('persons',persons.length)

  const [newPerson,setNewPerson] = useState({name:'',number:''})
  const [filter,setFilter] = useState('')

  const filteredPerson = persons.filter( person => person.name.includes(filter)) 

  const msg = (value) => alert(`${value} is already added to phonebook`) 

  const alreadyExist = (value,field)=>  persons.find(person => person[field] === value)

    const handleNotification = (msg,bool)=>{
        setMessage(msg)
        setTimeout(()=>{
          setMessage(null)
        },5000)
        setNewPerson({name:'',number:''})
    }

    const handleChange = (field)=>{

      const handle = (event) =>{
        const value = event.target.value
        const n = {...newPerson,[field]:value}
        console.log(n)
        setNewPerson(n)
        alreadyExist(value,field) && msg(value)
      }
      return handle
    }



  const handleSubmit = (event) =>{
    event.preventDefault()

    // for (const [key, value] of Object.entries(newPerson)) {
    //   if(alreadyExist(value,key)){
    //     msg(value)
    //     return window.confirm('update')
    //   }
    // }

    if(alreadyExist(newPerson.name, 'name')){
      if(window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one ?`)){
        const selected = persons.find(person => person.name == newPerson.name)
          return personServices.updatePerson({...newPerson,id:selected.id})
          .then(response => {
            setPersons(persons.map(person =>person.id === response.id ? response : person))
            handleNotification(`Changed ${response.name}'s number to ${response.number}` )
          })
          .catch( error => {
            const errorType = error.response.data.name || undefined
            if(errorType){
              return handleNotification(error.response.data.message)
            }
            return handleNotification(`Information of ${newPerson.name} has already been removed from server`)

          })
      }
      return
    }

    personServices.createPerson(newPerson)
    .then((response)=>{
      setPersons(persons.concat(response))
      handleNotification(`Added ${response.name}` )
    })
    .catch((error)=>{
        return handleNotification(error.response.data.message)
      })

  }

  const handleFilter= (event) =>{
    const value = event.target.value
    setFilter(value)
  }

  const handleDelete = (person)=>{
    
    const msg = `Delete ${person.name}`
    if(window.confirm(msg)){
    personServices.deletePerson(person.id)
    .then(response => setPersons(persons.filter(person => person.id !== response.id )))
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter onChange={handleFilter}/>

      <h3>add a new</h3>

      <PersonForm newPerson={newPerson} handleSubmit={handleSubmit} handleChange={handleChange}/>

      <h3>Numbers</h3>
      
      <Persons filteredPerson={filteredPerson} handleDelete={handleDelete}/> 

    </div>
  )
}

export default App