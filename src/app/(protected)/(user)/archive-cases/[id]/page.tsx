"use client";

import { useEffect } from "react";
import AllDocumentsTable from "@/components/user/ai/AllDocumentsTable";
import AllHearingsTable from "@/components/user/ai/AllHearingsTable";
import { CalendarDate } from "@/components/user/ai/CalendarDate";
import CaseHealth from "@/components/user/ai/CaseHealth";
import CaseOverview from "@/components/user/ai/CaseOverview";
import TeamMembersList from "@/components/user/ai/TeamMembersList";
import { useGetArchiveCaseDetailsQuery } from "@/store/features/archive/archive.api";
import { useParams } from "next/navigation";

export default function Page() {
    const params = useParams();
    const id = params?.id as string;
    const { data, isLoading, error } = useGetArchiveCaseDetailsQuery({ id }, { skip: !id });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-500">Loading case details...</p>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500">Failed to load case details. Please try again.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-3">
            <div className="col-span-1 xl:col-span-3 space-y-3">
                <CaseOverview
                    client_name={data.client_name}
                    opposing_parties={data.opposing_parties}
                    court_name={data.court_name}
                    case_number={data.case_number}
                    category_name={data.category_name}
                    sub_category_name={data.sub_category_name}
                    status_name={data.status_name}
                    closing_description={data.closing_description}
                />
                <AllHearingsTable hearings={data.hearing_history} />
                <AllDocumentsTable documents={data.documents} />
            </div>
            <div className="col-span-1 xl:col-span-2 space-y-3">
                <CaseHealth
                    case_name={data.case_name}
                    case_number={data.case_number}
                    status_name={data.status_name}
                    total_hearings={data.total_hearings}
                    total_deadlines={data.total_deadlines}
                    case_age_days={data.case_age_days}
                />
                <CalendarDate />
                <TeamMembersList lawyers={data.responsible_lawyers} />
            </div>
        </div>
    );
}