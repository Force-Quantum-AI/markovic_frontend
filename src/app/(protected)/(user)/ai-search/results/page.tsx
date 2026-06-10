"use client"
import AiFilters from "@/components/user/ai/AiFilters";
import AiSearchResultsPage from "@/components/user/ai/AiSearchResultsPage";

// In a real implementation, you would fetch from your API here:
// const results = await fetch(`${process.env.API_URL}/ai-search?q=${query}`).then(r => r.json())
// Then pass results as props to AiSearchResultsPage

interface PageProps {
  searchParams: { q?: string };
}

export default function Page({ searchParams }: PageProps) {
  const query = searchParams.q ?? "";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
      <div className="col-span-2 lg:col-span-3">
        {/* 
          When API is ready, fetch results server-side and pass as props:
          <AiSearchResultsPage query={query} results={results} />
        */}
        <AiSearchResultsPage query={query} />
      </div>
      <div className="col-span-2 lg:col-span-1 space-y-3">
        {/* Filters are stateless on results page — could be managed via URL params too */}
        <AiFilters
          filters={{
            category: "",
            court: "",
            year: "",
            minimumSimilarity: 50,
            resentDecisionOnly: true,
            sourceVerified: true,
          }}
          setFilters={() => {}}
        />
      </div>
    </div>
  );
}