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
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
        getUserDetails(user, setUserDetails);
      }
      setCurrentUser(user);
      console.log(user);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (currentUser) {
      onSnapshot(doc(db, "users", currentUser?.uid), (doc) => {
        console.log("Current data: ", doc.data());
        setUserDetails(doc.data());
      });

      return;
    }
  }, [currentUser]);

  useEffect(() => {
    if (userDetails?.email) {
      onSnapshot(doc(db, "unclaimedfunds", userDetails?.email), (d) => {
        let c = doc(db, "users", currentUser.uid);
        if (d.data() !== undefined) {
          let b = d.data();
          reclaimFundsEmail(
            c,
            userDetails.email,
            userDetails.username,

            b
          );
        }
      });

      onSnapshot(doc(db, "unclaimedfunds", userDetails?.username), (d) => {
        let c = doc(db, "users", currentUser.uid);
        if (d.data() !== undefined) {
          reclaimFundsUserName(
            c,
            userDetails.email,
            userDetails.username,

            d.data()
          );
        }
      });

      return;
    }
  }, [userDetails?.email]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
