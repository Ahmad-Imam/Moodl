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
  async function signup(formData) {
    const { email, password, username } = formData;
    try {
      return createUserWithEmailAndPassword(auth, email, password).then(
        async (userCredential) => {
          const user = userCredential.user;
          const docRef = doc(db, "users", user.uid);
          await setDoc(docRef, {
            username,
            email,
            uid: user.uid,
            mood: {},
            streak: 0,
          });
        }
      );
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
        setLoading(true);
        setCurrentUser(user);
        if (!user) {
          setUserDataObj(null);
          setCurrentUser(null);
          return;
        }

        const docRef = doc(db, "users", user.uid);

        if (!docRef) {
          return;
        }
        const docSnap = await getDoc(docRef);

        let firebaseData = {};
        if (docSnap.exists()) {
          firebaseData = docSnap.data();
        } else {
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
