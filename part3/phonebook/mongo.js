require('dotenv').config()
const mongoose = require('mongoose')

if(process.argv.find(a => a === '--help')){
  console.log('#### How to use the cli db #### ')
  console.log(' ')
  console.log('GET request:')
  console.log('node target_file.js password ')
  console.log(' ')
  console.log('POST :')
  console.log('node target_file.js password name number')
  console.log('##### END #####')
  process.exit()
}

if(process.argv.length < 2){
  console.log('give at least a password as argument')
  process.exit()
}

const name = process.argv[2]
const number = process.argv[3]


// const url = `mongodb+srv://naskombia_db_user:${'3JL8NUN6tA26sLOO'}
// @cluster0.adybdae.mongodb.net/phonebookApp?
// retryWrites=true&w=majority&appName=Cluster0`

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url,{ family:4 })

const personSchema = new mongoose.Schema({
  name:String,
  number:String
})
const Person = mongoose.model('Person',personSchema)

if(name && number){

  const newPerson = new Person({ name,number })

  return newPerson.save().then(result => {
    console.log(result.name,' succesfully save')
    mongoose.connection.close()
    process.exit()
  })

}

Person.find({}).then(persons => {
  console.log('### PERSONS LIST ####')
  console.log(persons)
  mongoose.connection.close()
}).catch(err => {
  console.log(err)
})
