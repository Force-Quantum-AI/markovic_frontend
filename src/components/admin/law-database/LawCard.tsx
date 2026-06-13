"use client";

import React from "react";
import { Scale, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Law {
  id: string;
  title: string;
  gazette: string;
  lastUpdate: string;
  category: string;
}

interface LawCardProps {
  law: Law;
  onEdit?: (law: Law) => void;
  onDelete?: (law: Law) => void;
}

export default function LawCard({ law, onEdit, onDelete }: LawCardProps) {
  const handleAction = (action: "edit" | "delete") => {
    if (action === "edit" && onEdit) {
      onEdit(law);
    } else if (action === "delete" && onDelete) {
      onDelete(law);
    }
  };

  return (
    <div 
      style={{
        borderRadius: "16px",
        border: "1px solid #EFF1F4",
        background: "#F9F8F6",
        padding: "16px",
      }}
      className="relative flex flex-col justify-between w-full h-[220px] shadow-xs hover:shadow-md transition-all duration-200"
    >
      
      <div className="flex justify-between items-start w-full">
        <div 
          style={{
            borderRadius: "6px",
            background: "#135576",
            padding: "8px"
          }}
          className="flex items-center justify-center shrink-0 text-white"
        >
          <Scale className="w-5 h-5" />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-[#000] hover:bg-black/5 p-1.5 rounded-full transition-all cursor-pointer focus:outline-none shrink-0">
              <MoreVertical className="w-4 h-4 text-[#000]" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-32 bg-white rounded-2xl shadow-lg border border-[#EFF1F4] p-1.5 font-roboto"
          >
            <DropdownMenuItem 
              onClick={() => handleAction("edit")}
              className="flex items-center px-4 py-2.5 text-[15px] font-medium text-[#292E38] rounded-xl hover:bg-slate-50 cursor-pointer focus:bg-slate-50 focus:outline-none transition-colors"
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleAction("delete")}
              className="flex items-center px-4 py-2.5 text-[15px] font-medium text-[#292E38] rounded-xl hover:bg-slate-50 cursor-pointer focus:bg-slate-50 focus:outline-none transition-colors text-slate-800"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-2.5 mt-3 flex-1 flex flex-col justify-center">
        <h4 
          style={{
            color: "#292E38",
            fontFamily: "Roboto, sans-serif",
            fontSize: "20px",
            fontWeight: 500,
            lineHeight: "26px",
          }}
          className="line-clamp-2"
        >
          {law.title}
        </h4>

        <div className="flex flex-wrap items-baseline gap-1">
          <span 
            style={{
              color: "#292E38",
              fontFamily: "Roboto, sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "18.2px"
            }}
          >
            Official Gazette:
          </span>
          <span 
            style={{
              color: "#667085",
              fontFamily: "Roboto, sans-serif",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "19.6px"
            }}
          >
            {law.gazette}
          </span>
        </div>
      </div>



      <div className="flex justify-between items-end mt-4 pt-3 border-t border-gray-100 w-full">
        <div className="flex items-center gap-1">
          <span 
            style={{
              color: "#3C4250",
              fontFamily: "Roboto, sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              lineHeight: "16.8px",
              textTransform: "capitalize"
            }}
          >
            Last update:
          </span>
          <span 
            style={{
              color: "#3C4250",
              fontFamily: "Roboto, sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              lineHeight: "16.8px",
              textTransform: "capitalize"
            }}
          >
            {law.lastUpdate}
          </span>
        </div>

        <div 
          style={{
            padding: "6px 8px",
            borderRadius: "20px",
            border: "1px solid #DDE0E7",
            background: "#EFF1F4",
            color: "#292E38",
            fontFamily: "Roboto, sans-serif",
            fontSize: "12px",
            fontWeight: 500,
            lineHeight: "12px"
          }}
        >
          {law.category}
        </div>
      </div>

    </div>
  );
}
