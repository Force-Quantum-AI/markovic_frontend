"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  Star, 
  Copy, 
  Printer, 
  FileText, 
  ChevronDown,
  Scale
} from "lucide-react";
import Image from "next/image";
import { useGetLawBylawDetailsQuery } from "@/store/features/lawAndBylaw/lawAndBylaw.api";
import { Skeleton } from "@/components/ui/skeleton";

export default function LawDetailsPage() {
  const params = useParams();
  const lawId = (params?.id as string) || "";
  
  const { data: lawDetailsData, isLoading, error } = useGetLawBylawDetailsQuery({ id: lawId });

  // States for interactive UI filters and copy feedback
  const [selectedSectionId, setSelectedSectionId] = useState("");
  const [selectedArticleId, setSelectedArticleId] = useState("all");
  const [copiedText, setCopiedText] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const sections = lawDetailsData?.sections || [];

  // Update selected section when data loads
  useEffect(() => {
    if (sections.length > 0 && !selectedSectionId) {
      setSelectedSectionId(sections[0].id.toString());
    }
  }, [sections, selectedSectionId]);

  const currentSection = useMemo(() => {
    return sections.find((s: { id: number; title: string; articles: { id: number; title: string; description?: string }[] }) => s.id.toString() === selectedSectionId) || sections[0];
  }, [sections, selectedSectionId]);

  const articles = currentSection?.articles || [];

  // Filtered Articles based on selection state matrix
  const displayedArticles = useMemo(() => {
    if (selectedArticleId === "all") {
      return articles;
    }
    return articles.filter((art: { id: number; title: string; description?: string }) => art.id.toString() === selectedArticleId);
  }, [articles, selectedArticleId]);

  // Copy Entire Text content utilities function
  const handleCopyFullText = () => {
    if (displayedArticles.length === 0) return;
    const rawTextContent = displayedArticles.map((art: { id: number; title: string; description?: string }) => 
      `${art.title}\n${art.description || ""}`
    ).join("\n\n");

    navigator.clipboard.writeText(rawTextContent).then(() => {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    });
  };

  // Inline dynamic browser text execution layout print string
  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white rounded-2xl p-4 space-y-6">
        <Skeleton className="h-10 w-36 rounded-full" />
        <Skeleton className="h-[300px] w-full rounded-[24px]" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-14 w-full rounded-full" />
          <Skeleton className="h-14 w-full rounded-full" />
        </div>
        <Skeleton className="h-[400px] w-full rounded-[28px]" />
      </div>
    );
  }

  if (error || !lawDetailsData) {
    return (
      <div className="min-h-screen bg-white rounded-2xl p-4 flex flex-col items-center justify-center text-red-500 font-roboto">
        <Scale className="w-12 h-12 mb-3 opacity-60 text-red-400" />
        <p className="text-lg font-medium">Failed to load law details</p>
        <p className="text-sm">Please check the connection or try again later.</p>
        <Link 
          href="/law-and-bylaw" 
          className="mt-4 px-4 py-2 bg-[#135576] text-white rounded-full text-xs font-bold hover:bg-[#135576]/90 transition-all"
        >
          Back to Laws & Bylaws
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white rounded-2xl p-1 md:p-4 font-sans selection:bg-[#135576]/10 print:bg-white print:p-0">
      
      {/* 1. Top Navigation Row */}
      <div className="max-w-[1600px] mx-auto mb-4 print:hidden">
        <Link 
          href="/law-and-bylaw" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 text-xs font-bold text-[#8a94a6] hover:text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Laws & Bylaws
        </Link>
      </div>

      {/* Main Framework Box Architecture Container Layout */}
      <div className="max-w-[1600px] mx-auto space-y-6">

        {/* 2. Hero Header Block Section */}
        <div className="w-full h-[60vh] md:h-fit bg-[#135576] rounded-[24px] p-6 md:p-8 text-white relative overflow-hidden shadow-xl shadow-blue-950/10 flex flex-col lg:flex-row justify-between items-start gap-6 print:border print:border-gray-300 print:text-black print:bg-white">
          
          <div className="space-y-4 max-w-3xl z-10">
            {/* Tag Badge Category indicator label */}
            <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-bold tracking-wide backdrop-blur-sm border border-white/10 print:border-black print:text-black">
              {lawDetailsData.category_name}
            </span>
            
            {/* Main Title Header string identifier */}
            <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight italic">
              {lawDetailsData.title}
            </h1>

            {/* Source mapping reference detail indicator */}
            <p className="text-sm opacity-80 font-medium">
              Source: <span className="underline decoration-white/40 underline-offset-4">{lawDetailsData.source || "Official Source"}</span>
            </p>

            {/* Revision metadata horizontal text string */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 pt-2 text-xs font-medium opacity-90 border-t border-white/10">
              <div>Official Gazette: <span className="font-semibold text-white print:text-black">{lawDetailsData.official_gazette}</span></div>
              <div className="hidden sm:inline w-1 h-1 bg-white/40 rounded-full" />
              <div>Last Updated: <span className="font-semibold text-white print:text-black">{lawDetailsData.last_updated}</span></div>
            </div>
          </div>

          {/* Functional Floating Tools Widget Button Options Array Grid Right Panel */}
          <div className="absolute right-1/2 md:right-5 bottom-5 translate-x-1/2 md:translate-x-0 flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch sm:items-center gap-2.5 px-3 md:px-0 w-full md:w-auto z-10 print:hidden">
            
            <button 
              onClick={handleCopyFullText}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/20 transition-all text-white active:scale-98"
            >
              <Copy className="w-4 h-4" />
              {copiedText ? "Copied!" : "Copy Full Text"}
            </button>

            <button 
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/20 transition-all text-white active:scale-98"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/20 transition-all text-white active:scale-98"
            >
              <FileText className="w-4 h-4" />
              Export as PDF
            </button>
          </div>

          {/* Absolute Background Graphics Image Composition Panel */}
          <div className="absolute right-8 bottom-0 top-0 hidden xl:block pointer-events-none w-96 h-full">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <Image
                src="/lawImgForLawDetailsPage.png"
                alt="Law and Bylaw"
                fill
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Absolute Top-Right Star Favorite Layout Overlay Toggle Option */}
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 border border-white/10 hover:bg-white/20 text-white transition-all print:hidden"
          >
            <Star className={`w-5 h-5 ${isFavorite || lawDetailsData.bookmark ? "fill-amber-400 stroke-amber-400" : ""}`} />
          </button>
        </div>


        {/* 3. Dropdown Selection Navigation Section Filters Menu */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:hidden">
          
          {/* Section Dynamic Controller Select Option */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1">Sections:</label>
            <div className="relative w-full">
              <select
                value={selectedSectionId}
                onChange={(e) => {
                  setSelectedSectionId(e.target.value);
                  setSelectedArticleId("all");
                }}
                className="w-full px-5 py-4 border border-gray-200/80 rounded-full text-sm font-semibold text-gray-800 bg-gray-100 outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] appearance-none cursor-pointer shadow-sm pr-12 transition-all"
              >
                {sections.map((sec: { id: number; title: string }) => (
                  <option key={sec.id} value={sec.id.toString()}>{sec.title}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Article Dynamic Dropdown Selection list filter trigger */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1">Article:</label>
            <div className="relative w-full">
              <select
                value={selectedArticleId}
                onChange={(e) => setSelectedArticleId(e.target.value)}
                className="w-full px-5 py-4 border border-gray-200/80 rounded-full text-sm font-semibold text-gray-800 bg-gray-100 outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576] appearance-none cursor-pointer shadow-sm pr-12 transition-all"
              >
                <option value="all">All Articles</option>
                {articles.map((art: { id: number; title: string }) => (
                  <option key={art.id} value={art.id.toString()}>{art.title}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4 text-gray-400" />
            </div>
          </div>

        </div>


        {/* 4. Article Full Content Viewer Panel Sheet */}
        <div className="w-full bg-gray-100 border border-gray-200 rounded-[28px] p-6 md:p-10 space-y-8 shadow-sm print:border-none print:p-0">
          
          {displayedArticles.length === 0 ? (
            <div className="py-20 text-center text-gray-400 text-sm font-medium">
              No matching articles found in this section.
            </div>
          ) : (
            displayedArticles.map((article: { id: number; title: string; description?: string }, idx: number) => (
              <div 
                key={article.id} 
                className={`space-y-3.5 pb-8 ${
                  idx !== displayedArticles.length - 1 ? "border-b border-gray-200 " : ""
                } print:pb-6 print:break-inside-avoid`}
              >
                {/* Article Header */}
                <h3 className="text-lg font-bold text-[#1a202c] tracking-tight">
                  <span>{article.title}</span>
                </h3>

                {/* Article Detailed Body Segment Iterations Area */}
                <div className="space-y-3 text-sm md:text-base text-gray-600 leading-relaxed font-normal">
                  {article.description?.split("\n").map((paragraph: string, pIdx: number) => (
                    <p key={pIdx} className="text-justify whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}