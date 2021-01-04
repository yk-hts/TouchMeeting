import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjfC0p9KRNW5LID2d5zKdC6leo5oPv5aE",
  authDomain: "touch-meeting.firebaseapp.com",
  projectId: "touch-meeting",
  storageBucket: "touch-meeting.appspot.com",
  messagingSenderId: "920543121544",
  appId: "1:920543121544:web:f2d6f9e0c90e2d49fb8f3d",
  measurementId: "G-39D36QEMY9",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
