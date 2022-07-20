# ReactJS

## ReactJS Beginner Level

1. JSX

```jsx
const name = "Josh Perez";
const element = <h1>Hello, {name}</h1>;
```

## Notification with Firebase Realtime Database

- [Firebase Package](https://www.npmjs.com/package/firebase)
- [Official Sample](https://firebase.google.com/docs/database/web/start)

```bash
yarn add firebase
```

> Add configuration

```js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  apiKey: `${process.env.REACT_APP_apiKey}`,
  authDomain: `${process.env.REACT_APP_authDomain}`,
  databaseURL: `${process.env.REACT_APP_databaseURL}`,
  projectId: `${process.env.REACT_APP_projectId}`,
  messagingSenderId: `${process.env.REACT_APP_messagingSenderId}`,
  appId: `${process.env.REACT_APP_appId}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
```
