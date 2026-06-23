import ClientPage from "@/components/user/clients/ClientPage";
import LegalCalendar from "@/components/user/dashboard/LegalCalendar";

export default function page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
      <div className="col-span-2 lg:col-span-3 space-y-5">
        <ClientPage/>

      </div>
      <div className="col-span-2 lg:col-span-1 space-y-5">
        <LegalCalendar/>
      </div>
    </div>
  );
}