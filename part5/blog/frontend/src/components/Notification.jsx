import { useEffect } from 'react'
import '../notification.css'

const Notification = ({ setNotification,notification }) => {

  useEffect(() => {
    setTimeout(() => setNotification(''),5000)
  },[setNotification])

  return (
    <div
      className={`notification ${notification.includes('error') ? 'error' :''}`}
    >{notification}</div>
  )
}

export default Notification