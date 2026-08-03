// CustomSelect
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export function CustomSelect({
  value,
  options,
  onChange,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between rounded-xl px-2.5 py-1 text-[12px] outline-none transition-all duration-200 font-medium bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text)] focus:border-[var(--accent)] focus:shadow-[0_0_0_4px_var(--accent-soft)]"
      >
        <span>{selected?.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)] text-[var(--text-faint)] ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 mt-2 rounded-xl overflow-hidden z-30 py-1.5 transition-all animate-in fade-in slide-in-from-top-2 duration-200 bg-[var(--panel)] border border-[var(--border-strong)] shadow-[var(--shadow-dropdown)]">
          {options.map((o) => {
            const active = o.value === value;
            return (
              <button
                key={o.value}
                type="button"
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-1.5 text-[12px] text-left transition-colors font-medium hover:bg-[var(--panel-subtle)]"
                style={{ color: active ? "var(--accent)" : "var(--text)" }}
              >
                <span>{o.label}</span>
                {active && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
