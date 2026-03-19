import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'
import { setNotification } from "./notificationReducer"
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
    //I Prefer this version
    updateAction(state,action){
      const target = action.payload
      return state.map(data => {
        if(data.id === target.id ){
          return target
        }
        else return data
        })
    },


    createAction(state,action){
        const newQuote = action.payload
      return  [...state,newQuote]
    }
  },
})

const {setAction,createAction,voteAction,updateAction} = anecdoteReducer.actions

export const initializeStore = () => {
  return async(dispatch) =>{
    const datas = await anecdoteService.getAll()
    dispatch(setAction(datas))
}
}

export const appendAnecdote = (content) =>{
  return async(dispatch)=>{
    const newData = await anecdoteService.saveAnecdote(content)
    dispatch(createAction(newData))
    dispatch(setNotification(`'${content}' just added`,5))
  }
}

export const voteAnecdotes = (id) => {
  return async (dispatch,getState) => {
      const {votes} = getState().anecdotes.find(a => a.id === id)
      const patch = await anecdoteService.voteAnecdotes(id,votes+1)
      dispatch(updateAction(patch))
      dispatch(setNotification(`You voted '${patch.content}'`,10))
  }
}

export default anecdoteReducer.reducer
