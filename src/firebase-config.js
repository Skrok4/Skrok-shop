import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAKGFZ0_FADh3ZXMoLIFHNlLj8_edPxjGI",
    authDomain: "skrok-store.firebaseapp.com",
    projectId: "skrok-store",
    storageBucket: "skrok-store.appspot.com",
    messagingSenderId: "288972785915",
    appId: "1:288972785915:web:5a016f91b5fcb54d32485e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app;