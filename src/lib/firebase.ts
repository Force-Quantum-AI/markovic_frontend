// lib/firebase.ts
// Run `npm install firebase` if you haven't already.

import { initializeApp, getApps } from "firebase/app";
import { getMessaging, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// Guard against double-initialization in Next.js (which may re-evaluate modules
// in development due to HMR or server/client module splits).
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

/**
 * Returns the Messaging instance, or null if the browser doesn't support it
 * (e.g. Safari < 16, incognito on some browsers, SSR context).
 */
export async function getMessagingInstance() {
  const supported = await isSupported();
  if (!supported) return null;
  return getMessaging(app);
}

export default app;