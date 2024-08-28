import { initializeApp } from 'expo-firebase-app';
import 'expo-firebase-auth';

const firebaseConfig = {
  apiKey: "AIzaSyDAM-g5JXlVScNQ2RRT2VvXRH6-3LIhRNQ",
  authDomain: "bank-dbf6c.firebaseapp.com",
  projectId: "bank-dbf6c",
  storageBucket: "bank-dbf6c.appspot.com",
  messagingSenderId: "254560709106",
  appId: "1:254560709106:web:613cdf75dac2119cfca36b",
  measurementId: "G-RCFP014DJP",
  databaseURL: 'https://bank-dbf6c.firebaseio.com/',
};

if (!firebase.apps.length) {
  initializeApp(firebaseConfig);
}


export default firebase;