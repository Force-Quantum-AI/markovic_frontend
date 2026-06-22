"use client";

// components/FcmInitializer.tsx
// Drop this ONCE inside your authenticated layout (e.g. app/(dashboard)/layout.tsx).
// It renders nothing — it just runs the FCM registration side-effect.
//
// Example usage:
//   import FcmInitializer from "@/components/FcmInitializer";
//
//   export default function DashboardLayout({ children }) {
//     return (
//       <>
//         <FcmInitializer />
//         {children}
//       </>
//     );
//   }

import { useFcmToken } from "@/hooks/useFcmToken";

export default function FcmInitializer() {
  useFcmToken();
  return null;
}   