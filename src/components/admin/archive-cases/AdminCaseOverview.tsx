"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface AdminCaseOverviewProps {
  client_name?: string;
  opposing_parties?: Array<string | { [key: string]: string }>;
  court_name?: string;
  case_number?: string;
  category_name?: string;
  sub_category_name?: string;
  status_name?: string;
  closing_description?: string;
}

export default function AdminCaseOverview({
  client_name = "N/A",
  opposing_parties = [],
  court_name = "N/A",
  case_number = "N/A",
  category_name = "N/A",
  sub_category_name = "N/A",
  status_name = "N/A",
  closing_description = "No description available",
}: AdminCaseOverviewProps) {
  const router = useRouter();
  return (
    <div className="w-full rounded-[30px] bg-white p-7 relative border border-gray-100 shadow-sm">
      <button
        onClick={() => router.back()}
        className="absolute -top-3 left-4 bg-gray-100 px-3 py-1 rounded-2xl cursor-pointer transition-all hover:bg-gray-400 text-[#1F2937]/50 text-xs md:text-sm flex items-center gap-1"
      >
        <ArrowLeftIcon className="w-3 h-3" />
        Back
      </button>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl lg:text-2xl font-semibold text-[#1F2937]">
          Case Overview
        </h2>

        <p className="mt-1 text-[14px] text-[#A1A8B7]">
          Core case information
        </p>
      </div>

      {/* Information Grid */}
      <div className="space-y-8">
        <InfoRow label="Client:" value={client_name} />
        <InfoRow
          label="Opposing Party:"
          value={
            opposing_parties && opposing_parties.length > 0
              ? typeof opposing_parties[0] === "object" && opposing_parties[0] !== null
                ? opposing_parties[0].name ||
                  opposing_parties[0].test ||
                  Object.values(opposing_parties[0])[0] ||
                  "N/A"
                : String(opposing_parties[0])
              : "N/A"
          }
        />
        <InfoRow label="Court:" value={court_name} />
        <InfoRow label="Case Number:" value={case_number} />
        <InfoRow label="Category:" value={category_name} />
        <InfoRow label="Subcategory:" value={sub_category_name} />

        <div className="grid grid-cols-[160px_1fr] items-center gap-x-6">
          <p className="text-[14px] font-semibold text-[#667085]">
            Status:
          </p>

          <div className="flex justify-end">
            <span className="rounded-full border border-[#E11D48] px-4 py-[5px] text-[14px] font-medium text-[#DC2626]">
              {status_name}
            </span>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-12 space-y-6">
        <h3 className="text-[14px] font-semibold text-[#667085]">
          Description
        </h3>
        <p className="text-[14px] text-[#4B5563]">{closing_description}</p>
      </div>
      <div className="mt-12">
        <div className="space-y-8 text-[14px] leading-[32px] text-[#4B5563]">
          {/* Legal Representation */}
          <div>
            <h4 className="font-semibold text-[#4B5563]">
              Legal Representation
            </h4>

            <div className="mt-2">
              <h5 className="font-semibold">Plaintiff</h5>

              <ul className="mt-1 list-disc pl-6">
                <li>
                  Lead Counsel: Jonathan R. Miller (Miller & Associates LLP)
                </li>
                <li>Co-Counsel: Sarah K. Donovan</li>
                <li>
                  Expert Witness: Dr. Alan Pierce (Financial Forensics Expert)
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <h5 className="font-semibold">Defendant</h5>

              <ul className="mt-1 list-disc pl-6">
                <li>
                  Lead Counsel: Rebecca L. Carter (Carter Legal Group)
                </li>
                <li>Co-Counsel: David Nguyen</li>
                <li>
                  Expert Witness: Prof. Michael Stein (Economics & Risk Modeling)
                </li>
              </ul>
            </div>
          </div>

          {/* Evidence */}
          <div>
            <h4 className="font-semibold text-[#4B5563]">
              Key Evidence Submitted
            </h4>

            <div className="mt-3">
              <h5 className="font-semibold">
                Financial & Technical Evidence
              </h5>

              <ul className="mt-1 list-disc pl-6">
                <li>Portfolio performance reports (2021–2023)</li>
                <li>Trading algorithm logs (MetaTrade system export)</li>
                <li>Risk compliance dashboard screenshots</li>
                <li>Bank transaction statements</li>
              </ul>
            </div>

            <div className="mt-6">
              <h5 className="font-semibold">Communication Evidence</h5>

              <ul className="mt-1 list-disc pl-6">
                <li>
                  Internal email chain discussing “aggressive leverage strategy”
                </li>
                <li>Slack messages between fund managers</li>
                <li>Client quarterly update reports (allegedly inflated)</li>
              </ul>
            </div>

            <div className="mt-6">
              <h5 className="font-semibold">Legal Documents</h5>

              <ul className="mt-1 list-disc pl-6">
                <li>Investment management agreement (signed Jan 2021)</li>
                <li>Risk tolerance addendum</li>
                <li>Compliance audit report (2023)</li>
              </ul>
            </div>

            <div className="mt-6">
              <h5 className="font-semibold">Expert Reports</h5>

              <ul className="mt-1 list-disc pl-6">
                <li>Independent forensic audit report (Plaintiff side)</li>
                <li>Market volatility impact assessment (Defense side)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col md:flex-row justify-start md:justify-between gap-x-6">
      <p className="text-[14px] font-semibold text-[#667085]">
        {label}
      </p>

      <p className="text-[18px] font-normal text-[#111827]">
        {value}
      </p>
    </div>
  );
}
