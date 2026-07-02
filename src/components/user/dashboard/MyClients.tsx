"use client";

import { NoContent } from "@/components/shared/NoContent";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, UserX } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const resolveImageUrl = (imgUrl: string | null | undefined): string => {
  if (!imgUrl) return "/dummy-user.jpg";
  if (imgUrl.includes("http")) {
    const match = imgUrl.match(/https?:\/\/[^\s]+/);
    if (match) return match[0];
  }
  if (imgUrl.startsWith("/") || imgUrl.startsWith(".")) {
    return imgUrl;
  }
  return `https://res.cloudinary.com/dnu0axtez/image/upload/${imgUrl}`;
};

export default function MyClients({ data, isLoading }: any) {
  const router = useRouter();
  const {t} = useTranslation("common");

  // Show only first 5 clients
  const displayedClients = data?.slice(0, 5) || [];

  return (
    <div className="w-full rounded-xl bg-white p-5 shadow-sm">
      {/* Header Section */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">{t("my")} {t("clients")}</h3>
        <button onClick={() => router.push("/my-clients")} className="text-sm font-medium text-[#135576] transition-all hover:opacity-80 cursor-pointer ">
          {t("view_all")}
        </button>
      </div>

      {/* Clients List */}
      <div className="divide-y divide-gray-100 bg-gray-100 rounded-2xl px-3">
        {isLoading ? (
          <div className="py-3 space-y-2">
            <Skeleton className="w-full h-10 rounded-md bg-gray-300" />
            <Skeleton className="w-full h-10 rounded-md bg-gray-300" />
            <Skeleton className="w-full h-10 rounded-md bg-gray-300" />
            <Skeleton className="w-full h-10 rounded-md bg-gray-300" />
            <Skeleton className="w-full h-10 rounded-md bg-gray-300" />
          </div>
        ) : data?.length===0 ? (
        <NoContent message={t("no_clients")} icon={<UserX className="text-gray-500" />} />
      ):  displayedClients.map((client: any, idx: number) => {
          const clientImage = resolveImageUrl(client.client_image);
          const clientName = client.client_name ?? client.name ?? "Client";
          const clientCaseCount = client.case_numbers ?? client.total_cases ?? 0;
          return (
            <div
              key={idx}
              className="flex items-center justify-between flex-wrap gap-2 py-3 transition-all "
            >
              <div className="flex items-center flex-wrap gap-2">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image src={clientImage} alt={clientName} fill className="object-cover" />
                </div>
                <p className="text-gray-900">{clientName}</p>
              </div>
              <p className="text-sm text-green-600">
                {clientCaseCount} {t("cases")}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}