const User = require('../models/user')

const usersInDb =async()=>{
const notes = await User.find({})
return notes.map(note => note.toJSON())
} 

module.exports = {usersInDb}