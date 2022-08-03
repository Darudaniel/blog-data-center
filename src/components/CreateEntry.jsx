import '../styles/CreateEntry.css'
import { useState } from 'react'
import { initializeApp } from 'firebase/app';
import { collection, addDoc, getFirestore, getDocs  } from "firebase/firestore";
import firebaseConfig from '../firebase/firebaseConfig'

const CreateEntry = () => {

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)

  const [title, setTitle] = useState("")
  const [img, setImg] = useState("")
  const [opening, setOpening] = useState("")
  const [firstSubHeader, setFirstSubHeader] = useState("")
  const [firstContent, setFirstContent ] = useState("")
  const [secondSubHeader, setSecondSubHeader] = useState("")
  const [secondContent, setSecondContent] =useState("")

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

    const getRandomInt = (max) => {
      const number = Math.floor(Math.random() * max);
      const string = number.toString()
      return string
    }
    
    const entryId = getRandomInt(1000000)

    const formData = {
      title,
      img,
      opening,
      firstSubHeader,
      firstContent,
      secondSubHeader,
      secondContent,
      entryId
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

  const handleChangeImg = (e) => {
    setImg(e.target.value)
  }

  const handleChangeOpening = (e) => {
    setOpening(e.target.value)
  }

  const handleChangeFirstSubHeader = (e) => {
    setFirstSubHeader(e.target.value)
  }

  const handleChangeFirstContent = (e) => {
    setFirstContent(e.target.value)
  }

  const handleChangeSecondSubHeader = (e) => {
    setSecondSubHeader(e.target.value)
  }

  const handleChangeSecondContent = (e) => {
    setSecondContent(e.target.value)
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

        <label htmlFor="imgLink">
          Img Link
        </label>
        <br />
        <input
          id="imgLink"
          type="link" 
          name="imgLink"
          onChange={handleChangeImg}
        />
        <br />

        <label htmlFor="opening">
          Opening
        </label>
        <br />
        <input
          id="opening"
          type="opening" 
          name="opening"
          onChange={handleChangeOpening}
        />
        <br />

        <label htmlFor="firstSubHeader">
          First Sub Header
        </label>
        <br />
        <input
          id="firstSubHeader"
          type="subHeader" 
          name="firstSubHeader"
          onChange={handleChangeFirstSubHeader}
        />
        <br />

        <label htmlFor="firstContent">
          First Content
        </label>
        <br />
        <input
          id="firstContent"
          type="content" 
          name="firstContent"
          onChange={handleChangeFirstContent}
        />
        <br />

        <label htmlFor="secondSubHeader">
          Second Sub Header
        </label>
        <br />
        <input
          id="secondSubHeader"
          type="subHeader" 
          name="secondSubHeader"
          onChange={handleChangeSecondSubHeader}
        />
        <br />

        <label htmlFor="secondContent">
          Second Content
        </label>
        <br />
        <input
          id="secondContent"
          type="content" 
          name="secondContent"
          onChange={handleChangeSecondContent}
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