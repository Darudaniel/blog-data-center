import { useState } from 'react'
import { auth, signInWithGoogle } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import '../styles/Register.css'

const Register = () => {

  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")

  const handleChangeEmail = (e) => {
    setRegisterEmail(e.target.value)
  }

  const handleChangePassword = (e) => {
    setRegisterPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      console.log('usuario creado con exito')
    } catch (error) {
      console.log(error.message)
    }
  }

  return(
    <div className='Register'>
      {/* <h2>Register</h2> */}
      {/* <form className="register" onSubmit={handleSubmit} >
        <label htmlFor="email">
          Email
        </label>
        <br />
        <input
          id="email"
          type="email" 
          name="email"
          onChange={handleChangeEmail}
        />
        <br />
        <label htmlFor="password">
          Password
        </label>
        <br />
        <input
          id="password"
          type="password" 
          name="password"
          onChange={handleChangePassword}
        />
        <br />
        <button className="success-button" type="submit">
          Registrar
        </button>
      </form> */}
      <button onClick={signInWithGoogle} className="google-auth-button">
        Sign in with google
      </button>
    </div>
  )
}

export default Register