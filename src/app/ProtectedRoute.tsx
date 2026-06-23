"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match?.split("=")[1];
}

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const reduxToken = useAppSelector((state) => state.auth.accessToken);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Check both Redux state and cookie (cookie is the source of truth set at login)
    const cookieToken = getCookie("access") || getCookie("accessToken");
    const token = reduxToken || cookieToken;

    if (!token) {
      router.replace("/login");
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setChecked(true);
    }
  }, [reduxToken, router]);

  // Render nothing until we've verified authentication to prevent flash
  if (!checked) return null;

  return <>{children}</>;
}
