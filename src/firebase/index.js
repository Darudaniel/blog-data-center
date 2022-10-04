import firebaseConfig from "./firebaseConfig";
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

import { getFirestore } from '@firebase/firestore'

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const logout = async () => {
  await signOut(auth)
  localStorage.setItem("name", "No users")
  localStorage.setItem("email", undefined)
  console.log("Sesion cerrada")
}
const provider = new GoogleAuthProvider()

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result)=> {
      const name = result.user.displayName
      const email = result.user.email
      const profilePic = result.user.photoURL

      localStorage.setItem("name", name)
      localStorage.setItem("email", email)
      localStorage.setItem("profilePic", profilePic)
    })
    .catch((error) => {
      console.log(error)
    })
}