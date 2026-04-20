const User = require('./models/user')
const Author = require('./models/author')
const Book = require('./models/Book')
const jsonwebtoken = require('jsonwebtoken')
const { GraphQLError, createSourceEventStream } = require('graphql')

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async ()=> await Author.collection.countDocuments(),
    allBooks:async (root,args) =>{

        const regexVar = (testString) =>  new RegExp(testString,'i')
        const genres = args.genre ? regexVar(args.genre) : regexVar('')
        const author = args.author || null

        if(!author){
            return await Book.find({genres})
        }

      return await Book.find({
        author,
        genres
      })

    },
    allAuthor:async ()=> {
      return await Author.find({})
    },
    me:async(root,args,{currentUser})=>currentUser
  },

  Author:{
    bookCount:async ({_id})=> await Book.find({author:_id}).countDocuments()
  },

  Book:{
    author : async({author})=> await Author.findById(author)
  },
  Mutation:{
    addBook: async (root,args,{currentUser})=> {

        if (!currentUser) {
      throw new GraphQLError('not authenticated', {
        extensions: { code: 'UNAUTHENTICATED' },
      })
    }

        let author = await Author.findOne({name:args.author})
        console.log(author)

        if(!author){
          author = new Author({name:args.author})
          await author.save()
        }
        try{

          const newBook = new Book({...args,author:author._id})
          return await newBook.save()
        }catch(error){
        throw new GraphQLError(`Saving person failed: ${error.message}`,{
          extensions:{
            code:'BAD_USER_INPUT',
            invalidArgs:args.name,
            error
          }
        })
      }

    },

     editAuthor: async (root,args,{currentUser})=>{

          if (!currentUser) {
      throw new GraphQLError('not authenticated', {
        extensions: { code: 'UNAUTHENTICATED' },
      })
    }
        const target = await Author.findOne({name:args.name})
        if(!target){
          return null
        }
        target.born = args.setBornTo
          const savedAuthor = await target.save()
          return savedAuthor
     },
    createUser:async(root,args) => {
      const {username,favoriteGenre} = args
      const newUser = new User({username,favoriteGenre})
      return await newUser.save()
    },
    login:async (root,{username,password},context)=>{

      const user = await User.findOne({username})
      
      if ( !user || password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    const jwt = jsonwebtoken.sign(userForToken,process.env.JWT_SECRET)

    context.currentUser = jwt
    
    return {value: jwt}

    }
  }
}

module.exports = resolvers



