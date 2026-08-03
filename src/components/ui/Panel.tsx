// UI Panel
export const Panel = ({ children, className = "", style = {} }) => (
  <div
    className={`rounded-2xl transition-all duration-300 bg-[var(--panel)] border border-[var(--border)] shadow-[var(--shadow-subtle)] ${className}`}
    style={style}
  >
    {children}
  </div>
);
