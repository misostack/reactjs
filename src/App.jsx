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
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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

async function getData(url, params) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    params,
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const getFirebaseToken = () => {
  return postData("http://localhost:1337/login");
};
const sendNotification = (token) => {
  return getData(`http://localhost:1337/send-fcm/${token}`, {});
};

const { app, db } = firebaseService.getInstance();
const auth = getAuth(app);
const messaging = getMessaging();

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
      resolve(payload);
    });
  });

function App() {
  const [notifications, setNotifications] = useState([]);
  const [fcmToken, setFCMToken] = useState("");
  const [message, setMessage] = useState("");
  const sendNoti = async () => {
    if (fcmToken) {
      const res = await sendNotification(fcmToken);
      console.log(res);
    }
  };
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
    getToken(messaging, { vapidKey: `${process.env.REACT_APP_vapidKey}` })
      .then((currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          // ...
          setFCMToken(currentToken);
          console.log(currentToken);
        } else {
          // Show permission request UI
          console.log(
            "No registration token available. Request permission to generate one."
          );
          // ...
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        // ...
      });
    onAuthStateChanged(auth, (user) => {
      console.log("user", user);
      if (user) {
        subcribeOnNotification();
      }
    });
  }, []);

  onMessageListener()
    .then((payload) => {
      setMessage(JSON.stringify(payload));
    })
    .catch((err) => console.log("failed: ", err));

  navigator.serviceWorker.addEventListener("message", (event) => {
    console.log(event);
    setMessage(JSON.stringify(JSON.parse(event.data)));
  });

  return (
    <>
      <h1>Firebase Realtime Database Notififcation Sample</h1>
      <h2>FCM Token</h2>
      <p>{fcmToken}</p>
      <h2>FCM Message</h2>
      <p>{message}</p>
      <h2>Realtime Database</h2>
      <ul>
        {notifications.map((n) => (
          <li key={n.notificationId}>{JSON.stringify(n)}</li>
        ))}
      </ul>
      <button onClick={() => sendNoti()}>sendNoti</button>
      <button onClick={() => doLogin()}>Login</button>
    </>
  );
}

export default App;
