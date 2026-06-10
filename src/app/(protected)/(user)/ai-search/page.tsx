// "use client"

// import AiFilters from "@/components/user/ai/AiFilters";
// import AiSearchPage from "@/components/user/ai/AiSearchPage";
// import { AiSearchFilters } from "@/types/ai";
// import { useState } from "react";

// export default function Page() {
//     const [filters, setFilters] = useState<AiSearchFilters>({
//         category: "",
//         court: "",
//         year: "",
//         minimumSimilarity: 50,
//         resentDecisionOnly: true,
//         sourceVerified: true
//     })
//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
//       <div className="col-span-2 lg:col-span-3 space-y-5">
//         <AiSearchPage filters={filters}/>

//       </div>
//       <div className="col-span-2 lg:col-span-1 space-y-5">
//         <AiFilters filters={filters} setFilters={setFilters}/>
//       </div>
//     </div>
//   );
// }

"use client";

import AiFilters from "@/components/user/ai/AiFilters";
import AiSearchPage from "@/components/user/ai/AiSearchPage";
import { AiSearchFilters } from "@/types/ai";
import { useState } from "react";

export default function Page() {
  const [filters, setFilters] = useState<AiSearchFilters>({
    category: "",
    court: "",
    year: "",
    minimumSimilarity: 50,
    resentDecisionOnly: true,
    sourceVerified: true,
  });

  return (
    <div className="flex gap-3">
      <div className="flex-1 min-w-0">
        <AiSearchPage filters={filters} setFilters={setFilters} />
      </div>

      <aside className="hidden lg:block w-64 xl:w-72 shrink-0 space-y-3">
        <AiFilters filters={filters} setFilters={setFilters} />
      </aside>
    </div>
  );
}