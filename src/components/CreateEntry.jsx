import '../styles/CreateEntry.css'
import { useState } from 'react'
import { initializeApp } from 'firebase/app';
import { collection, addDoc, getFirestore, getDocs  } from "firebase/firestore";
import firebaseConfig from '../firebase/firebaseConfig'
import EditorComponent from './EditorComponent';

const CreateEntry = () => {

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)

  const [title, setTitle] = useState("")
  const [img, setImg] = useState("")
  const [editorContent, setEditorContent] = useState("")
  const [author, setAuthor] = useState("")
  const [opening, setOpening] = useState("")
  const [alt, setAlt] = useState("")


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

  const handleChangeTitle = (e) => {
    setTitle(e.target.value)
  }
  
  const handleChangeImg = (e) => {
    setImg(e.target.value)
  }

  const handleChangeAlt = (e) => {
    setAlt(e.target.value)
  }
  
  const handleChangeOpening = (e) => {
    setOpening(e.target.value)
  }

  const handleEditorText = (editorText) => {
    setEditorContent(editorText)
  }

  const handleChangeAuthor = (e) => {
    setAuthor(e.target.value)
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    const getRandomInt = (max) => {
      const number = Math.floor(Math.random() * max);
      const string = number.toString()
      return string
    }
    
    const entryId = getRandomInt(1000000)

    const createdAt = new Date()

    const formData = {
      title,
      img,
      alt,
      opening,
      editorContent,
      author,
      entryId,
      createdAt
    }

    try {
      const docRef = await addDoc(collection(db, "entries"), formData);
      console.log("Document written with ID: ", docRef.id);
      console.log(formData)
      alert('Entrada publicada con exito')
    } catch (e) {
      console.error("Error adding document: ", e);
      alert('Ha ocurrido un error en la publicacion de la entrada. Revisa tu conexion a internet.')
    }
  }


  return(
    <div className="CreateEntry-container">
      <h2>Create Entry</h2>
      <form className="CreateEntry" onSubmit={handleSubmit} >
        <label htmlFor="title">
          Title
        </label>
        <br />
        <input
          id="title"
          type="title" 
          name="title"
          onChange={handleChangeTitle}
          className="short-input inputs"
        />
        <br />

        <label htmlFor="imgLink">
          Img Link
        </label>
        <br />
        <input
          id="imgLink"
          type="link" 
          name="imgLink"
          onChange={handleChangeImg}
          className="short-input inputs"
        />
        <br />

        <label htmlFor="imgLink">
          Img Alt
        </label>
        <br />
        <input
          id="imgAlt"
          type="text" 
          name="imgAlt"
          onChange={handleChangeAlt}
          className="short-input inputs"
        />
        <br />

        <label htmlFor="opening">
          Opening
        </label>
        <br />
        <textarea
          id="opening"
          type="text" 
          name="opening"
          onChange={handleChangeOpening}
          className="long-input inputs"
        />
        <br />

        <p>Content</p>

        <EditorComponent onInputChange={handleEditorText} />
        
        <br />

        <label htmlFor="author">
          Author
        </label>
        <br />
        <textarea
          id="author"
          type="text" 
          name="author"
          onChange={handleChangeAuthor}
          className='short-input inputs'
        />

        <button className="success-button" type="submit">
          PUBLISH
        </button>
      </form>
      <br />
      <button type="submit" onClick={handleClickTest} className="default-button">
        Update entries
      </button>
    </div>
  )
}

export default CreateEntry