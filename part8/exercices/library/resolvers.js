const User = require('./models/user')
const Author = require('./models/author')
const Book = require('./models/Book')
const jsonwebtoken = require('jsonwebtoken')
const { GraphQLError, createSourceEventStream, subscribe } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const mongoose = require('mongoose')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => {
      return await Book.collection.countDocuments()
    },
    authorCount: async ()=> await Author.collection.countDocuments(),
    allBooks:async (root,args) =>{
        const regexVar = (testString) =>  new RegExp(testString,'i')
        const genres = args.genre ? regexVar(args.genre) : regexVar('')
        const author = args.author || null
        console.log(genres)
        if(!author){
            return await Book.find({genres})
        }

      return await Book.find({
        author,
        genres
      })

    },
    allGenres:async()=> {
  const books =  await Book.find({})

  const genres = await books.flatMap(a=>a.genres).reduce((arr,elt,i)=>{
      if(!arr.includes(elt)){
        arr.push(elt)
    }
    return arr
  },[])

    return genres

    },
    allAuthor:async ()=> {
      return await Author.find({})
    },
    me:async(root,args,context)=> {
      console.log( context)
      return context.currentUser
    }
  },

  Author:{
    bookCount:async ({books})=> books.length
      //await Book.find({author:_id}).countDocuments()
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

        const newBookID = new mongoose.Types.ObjectId()

        let author = await Author.findOne({name:args.author})

        if(!author){
          author = new Author({name:args.author})
        }

        console.log(author)
        author.books.push(newBookID)
        console.log(author)
        await author.save()
        const newBook = new Book({...args,author:author._id,_id:newBookID})

        try{
          await newBook.save()
        }catch(error){
          throw new GraphQLError(`Saving person failed: ${error.message}`,{
            extensions:{
              code:'BAD_USER_INPUT',
              invalidArgs:args.name,
              error
            }
          })
        }
       pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
        return newBook
    },

     editAuthor: async (root,args,context)=>{
      console.log(context)
      const {currentUser} = context

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
      console.log(username,password)

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
      favoriteGenre:user.favoriteGenre
    }

    const jwt = jsonwebtoken.sign(userForToken,process.env.JWT_SECRET)

    context.currentUser = jwt
    return {value:jwt}

    }
  },
  Subscription:{
    bookAdded :{
      subscribe: ()=> pubsub.asyncIterableIterator('BOOK_ADDED')
    },
    test:{
      subscribe: ()=> pubsub.asyncIterableIterator('test')
    }
  }
}

module.exports = resolvers



