import * as firebase from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";
import "firebase/firestore";
import config from './config';

firebase.initializeApp(config.firebase);
export const auth = getAuth();
const googleProvider = new GoogleAuthProvider()
googleProvider.addScope('email')
googleProvider.addScope('profile')
export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth,googleProvider);
}
export const logOut = async () => {
  await signOut(auth)
}
