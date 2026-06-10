"use client";

const caseData = {
  client: "Esther Howard",
  opposingParty: "Lovćen Insurance Company",
  court: "Basic Court Podgorica",
  caseNumber: "CS-126097-AGVT",
  category: "Civil Litigation",
  subcategory: "Traffic Accident Damages",
  status: "Archive",
  totalHearing: "22 May 2026, 09:00",
  caseDeadline: "05 June 2026",
  description: `
This case concerns a dispute arising from an investment management agreement executed on 15 January 2021 between Harrison Capital (plaintiff) and Global Asset Partners Ltd. (defendant). The plaintiff alleges that the defendant mismanaged investment portfolios, provided materially misleading financial reports, and failed to uphold fiduciary duties as required under the agreement.

Between Q2 2021 and Q4 2023, the defendant allegedly executed high-risk derivative trades beyond approved mandate limits, resulting in cumulative financial losses of approximately $4.2 million USD. The plaintiff further claims that quarterly performance reports were intentionally overstated, concealing exposure to volatile assets.

The defendant denies all allegations and argues that losses were due to market volatility during the global downturn in 2022–2023 and were within the agreed risk tolerance framework.

The matter is currently active before the Superior Court (Commercial Division) and is in the advanced litigation phase, including discovery completion, expert witness submissions, and pre-trial motions.
`,
};

export default function CaseOverview() {
  return (
    <div className="w-full rounded-[30px] bg-white p-7">
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
        <InfoRow label="Client:" value={caseData.client} />
        <InfoRow label="Opposing Party:" value={caseData.opposingParty} />
        <InfoRow label="Court:" value={caseData.court} />
        <InfoRow label="Case Number:" value={caseData.caseNumber} />
        <InfoRow label="Category:" value={caseData.category} />
        <InfoRow label="Subcategory:" value={caseData.subcategory} />

        <div className="grid grid-cols-[160px_1fr] items-center gap-x-6">
          <p className="text-[14px] font-semibold text-[#667085]">
            Status:
          </p>

          <div className="flex justify-end">
            <span className="rounded-full border border-[#E11D48] px-4 py-[5px] text-[14px] font-medium text-[#DC2626]">
              {caseData.status}
            </span>
          </div>
        </div>

        <InfoRow
          label="Total Hearing:"
          value={caseData.totalHearing}
        />

        <InfoRow
          label="Case Deadline:"
          value={caseData.caseDeadline}
        />
      </div>

      {/* Description Section */}
      <div className="mt-12 space-y-6">
        <h3 className="text-[14px] font-semibold text-[#667085]">
          Description
        </h3>
        <p className="text-[14px] text-[#4B5563]">{caseData.description}</p>
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
                  Lead Counsel: Jonathan R. Miller (Miller &
                  Associates LLP)
                </li>
                <li>
                  Co-Counsel: Sarah K. Donovan
                </li>
                <li>
                  Expert Witness: Dr. Alan Pierce
                  (Financial Forensics Expert)
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <h5 className="font-semibold">Defendant</h5>

              <ul className="mt-1 list-disc pl-6">
                <li>
                  Lead Counsel: Rebecca L. Carter
                  (Carter Legal Group)
                </li>
                <li>
                  Co-Counsel: David Nguyen
                </li>
                <li>
                  Expert Witness: Prof. Michael Stein
                  (Economics & Risk Modeling)
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
                <li>
                  Portfolio performance reports
                  (2021–2023)
                </li>
                <li>
                  Trading algorithm logs
                  (MetaTrade system export)
                </li>
                <li>
                  Risk compliance dashboard screenshots
                </li>
                <li>
                  Bank transaction statements
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <h5 className="font-semibold">
                Communication Evidence
              </h5>

              <ul className="mt-1 list-disc pl-6">
                <li>
                  Internal email chain discussing
                  “aggressive leverage strategy”
                </li>
                <li>
                  Slack messages between fund managers
                </li>
                <li>
                  Client quarterly update reports
                  (allegedly inflated)
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <h5 className="font-semibold">
                Legal Documents
              </h5>

              <ul className="mt-1 list-disc pl-6">
                <li>
                  Investment management agreement
                  (signed Jan 2021)
                </li>
                <li>
                  Risk tolerance addendum
                </li>
                <li>
                  Compliance audit report (2023)
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <h5 className="font-semibold">
                Expert Reports
              </h5>

              <ul className="mt-1 list-disc pl-6">
                <li>
                  Independent forensic audit report
                  (Plaintiff side)
                </li>
                <li>
                  Market volatility impact assessment
                  (Defense side)
                </li>
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

      <p className=" text-[18px] font-normal text-[#111827]">
        {value}
      </p>
    </div>
  );
}