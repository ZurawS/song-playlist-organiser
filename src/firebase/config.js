import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyASmh8uBwVe4u3TO6UK_mci8is1Nrn5k14",
  authDomain: "song-playlist-organiser.firebaseapp.com",
  projectId: "song-playlist-organiser",
  storageBucket: "song-playlist-organiser.appspot.com",
  messagingSenderId: "757149468604",
  appId: "1:757149468604:web:7ae474c282f4c47e9fcdb9",
};

//init firebase
firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

//timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
