"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Scale, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center">
        
        {/* Decorative Icon */}
        <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Scale className="w-10 h-10 text-[#135576]" />
        </div>

        {/* Text Content */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">404</h1>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable in the Law Office System.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => router.back()}
            className="w-full flex items-center justify-center gap-2 bg-[#135576] hover:bg-[#0f4661] text-white py-3 rounded-full font-bold transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          
          <button
            onClick={() => router.push("/")}
            className="w-full py-3 rounded-full font-bold text-gray-500 hover:bg-gray-100 transition-all text-sm"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}