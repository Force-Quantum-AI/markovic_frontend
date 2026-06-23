"use client";

import { FileXCorner } from "lucide-react";

export const NoContent = ({ message, icon }: { message?: string, icon?: React.ReactNode }) => {
    return (
        <div className="text-center text-gray-500 bg-gray-100 rounded-2xl py-6 flex flex-col justify-center items-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ">
            <div className="p-3 mb-2 rounded-full bg-gray-200 animate-pulse">
                {icon ? icon : <FileXCorner />}
            </div>
            {message ? message : "No Content Available"}
        </div>
    )
}
