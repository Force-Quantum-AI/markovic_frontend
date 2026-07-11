"use client";

import AdminAllDeadlinesTable from "@/components/admin/archive-cases/AdminAllDeadlinesTable";
import AdminAllDocumentsTable from "@/components/admin/archive-cases/AdminAllDocumentsTable";
import AdminAllHearingsTable from "@/components/admin/archive-cases/AdminAllHearingsTable";
// import { AdminCalendarDate } from "@/components/admin/archive-cases/AdminCalendarDate";
import AdminCaseHealth from "@/components/admin/archive-cases/AdminCaseHealth";
import AdminCaseOverview from "@/components/admin/archive-cases/AdminCaseOverview";
import AdminTeamMembersList from "@/components/admin/archive-cases/AdminTeamMembersList";
import { ArchiveCaseDetailsSkeleton } from "@/components/admin/admin-skeletons";
import { useGetArchiveCasesDetailsQuery } from "@/store/features/admin/archive-cases/archive.api";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function ArchieveCaseDetails() {
  const { t } = useTranslation("adminArchiveCases");
  const params = useParams();
  const id = params?.id as string;
  const { data, isLoading, error } = useGetArchiveCasesDetailsQuery({ id }, { skip: !id });

  if (isLoading) {
    return <ArchiveCaseDetailsSkeleton />;
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500">{t("failed_load_details")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Top Section: Overview, Health & Responsible Lawyers wrapped in one parent card */}
      <div className="w-full bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          <div className="col-span-1 xl:col-span-3">
            <AdminCaseOverview
              client_name={data.client_name}
              opposing_parties={data.opposing_parties}
              court_name={data.court_name}
              case_number={data.case_number}
              category_name={data.category_name}
              sub_category_name={data.sub_category_name}
              status_name={data.status_name}
              closing_description={data.closing_description}
            />
          </div>
          <div className="col-span-1 xl:col-span-2 space-y-6">
            <AdminCaseHealth
              case_name={data.case_name}
              case_number={data.case_number}
              status_name={data.status_name}
              total_hearings={data.total_hearings}
              total_deadlines={data.total_deadlines}
              case_age_days={data.case_age_days}
            />
            <AdminTeamMembersList lawyers={data.responsible_lawyers} />
          </div>
        </div>
      </div>

      {/* Tables Row: Hearings & Deadlines Side-by-Side (Responsive Flex) */}
      <div className="flex flex-col lg:flex-row gap-3 w-full">
        <div className="flex-1 min-w-0">
          <AdminAllHearingsTable hearings={data.hearing_history} />
        </div>
        <div className="flex-1 min-w-0">
          <AdminAllDeadlinesTable deadlines={data.deadline_history} />
        </div>
      </div>

      {/* Documents Section: Full Width */}
      <div className="w-full">
        <AdminAllDocumentsTable documents={data.documents} />
      </div>
    </div>
  );
}