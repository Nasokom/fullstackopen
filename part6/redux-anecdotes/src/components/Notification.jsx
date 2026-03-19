import { useSelector,useDispatch } from "react-redux"
const Notification = () => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  const notification = useSelector(({notification})=>notification)
  const isNotification = notification.length > 0

  return(
    <>
      {isNotification && <div style={style}>{notification}</div>}
    </>

  ) 
    
}

export default Notification
