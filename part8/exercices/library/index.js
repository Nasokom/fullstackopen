const startServer = require('./server')
const connectToDatabase = require('./db')
require('dotenv').config()

const uri = process.env.MONGODB_URI
const port = process.env.PORT || 4000

async function main (){
 await connectToDatabase(uri)
  startServer(port)
}

main()
