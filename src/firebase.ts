import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAIW8KuuapD_0kn8SH-emHjI0KkhAkrmvw",
    authDomain: "alocacao-wise.firebaseapp.com",
    databaseURL: "https://alocacao-wise.firebaseio.com",
    projectId: "alocacao-wise",
    storageBucket: "alocacao-wise.appspot.com",
    messagingSenderId: "568335804421",
    appId: "1:568335804421:web:2704216c6987a8f1cad46c",
    measurementId: "G-E739TWKCFE"
  };

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();

export default firebase;