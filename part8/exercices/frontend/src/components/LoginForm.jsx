import React from 'react'
import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { LOGIN } from '../queries'
import { useNavigate } from 'react-router'

const LoginForm = ({setToken,client}) => {

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()


    const [login,{error}] = useMutation(LOGIN, {
            onCompleted:(data)=>{
                const token = data.login.value
                setToken(token)
                localStorage.setItem('library-user-token',token)    
                client.resetStore()
                navigate('/books')
            }   
            })

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            await login({variables:{username,password}})    
        }catch(err){

        }
    }

  return (

      
      <div>
        {error && <p>{JSON.stringify(error.message)}</p>}
        <h1>LoginForm</h1>
    <form onSubmit={handleSubmit}>
        <label>
            username
        <input type='text' value={username} onChange={(e)=>setUsername(e.target.value)}/>
        </label>
        <label>
        password
        <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </label>
        <input type="submit" value={'submit'} />
    </form>

    </div>
  )
}

export default LoginForm