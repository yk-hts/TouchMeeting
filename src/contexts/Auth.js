import React, { useEffect, useState, createContext } from "react";
import { auth, db } from "../firebase";
import firebase from "firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const signup = async (email, password, history) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    }
  };

  const signin = async (email, password, history) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      db.collection("users").doc(auth.currentUser.uid).set({
        userid: auth.currentUser.uid,
      });
      history.push("/day");
    } catch (error) {
      alert(error);
    }
  };

  const signout = async (history) => {
    await auth
      .signout()
      .then(() => {
        console.log("sign out");
        history.push("/");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const signinwithgoogle = (history) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function () {
        console.log("SignIn Success");
        // history.push("/day");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, signin, signup, signout, signinwithgoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
};
