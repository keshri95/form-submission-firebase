import { initializeApp } from "firebase/app";

import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";

import { getDoc, doc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBv34Li8IpU2TwjIwg0utSIeEqld49Vt-c",
  authDomain: "form-submission-f827e.firebaseapp.com",
  projectId: "form-submission-f827e",
  storageBucket: "form-submission-f827e.appspot.com",
  messagingSenderId: "701569679109",
  appId: "1:701569679109:web:1c01f6bba8037beb74c16c",
};

const app = initializeApp(firebaseConfig);

//  GOOGLE PROVIDER===========
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

// AUTHENTICATION=========

export const auth = getAuth();

// GOOGLE POPUP

export const googlePopUp = () => signInWithPopup(auth, googleProvider);

// REDIRECT = ============

// export const loginRedirect = () => signInWithRedirect(auth, provider);

// FIRESTORE ===========

export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    console.log(userAuth);
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("Error", error.message);
    }
  }


  return userDocRef;
};


