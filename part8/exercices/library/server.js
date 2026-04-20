const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const jsonwebtoken = require('jsonwebtoken')

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const getUserFromAuthHeader = async (auth) => {
  if (!auth || !auth.startsWith('Bearer ')) {
    return null
  }
 const decodedToken = jsonwebtoken.verify(auth.substring(7), process.env.JWT_SECRET)

 return decodedToken
}

const startServer = (port) =>startStandaloneServer(server, {
  listen: {port},
    context: async ({ req }) => {
      const auth = req.headers.authorization
      const currentUser = await getUserFromAuthHeader(auth)
      return { currentUser }
    },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

module.exports = startServer