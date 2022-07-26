import { useState, useEffect } from "react"
import '../styles/EntriesList.css'
import { db } from "../firebase"
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'

const EntriesList = () => {

  const [entries, setEntries] = useState([])
  const entriesCollectionRef = collection(db, "entries")

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
    const getEntries = async () => {
      const data = await getDocs(entriesCollectionRef)
      setEntries(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    getEntries()
  }, [])

  return (
    <div className="entries">
      <h1>Entries</h1>
      { entries.map((entry) => {
        return (
          <div key={entry.id} className="entry">
            <h1>Title: {entry.title}</h1>
            <img className="entry-img" src={entry.img} alt="imagen relacionada con el articulo" />
            <p>Opening: {entry.opening}</p>
            <h2>First Sub Header: {entry.firstSubHeader}</h2>
            <p>First Content: {entry.firstContent}</p>
            <h2>Second Sub Header: {entry.secondSubHeader}</h2>
            <p>Second Content: {entry.secondContent}</p>
            <p>Author: {entry.author}</p>
            <button className="delete-button" onClick={() => {deleteEntry(entry.id)}}>Delete</button>
          </div>
        ) 
      })} 
    </div>
  ) 
}

export default EntriesList