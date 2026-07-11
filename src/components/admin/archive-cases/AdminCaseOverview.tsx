"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("adminArchiveCases");
  return (
    <div className="w-full relative pt-12">
      <button
        onClick={() => router.back()}
        className="group absolute top-1 left-0 bg-[#145576] hover:bg-[#0f4460] text-white px-3 py-1.5 rounded-2xl cursor-pointer transition-all text-xs md:text-sm flex items-center gap-1 font-medium"
      >
        <ArrowLeftIcon className="w-3.5 h-3.5 transition-transform duration-300 ease-in-out group-hover:-translate-x-1" />
        {t("back")}
      </button>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl lg:text-2xl font-semibold text-[#1F2937]">
          {t("case_overview")}
        </h2>

        <p className="mt-1 text-[14px] text-[#A1A8B7]">
          {t("core_case_info")}
        </p>
      </div>

      {/* Information Grid */}
      <div className="space-y-8">
        <InfoRow label={t("client") || "Client:"} value={client_name} />
        <InfoRow
          label={t("opposing_party") || "Opposing Party:"}
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
        <InfoRow label={t("court") || "Court:"} value={court_name} />
        <InfoRow label={t("case_number") || "Case Number:"} value={case_number} />
        <InfoRow label={t("category") || "Category:"} value={category_name} />
        <InfoRow label={t("sub_category") || "Subcategory:"} value={sub_category_name} />

        <div className="flex flex-col md:flex-row justify-start md:justify-between md:items-center gap-2">
          <p className="text-[14px] font-semibold text-[#667085]">
            {t("status") || "Status:"}:
          </p>

          <div className="flex justify-start md:justify-end">
            <span className="rounded-full border border-[#E11D48] px-4 py-[5px] text-[14px] font-medium text-[#DC2626]">
              {status_name}
            </span>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-12 space-y-6">
        <h3 className="text-[14px] font-semibold text-[#667085]">
          {t("description")}
        </h3>
        <p className="text-[14px] text-[#4B5563]">{closing_description || t("no_description")}</p>
      </div>
      <div className="mt-12">
        <div className="space-y-8 text-[14px] leading-[32px] text-[#4B5563]">
          {/* Legal Representation */}
          <div>
            <h4 className="font-semibold text-[#4B5563]">
              {t("legal_representation")}
            </h4>

            <div className="mt-2">
              <h5 className="font-semibold">{t("plaintiff")}</h5>

              <ul className="mt-1 list-disc pl-6">
                <li>
                  {t("lead_counsel")}
                </li>
                <li>{t("co_counsel")}</li>
                <li>
                  {t("expert_witness")}
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <h5 className="font-semibold">{t("defendant")}</h5>

              <ul className="mt-1 list-disc pl-6">
                <li>
                  {t("lead_counsel_def")}
                </li>
                <li>{t("co_counsel_def")}</li>
                <li>
                  {t("expert_witness_def")}
                </li>
              </ul>
            </div>
          </div>

          {/* Evidence */}
          <div>
            <h4 className="font-semibold text-[#4B5563]">
              {t("key_evidence")}
            </h4>

            <div className="mt-3">
              <h5 className="font-semibold">
                {t("financial_technical_evidence")}
              </h5>

              <ul className="mt-1 list-disc pl-6">
                <li>{t("evidence_item_1")}</li>
                <li>{t("evidence_item_2")}</li>
                <li>{t("evidence_item_3")}</li>
                <li>{t("evidence_item_4")}</li>
              </ul>
            </div>

            <div className="mt-6">
              <h5 className="font-semibold">{t("communication_evidence")}</h5>

              <ul className="mt-1 list-disc pl-6">
                <li>
                  {t("comm_item_1")}
                </li>
                <li>{t("comm_item_2")}</li>
                <li>{t("comm_item_3")}</li>
              </ul>
            </div>

            <div className="mt-6">
              <h5 className="font-semibold">{t("legal_documents")}</h5>

              <ul className="mt-1 list-disc pl-6">
                <li>{t("doc_item_1")}</li>
                <li>{t("doc_item_2")}</li>
                <li>{t("doc_item_3")}</li>
              </ul>
            </div>

            <div className="mt-6">
              <h5 className="font-semibold">{t("expert_reports")}</h5>

              <ul className="mt-1 list-disc pl-6">
                <li>{t("exp_item_1")}</li>
                <li>{t("exp_item_2")}</li>
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
