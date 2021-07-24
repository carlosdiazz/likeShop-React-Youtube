
import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCBFzFcE0BQeHWNnuSy5WVe8eNcxLbNyc0",
    authDomain: "likeshop-a7647.firebaseapp.com",
    projectId: "likeshop-a7647",
    storageBucket: "likeshop-a7647.appspot.com",
    messagingSenderId: "91323253763",
    appId: "1:91323253763:web:8f5075231bd6a5f6ea7a36"
  };
  // Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;