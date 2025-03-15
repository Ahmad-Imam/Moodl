"use server";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { redirect } from "next/navigation";

export async function createUser(formData) {
  const { email, password, username } = formData;
  try {
    return (
      createUserWithEmailAndPassword(auth, email, password)
        //add user to users collection
        .then(async (userCredential) => {
          const user = userCredential.user;
          const docRef = doc(db, "users", user.uid);
          await setDoc(docRef, {
            username,
            email,
            uid: user.uid,
          });
        })
    );
  } catch (error) {
    console.error("Error in signup:", error.code, error.message);
    throw error;
  }
}

export async function loginUser(formData) {
  const { email, password } = formData;
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    // Return a plain object with only the fields you need
  } catch (error) {
    console.error("Error in login:", error.code, error.message);
    throw error;
  }
}

export async function logoutUser() {
  return signOut(auth);
}
