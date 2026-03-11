
const Login = ({ handleSubmit,field }) => {

  return (
    <>
      <h2>login to application</h2>
      <form onSubmit={handleSubmit}>
        <label>
          username
        <input value={field.username} name='username' onChange={(e) => field.setUsername(e.target.value)}/>
        </label>
    <label>
      password
        <input value={field.password} name='password' onChange={(e) => field.setPassword(e.target.value)}/>
    </label>
        <input type='submit'/>
      </form>
    </>
  )
}

export default Login