
import CaseDetailsPage from "@/components/user/allCases/CaseDetailsPage";

export default async function page ({params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    return (
        <div>
            <CaseDetailsPage caseId={id} />
        </div>
    );
};