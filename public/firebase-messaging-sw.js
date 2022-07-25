/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvVNYS930D4gPWLCRjVl05xPxRrTO7v9k",
  projectId: "jsguru-69bd2",
  messagingSenderId: "1066435539245",
  appId: "1:1066435539245:web:36ecf642fedc6f0a7323a4",
  measurementId: "G-J602LE5CTK",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message: ",
    payload
  );

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("push", function (event) {
  if (event.data) {
    console.log("This push event has data: ", event.data.text());
  } else {
    console.log("This push event has no data.");
  }
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true,
    })
    .then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(event.data.text());
      }
    })
    .then(() => {
      return registration.showNotification("my notification title");
    });
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  console.error("event data", event);

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if (client.url == "/" && "focus" in client)
            client.focus().then(function (windowClient) {
              // do something with your WindowClient once it has been focused
            });
          return;
        }
        if (clients.openWindow) {
          clients.openWindow("/");
          return;
        }
      })
  );
});
