 // Import the functions you need from the SDKs you need
 import { initializeApp } from "firebase/app";
 import { getFirestore } from "firebase/firestore";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries
 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyDc4nGwqG7tdW-lwTiQ5QkMPuXtP-vWz4s",
    authDomain: "task-tracker-390316.firebaseapp.com",
    projectId: "task-tracker-390316",
    storageBucket: "task-tracker-390316.appspot.com",
    messagingSenderId: "292863644057",
    appId: "1:292863644057:web:7beafc10726ad228818308"
  };
 // Initialize Firebase
 
 const app = initializeApp(firebaseConfig);
 // Export firestore database
 // It will be imported into your react app whenever it is needed
 export const db = getFirestore(app);