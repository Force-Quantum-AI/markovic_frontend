"use client";

import React from "react";

interface AdminButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  style?: React.CSSProperties;
}

export default function AdminButton({
  label,
  onClick,
  type = "button",
  className = "",
  icon,
  variant = "primary",
  disabled = false,
  style,
}: AdminButtonProps) {
  const baseStyles =
    "relative overflow-hidden group rounded-[32px] px-6 py-3 text-sm font-semibold transition-colors duration-300 ease-in-out flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

  const variantStyles = {
    primary: "bg-[#135576] text-white border border-[#135576] hover:text-[#135576]",
    secondary: "bg-transparent text-[#475467] border border-[#BEC4D2] hover:text-[#101828] hover:border-gray-400",
  };

  const slideStyles = {
    primary: "bg-white",
    secondary: "bg-[#EFF1F4]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {/* Slide up fill layer */}
      <span
        className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0 ${slideStyles[variant]}`}
      />

      {/* Content wrapper */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{label}</span>
      </span>
    </button>
  );
}
