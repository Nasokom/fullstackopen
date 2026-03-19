import { createSlice } from "@reduxjs/toolkit"

const anecdotesAtStart = [
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = createSlice({
  name:'anecdotes',
  initialState,
  reducers:{
    setAction(state,action){
      return action.payload
    },
    voteAction(state, action){
      console.log(action)
      return state.map(quote =>{
        if(quote.id === action.payload){
          return {...quote,votes:quote.votes+1}
        }
        return quote
      })
    },


    createAction(state,action){
        const newQuote = action.payload
      return  [...state,newQuote]
    }
  },
})


export const {voteAction,createAction,setAction} = anecdoteReducer.actions
export default anecdoteReducer.reducer
