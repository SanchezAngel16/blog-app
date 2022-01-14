// import { initializeApp } from "firebase/app"; firebase v9
// import { getFirestore } from "firebase/firestore"; firebase v9
// import { getAuth } from "firebase/auth"; firebase v9

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDgztI5WDAl0z-Cdy5CiKVEtBVcYOZWKJw",
  authDomain: "linkedin-clone-478ea.firebaseapp.com",
  projectId: "linkedin-clone-478ea",
  storageBucket: "linkedin-clone-478ea.appspot.com",
  messagingSenderId: "270177501657",
  appId: "1:270177501657:web:ca95d0aa94b7d6ad5899c8",
};

// const firebaseApp = initializeApp(firebaseConfig); firebase v9
// const db = getFirestore(firebaseApp); firebase v9
// const auth = getAuth(firebaseApp); firebase v9

firebase.initializeApp(firebaseConfig);
firebase.firestore();
firebase.auth();

export default firebase;

// export { firebaseApp, db, auth };
