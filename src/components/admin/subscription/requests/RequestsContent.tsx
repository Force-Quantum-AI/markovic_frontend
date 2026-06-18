"use client";

import React, { useState } from "react";
import { User, Mail, Phone, CheckCircle2, X } from "lucide-react";
import AdminButton from "@/components/shared/AdminButton";
import { toast } from "sonner";

interface SubscriptionRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "pending" | "accepted" | "declined";
}

const initialRequests: SubscriptionRequest[] = [
  {
    id: "1",
    name: "Markovic Aleksa",
    email: "markovic@email.com",
    phone: "(225) 555-0118",
    message:
      "Hi,\n\nI'm lawyer Markovic. I have seen that you have only three plan to subscribe. But I need subscription for 50 devices can you help me with this condition?\n\nLooking forward to your reply.\n\nRegards",
    status: "pending",
  },
  {
    id: "2",
    name: "Markovic Aleksa",
    email: "markovic@email.com",
    phone: "(225) 555-0118",
    message:
      "Hi,\n\nI'm lawyer Markovic. I have seen that you have only three plan to subscribe. But I need subscription for 50 devices can you help me with this condition?\n\nLooking forward to your reply.\n\nRegards",
    status: "accepted",
  },
  {
    id: "3",
    name: "Markovic Aleksa",
    email: "markovic@email.com",
    phone: "(225) 555-0118",
    message:
      "Hi,\n\nI'm lawyer Markovic. I have seen that you have only three plan to subscribe. But I need subscription for 50 devices can you help me with this condition?\n\nLooking forward to your reply.\n\nRegards",
    status: "accepted",
  },
  {
    id: "4",
    name: "Markovic Aleksa",
    email: "markovic@email.com",
    phone: "(225) 555-0118",
    message:
      "Hi,\n\nI'm lawyer Markovic. I have seen that you have only three plan to subscribe. But I need subscription for 50 devices can you help me with this condition?\n\nLooking forward to your reply.\n\nRegards",
    status: "pending",
  },
  {
    id: "5",
    name: "Markovic Aleksa",
    email: "markovic@email.com",
    phone: "(225) 555-0118",
    message:
      "Hi,\n\nI'm lawyer Markovic. I have seen that you have only three plan to subscribe. But I need subscription for 50 devices can you help me with this condition?\n\nLooking forward to your reply.\n\nRegards",
    status: "pending",
  },
  {
    id: "6",
    name: "Markovic Aleksa",
    email: "markovic@email.com",
    phone: "(225) 555-0118",
    message:
      "Hi,\n\nI'm lawyer Markovic. I have seen that you have only three plan to subscribe. But I need subscription for 50 devices can you help me with this condition?\n\nLooking forward to your reply.\n\nRegards",
    status: "declined",
  },
];

export default function RequestsContent() {
  const [requests, setRequests] = useState<SubscriptionRequest[]>(initialRequests);
  const [filter, setFilter] = useState<"all" | "accepted" | "pending" | "declined">("all");

  const handleAcceptRequest = (id: string) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "accepted" } : req))
    );
    toast.success("Subscription request approved successfully!");
  };

  const filteredRequests = requests.filter((req) => {
    if (filter === "all") return true;
    return req.status === filter;
  });

  return (
    <div className="w-full p-4 md:p-6 space-y-6">
      <div className="flex flex-wrap gap-2 md:gap-3">
        <button
          onClick={() => setFilter("all")}
          className={`px-5 py-2.5 text-center font-roboto text-[16px] font-medium leading-[24px] rounded-[14px] transition-all duration-200 cursor-pointer ${
            filter === "all"
              ? "bg-[#161A20] text-white shadow-sm"
              : "bg-[#DDE0E7] text-[#667085] hover:bg-[#C8CBD3] hover:text-[#161A20]"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("accepted")}
          className={`px-5 py-2.5 text-center font-roboto text-[16px] font-medium leading-[24px] rounded-[14px] transition-all duration-200 cursor-pointer ${
            filter === "accepted"
              ? "bg-[#161A20] text-white shadow-sm"
              : "bg-[#DDE0E7] text-[#667085] hover:bg-[#C8CBD3] hover:text-[#161A20]"
          }`}
        >
          Accepted request
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-5 py-2.5 text-center font-roboto text-[16px] font-medium leading-[24px] rounded-[14px] transition-all duration-200 cursor-pointer ${
            filter === "pending"
              ? "bg-[#161A20] text-white shadow-sm"
              : "bg-[#DDE0E7] text-[#667085] hover:bg-[#C8CBD3] hover:text-[#161A20]"
          }`}
        >
          Pending request
        </button>
        <button
          onClick={() => setFilter("declined")}
          className={`px-5 py-2.5 text-center font-roboto text-[16px] font-medium leading-[24px] rounded-[14px] transition-all duration-200 cursor-pointer ${
            filter === "declined"
              ? "bg-[#161A20] text-white shadow-sm"
              : "bg-[#DDE0E7] text-[#667085] hover:bg-[#C8CBD3] hover:text-[#161A20]"
          }`}
        >
          Decline request
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {filteredRequests.map((req) => (
          <div
            key={req.id}
            className="relative bg-white rounded-[16px] border border-[#9CA6BB] p-6 shadow-sm flex flex-col justify-between w-full h-full min-h-[350px]"
          >
            {req.status === "accepted" && (
              <div className="absolute top-5 right-5 w-[34px] h-[34px] flex items-center justify-center z-10">
                <CheckCircle2 className="w-[34px] h-[34px] text-[#0C9C37]" strokeWidth={1.5} />
              </div>
            )}

            {req.status === "declined" && (
              <div className="absolute top-5 right-5 w-[34px] h-[34px] flex items-center justify-center z-10 border border-red-500 rounded-full bg-red-50 text-red-500">
                <X className="w-[20px] h-[20px] text-red-500" strokeWidth={2.5} />
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#808CA5] font-roboto text-[14px] font-medium leading-[140%]">
                  <User className="w-5 h-5 shrink-0 text-[#808CA5] aspect-square" />
                  <span>Full Name:</span>
                </div>
                <p className="text-[#0E1116] font-roboto text-[16px] font-normal leading-[140%]">
                  {req.name}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#808CA5] font-roboto text-[14px] font-medium leading-[140%]">
                    <Mail className="w-5 h-5 shrink-0 text-[#808CA5] aspect-square" />
                    <span>Email address:</span>
                  </div>
                  <p className="text-[#0E1116] font-roboto text-[16px] font-normal leading-[140%] truncate">
                    {req.email}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#808CA5] font-roboto text-[14px] font-medium leading-[140%]">
                    <Phone className="w-5 h-5 shrink-0 text-[#808CA5] aspect-square" />
                    <span>Phone Number:</span>
                  </div>
                  <p className="text-[#0E1116] font-roboto text-[16px] font-normal leading-[140%] truncate">
                    {req.phone}
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="text-[#808CA5] font-roboto text-[14px] font-medium leading-[140%]">
                  <span>Message:</span>
                </div>
                <div className="rounded-[20px] border border-[#DDE0E7] px-[16px] py-[14px] text-[#161A20] font-roboto text-[16px] font-normal leading-[140%] bg-white min-h-[120px] whitespace-pre-line">
                  {req.message}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-2 border-t border-[#BEC4D2]/20">
              {req.status === "accepted" ? (
                <div className="flex items-center gap-1.5 text-[#0C9C37] font-roboto text-[13px] italic font-normal leading-[140%]">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-[#0C9C37]" />
                  <span>Already approved this user subscription request</span>
                </div>
              ) : req.status === "declined" ? (
                <div className="flex items-center gap-1.5 text-[#EF4444] font-roboto text-[13px] italic font-normal leading-[140%]">
                  <X className="w-4 h-4 shrink-0 text-[#EF4444]" />
                  <span>Declined this user subscription request</span>
                </div>
              ) : (
                <div className="w-full flex justify-end">
                  <AdminButton
                    label="Contact user"
                    onClick={() => handleAcceptRequest(req.id)}
                    style={{ padding: "14px 24px" }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
