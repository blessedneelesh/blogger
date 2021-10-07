import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'


const app = firebase.initializeApp({
  apiKey: "AIzaSyCFDs561U5_yXovDVwMz1VzpJ9HyHKDYkM",
  authDomain: "fir-70c08.firebaseapp.com",
  projectId: "fir-70c08",
  storageBucket: "fir-70c08.appspot.com",
  messagingSenderId: "668367735555",
  appId: "1:668367735555:web:fd3df8ebf4685dcb543736"
});


export const auth=app.auth()
export const db = firebase.firestore();

export default firebase