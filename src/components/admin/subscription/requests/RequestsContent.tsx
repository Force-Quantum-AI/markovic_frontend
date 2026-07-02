/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { User, Mail, Phone, CheckCircle2, X } from "lucide-react";
import AdminButton from "@/components/shared/AdminButton";
import { toast } from "sonner";
import {
  useGetAllSubscriptionRequestQuery,
  useUpdateSubscriptionRequestMutation,
} from "@/store/features/admin/subscriptions/subscriptions.api";
import { SubscriptionRequestsSkeleton } from "@/components/admin/admin-skeletons";

export default function RequestsContent() {
  const {
    data: requests = [],
    isLoading,
    error,
  } = useGetAllSubscriptionRequestQuery();
  const [updateRequest] = useUpdateSubscriptionRequestMutation();
  const [filter, setFilter] = useState<
    "all" | "approved" | "pending" | "declined"
  >("all");
  const [loadingAction, setLoadingAction] = useState<{ id: number | string; type: "approved" | "decline" } | null>(null);

  const handleApprove = async (id: number | string) => {
    setLoadingAction({ id, type: "approved" });
    const toastId = toast.loading("Approving subscription request...");
    try {
      const res = await updateRequest({ id,data: {action: "approved",},}).unwrap();
      if(res?.status === 'success'){
        toast.success(res?.message, {
          id: toastId,
        });
      }else{
        toast.error(res?.message || "Failed to approve request.", {
          id: toastId,
        });
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to approve request.", {
        id: toastId,
      });
    } finally {
      setLoadingAction(null);
    }
  };

  const handleDecline = async (id: number | string) => {
    setLoadingAction({ id, type: "decline" });
    const toastId = toast.loading("Declining subscription request...");
    try {
      const res = await updateRequest({
        id,
        data: {
          action: "decline",
        },
      }).unwrap();
      if(res?.status === 'success'){
        toast.success(res?.message, {
          id: toastId,
        });
      }else{
        toast.error(res?.message || "Failed to decline request.", {
          id: toastId,
        });
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to decline request.", {
        id: toastId,
      });
    } finally {
      setLoadingAction(null);
    }
  };

  const filteredRequests = requests.filter((req) => {
    if (filter === "all") return true;
    return req.status === filter;
  });

  if (isLoading) {
    return <SubscriptionRequestsSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-red-500 font-roboto space-y-2">
        <p className="text-lg font-semibold">
          Failed to load subscription requests.
        </p>
        <p className="text-sm text-gray-500">
          Please check your network and try again.
        </p>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500 font-roboto">
        <p className="text-lg font-medium">No subscription requests found.</p>
      </div>
    );
  }

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
          onClick={() => setFilter("approved")}
          className={`px-5 py-2.5 text-center font-roboto text-[16px] font-medium leading-[24px] rounded-[14px] transition-all duration-200 cursor-pointer ${
            filter === "approved"
              ? "bg-[#161A20] text-white shadow-sm"
              : "bg-[#DDE0E7] text-[#667085] hover:bg-[#C8CBD3] hover:text-[#161A20]"
          }`}
        >
          Approved request
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
        {filteredRequests.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl border border-dashed border-[#BEC4D2] p-12 text-center text-gray-500 font-roboto">
            No {filter === "all" ? "" : filter} requests at the moment.
          </div>
        ) : (
          filteredRequests.map((req) => (
            <div
              key={req.id}
              className="relative bg-white rounded-[16px] border border-[#9CA6BB] p-6 shadow-sm flex flex-col justify-between w-full h-full min-h-[350px]"
            >
              {req.status === "approved" && (
                <div className="absolute top-5 right-5 w-[34px] h-[34px] flex items-center justify-center z-10">
                  <CheckCircle2
                    className="w-[34px] h-[34px] text-[#0C9C37]"
                    strokeWidth={1.5}
                  />
                </div>
              )}

              {req.status === "declined" && (
                <div className="absolute top-5 right-5 w-[34px] h-[34px] flex items-center justify-center z-10 border border-red-500 rounded-full bg-red-50 text-red-500">
                  <X
                    className="w-[20px] h-[20px] text-red-500"
                    strokeWidth={2.5}
                  />
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#808CA5] font-roboto text-[14px] font-medium leading-[140%]">
                    <User className="w-5 h-5 shrink-0 text-[#808CA5] aspect-square" />
                    <span>Full Name:</span>
                  </div>
                  <p className="text-[#0E1116] font-roboto text-[16px] font-normal leading-[140%]">
                    {req.full_name}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[#808CA5] font-roboto text-[14px] font-medium leading-[140%]">
                      <Mail className="w-5 h-5 shrink-0 text-[#808CA5] aspect-square" />
                      <span>Email address:</span>
                    </div>
                    <p
                      className="text-[#0E1116] font-roboto text-[16px] font-normal leading-[140%] truncate"
                      title={req.email}
                    >
                      {req.email}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[#808CA5] font-roboto text-[14px] font-medium leading-[140%]">
                      <Phone className="w-5 h-5 shrink-0 text-[#808CA5] aspect-square" />
                      <span>Phone Number:</span>
                    </div>
                    <p
                      className="text-[#0E1116] font-roboto text-[16px] font-normal leading-[140%] truncate"
                      title={req.phone_number}
                    >
                      {req.phone_number}
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
                {req.status === "approved" ? (
                  <div className="flex items-center gap-1.5 text-[#0C9C37] font-roboto text-[13px] italic font-normal leading-[140%]">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-[#0C9C37]" />
                    <span>
                      {req.admin_note ||
                        "Already approved this user subscription request."}
                    </span>
                  </div>
                ) : req.status === "declined" ? (
                  <div className="flex items-center gap-1.5 text-[#EF4444] font-roboto text-[13px] italic font-normal leading-[140%]">
                    <X className="w-4 h-4 shrink-0 text-[#EF4444]" />
                    <span>
                      {req.admin_note ||
                        "Declined this user subscription request."}
                    </span>
                  </div>
                ) : (
                  <div className="w-full flex justify-end gap-3">
                    <AdminButton
                      label={loadingAction?.id === req.id && loadingAction?.type === "decline" ? "Declining..." : "Decline"}
                      variant="secondary"
                      onClick={() => handleDecline(req.id)}
                      disabled={loadingAction !== null}
                      className="h-11 px-6 rounded-full border-[#BEC4D2] text-[#475467] hover:text-[#101828]"
                    />
                    <AdminButton
                      label={loadingAction?.id === req.id && loadingAction?.type === "approved" ? "Approving..." : "Approved"}
                      onClick={() => handleApprove(req.id)}
                      disabled={loadingAction !== null}
                      className="h-11 px-6 rounded-full bg-[#135576] text-white border-[#135576]"
                    />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
