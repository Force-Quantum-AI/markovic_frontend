"use client";

import { useState, useRef, useEffect } from "react";
import {
    Search,
    Mail,
    MessageSquare,
    Code2,
    Paperclip,
    ArrowUp,
    Plus,
    MoreVertical,
    History,
    SlidersHorizontal,
    X,
    FileText,
    File,
    Loader2,
} from "lucide-react";
import { AiSearchFilters } from "@/types/ai";
import AiFilters from "@/components/user/ai/AiFilters";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
    useAiSearchMutation, 
    useGetAiSearchHistoryQuery, 
    useDeleteAnAiCaseHistoryMutation 
} from "@/store/features/Ai/ai.api";
import { useGetProfileInfoQuery } from "@/store/features/profile/profile.api";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChatSession {
    id: string;
    title: string;
    active?: boolean;
}

// ─── Dummy Data ───────────────────────────────────────────────────────────────

const DUMMY_SESSIONS: ChatSession[] = [
    { id: "1", title: "Traffic Accident Compen...", active: true },
    { id: "2", title: "Legal Case Search..." },
    { id: "3", title: "Property Dispute..." },
    { id: "4", title: "Contract Law ..." },
    { id: "5", title: "Employment Rights Case..." },
    { id: "6", title: "Civil Litigation Research..." },
    { id: "7", title: "Criminal Defense Strategy..." },
    { id: "8", title: "Family Law Documents..." },
    { id: "9", title: "Insurance Claim Review..." },
    { id: "10", title: "Corporate Law Analysis..." },
    { id: "11", title: "Real Estate Dispute..." },
    { id: "12", title: "Intellectual Property Case..." },
    { id: "13", title: "Tax Law Consultation..." },
    { id: "14", title: "Immigration Law Query..." },
];

const PROMPT_SUGGESTIONS = [
    {
        icon: Search,
        label: "Search for traffic accident compensation cases",
    },
    {
        icon: Mail,
        label: "Draft a legal brief for contract dispute",
    },
    {
        icon: MessageSquare,
        label: "Summarize this court decision in one paragraph",
    },
    {
        icon: Code2,
        label: "Analyze precedents for property law",
    },
];

function getGreeting(): string {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({
    sessions,
    activeId,
    onSelect,
    onNew,
    searchQuery,
    onSearch,
    onDelete,
}: {
    sessions: ChatSession[];
    activeId: string;
    onSelect: (id: string) => void;
    onNew: () => void;
    searchQuery: string;
    onSearch: (v: string) => void;
    onDelete?: (id: string) => void;
}) {
    const filtered = sessions.filter((s) =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full">
            {/* New chat */}
            <button
                onClick={onNew}
                className="flex items-center gap-2 px-3 py-2.5 mb-3 rounded-xl border border-gray-200 bg-[#A1BBC8]/50 hover:bg-gray-50 text-sm font-medium text-[#135576] transition-colors w-full"
            >
                <Plus className="w-4 h-4 text-gray-500" />
                New chat
            </button>

            {/* Search */}
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search chat"
                    value={searchQuery}
                    onChange={(e) => onSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#135576]/20 focus:border-[#135576]"
                />
            </div>

            {/* Session list */}
            <div className="px-2 py-3 bg-[#A1BBC8]/10 rounded-lg h-full">
                <p className="text-xs font-semibold text-[#135576] mb-2 px-1">
                    Recents AI Search
                </p>
                <div className="flex-1 overflow-y-auto space-y-0.5  ">
                    {filtered.map((s) => (
                        <div
                            key={s.id}
                            className={`group flex items-center justify-between px-2 py-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-200 ${activeId === s.id
                                ? "bg-[#135576]/8 border border-[#135576]/15"
                                : "hover:bg-gray-50"
                                }`}
                        >
                            <div 
                                onClick={() => onSelect(s.id)}
                                className="flex items-center gap-2 min-w-0 flex-1"
                            >
                                <FileText
                                    className={`w-4 h-4 shrink-0 ${activeId === s.id ? "text-[#135576]" : "text-gray-400"
                                        }`}
                                />
                                <span
                                    className={`text-sm truncate ${activeId === s.id
                                        ? "text-[#135576] font-medium"
                                        : "text-gray-600"
                                        }`}
                                >
                                    {s.title}
                                </span>
                            </div>
                            {/* <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete?.(s.id);
                                }}
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-gray-200"
                            >
                                <X className="w-3.5 h-3.5 text-gray-400 hover:text-red-500" />
                            </button> */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface AiSearchPageProps {
    filters: AiSearchFilters;
    setFilters: React.Dispatch<React.SetStateAction<AiSearchFilters>>;
}

export default function AiSearchPage() {
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [activeId, setActiveId] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [inputFile, setInputFile] = useState<File | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    const { data: profileInfo } = useGetProfileInfoQuery({});
    const userId = profileInfo?.id || "";

    const { data: historyData } = useGetAiSearchHistoryQuery({ user_id: userId }, { skip: !userId });
    const [deleteHistory] = useDeleteAnAiCaseHistoryMutation();
    const [searchApi, { isLoading }] = useAiSearchMutation();

    useEffect(() => {
        if (historyData?.search_histories) {
            const loadedSessions = historyData.search_histories.map((h: any) => ({
                id: h.search_history_id.toString(),
                title: h.user_case_scenario,
            }));
            setSessions(loadedSessions);
        }
    }, [historyData]);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [inputValue]);

    const handleNewChat = () => {
        setActiveId("");
        setInputValue("");
        setInputFile(null);
    };

    const handleDelete = async (id: string) => {
        if (!userId) return;
        try {
            await deleteHistory({ user_id: userId, search_history_id: parseInt(id) }).unwrap();
            setSessions(prev => prev.filter(s => s.id !== id));
            if (activeId === id) setActiveId("");
        } catch (e) {
            console.error("Failed to delete history", e);
        }
    };

    const handleSelectSession = (id: string) => {
        setActiveId(id);
        router.push(`/ai-search/results?id=${id}`);
    };

    const handleSend = async (text?: string) => {
        const msg = (text ?? inputValue).trim();
        if (!msg || !userId) return;
        setInputValue("");
        
        try {
            const res = await searchApi({
                user_id: userId,
                case_scenario: msg,
                file: inputFile
            }).unwrap();
            
            const historyId = res?.search_history_id || res?.data?.search_history_id || res?.id;
            
            if (historyId) {
                router.push(`/ai-search/results?id=${historyId}`);
            } else {
                router.push(`/ai-search/results?q=${encodeURIComponent(msg)}`);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex gap-3 h-[calc(85vh-80px)] min-h-[600px]">
            {/* ── Desktop Sidebar ── */}
            <aside className="hidden lg:flex flex-col w-64 xl:w-72 shrink-0 bg-white border border-gray-200 rounded-xl p-3 overflow-hidden">
                <Sidebar
                    sessions={sessions}
                    activeId={activeId}
                    onSelect={handleSelectSession}
                    onNew={handleNewChat}
                    searchQuery={searchQuery}
                    onSearch={setSearchQuery}
                    onDelete={handleDelete}
                />
            </aside>

            {/* ── Main Content ── */}
            <div className="sticky top-0 left-0 flex-1 flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden min-w-0">
                {/* Mobile top bar */}
                <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-gray-100">
                    <button
                        onClick={() => { setSidebarOpen(true); setFilterOpen(false); }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        <History className="w-4 h-4" />
                        History
                    </button>
                    <span className="text-sm font-semibold text-[#135576]">AI Search</span>
 
                </div>

                {/* Welcome area */}
                <div className="flex-1 flex flex-col overflow-y-auto">
                    <div className="relative h-16 w-26 mx-auto">
                        <Image src="/brandLogo.png" alt="Logo" fill className=" object-contain" />               
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 text-center">
                        <h1 className="text-2xl md:text-3xl font-bold text-[#135576] mb-1">
                            {getGreeting()}, Wade
                        </h1>
                        <p className="text-sm font-medium text-gray-600 mb-8">
                            What&apos;s on your mind?
                        </p>

                        <p className="text-xs text-gray-400 self-start mb-3 w-full max-w-2xl mx-auto">
                            Get started with an example below
                        </p>

                        {/* Prompt cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-2xl mx-auto">
                            {PROMPT_SUGGESTIONS.map(({ icon: Icon, label }) => (
                                <button
                                    key={label}
                                    onClick={() => handleSend(label)}
                                    className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border border-gray-200 bg-white hover:border-[#135576]/30 hover:bg-[#135576]/5 hover:shadow-sm transition-all text-center group"
                                >
                                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-[#135576] transition-colors" />
                                    <span className="text-xs text-gray-500 leading-snug group-hover:text-gray-700 transition-colors">
                                        {label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                            
                    {/* Input box */}
                    <div className="px-4 pb-4 ">
                        <div className="max-w-2xl mx-auto w-full border border-gray-200 rounded-2xl bg-gray-50 overflow-hidden focus-within:ring-2 focus-within:ring-[#135576]/20 focus-within:border-[#135576] transition-all">
                            <textarea
                                ref={textareaRef}
                                rows={1}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask AI a question or make a request..."
                                className="w-full px-4 pt-4 pb-2 bg-transparent text-sm text-gray-700 placeholder-gray-400 resize-none focus:outline-none max-h-40"
                            />

                            {/* Hidden file input */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    setInputFile(file);
                                }}
                                className="hidden"
                            />

                            <div className="flex items-center justify-between px-3 pb-3 pt-1">
                                {
                                    inputFile ? (
                                        <div className="flex items-center gap-1.5">
                                            <File className="w-3.5 h-3.5" />
                                            <span className="text-xs text-gray-500">{inputFile.name}</span>
                                            <button onClick={() => setInputFile(null)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                                                <X className="w-3.5 h-3.5" />
                                                Remove
                                            </button>
                                        </div>
                                    ) : (
                                        <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                                            <Paperclip className="w-3.5 h-3.5" />
                                            Attach
                                        </button>
                                    )}
                                <button
                                    onClick={() => handleSend()}
                                    disabled={!inputValue.trim() || isLoading}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${inputValue.trim() && !isLoading
                                        ? "bg-[#135576] hover:bg-[#0d3f59] shadow-sm"
                                        : "bg-gray-300 cursor-not-allowed"
                                        }`}
                                >
                                    {isLoading ? <Loader2 className="w-4 h-4 text-white animate-spin" />
                                        : <ArrowUp className="w-4 h-4 text-white" />
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Mobile Modals ── */}

            {/* Sidebar modal */}
            {sidebarOpen && (
                <div className="lg:hidden fixed inset-0 z-50 flex">
                    <div
                        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <div className="relative w-72 max-w-[85vw] bg-white h-full shadow-2xl p-4 flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-semibold text-gray-700">Chat History</span>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center"
                            >
                                <X className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>
                        <Sidebar
                            sessions={sessions}
                            activeId={activeId}
                            onSelect={(id) => { handleSelectSession(id); setSidebarOpen(false); }}
                            onNew={() => { handleNewChat(); setSidebarOpen(false); }}
                            searchQuery={searchQuery}
                            onSearch={setSearchQuery}
                            onDelete={handleDelete}
                        />
                    </div>
                </div>
            )}

        </div>
    );
}