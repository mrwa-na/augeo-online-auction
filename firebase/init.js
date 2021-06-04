import firebase from 'firebase'
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyAsSal1vimfe70FpxclvWo8Pl51QmBniPw",
    databaseURL:"https://online-auction-system-d31a4-default-rtdb.firebaseio.com/",
    authDomain: "online-auction-system-d31a4.firebaseapp.com",
    projectId: "online-auction-system-d31a4",
    storageBucket: "online-auction-system-d31a4.appspot.com",
    messagingSenderId: "94917732167",
    appId: "1:94917732167:web:50744f2026b65eb44b4e62"
};

try {
    firebase.initializeApp(config);
  } catch(err){
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack)}
  }


export const db = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
