import axios from 'axios'

const base_URL = 'http://localhost:3001/persons'


const getAll=()=>{
    return axios.get(base_URL)
    .then(response => response.data)
}

const createPerson = (newPerson) =>{
    return axios.post(base_URL,newPerson)
    .then(response => response.data)
}

const deletePerson = (id) => {
    return axios.delete(`${base_URL}/${id}`)
    .then(response =>{ 
        console.log('You successfully delete '+response.data.name)
        return response.data
    })
}

const updatePerson = (person) => {
    return axios.put(`${base_URL}/${person.id}`,person)
    .then((response)=> {
        console.log(response.data.name+' number has been update')
        return response.data
    })
}

export default {
    getAll,deletePerson,createPerson, updatePerson
}