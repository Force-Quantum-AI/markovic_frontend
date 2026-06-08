"use client"

import MainButton from "@/components/shared/MainButton";
import AllCasesPage from "@/components/user/allCases/AllCases";
import LegalCalendar from "@/components/user/dashboard/LegalCalendar";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [isAddNewCaseOpen, setIsAddNewCaseOpen] = useState(false);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
      <div className="col-span-2 lg:col-span-3 space-y-5">
        <AllCasesPage/>

      </div>
      <div className="col-span-2 lg:col-span-1 space-y-5">
        <LegalCalendar/>
      </div>
    </div>
  );
}