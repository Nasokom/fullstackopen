const Note = require('../models/note')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true
  }
]

 const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
}


const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}


const getUserToken = async () => {
    const [user] = await User.find({username:'notesTest'})
    if(user){
      return await jwt.sign({username:user.username, id:user.id},process.env.SECRET)
    }
   const savedUser = await new User({username:'notesTest',name:'Mikael',password:await bcrypt.hash('password',10)}).save()
   const {username, id} = await savedUser
   const userForToken = {username,id}
   const token = await jwt.sign(userForToken,process.env.SECRET)
  return token

}

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
  usersInDb,
  newNote,
  getUserToken
}