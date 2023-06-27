import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA6RHzPt6xij6Yxr_MWqGBU3wrEnyv6CG0",
  authDomain: "urpgcommunity.firebaseapp.com",
  databaseURL:
    "https://urpgcommunity-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "urpgcommunity",
  storageBucket: "urpgcommunity.appspot.com",
  messagingSenderId: "990593532181",
  appId: "1:990593532181:web:fda96396f8b992adfb691c",
  measurementId: "G-YG4VFF60SS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(app);

module.exports = {
  firebaseStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
};
