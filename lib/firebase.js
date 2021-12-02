import firebase from 'firebase/compat/app'
import { getApps } from 'firebase/app'
import { getAnalytics } from 'firebase/compat/analytics'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyC9_MfD2XWYfb8GIzeXPGu7fOKjC290ThM",
    authDomain: "fire-news-2e25d.firebaseapp.com",
    projectId: "fire-news-2e25d",
    storageBucket: "fire-news-2e25d.appspot.com",
    messagingSenderId: "999381264706",
    appId: "1:999381264706:web:9f46237378e03e48af00db",
    measurementId: "G-494L6N1RXJ"
};
  
// Initialize Firebase
if(getApps().length < 1) {
    const app = firebase.initializeApp(firebaseConfig);
    getAnalytics(app)
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const storage = firebase.storage()