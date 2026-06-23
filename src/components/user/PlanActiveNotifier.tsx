"use client";

import { useRouter } from "next/navigation";

export const PlanActiveNotifier = () => {
    const router = useRouter();
    
    return (
        <div className="bg-[#FFF9D2] border border-[#F59E0B]/30 rounded-2xl px-4 py-2 mb-5 flex justify-center md:justify-between items-center gap-3 shadow-sm">
            <h1 className="text-xs md:text-base text-black">You are using free trial for 7 days. Please upgrade your subscription plan to get full access.</h1>
            <button onClick={() => router.push("/settings")} className="text-xs md:text-base text-white bg-[#F59E0B]/90 hover:bg-[#F59E0B] hover:scale-105 transition-all duration-300 rounded-full px-4 py-2 cursor-pointer text-nowrap">Upgrade Plan</button>
        </div>
    );
};