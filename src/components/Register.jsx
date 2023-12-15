import { logout, signInWithGoogle } from '../firebase'
import '../styles/Register.css'

const Register = () => {

  return(
    <div className='Register'>
      <button onClick={signInWithGoogle} className="google-auth-button">
        Sign in with google
      </button>
      <button className='default-button' onClick={logout}>Sign Out</button>
    </div>
  )
}

export default Register