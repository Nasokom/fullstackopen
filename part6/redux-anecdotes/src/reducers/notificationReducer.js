import { createSlice } from "@reduxjs/toolkit";


const notificationReducer = createSlice({
    name:'notification',
    initialState:'',
    reducers:{
        notificationAction(state,action){
            return action.payload
        },
        removeNotification(state,action){
            return ''
        }
    }
})

const {removeNotification,notificationAction} = notificationReducer.actions

export const setNotification = (content,time)=>{
    return async (dispatch)=>{
        dispatch(notificationAction(content))
        setTimeout(()=>{
            dispatch(removeNotification())
        },time*1000)
    }
}

export default notificationReducer.reducer

