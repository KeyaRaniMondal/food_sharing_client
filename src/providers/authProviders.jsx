import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged, } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name, photoURL: photo
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      console.log('current user', currentUser);
      console.log('state captured', currentUser?.email)
      if (currentUser?.email) {
        const user = { email: currentUser.email }
        axios.post('https://food-sharing-server-hazel.vercel.app/jwt', user, { withCredentials: true })
          .then(res => console.log(res.data))
      }
      else {
        axios.post('https://food-sharing-server-hazel.vercel.app/logOut', {}, {
          withCredentials: true
        })
          .then(res => console.log('logout', res.data))
      }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    }
  }, [])


  const userInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    updateUserProfile,
    setUser
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

