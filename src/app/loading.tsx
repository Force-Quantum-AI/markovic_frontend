"use client";

import { LoaderPinwheel, Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-linear-to-b from-gray-50 to-white z-50">
      
      <div className="relative flex flex-col items-center max-w-lg text-center px-6">
        
        {/* Modern Custom Glowing Spinner */}
        <div className="relative w-20 h-20 mb-8">
          {/* Outer Ring with Glow */}
          <div className="absolute inset-0 rounded-full border-4 border-t-[#0c5174] border-r-transparent border-b-[#156e9c] border-l-transparent animate-spin" />
          
          {/* Inner Counter-Rotating Ring */}
          <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-emerald-400 border-b-transparent border-l-emerald-300 animate-[spin_1.5s_linear_infinite_reverse]" />
          
          {/* Center Brand Core Accent */}
          <div className="absolute inset-5 bg-white rounded-full shadow-sm flex items-center justify-center">
            <LoaderPinwheel className="w-4 h-4 text-[#0c5174]" />
          </div>
        </div>

        {/* Shimmering Text Brand Block */}
        <h2 className="text-xl text-gray-700 tracking-tight mb-2">
          Preparing Your Dashboard, Please Wait...
        </h2>
        
        {/* Animated Progress Track */}
        <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden relative mb-3">
          <div className="absolute inset-y-0 bg-linear-to-r from-[#0c5174] to-emerald-400 w-1/2 rounded-full animate-[loading-bar_1.8s_ease-in-out_infinite]" />
        </div>

      </div>

      {/* Embedded Global Keyframes Injection */}
      <style jsx global>{`
        @keyframes loading-bar {
          0% {
            left: -50%;
            width: 30%;
          }
          50% {
            width: 60%;
          }
          100% {
            left: 100%;
            width: 30%;
          }
        }
      `}</style>

    </div>
  );
}