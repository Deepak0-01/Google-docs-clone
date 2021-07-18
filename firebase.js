import firebase  from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBh07xO-mfVGMhS_MDbk0ABj42TDpaR2Xo",
    authDomain: "docs-a2d9b.firebaseapp.com",
    projectId: "docs-a2d9b",
    storageBucket: "docs-a2d9b.appspot.com",
    messagingSenderId: "922596999225",
    appId: "1:922596999225:web:6ec213c10879a1620f8de8",
    measurementId: "G-7ZECYQL0SC"
  };

  const app = !firebase.apps.length?firebase.initializeApp(firebaseConfig):firebase.app();

  const db = app.firestore();

  export default db;