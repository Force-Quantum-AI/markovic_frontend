import FcmInitializer from "@/components/FcmInitializer";
import ProtectedRoute from "../ProtectedRoute";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <ProtectedRoute>
      <FcmInitializer />
      {children}
      </ProtectedRoute>;
    </>
  )
}