import ClientCaseDetailsPage from "@/components/user/allCases/ClientCaseDetailsPage";

export default async function page ({params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    return (
        <div>
            <ClientCaseDetailsPage clientCaseId={id} />
        </div>
    );
};