"use client";

import { AuthContext } from "@/context/AuthContext";

import { auth, db } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDataObj, setUserDataObj] = useState(null);
  const [loading, setLoading] = useState(true);

  // AUTH HANDLERS
  function signup(email, password) {
    try {
      return createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error in signup:", error.code, error.message);
      throw error;
    }
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    setUserDataObj(null);
    setCurrentUser(null);
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        // Set the user to our local context state
        console.log("Checking User");
        console.log(user);
        setLoading(true);
        setCurrentUser(user);
        if (!user) {
          console.log("No User Found");

          return;
        }

        // if user exists, fetch data from firestore database
        console.log("Fetching User Data");
        const docRef = doc(db, "users", user.uid);

        if (!docRef) {
          console.log("No Document Reference Found");
          return;
        }
        const docSnap = await getDoc(docRef);
        console.log("docRef in prov");
        console.log(docSnap);
        let firebaseData = {};
        if (docSnap.exists()) {
          console.log("Found User Data");
          firebaseData = docSnap.data();
          console.log(firebaseData);
        } else {
          // if no data exists, create a new document
          console.log("No User Data Found");
          await setDoc(docRef, {});
        }
        setUserDataObj(firebaseData);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userDataObj,
    setUserDataObj,
    signup,
    logout,
    login,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
