// UI IconPreview
import React from "react";

export const IconPreview = ({
  image,
  size = 56,
  className = "",
}: {
  image: string | null;
  size?: number;
  className?: string;
}) => (
  <div
    className={`rounded-[22%] overflow-hidden flex flex-col flex-shrink-0 shadow-sm transition-all duration-300 bg-[var(--panel)] border border-[var(--border-strong)] ${className}`}
    style={{ width: size, height: size }}
  >
    {image ? (
      <img src={image} className="w-full h-full object-cover" alt="" />
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <svg
          className="w-1/2 h-1/2 animate-spin text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    )}
  </div>
);
