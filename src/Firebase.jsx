// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, query, where, onSnapshot } from "@firebase/firestore"
import { useEffect, useState } from "react";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBjTrhrDGIAom-OWplREO9u9QitMnAbXtk",
  authDomain: "my-recipe-book-1f797.firebaseapp.com",
  databaseURL: "https://my-recipe-book-1f797-default-rtdb.firebaseio.com",
  projectId: "my-recipe-book-1f797",
  storageBucket: "my-recipe-book-1f797.appspot.com",
  messagingSenderId: "32554790199",
  appId: "1:32554790199:web:60b3ff4d8f659a63a67eb2",
  measurementId: "G-2N43Q9LXHV",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export function logout() {
  return signOut(auth);
}

export const googleProvider = new GoogleAuthProvider();

export const storage = getStorage(app);

export function login(email , password){
  return signInWithEmailAndPassword(auth, email ,password)
}

export const db = getFirestore(app) ;
export const colRef = collection(db,"recepis");
export const colRefPremium = collection(db,"premium");


export function useAuth() {
  const [ currentUser, setCurrentUser ] = useState();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])
  return currentUser;
}

export function CurrentUser() {
  const [ currentUser, setCurrentUser ] = useState();
  // const o = doc()
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])
  return currentUser;
}


export function UserRecipes(id, setData){
  const userRecipe = query(colRef ,where("id","==",`${id}`));
  let arr = [];
  onSnapshot(userRecipe,(f)=>{
    f.docs.forEach((e)=>{
      arr.push({...e.data(),docId: e.id });
    })
    setData(arr);
  })
}
export function chekPremium (userId ,setPremium){ 
  const userP = query(colRefPremium ,where("userId","==",`${userId}`));
  let arr = [];
  onSnapshot(userP,(f)=>{
    f.docs.forEach((e)=>{
      arr.push({...e.data(),docId: e.id });
    })
    setPremium(arr[0]);
  })
}



