import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  updateDoc,
  arrayUnion,
  Timestamp,
  where,
  onSnapshot,
  deleteDoc,
  FieldValue,
  Firestore,
  increment,
} from "firebase/firestore";
import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyDLqF47sS8H9DPomhwYlu693OOAgP8VhuM",
  authDomain: "crwn-clothing-db-fd5d6.firebaseapp.com",
  projectId: "crwn-clothing-db-fd5d6",
  storageBucket: "crwn-clothing-db-fd5d6.appspot.com",
  messagingSenderId: "975106281194",
  appId: "1:975106281194:web:3a6515bb811dfe94469193",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const db = getFirestore();

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

// create user details
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {},
  username
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  console.log(additionalInformation, "user created");

  if (!userSnapshot.exists()) {
    const { email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        email,
        createdAt,
        ...additionalInformation,
        balance: 0,
        transactions: [],
        uid: userAuth.uid,
      });

      // chech if user has unclaimed funds
      const unclaimedEmailDocRef = doc(db, "unclaimedfunds", email);
      const unclaimedUsernameDocRef = doc(db, "unclaimedfunds", username);

      const emailSnapshot = await getDoc(unclaimedEmailDocRef);
      const usernameSnapshot = await getDoc(unclaimedUsernameDocRef);

      let balance = 0;
      let transactions = [];

      if (emailSnapshot?.exists()) {
        balance = balance + emailSnapshot.data()?.balance || 0;
        transactions = [
          ...transactions,
          ...(emailSnapshot.data()?.transactions || []),
        ];

        await deleteDoc(doc(db, "unclaimedfunds", email));
      }

      if (usernameSnapshot?.exists()) {
        balance = balance + usernameSnapshot.data()?.balance || 0;
        transactions = [
          ...transactions,
          ...(usernameSnapshot.data()?.transactions || []),
        ];

        await deleteDoc(doc(db, "unclaimedfunds", username));
      }

      await updateDoc(userDocRef, {
        balance: balance,
        transactions: transactions,
      });

      
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

// get user details

export const getUserDetails = async (userAuth, setUserdata) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    console.log(userSnapshot.data());
    setUserdata(userSnapshot.data());
  }

  return userDocRef;
};

export const fundAccount = async (
  userAuth,
  setUserdata,
  amount,
  setloading,
  defaultValue,
  setFormField
) => {
  setloading("loading");
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  if (Number(amount) < 0 || Number(amount) == 0) {
    alert("Pelase input a valid amount");
    setloading("loaded");
    return;
  }

  try {
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      await updateDoc(userDocRef, {
        balance: Number(amount) + (userSnapshot.data()?.balance || 0),
        transactions: arrayUnion({
          date: new Date(),
          name: userSnapshot.data()?.username,
          amount: Number(amount),
        }),
      });
    }

    alert("Wallet Funded Sucessfully");
  } catch (err) {
    console.log(err);
  }
  setFormField(defaultValue);

  setloading("loaded");
};

const checkIfEmail = (addressToSend) =>
  addressToSend.split("").includes("@")
    ? where("email", "==", addressToSend)
    : where("username", "==", addressToSend);

const isEmail = (addressToSend) => addressToSend.split("").includes("@");

export const internalTransfer = async (
  userAuth,
  setUserdata,
  addressToSend,
  amount,
  setloading,
  defaultValue,
  setFormField
) => {
  setloading("loading");
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  if (Number(amount) < 0 || Number(amount) == 0) {
    alert("Pelase input a valid amount");
    setloading("loaded");
    return;
  }

  try {
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      // check if user has that amount in their wallet
      if (userSnapshot.data()?.balance < Number(amount)) {
        alert("Insufficient funds to make this transfer");
        setloading("loaded");
        return;
      }

      // sender
      await updateDoc(userDocRef, {
        balance: (userSnapshot.data()?.balance || 0) - Number(amount),
        transactions: arrayUnion({
          date: new Date(),
          name: addressToSend,
          amount: -Number(amount),
        }),
      });

      // check if user is in database
      const userToTransferToRef = doc(db, "unclaimedfunds", addressToSend);

      const userToTransferToSnapshot = await getDoc(userToTransferToRef);

      if (userToTransferToSnapshot.exists()) {
        alert(
          "If user does not have an account, Tell user to open an account with this email or username to access the funds"
        );
        // receiver
        await updateDoc(userToTransferToRef, {
          balance:
            (userToTransferToSnapshot.data()?.balance || 0) + Number(amount),
          transactions: arrayUnion({
            date: new Date(),
            name: userSnapshot.data()?.username,
            amount: Number(amount),
          }),
        });
      } else {
        // create a user with that email and balance
        await setDoc(userToTransferToRef, {
          balance: Number(amount),
          transactions: [
            {
              date: new Date(),
              name: userSnapshot.data()?.username,
              amount: Number(amount),
            },
          ],
        });
      }

      alert("Transfer Sucessful");

      // setUserdata();
    }
  } catch (err) {
    console.log(err);
  }

  setFormField(defaultValue);

  setloading("loaded");

  // confirm user has that amount in their wallet
  // check if user has an account if not still permit the transfer but after telling user
};

export const transferToChimoney = async (
  userAuth,
  setUserdata,
  addressToSend,
  amount,
  setloading,
  defaultValue,
  setFormField
) => {
  setloading("loading");
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  if (Number(amount) < 0 || Number(amount) == 0) {
    alert("Pelase input a valid amount");
    setloading("loaded");
    return;
  }

  try {
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      // check if user has that amount in their wallet
      if (userSnapshot.data()?.balance < Number(amount)) {
        alert("Insufficient funds to make this transfer");
        setloading("loaded");
        return;
      }

      if (
        window.confirm(
          `You are about to transfer to a chimoney account, please confirm the email: ${addressToSend}?`
        )
      ) {
        // sender
        await updateDoc(userDocRef, {
          balance: (userSnapshot.data()?.balance || 0) - Number(amount),
          transactions: arrayUnion({
            date: new Date(),
            name: `${addressToSend}-chimoney`,
            amount: -Number(amount),
          }),
        });

        const headers = {
          "Access-Control-Allow-Origin": "*",
        };

        // do transfer to chimoney account
        const res = await axios.post(
          `https://chimoney-fullstack-developer-challenge-22vw.vercel.app/chimoney_transfer`,
          {
            chimoneys: [
              {
                email: addressToSend,
                twitter: "",
                valueInUSD: Number(amount),
                phone: "",
              },
            ],
          },
          { headers }
        );

        console.log(res, "res");

        alert("Transfer Sucessful");
      }

      // setUserdata();
    }
  } catch (err) {
    console.log(err);
  }

  setFormField(defaultValue);

  setloading("loaded");
};

export const reclaimFundsEmail = async (
  userDocRef,
  email,
  username,

  emailData
) => {
  // chech if user has unclaimed funds

  await updateDoc(userDocRef, {
    balance: increment(emailData?.balance || 0),
    transactions: arrayUnion(...(emailData?.transactions || [])),
  });

  await deleteDoc(doc(db, "unclaimedfunds", email));
};

export const reclaimFundsUserName = async (
  userDocRef,
  email,
  username,
  usernameData
) => {
  // chech if user has unclaimed funds

  await updateDoc(userDocRef, {
    balance: increment(usernameData?.balance || 0),
    transactions: arrayUnion(...(usernameData?.transactions || [])),
  });

  await deleteDoc(doc(db, "unclaimedfunds", username));
};
