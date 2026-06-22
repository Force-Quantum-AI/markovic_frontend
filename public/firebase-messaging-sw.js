// public/firebase-messaging-sw.js
// Firebase requires this file at the root of the domain (/firebase-messaging-sw.js).
// Next.js serves everything in /public at the root, so place this file there.
// This file runs in a Service Worker context — do NOT use ES module imports.

importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "NEXT_PUBLIC_FIREBASE_API_KEY_VALUE",
  authDomain: "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_VALUE",
  projectId: "NEXT_PUBLIC_FIREBASE_PROJECT_ID_VALUE",
  storageBucket: "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_VALUE",
  messagingSenderId: "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_VALUE",
  appId: "NEXT_PUBLIC_FIREBASE_APP_ID_VALUE",
});

// NOTE: Service Workers cannot access `process.env` — you must hard-code the
// values above OR use a build-time script to inject them. One clean approach:
// add a `prebuild` script in package.json that reads .env.local and generates
// this file with real values substituted in.

const messaging = firebase.messaging();

// Handle background messages (when the app tab is not in focus).
messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification ?? {};
  if (!title) return;

  self.registration.showNotification(title, {
    body: body ?? "",
    icon: "/icon-192x192.png", // update to your app icon path
  });
});