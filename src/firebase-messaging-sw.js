importScripts("https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyCVOor6iyqzMzAm3XBfJhmnB2mio3-hgKQ",
  authDomain: "my-first-app-3fc16.firebaseapp.com",
  projectId: "my-first-app-3fc16",
  storageBucket: "my-first-app-3fc16.appspot.com",
  messagingSenderId: "55204924996",
  appId: "1:55204924996:web:e5db46dcf3b119d3d1f611",
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/assets/icons/icon-72x72.png",
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
