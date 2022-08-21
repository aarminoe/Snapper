// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQJAlhg_bQsV-WR0FGyDY20JhHz2JtAfE",
  authDomain: "image-upload-a0484.firebaseapp.com",
  projectId: "image-upload-a0484",
  storageBucket: "image-upload-a0484.appspot.com",
  messagingSenderId: "198080758804",
  appId: "1:198080758804:web:11b2664ef9c39be5e25301",
  measurementId: "G-K1BTL898Y6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)