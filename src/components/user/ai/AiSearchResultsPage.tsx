"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Info,
  Check,
  X,
  Eye,
  BookmarkPlus,
  Scale,
  FileText,
  Calendar,
  TrendingUp,
  Archive,
} from "lucide-react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SearchResult {
  id: string;
  court: string;
  caseNumber: string;
  date: string;
  similarity: number;
  shortSummary: string;
  whyRelevant: string;
  similarities: string[];
  differences: string[];
  excerpt: string;
  saved?: boolean;
}

interface SearchMeta {
  totalFound: number;
  highestSimilarity: number;
  database: string;
  rankedBy: string;
}

// ─── Dummy Data ───────────────────────────────────────────────────────────────

const DUMMY_META: SearchMeta = {
  totalFound: 12,
  highestSimilarity: 92,
  database: "Court Decision Database",
  rankedBy: "By Legal Similarity",
};

const DUMMY_RESULTS: SearchResult[] = [
  {
    id: "1",
    court: "Basic Court of Podgorica",
    caseNumber: "P.br. 245/2021",
    date: "14 March 2022",
    similarity: 92,
    shortSummary:
      "The court awarded non-material damages for injuries caused by a traffic accident, including concussion, cervical spine injury, and reduced life activities.",
    whyRelevant:
      "This decision is relevant because it involves similar injuries, lack of fault by the claimant, partial insurance compensation, and non-material damage evaluation.",
    similarities: [
      "Traffic accident",
      "Claimant was not at fault",
      "Concussion injury",
      "Cervical spine injury",
      "Reduced life activities",
      "Non-material damages claim",
    ],
    differences: [
      "The reduction in life activities was 8%, compared to 10% in the entered case",
      "The awarded compensation amount was different",
      "Different insurance company involved",
    ],
    excerpt:
      '"The court considered the claimant\'s physical pain, fear, and permanent reduction in life activities when determining fair compensation."',
    saved: false,
  },
  {
    id: "2",
    court: "Basic Court of Podgorica",
    caseNumber: "P.br. 312/2020",
    date: "22 June 2021",
    similarity: 87,
    shortSummary:
      "The court awarded non-material damages for injuries caused by a traffic accident, including concussion, cervical spine injury, and reduced life activities.",
    whyRelevant:
      "This decision is relevant because it involves similar injuries, lack of fault by the claimant, partial insurance compensation, and non-material damage evaluation.",
    similarities: [
      "Traffic accident",
      "Claimant was not at fault",
      "Concussion injury",
      "Cervical spine injury",
      "Reduced life activities",
      "Non-material damages claim",
    ],
    differences: [
      "The reduction in life activities was 8%, compared to 10% in the entered case",
      "The awarded compensation amount was different",
      "Different insurance company involved",
    ],
    excerpt:
      '"The court considered the claimant\'s physical pain, fear, and permanent reduction in life activities when determining fair compensation."',
    saved: false,
  },
  {
    id: "3",
    court: "Basic Court of Podgorica",
    caseNumber: "P.br. 178/2019",
    date: "05 November 2020",
    similarity: 85,
    shortSummary:
      "The court awarded non-material damages for injuries caused by a traffic accident, including concussion, cervical spine injury, and reduced life activities.",
    whyRelevant:
      "This decision is relevant because it involves similar injuries, lack of fault by the claimant, partial insurance compensation, and non-material damage evaluation.",
    similarities: [
      "Traffic accident",
      "Claimant was not at fault",
      "Concussion injury",
      "Cervical spine injury",
      "Reduced life activities",
      "Non-material damages claim",
    ],
    differences: [
      "The reduction in life activities was 8%, compared to 10% in the entered case",
      "The awarded compensation amount was different",
      "Different insurance company involved",
    ],
    excerpt:
      '"The court considered the claimant\'s physical pain, fear, and permanent reduction in life activities when determining fair compensation."',
    saved: false,
  },
  {
    id: "4",
    court: "High Court of Montenegro",
    caseNumber: "Gž. 892/2022",
    date: "18 September 2022",
    similarity: 81,
    shortSummary:
      "Appellate ruling affirming non-material damages for traffic-related cervical spine and concussion injuries; court upheld lower court's assessment of permanent disability.",
    whyRelevant:
      "Relevant as an appellate-level authority confirming the legal standard for evaluating non-material harm from traffic accidents.",
    similarities: [
      "Traffic accident",
      "Non-material damages",
      "Cervical spine injury",
      "Concussion injury",
      "Appellate confirmation",
    ],
    differences: [
      "Appellate level decision, not first instance",
      "Higher awarded damages",
      "Different claimant age group",
    ],
    excerpt:
      '"The appellate court confirmed that permanent reduction in life activities constitutes a standalone head of non-material damages."',
    saved: false,
  },
  {
    id: "5",
    court: "Basic Court of Bar",
    caseNumber: "P.br. 56/2021",
    date: "09 January 2022",
    similarity: 76,
    shortSummary:
      "Court awarded compensation for physical pain and fear following a rear-end traffic collision. Partial fault was attributed to the defendant driver.",
    whyRelevant:
      "Shares the core legal issues: non-fault claimant, cervical trauma, and insurance liability assessment.",
    similarities: [
      "Traffic accident",
      "Rear-end collision",
      "Physical pain award",
      "Insurance liability",
      "Non-material damages",
    ],
    differences: [
      "No concussion — only cervical sprain",
      "Defendant was uninsured; state guarantee fund involved",
      "Lower similarity score due to different injury profile",
    ],
    excerpt:
      '"Fear and mental anguish experienced at the moment of impact are compensable as a distinct non-material harm."',
    saved: false,
  },
];

// ─── Similarity Badge ──────────────────────────────────────────────────────────

function SimilarityBadge({ value }: { value: number }) {
  const color =
    value >= 90
      ? "bg-[#135576] text-white"
      : value >= 80
      ? "bg-[#1a6b92] text-white"
      : "bg-[#2a84b0] text-white";

  return (
    <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl shrink-0 ${color}`}>
      <span className="text-lg font-bold leading-none">{value}%</span>
      <span className="text-[9px] opacity-80 mt-0.5">Similarity</span>
    </div>
  );
}

// ─── Result Card ──────────────────────────────────────────────────────────────

function ResultCard({
  result,
  onSave,
}: {
  result: SearchResult;
  onSave: (id: string) => void;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#135576] shrink-0" />
            <h3 className="text-sm font-bold text-[#135576]">{result.court}</h3>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <FileText className="w-3 h-3" />
              {result.caseNumber}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {result.date}
            </span>
          </div>
        </div>
        <SimilarityBadge value={result.similarity} />
      </div>

      {/* Short Summary */}
      <div>
        <p className="text-xs font-semibold text-gray-700 mb-1">Short Summary</p>
        <p className="text-sm text-gray-600 leading-relaxed">{result.shortSummary}</p>
      </div>

      {/* Why Relevant */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
        <div className="flex items-center gap-1.5 mb-1">
          <Info className="w-3.5 h-3.5 text-[#135576]" />
          <span className="text-xs font-semibold text-[#135576]">
            Why This Decision is Relevant
          </span>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">{result.whyRelevant}</p>
      </div>

      {/* Similarities & Differences */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Similarities */}
        <div className="bg-green-50 border border-green-100 rounded-xl px-4 py-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Check className="w-3.5 h-3.5 text-green-600" />
            <span className="text-xs font-semibold text-green-700">Similarities</span>
          </div>
          <ul className="space-y-1">
            {result.similarities.map((s, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
                <span className="w-1 h-1 rounded-full bg-green-400 shrink-0 mt-1.5" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Differences */}
        <div className="bg-orange-50 border border-orange-100 rounded-xl px-4 py-3">
          <div className="flex items-center gap-1.5 mb-2">
            <X className="w-3.5 h-3.5 text-orange-500" />
            <span className="text-xs font-semibold text-orange-600">Differences</span>
          </div>
          <ul className="space-y-1">
            {result.differences.map((d, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
                <span className="w-1 h-1 rounded-full bg-orange-400 shrink-0 mt-1.5" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Excerpt */}
      <div className="border-l-2 border-[#135576] bg-gray-100 rounded-lg pl-4 py-1">
        <p className="text-xs font-semibold text-gray-700 mb-1">Important Excerpt</p>
        <p className="text-xs text-gray-500 italic leading-relaxed">{result.excerpt}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-1">
        <Link href={`/ai-search/results/${result.id}`} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#135576] hover:bg-[#0d3f59] text-white text-xs font-medium transition-colors">
          <Eye className="w-3.5 h-3.5" />
          View Full Decision
        </Link>
        {/* <button
          onClick={() => onSave(result.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-medium transition-colors ${
            result.saved
              ? "border-[#135576] text-[#135576] bg-[#135576]/5"
              : "border-gray-200 text-gray-500 hover:border-[#135576] hover:text-[#135576]"
          }`}
        >
          <BookmarkPlus className="w-3.5 h-3.5" />
          {result.saved ? "Saved" : "Save to My Research"}
        </button> */}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface AiSearchResultsPageProps {
  query: string;
}

export default function AiSearchResultsPage({ query }: AiSearchResultsPageProps) {
  const [results, setResults] = useState<SearchResult[]>(DUMMY_RESULTS);

  const handleSave = (id: string) => {
    setResults((prev) =>
      prev.map((r) => (r.id === id ? { ...r, saved: !r.saved } : r))
    );
  };

  const meta = DUMMY_META;

  return (
    <div className="space-y-4">
      {/* ── Search Complete Banner ── */}
      <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span className="text-sm font-semibold text-gray-700">Search Complete</span>
          {query && (
            <span className="ml-1 text-xs text-gray-400 truncate max-w-xs">
              — &ldquo;{query}&rdquo;
            </span>
          )}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-2xl font-bold text-[#135576]">{meta.totalFound}</p>
            <p className="text-xs text-gray-400 mt-0.5">Similar Decisions Found</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-2xl font-bold text-[#135576]">{meta.highestSimilarity}%</p>
            <p className="text-xs text-gray-400 mt-0.5">Highest Similarity</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg flex gap-3 items-center">
            <Archive className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Archive</p>
              <p className="text-xs text-gray-400">{meta.database}</p>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg flex gap-3 items-center">
            <TrendingUp className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-gray-700">Ranked</p>
              <p className="text-xs text-gray-400">{meta.rankedBy}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Disclaimer ── */}
      <div className="flex items-start gap-2 bg-gray-100  rounded-xl px-4 py-3">
        <Info className="w-3.5 h-3.5 text-[#135576] shrink-0 mt-0.5" />
        <p className="text-xs text-gray-500 leading-relaxed">
          AI suggestions are generated only from real court decisions available in the
          database. Each result includes a source reference for verification.
        </p>
      </div>

      {/* ── Result Cards ── */}
      <div className="space-y-4">
        {results.map((result) => (
          <ResultCard key={result.id} result={result} onSave={handleSave} />
        ))}
      </div>
    </div>
  );
}