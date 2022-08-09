import { addDoc, collection } from "firebase/firestore"
import { useState } from "react"
import { db } from "../firebase"

const CreateLead = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handleChange = (e) => {
    e.preventDefault()
    if(e.target.name === "name") {
      setName(e.target.value)
    }

    if(e.target.name === "email") {
      setEmail(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = {
      name,
      email
    }

    try {
      const docRef = await addDoc(collection(db, "leads"), formData);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return(
    <div className="CreateLead">
      <h2>Create a Lead</h2>
      <form className="CreateLead" onSubmit={handleSubmit}>
      <label htmlFor="name">
          Nombre
        </label>
        <br />
        <input
          id="name"
          type="name" 
          name="name"
          onChange={handleChange}
          className="short-input inputs"
        />
        <br />

        <label htmlFor="email">
          Correo Electronico
        </label>
        <br />
        <input
          id="email"
          type="email" 
          name="email"
          onChange={handleChange}
          className="short-input inputs"
        />
        <br />
        <button className="success-button" type="submit">
          Captar lead
        </button>
      </form>
    </div>
  )
}

export default CreateLead