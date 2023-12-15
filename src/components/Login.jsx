import '../styles/Login.css'
// import { logout } from "../firebase"

const Login = () => {

  return (
    <>
      <div className='Login'>     
        <h4>User logged:</h4>
        <p>{localStorage.getItem("name")}</p>
      </div>
    </>
  )
}

export default Login