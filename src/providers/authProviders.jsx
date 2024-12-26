import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,updateProfile,onAuthStateChanged,} from "firebase/auth";
  import { createContext, useEffect, useState } from "react";
  import { auth } from "../firebase/firebase.init";
  
  export const AuthContext = createContext(null);
  
  const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const createUser = async (email, password, name, photoURL) => {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name, photoURL });
      setUser(result.user); 
      setLoading(false);
      return result;
    };
    
  
    const loginUser = async (email, password) => {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user); 
      setLoading(false);
      return result;
    };
  
    const logOut = async () => {
      setLoading(true);
      await signOut(auth);
      setUser(null); 
      setLoading(false);
    };
  
 
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false); 
      });
      return () => unsubscribe();
    }, []);
  
    const userInfo = {
      user,
      loading,
      createUser,
      loginUser,
      logOut,
      updateProfile,
      setUser
    };
  
    return (
      <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
    );
  };
  
  export default AuthProvider;
  
