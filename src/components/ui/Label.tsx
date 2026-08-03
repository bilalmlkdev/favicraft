// UI Label
import React from "react";

export const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="text-[11px] font-semibold tracking-wide uppercase block text-[var(--text-muted)]">
    {children}
  </label>
);
