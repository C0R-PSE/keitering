// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD7QrnoeqL3Mem0kqxRtWqSUEcAb3Lip0Y",
    authDomain: "myapp-bb443.firebaseapp.com",
    projectId: "myapp-bb443",
    storageBucket: "myapp-bb443.firebasestorage.app",
    messagingSenderId: "248205536207",
    appId: "1:248205536207:web:07a6b515eaae327e5540ba",
    measurementId: "G-E21PST2VB0"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app, 'https://myapp-bb443-default-rtdb.europe-west1.firebasedatabase.app')
var data
data = {
    "hookahs": [
        {
          "description": "Описание punk li",
          "name": "punk li",
          "photos": ["../images/hookahs/punk li/photo_2024-08-25_17-38-45.jpg"],
          "preview": 0
        },
        {
          "description": "Описание seven star",
          "name": "seven star",
          "photos": ["../images/hookahs/seven star/photo_2024-08-25_17-38-43.jpg"],
          "preview": 0
        },
        {
          "description": "Описание soft smoke",
          "name": "soft smoke",
          "photos": [],
          "preview": 0
        }
    ],
    "navbar": [
        {
          "name": "Наши кальяны",
          "tag": "hookahs"
        },
        {
          "name": "Табаки",
          "tag": "tobacco"
        },
        {
          "name": "Услуги и тарифы",
          "tag": "prices"
        },
        {
          "name": "Инструкции",
          "tag": "instructions"
        }
    ],
    "tobacco": [
        {
            "name": "name1",
            "flavour": "яблоко",
            "color": "#000000",
            "in_stock": true
        },
        {
            "name": "name2",
            "flavour": "яблоко",
            "color": "#ffffff",
            "in_stock": true
        },
        {
            "name": "name3",
            "flavour": "яблоко",
            "color": "#e7e7e7",
            "in_stock": true
        },
        {
            "name": "name4",
            "flavour": "яблоко",
            "color": "#f00",
            "in_stock": true
        },
        {
            "name": "name5",
            "flavour": "яблоко",
            "color": "ff0",
            "in_stock": true
        }
    ]
}
var DBdata
DBdata = await get(child(ref(db), 'data')).then((snapshot) => {
    if (snapshot.exists()) {
      return(snapshot.val())
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
set(ref(db, 'data'), data)

  console.log("data loaded")
export {data, DBdata}

