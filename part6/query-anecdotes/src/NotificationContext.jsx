import { useReducer, useContext,createContext } from "react";

//REDUCER 
const notificationReducer = (state, action) =>{
    switch (action.type){
        case 'DISPLAY':
            return action.payload 
        
        case 'REMOVE':
            return ''
        default : return state
    }
}

//ACTION CREATOR
export const actionsCreator = 
{
    display: (data)=> new Object({
        type:'DISPLAY',
        payload:data
    }),
    remove:()=>new Object({
        type:'REMOVE'
    }),
}

// CONTEXT

const NotificationContext = createContext()

//PROVIDER
export default function  NotificationContextProvider({children}){

    const triggerNotification = (data)=>{
        
    dispatchNotification(actionsCreator.display(data))
    setTimeout(()=>{
        dispatchNotification(actionsCreator.remove())
    },5000)

}

    const [notification,dispatchNotification] = useReducer(notificationReducer,'')

    return (
        <NotificationContext.Provider value={{notification,dispatchNotification,triggerNotification}}>
            {children}
        </NotificationContext.Provider>
    )
}

// EXPORT DISPATCH, STATE
export const useNotificationContext = ()=>useContext(NotificationContext)