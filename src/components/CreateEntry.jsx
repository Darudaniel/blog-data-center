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
  const [author, setAuthor] = useState("")

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
      author,
      entryId
    }
    try {
      const docRef = await addDoc(collection(db, "entries"), formData);
      console.log("Document written with ID: ", docRef.id);
      alert('Entrada publicada con exito')
    } catch (e) {
      console.error("Error adding document: ", e);
      alert('Ha ocurrido un error en la publicacion de la entrada. Revisa tu conexion a internet.')
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

  const handleChangeAuthor = (e) => {
    setAuthor(e.target.value)
  }

  return(
    <div clasName="CreateEntry-container">
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

        <label htmlFor="firstSubHeader">
          First Sub Header
        </label>
        <br />
        <input
          id="firstSubHeader"
          type="subHeader" 
          name="firstSubHeader"
          onChange={handleChangeFirstSubHeader}
          className="short-input inputs"
        />
        <br />

        <label htmlFor="firstContent">
          First Content
        </label>
        <br />
        <textarea
          id="firstContent"
          type="text" 
          name="firstContent"
          onChange={handleChangeFirstContent}
          className='long-input inputs'
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
          className="short-input inputs"
        />
        <br />

        <label htmlFor="secondContent">
          Second Content
        </label>
        <br />
        <textarea
          id="secondContent"
          type="text" 
          name="secondContent"
          onChange={handleChangeSecondContent}
          className='long-input inputs'
        />
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
        <br />

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