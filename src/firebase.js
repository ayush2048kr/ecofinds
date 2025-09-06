// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD23fi1OnSWqSm8KdBrAD0FJ84_RMftW30",
    authDomain: "ecofinds-89733.firebaseapp.com",
    projectId: "ecofinds-89733",
    storageBucket: "ecofinds-89733.firebasestorage.app",
    messagingSenderId: "997231509052",
    appId: "1:997231509052:web:9980f75870954d244e0d39",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
