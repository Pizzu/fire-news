import firebase from 'firebase/compat/app'
import { getApps } from 'firebase/app'
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
    // getAnalytics(app)
}

export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
export const firestore = firebase.firestore()
export const storage = firebase.storage()
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp
export const increment = firebase.firestore.FieldValue.increment

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */

export async function getUserWithUsername(username) {
    const usersRef = firestore.collection('users')
    const query = usersRef.where('username', '==', username).limit(1)
    const userDoc = (await query.get()).docs[0]
    return userDoc
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */

 export function postToJSON(doc) {
     const postData = doc.data()
     return {
         ...postData,
         createdAt: postData?.createdAt.toMillis() || 0,
         updatedAt: postData?.updatedAt.toMillis() || 0,
     } 
 }