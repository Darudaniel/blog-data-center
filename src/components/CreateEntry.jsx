import '../styles/CreateEntry.css'
import { useState } from 'react'
import { initializeApp } from 'firebase/app';
import { collection, addDoc, getFirestore, getDocs  } from "firebase/firestore";
import firebaseConfig from '../firebase/firebaseConfig'

const CreateEntry = () => {

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const getPetition = async () => {
    const entriesCollection = collection(db, 'entries');
    const entrySnapshot = await getDocs(entriesCollection);
    const entryList = entrySnapshot.docs.map(doc => doc.data());
    return entryList
  }

  const handleClickTest = async () => {
    const listaDeEntradas = await getPetition()
    console.log(listaDeEntradas)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = {
      title,
      content
    }
    try {
      const docRef = await addDoc(collection(db, "entries"), formData);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const handleChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleChangeContent = (e) => {
    setContent(e.target.value)
  }

  return(
    <>
      <h2>Crear Entrada</h2>
      <form className="CreateEntry" onSubmit={handleSubmit} >
        <label htmlFor="title">
          Titulo
        </label>
        <br />
        <input
          id="title"
          type="title" 
          name="title"
          onChange={handleChangeTitle}
        />
        <br />
        <label htmlFor="content">
          Contenido
        </label>
        <br />
        <input
          id="content"
          type="content" 
          name="content"
          onChange={handleChangeContent}
        />
        <br />
        <button className="success-button" type="submit">
          Publicar
        </button>
      </form>
      <button type="submit" onClick={handleClickTest}>
      Test getting entries
      </button>
    </>
  )
}

export default CreateEntry