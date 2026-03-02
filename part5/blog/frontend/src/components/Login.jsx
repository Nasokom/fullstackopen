
const Login = ({handleSubmit,field}) => {
  
  return (
    <>
    <h2>login to application</h2>
    <form onSubmit={handleSubmit}>
        <input value={field.username} name='username' onChange={(e)=>field.setUsername(e.target.value)}/>
         <input value={field.password} name='password' onChange={(e)=>field.setPassword(e.target.value)}/>
         <input type='submit'/>
    </form>
    </>
  )
}

export default Login