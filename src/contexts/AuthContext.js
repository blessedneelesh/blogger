import React, { useContext, useEffect, useState } from "react";
import {  useHistory } from "react-router";
import { Route, Redirect } from 'react-router-dom';

import { auth, db } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  console.log(currentUser,'currentUser')
  const [activeUser,setActiveUser]=useState()
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const history=useHistory()

  function signUp(email, password,name) {
      return auth.createUserWithEmailAndPassword(email,password).then((userCredential)=>{
         db.collection('users').doc(userCredential.user.uid).set({name:name}).then(() => {
          console.log("Document successfully written!");

      })
      .catch((error) => {
          console.error("Error writing document: ", error);
      });

      }).catch((error) => {
    var errorCode = error.code;
    // var errorMessage = error.message;
    console.log(errorCode,'error')
    // ..
  });
  }

  const login = (email, password) => {
    // localStorage.setItem("loginTime", Date.now());
    return auth.signInWithEmailAndPassword(email, password).then((userCredential) => {

        var user = userCredential.user;
        console.log(user,'user signed in')  
 

      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode,'erro')
      });
  };

  const logout = () => {
    // localStorage.removeItem("loginTime");
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currUser) => {
      if (currUser) {
        auth.currentUser.getIdTokenResult().then((user) => {
          setCurrentUser(user);

          db.collection("users").doc(user.claims.user_id)
          .onSnapshot((doc) => {
              console.log("Current data: ", doc.data());
              setActiveUser(doc.data())
              
          });
          setIsAuthLoading(false);
          console.log(user,'user from context')


        });
      } else {
        setCurrentUser("");
        setIsAuthLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    activeUser,
    signUp,
    login,
    logout,
  };

  return (
    <div>
      <AuthContext.Provider value={value}>
        {!isAuthLoading && children}
      </AuthContext.Provider>
    </div>
  );
}
