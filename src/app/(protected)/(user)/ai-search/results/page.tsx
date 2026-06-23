"use client"
import AiSearchResultsPage from "@/components/user/ai/AiSearchResultsPage";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const id = searchParams.get("id") ?? "";

  return <AiSearchResultsPage query={query} id={id} />;
}

export default function Page() {
  return (
    <div className="">
      <Suspense fallback={<div>Loading results...</div>}>
        <SearchContent />
      </Suspense>
    </div>
  );
}