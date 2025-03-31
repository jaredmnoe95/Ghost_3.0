import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "Your_API_Key",
    authDomain: "your-app-id.firebaseapp.com",
    databaseURL: "https://your-app-id-default-rtdb.firebaseio.com",
    projectId: "your-app-id",
    storageBucket: "your-app-id.appspot.com",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Variables
let failCount = 0;

// Save Code Name
function saveCodeName() {
    const codeName = document.getElementById('codeName').value;
    if (!codeName) return alert("Please set your code name.");

    localStorage.setItem("ghostName", codeName);
    document.getElementById('setup').style.display = "none";
    document.getElementById('pinScreen').style.display = "block";
}

// Save PIN
function savePIN() {
    const pin = document.getElementById('setPIN').value;
    if (pin.length !== 4) return alert("Please set a 4-digit PIN.");

    localStorage.setItem("ghostPIN", pin);
    document.getElementById('pinScreen').style.display = "none";
    openApp();
}

// Open the app UI after setting up
function openApp() {
    document.getElementById('appUI').style.display = "block";
    document.getElementById('userTag').innerText = `Welcome, ${localStorage.getItem("ghostName")}`;
}

// Switch between different tabs
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        if (tab.id === tabName) {
            tab.style.display = "block";
        } else {
            tab.style.display = "none";
        }
    });
}

// Send Message
function sendMessage() {
    const sender = localStorage.getItem("ghostName");
    const receiver = document.getElementById('toUser').value;
    const message = document.getElementById('messageBox').value;
    const timestamp = new Date().toISOString();

    if (!receiver || !message) return alert("Fill out all fields");

    const msgRef = ref(db, "messages/");
    push(msgRef, { sender, receiver, message, timestamp });

    document.getElementById('messageBox').value = "";
}

// Nuke Function (clear all messages or reset app)
function nuclearPurge() {
    if (confirm("Are you sure you want to reset everything?")) {
        localStorage.clear();
        location.reload();
    }
}
