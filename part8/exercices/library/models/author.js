const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
    born:{
        type:Number,
    },
    books:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Books'
    }]
})

const Author = mongoose.model('Author',authorSchema)

module.exports = Author