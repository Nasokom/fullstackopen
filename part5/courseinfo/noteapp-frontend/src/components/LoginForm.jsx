import React, {useState} from 'react'

const LoginForm = ({
    login,
}) => {

    const handleSubmit = async (event) => {
        event.preventDefault()

            await login({username,password})
        
    }

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

  return (
    <div>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
            <div>
                username
                <input 
                value={username}
                onChange={event => setUsername(event.target.value)}/>
            </div>

            <div>
                password
                <input
                value={password}
                onChange={event => setPassword(event.target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    </div>
  )
}

export default LoginForm