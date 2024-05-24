import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  getUserDetails,
  db,
  reclaimFundsEmail,
  reclaimFundsUserName,
} from "../utils/firebase/firebase.utils";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
  userDetails: null,
  setUserDetails: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState({ email: "", username: "" });

  const value = { currentUser, setCurrentUser, userDetails, setUserDetails };

  useEffect(() => {
   
  }, []);



  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
