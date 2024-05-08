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

import {getDatabase, ref, set, child, get} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const db = getDatabase(app);

let code1 = document.getElementById("code1");
let code2 = document.getElementById("code2");
let name = document.getElementById("name");
let quantity = document.getElementById("quantity");
let er1 = document.getElementById("er1");
let er2 = document.getElementById("er2");
let er3 = document.getElementById("er3");
let list = document.querySelector(".list-group")
let into1 = document.getElementById("into1");
let into2 = document.getElementById("into2");
let updateButton = document.getElementById("update");
let deleteButton = document.getElementById("delete");


into1.addEventListener("click", () => {
    event.preventDefault();
    const dbRef = ref(getDatabase());
    get(child(dbRef, `Products/${code1.value}`)).then((snapshot) => {
        if (snapshot.exists()) {
            er1.textContent = "Product Code Toks id jau egzistuoja";
            code1.value = name.value = quantity.value = "";
        } else {
            if (code1.value === "" || name.value === "" || quantity.value === ""){
        if (code1.value === ""){
            er1.textContent = "Product Code neuzpildytas laukas";
        }
        if (name.value === ""){
            er2.textContent = "Product Name neuzpildytas laukas";
        }
        if (quantity.value === ""){
            er3.textContent = "Product Quantity neuzpildytas laukas";
        }
    } else {
        event.preventDefault()
        console.log(code1.value);
        console.log(name.value);
        console.log(quantity.value);
        writeUserData(code1.value, name.value, quantity.value);
        code1.value = name.value = quantity.value = "";
        er1.textContent = "Product Code";
        er2.textContent = "Product Came";
        er3.textContent = "Product Quantity";
    }
    
        }
    })
    
});

function writeUserData(code1, name, quantity) {
    event.preventDefault();
    set(ref(db, 'Products/' + code1), {
        id: code1,
        name: name,
        quantity: quantity
    });
}

function updateUserData(code1) {
    event.preventDefault();
    const dbRef = ref(getDatabase());
    get(child(dbRef, `Products/${code1.value}`)).then((snapshot) => {
        if (snapshot.exists()) {
            let product = snapshot.val();
            let nameDb = name.value;
            let quantityDb = quantity.value;
            const code = code1.value
            if (nameDb === ""){
                nameDb = product.name;
            }
            if (quantityDb === ""){
                quantityDb = product.quantity;
            }
            writeUserData(code, nameDb, quantityDb);
            code1.value = name.value = quantity.value = "";
        } else {
            console.log("No data available");
        }
        
    });
}

into2.addEventListener("click", (e) => {
    e.preventDefault();
    if (code2.value != ""){
        const dbRef = ref(getDatabase());
        get(child(dbRef, `Products/${code2.value}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            let text1 = snapshot.val().quantity;
            let text2 = snapshot.val().name;
            let productName = document.createElement("li");
            let productQuantity = document.createElement("li");
            list.appendChild(productQuantity).innerHTML =  `Produkto pavadinimas: ${text2}`;
            list.appendChild(productName).innerHTML = `Produkto kiekis: ${text1}`;
            productName.classList = "list-group-item pName";
            productQuantity.classList = "list-group-item fw-bold list-group-item-secondary pQuantity";
        } else {
            console.log("No data available");
        }
});
    
    code2.value = "";
    }
    
});

updateButton.addEventListener("click", () => {
    event.preventDefault();
    const dbRef = ref(getDatabase());
    updateUserData(code1);
})

deleteButton.addEventListener("click", () => {
    event.preventDefault();
    const dbRef = ref(getDatabase());
    get(child(dbRef, `Products/${code1.value}`)).then((snapshot) => {
        if (snapshot.exists()) {
            let user = snapshot.val();
            console.log(user);
            set(ref(db, 'Products/' + code1.value), {
            });
        }
    code1.value = name.value = quantity.value = "";
    })
})
