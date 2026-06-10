import AllDocumentsTable from "@/components/user/ai/AllDocumentsTable";
import AllHearingsTable from "@/components/user/ai/AllHearingsTable";
import { CalendarDate } from "@/components/user/ai/CalendarDate";
import CaseHealth from "@/components/user/ai/CaseHealth";
import CaseOverview from "@/components/user/ai/CaseOverview";
import TeamMembersList from "@/components/user/ai/TeamMembersList";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log(id);
    return (
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-3">
            <div className="col-span-1 xl:col-span-3 space-y-3">
                <CaseOverview />
                <AllHearingsTable/>
                <AllDocumentsTable/>
            </div>
            <div className="col-span-1 xl:col-span-2 space-y-3">
                <CaseHealth/>
                <CalendarDate/>
                <TeamMembersList/>
            </div>
        </div>
    )
}