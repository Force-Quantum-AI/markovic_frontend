"use client";

import AllDocumentsTable from "@/components/user/ai/AllDocumentsTable";
import AllHearingsTable from "@/components/user/ai/AllHearingsTable";
import { CalendarDate } from "@/components/user/ai/CalendarDate";
import CaseHealth from "@/components/user/ai/CaseHealth";
import CaseOverview from "@/components/user/ai/CaseOverview";
import TeamMembersList from "@/components/user/ai/TeamMembersList";
import { useGetArchiveCaseDetailsQuery } from "@/store/features/archive/archive.api";
import { ArrowLeftIcon, Loader } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
    const params = useParams();
    const id = params?.id as string;
    const router = useRouter();
    const { data, isLoading, error } = useGetArchiveCaseDetailsQuery({ id }, { skip: !id });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader className="animate-spin" size={32} />
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
        <div className="space-y-5">
            <button onClick={() => router.back()} className=" bg-gray-100 px-3 py-1 rounded-2xl cursor-pointer transition-all hover:bg-gray-400 hover:text-white text-[#1F2937]/50 text-xs md:text-sm flex items-center gap-1">
                <ArrowLeftIcon className="w-3 h-3" />
                Back
            </button>
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-3">
                <div className="col-span-1 xl:col-span-4">
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
                </div>
                <div className="col-span-1 xl:col-span-1 space-y-3">
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
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <AllHearingsTable allData={data.hearing_history} />
                <AllHearingsTable title="All Deadlines" tag="deadline" allData={data.deadline_history} />
            </div>
            <AllDocumentsTable documents={data.documents} />
        </div>
    );
}