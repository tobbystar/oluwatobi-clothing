import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBIjBeN0yU1qic1wrgkwDhJGJDDe7LBw6Y",
    authDomain: "oluwatobi-clothing-db.firebaseapp.com",
    projectId: "oluwatobi-clothing-db",
    storageBucket: "oluwatobi-clothing-db.appspot.com",
    messagingSenderId: "917803684717",
    appId: "1:917803684717:web:bbd8375d6ab39bb385c064"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);


    const userSnapshot = await  getDoc(userDocRef);


    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
                });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
};