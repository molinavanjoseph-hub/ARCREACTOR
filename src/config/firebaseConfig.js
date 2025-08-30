// Import needed Firebase modules
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Your Firebase project configuration (from Firebase console)
const firebaseConfig = {
  apiKey: "AIzaSyDDkydustvwU-NsU94k_RVz7vdnHJRM-TE",
  authDomain: "ikaw-14a61.firebaseapp.com",
  projectId: "ikaw-14a61",
  storageBucket: "ikaw-14a61.firebasestorage.app",
  messagingSenderId: "479251023081",
  appId: "1:479251023081:web:0b6d51ca55dfeb1dac9c78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Export Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
