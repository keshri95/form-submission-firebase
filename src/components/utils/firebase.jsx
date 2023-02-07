import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import { getDoc, doc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBv34Li8IpU2TwjIwg0utSIeEqld49Vt-c",
  authDomain: "form-submission-f827e.firebaseapp.com",
  projectId: "form-submission-f827e",
  storageBucket: "form-submission-f827e.appspot.com",
  messagingSenderId: "701569679109",
  appId: "1:701569679109:web:1c01f6bba8037beb74c16c",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});


// AUTHENTICATION

export const auth = getAuth();


// GOOGLE POPUP
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);


  // REDIRECT

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);



  // FIRESTORE

export const db = getFirestore();



// CREATE DB
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};



// AUTH EMAIL+PASSWORD

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

