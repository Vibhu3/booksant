import firebase from 'firebase';
require('@firebase/firestore')
var firebaseConfig = {
    apiKey: "AIzaSyCUjobITKKd5CTtYvyBvdvMsr-Xx-qhOTQ",
    authDomain: "book-santa-633b3.firebaseapp.com",
    projectId: "book-santa-633b3",
    storageBucket: "book-santa-633b3.appspot.com",
    messagingSenderId: "856011147636",
    appId: "1:856011147636:web:fe496335fb01eefe7b8421"
  };
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore()