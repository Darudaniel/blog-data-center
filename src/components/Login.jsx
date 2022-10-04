import '../styles/Login.css'
import { logout } from "../firebase"

const Login = () => {

  // const [loginEmail, setLoginEmail] = useState("")
  // const [loginPassword, setLoginPassword] = useState("")

  // const [user, setUser] = useState({})

  // const handleChangeEmail = (e) => {
  //   setLoginEmail(e.target.value)
  // }

  // const handleChangePassword = (e) => {
  //   setLoginPassword(e.target.value)
  // }

  

  // const login = async (e) => {
  //   e.preventDefault()
  //   try {
  //     const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
  //     console.log('usuario logeado con exito')
  //     console.log(user)
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }

  // useEffect(() => {
  //   onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser)
  //   })
  // }, [])

  return (
    <>
      {/* <h2>Login</h2> */}
      {/* <form className="login" onSubmit={login}>
        <input placeholder="Email..." onChange={handleChangeEmail} />
        <br />
        <input placeholder="Password..." onChange={handleChangePassword}/>
        <br />
        <button>Login</button>
      </form> */}
      <div className='Login'>     
        <h4>User logged:</h4>
        {/* {user?user.email:"Not Logged In"} */}
        {/* <h2>Logeado por google</h2> */}
        <p>{localStorage.getItem("name")}</p>
        {/* <p>{localStorage.getItem("email")}</p> */}
        {/* <img src={localStorage.getItem("profilePic")} alt="Foto de perfil de google" /> */}
        <button className='default-button' onClick={logout}>Sign Out</button>
      </div>
    </>
  )
}

export default Login