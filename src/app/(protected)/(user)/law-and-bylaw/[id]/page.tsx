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
import { jsPDF } from "jspdf";

// ─── TYPES & INTERFACES ──────────────────────────────────────────────────────

interface Article {
  id: string;
  title: string;
  subtitle?: string;
  content: string[];
}

interface Chapter {
  id: string;
  title: string;
  articles: Article[];
}

interface Section {
  id: string;
  title: string;
  chapters: Chapter[];
}

interface LawData {
  id: string;
  title: string;
  category: string;
  source: string;
  effectiveDate: string;
  lastAmended: string;
  sections: Section[];
}

// ─── MOCK DATA (MATCHING FIGMA AND SCALABLE FOR API REPLACEMENT) ─────────────

const mockLawDataset: Record<string, LawData> = {
  "obligations": {
    id: "obligations",
    title: "Law on Obligations",
    category: "Civil Law",
    source: "Official Gazette of Montenegro",
    effectiveDate: "1 January 2008",
    lastAmended: "8 Sep, 2020",
    sections: [
      {
        id: "general-part",
        title: "Part One: General Part",
        chapters: [
          {
            id: "basic-principles",
            title: "Chapter 1: Basic Principles",
            articles: [
              {
                id: "article-1",
                title: "Article 1 – Scope of the Law",
                content: [
                  "This Law regulates obligatory relations that arise from contracts, causing damage, unjust enrichment, conducting affairs without order, unilateral expression of will, and other legal facts."
                ]
              },
              {
                id: "article-2",
                title: "Article 2 – Freedom of Contracting",
                content: [
                  "Parties are free to regulate their obligatory relations, within the limits set by law and moral principles."
                ]
              },
              {
                id: "article-16",
                title: "Article 16 – Prohibition of Causing Damage",
                content: [
                  "Everyone is obliged to refrain from actions by which damage could be caused to another."
                ]
              },
              {
                id: "article-172",
                title: "Article 172 – Compensation for Non-Material Damage",
                subtitle: "(Highly Important)",
                content: [
                  "(1) For physical pain, mental suffering, fear, reduced life activities, disfigurement, violation of personal dignity, honor and reputation, as well as other forms of suffering, the injured party is entitled to just compensation.",
                  "(2) When determining the amount of compensation, the court shall take into account the intensity and duration of the physical and mental pain and suffering, the degree of guilt of the tortfeasor, and all other circumstances of the case.",
                  "(3) In the case of violation of personality rights, the court may also award compensation in the form of publication of the judgment or correction of the statement."
                ]
              },
              {
                id: "article-199",
                title: "Article 199 – Compensation for Non-Material Damage",
                subtitle: "(Highly Important)",
                content: [
                  "(1) For physical pain, mental suffering, fear, reduced life activities, disfigurement, violation of personal dignity, honor and reputation, as well as other forms of suffering, the injured party is entitled to just compensation.",
                  "(2) When determining the amount of compensation, the court shall take into account the intensity and duration of the physical and mental pain and suffering, the degree of guilt of the tortfeasor, and all other circumstances of the case.",
                  "(3) In the case of violation of personality rights, the court may also award compensation in the form of publication of the judgment or correction of the statement."
                ]
              },
              {
                id: "article-200",
                title: "Article 200 – Liability for Damage",
                content: [
                  "The provisions on divided liability and reduction of compensation applicable to material damage shall apply accordingly to non-material damage."
                ]
              },
              {
                id: "article-206",
                title: "Article 206 – Joint and Several Liability",
                content: [
                  "(1) If several persons cause damage together, they shall be jointly and severally liable.",
                  "(2) When determining the amount of compensation, the court shall take into account the intensity and duration of the physical and mental pain and suffering, the degree of guilt of the tortfeasor, and all other circumstances of the case."
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};

// ─── COMPONENT IMPLEMENTATION ────────────────────────────────────────────────

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
    return sections.find((s: any) => s.id.toString() === selectedSectionId) || sections[0];
  }, [sections, selectedSectionId]);

  const articles = currentSection?.articles || [];

  // Filtered Articles based on selection state matrix
  const displayedArticles = useMemo(() => {
    if (selectedArticleId === "all") {
      return articles;
    }
    return articles.filter((art: any) => art.id.toString() === selectedArticleId);
  }, [articles, selectedArticleId]);

  // Copy Entire Text content utilities function
  const handleCopyFullText = () => {
    if (displayedArticles.length === 0) return;
    const rawTextContent = displayedArticles.map((art: any) => 
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

  const handleExportPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;

    let y = margin;

    const checkPageBreak = (neededHeight: number) => {
      if (y + neededHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
    };

    // Title
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(22);
    const titleLines = doc.splitTextToSize(lawData.title, contentWidth);
    const titleHeight = titleLines.length * 8;
    checkPageBreak(titleHeight + 10);
    doc.text(titleLines, margin, y);
    y += titleHeight + 10;

    // Metadata
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);

    const metadata = [
      { label: "Source:", value: lawData.source },
      { label: "Category:", value: lawData.category },
      { label: "Effective Date:", value: lawData.effectiveDate },
      { label: "Last Amended:", value: lawData.lastAmended },
    ];

    metadata.forEach((item) => {
      if (item.value) {
        doc.setFont("Helvetica", "bold");
        const labelText = item.label;
        const labelWidth = doc.getTextWidth(labelText) + 2;

        doc.setFont("Helvetica", "normal");
        const valueLines = doc.splitTextToSize(String(item.value), contentWidth - labelWidth);
        const valHeight = valueLines.length * 5;

        checkPageBreak(valHeight + 4);

        doc.setFont("Helvetica", "bold");
        doc.setTextColor(80, 80, 80);
        doc.text(labelText, margin, y);

        doc.setFont("Helvetica", "normal");
        doc.setTextColor(120, 120, 120);
        doc.text(valueLines, margin + labelWidth, y);

        y += valHeight + 2;
      }
    });

    y += 5;

    // Divider Line
    checkPageBreak(5);
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    // Sections & Chapters & Articles
    if (lawData.sections && lawData.sections.length > 0) {
      lawData.sections.forEach((section) => {
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(19, 85, 118);
        
        const secLines = doc.splitTextToSize(section.title, contentWidth);
        const secHeight = secLines.length * 6;
        checkPageBreak(secHeight + 8);
        doc.text(secLines, margin, y);
        y += secHeight + 6;

        if (section.chapters && section.chapters.length > 0) {
          section.chapters.forEach((chapter) => {
            doc.setFont("Helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(60, 60, 60);

            const chapLines = doc.splitTextToSize(chapter.title, contentWidth);
            const chapHeight = chapLines.length * 5;
            checkPageBreak(chapHeight + 6);
            doc.text(chapLines, margin, y);
            y += chapHeight + 4;

            if (chapter.articles && chapter.articles.length > 0) {
              chapter.articles.forEach((article) => {
                doc.setFont("Helvetica", "bold");
                doc.setFontSize(11);
                doc.setTextColor(40, 40, 40);

                const artTitle = article.subtitle
                  ? `${article.title} (${article.subtitle})`
                  : article.title;

                const artLines = doc.splitTextToSize(artTitle, contentWidth);
                const artHeight = artLines.length * 5;
                
                doc.setFont("Helvetica", "normal");
                doc.setFontSize(10);
                doc.setTextColor(80, 80, 80);

                const fullContentStr = article.content.join("\n\n");
                const descLines = doc.splitTextToSize(fullContentStr, contentWidth);
                const descHeight = descLines.length * 5;

                checkPageBreak(artHeight + descHeight + 12);

                doc.setFont("Helvetica", "bold");
                doc.text(artLines, margin, y);
                y += artHeight + 2;

                doc.setFont("Helvetica", "normal");
                doc.text(descLines, margin, y);
                y += descHeight + 8;
              });
            }
          });
        }
      });
    }

    doc.save(`${lawData.title.replace(/\s+/g, "_")}.pdf`);
  };

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
              onClick={handleExportPDF}
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
                {sections.map((sec: any) => (
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
                {articles.map((art: any) => (
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
            displayedArticles.map((article: any, idx: number) => (
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