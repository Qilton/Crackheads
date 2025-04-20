// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/10.10.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.10.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBa1D0ozM50hBsLbV4P2IVX-BBM4koqvuw",
  projectId: "crackheads-69916",
  messagingSenderId: "501232193715",
  appId: "1:501232193715:web:b8d3bb35396401dfd0a0c6",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.png',
    data: {
      url: payload.notification.click_action || "/", // redirect when clicked
      audio: payload.data.audio
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
  const url = event.notification.data.url;
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
