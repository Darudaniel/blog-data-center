// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, getDocs } from 'firebase/firestore/lite';
import { collection, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithRedirect, signInWithPopup, getRedirectResult } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const analytics = getAnalytics(app);
console.log(typeof(analytics))

// AUTHENTICATION
const auth = getAuth();
const email = "danielelperro@gmail.com"
const password = "123456789"

// Create user
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log(user + 'se ha registrado.')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode)
    console.log(errorMessage)
    // ..
  });

// Read existent user
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log(user + 'es un usuario existente')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode)
    console.log(errorMessage)
  });

// Observer
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log(uid + '<--- wtf is this?')
    // ...
  } else {
    // User is signed out
    console.log('user is signed out')
    // ...
  }
});

// Provider
const provider = new GoogleAuthProvider();

// Using provider to log in in google with pop up
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
    console.log(user + " token is " + token)
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    console.log(errorCode + email + credential)
    console.log(errorMessage)
  });

// Using provider to log in in google with redirect method
signInWithRedirect(auth, provider);

// Get 0Auth token to use google APIs
getRedirectResult(auth)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    console.log(token)

    // The signed-in user info.
    const user = result.user;
    console.log(user)
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    console.log(errorCode)
    console.log(errorMessage)
    console.log(email)
    console.log(credential)
  });



//Get blog entries
async function getEntries (db) {
  const entriesCollection = collection(db, 'entries');
  const entrySnapshot = await getDocs(entriesCollection);
  const entryList = entrySnapshot.docs.map(doc => doc.data());
  return entryList
}

//Post blog entries
async function postEntry(db) {
  try {
    const docRef = await addDoc(collection(db, "entries"), {
      title: "titulico",
      content: "conadsflkajsdfadksjfhasd"
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

//METODOS CREADOS POR MI PARA EXPORTAR
function getMyEntries() {
  const entries = getEntries(db)
  return entries
}

function addEntry() {
  try {
    postEntry(db)
    console.log('la entrada fue publicada con exito')
  } catch {
    console.log('la entrada no pudo ser publicada')
  }
}


export default firebaseConfig