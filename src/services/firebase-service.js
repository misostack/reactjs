/* eslint-disable import/no-anonymous-default-export */
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

export default {
  getInstance: () => {
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

    // Initialize Realtime Database and get a reference to the service
    return {
      app,
      db: getDatabase(app),
    };
  },
};
