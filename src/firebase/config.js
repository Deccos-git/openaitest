import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAdHG-YEPLJa_boUJqX5BLO0RkU5Zo186k",
  authDomain: "openai-test-fe130.firebaseapp.com",
  projectId: "openai-test-fe130",
  storageBucket: "openai-test-fe130.appspot.com",
  messagingSenderId: "1035221787547",
  appId: "1:1035221787547:web:b4148d63289d13a18b773e"
};

firebase.initializeApp(config)

const auth = firebase.auth()
const db = firebase.firestore();
const bucket = firebase.storage();
const timestamp = firebase.firestore.Timestamp.fromDate(new Date())

export { auth, db, bucket, timestamp }