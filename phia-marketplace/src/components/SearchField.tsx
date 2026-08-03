"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";

export default function SearchField({
  value,
  onChange,
  placeholder,
  withIcon = false,
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  withIcon?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center h-[35px] border border-[#e3e3e3] rounded-[6px] focus-within:border-[#1a1a1a] transition-colors ${className}`}
    >
      {withIcon && (
        <MagnifyingGlass
          size={12}
          weight="regular"
          className="absolute left-[13px] shrink-0 text-[#999] pointer-events-none"
        />
      )}
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`h-full w-full bg-transparent text-[13px] placeholder:text-[#999] focus:outline-none ${
          withIcon ? "pl-[33px]" : "pl-3"
        } ${value ? "pr-[54px]" : "pr-3"}`}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 text-[13px] text-[#999] hover:text-[#1a1a1a] transition-colors"
        >
          Clear
        </button>
      )}
    </div>
  );
}
