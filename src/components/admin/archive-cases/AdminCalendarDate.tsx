"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";

export function AdminCalendarDate() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-lg border w-full bg-white shadow-sm"
      captionLayout="dropdown"
    />
  );
}
