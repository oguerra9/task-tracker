 // Import the functions you need from the SDKs you need
 import { initializeApp } from "firebase/app";
 import { getFirestore } from "firebase/firestore";

 const firebaseConfig = {
    apiKey: "AIzaSyDc4nGwqG7tdW-lwTiQ5QkMPuXtP-vWz4s",
    authDomain: "task-tracker-390316.firebaseapp.com",
    projectId: "task-tracker-390316",
    storageBucket: "task-tracker-390316.appspot.com",
    messagingSenderId: "292863644057",
    appId: "1:292863644057:web:7beafc10726ad228818308"
  };
 
 const app = initializeApp(firebaseConfig);

 export const db = getFirestore(app);