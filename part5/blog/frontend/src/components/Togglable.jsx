import React, {useState,useImperativeHandle} from 'react'

const Togglable = (props) => {
    const [toggle,setToggle] = useState(false)

    const handleToggle = ()=>setToggle(!toggle)
    
    useImperativeHandle(props.ref, ()=>{
        return {
            handleToggle
        }
    })
  return (
     <div>
        {
        !toggle ?
        <div>
            <button onClick={handleToggle}>{props.buttonLabel || 'toggle'}</button>
        </div>
        :
        <div>
                {props.children}
                <button onClick={handleToggle}>{props.cancelLabel||"cancel"}</button>
        </div>
        }
    </div>
  )
}

export default Togglable