import { useSelector,useDispatch } from "react-redux"
import { removeNotification } from "../reducers/notificationReducer"
const Notification = () => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  const dispatch = useDispatch()
  const notification = useSelector(({notification})=>notification)
  const isNotification = notification.length > 0

  setTimeout(() => dispatch(removeNotification()), 3000)

  return(
    <>
      {isNotification && <div style={style}>{notification}</div>}
    </>

  ) 
    
}

export default Notification
