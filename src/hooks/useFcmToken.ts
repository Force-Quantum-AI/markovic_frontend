"use client";

// hooks/useFcmToken.ts

import { useEffect, useRef } from "react";
import { getToken } from "firebase/messaging";
import { useRegisterDeviceTokenMutation } from "@/store/features/notification/notification.api";
import { getMessagingInstance } from "@/lib/firebase";

/**
 * Requests notification permission, gets the FCM token, and POSTs it to the
 * backend via `registerDeviceToken`.
 *
 * Rules:
 * - Runs at most once per browser session (tracked via sessionStorage).
 * - Silently no-ops if permission is denied or the browser doesn't support FCM.
 * - Safe to mount in a layout component — the sessionStorage guard prevents
 *   re-registration on every navigation.
 */
export function useFcmToken() {
  const [registerDeviceToken] = useRegisterDeviceTokenMutation();
  const hasRegistered = useRef(false);

  useEffect(() => {
    // Skip if already registered this session (survives HMR re-mounts in dev).
    if (
      hasRegistered.current ||
      sessionStorage.getItem("fcm_registered") === "true"
    ) {
      return;
    }

    async function register() {
      try {
        // 1. Check / request browser permission.
        if (!("Notification" in window)) return; // SSR or unsupported browser
        const permission = await Notification.requestPermission();
        if (permission !== "granted") return;

        // 2. Get the FCM messaging instance (null if unsupported).
        const messaging = await getMessagingInstance();
        if (!messaging) return;

        // 3. Get the FCM registration token.
        //    NEXT_PUBLIC_FIREBASE_VAPID_KEY is the Web Push certificate key
        //    from the Firebase Console → Project Settings → Cloud Messaging.
        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        });

        if (!token) return;

        // 4. Register the token with your backend.
        await registerDeviceToken({
          token,
          device_type: "web",
        }).unwrap();

        // 5. Mark as done so this page-load's effect can't fire again, and
        //    so future navigations within the same tab skip re-registration.
        hasRegistered.current = true;
        sessionStorage.setItem("fcm_registered", "true");
      } catch (error) {
        // Non-fatal: push notifications won't work but the rest of the app is fine.
        console.warn("[FCM] Device registration failed:", error);
      }
    }

    register();
  }, [registerDeviceToken]);
}