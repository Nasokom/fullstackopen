const mongoose = require('mongoose')
require('dotenv').config()

// if (process.argv.length < 3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

//RkgehtyFRB10HK9Y


const url = process.env.TEST_MONGODB_URI


mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)


Note.insertMany([
  { 
      "content": "HTML is easy",
      "important": true
    },
    {
      "content": "Browser can execute only JavaScript",
      "important": false
    },
    {
      "content": "GET and POST are the most important methods of HTTP protocol",
      "important": true
    }
]).then( result => {
  console.log('insert data',result)
  mongoose.connection.close()
}).catch( err => {
  console.log(err)
  mongoose.connection.close()
})
// const note = new Note({
//   content: 'HTML is easy',
//   important: true,
// })

// note.save().then(result => {
//   console.log('note saved!') 

//   mongoose.connection.close()
// })


// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })