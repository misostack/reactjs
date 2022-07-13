import { onValue, ref } from "firebase/database";
import {
  getAuth,
  onAuthStateChanged,
  signInWithCustomToken,
} from "firebase/auth";
import { useEffect, useState } from "react";
import "./App.scss";

import firebaseService from "./services/firebase-service";
import { useMemo } from "react";

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const getFirebaseToken = () => {
  return postData("http://localhost:1337/login");
};

const { app, db } = firebaseService.getInstance();
const auth = getAuth(app);

function App() {
  const [notifications, setNotifications] = useState([]);
  const doLogin = async () => {
    const res = await getFirebaseToken();
    console.log(auth);
    console.log(app);
    signInWithCustomToken(auth, res.customToken)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const subcribeOnNotification = () => {
    const userId = 1;
    const dbRef = ref(db, "/notifications/" + userId);
    onValue(
      dbRef,
      (snapshot) => {
        if (snapshot.val()) {
          setNotifications([...notifications, ...snapshot.val()]);
        }
      },
      {
        onlyOnce: false,
      }
    );
  };
  // init
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user", user);
      if (user) {
        subcribeOnNotification();
      }
    });
  }, []);

  return (
    <>
      <h1>Firebase Realtime Database Notififcation Sample</h1>
      <ul>
        {notifications.map((n) => (
          <li key={n.notificationId}>{JSON.stringify(n)}</li>
        ))}
      </ul>
      <button onClick={() => doLogin()}>Login</button>
    </>
  );
}

export default App;
