import { useState, useEffect } from "react"
import '../styles/EntriesList.css'
import { db } from "../firebase"
import { collection, getDocs, doc, deleteDoc, query, orderBy } from 'firebase/firestore'
import ReactMarkdown from 'react-markdown';

const EntriesList = () => {

  const [entries, setEntries] = useState([])
  
  const deleteEntry = async (id) => {
    try {
      const entryDoc = doc(db, "entries", id)
      await deleteDoc(entryDoc)
      console.log(`entrada ${id} ha sido eliminada`)
      alert(`entrada identificada con el id:${id} ha sido eliminada`)
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    const entriesCollectionRef = collection(db, "entries")
    const getEntries = async () => {
      const q = query(entriesCollectionRef, orderBy("createdAt", "desc"));
      const data = await getDocs(q)
      setEntries(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    getEntries()
  }, [])

  return (
    <div className="entries">
      <h1 className="main-title">Entries</h1>
      { entries.map(({id, title, img, opening, editorContent, alt, author}) => {
          return (
            <div key={id} className="entry">
              <h1>Title: {title}</h1>
              <img className="entry-img" src={img} alt={alt} />
              <p>Opening: {opening}</p>
              <ReactMarkdown>{editorContent}</ReactMarkdown>
              {
                author ?
                  <p>Author: {author}</p>
                  :
                  <p>Author: Anónimo</p>
              }
              <button className="delete-button" onClick={() => {deleteEntry(id)}}>Delete</button>
            </div>
          ) 
        })
      } 
    </div>
  ) 
}

export default EntriesList