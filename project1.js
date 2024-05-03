// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7UD7ZASLB8yLwLQS7G_Qyybe_HbhntlA",
  authDomain: "project1-9a622.firebaseapp.com",
  projectId: "project1-9a622",
  storageBucket: "project1-9a622.appspot.com",
  messagingSenderId: "276140792515",
  appId: "1:276140792515:web:09d2f4940c844c8a916076",
  databaseURL: "https://project1-9a622-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {getDatabase, ref, set} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const db = getDatabase(app);

let code1 = document.getElementById("code1");
let code2 = document.getElementById("code2");
let name = document.getElementById("name");
let quantity = document.getElementById("quantity");

let into1 = document.getElementById("into1");
let into2 = document.getElementById("into2");
let updateButton = document.getElementById("update");
let deleteButton = document.getElementById("delete");


into1.addEventListener("click", () => {
    event.preventDefault()
    console.log(code1.value);
    console.log(name.value);
    console.log(quantity.value);
    writeUserData(code1.value, name.value, quantity.value);
    code1.value = name.value = quantity.value = "";    
});

into2.addEventListener("click", () => {
    event.preventDefault();
    console.log(code2.value);
    code2.value = "";
});

function writeUserData(code1, name, quantity) {
    event.preventDefault();
    set(ref(db, 'Products/' + code1), {
        code: code1,
        username: name,
        quantity: quantity
    });
}