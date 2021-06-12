import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

var config = {
    apiKey: "AIzaSyAXcrzHCD7dhhOAuCMZxnEvQ34qITkqL4w",
    authDomain: "techseminal-8d7e4.firebaseapp.com",
    databaseURL: "https://techseminal-8d7e4.firebaseio.com",
    projectId: "techseminal-8d7e4",
    storageBucket: "techseminal-8d7e4.appspot.com",
    messagingSenderId: "795116904397",
    appId: "1:795116904397:web:1b86e389ef598e8a646e84",
    measurementId: "G-MDN9BR089S"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const signOut = () => auth.signOut();

export default firebase;