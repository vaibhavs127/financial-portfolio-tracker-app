import React from 'react';
import * as firebase from 'firebase'; 


var firebaseConfig = {
  apiKey: "AIzaSyC_91vvBwB0NprMSck-b0ga08hLUzBI_mM",
  authDomain: "fin-portfolio-acc46.firebaseapp.com",
  databaseURL: "https://fin-portfolio-acc46.firebaseio.com",
  projectId: "fin-portfolio-acc46",
  storageBucket: "fin-portfolio-acc46.appspot.com",
  messagingSenderId: "10848047995",
  appId: "1:10848047995:web:91e9538f8245919416a3de",
  measurementId: "G-EW032BLE14",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

 
  export default firebase;
  