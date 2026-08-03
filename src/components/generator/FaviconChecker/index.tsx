// FaviconChecker – main
import { useState } from "react";
import { Search, XCircle } from "lucide-react";
import { Panel } from "../../ui/Panel";
import { ResultDisplay } from "./ResultDisplay";
import { useFaviconChecker } from "../../../hooks/useFaviconChecker";

export function FaviconChecker() {
  const [domain, setDomain] = useState("");
  const { loading, result, error, handleCheck } = useFaviconChecker();

  const onCheck = () => {
    handleCheck(domain);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      <Panel className="p-4 space-y-3">
        <div>
          <h3 className="text-[13px] font-bold tracking-tight text-[var(--text)]">
            Website Checker
          </h3>
          <p className="text-[12px] mt-0.5 font-medium text-[var(--text-muted)]">
            Enter a domain to check its favicon, icon files, and page metadata.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="flex-1 relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] font-medium text-[var(--text-faint)] pointer-events-none select-none">
              https://
            </span>
            <input
              type="text"
              placeholder="example.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onCheck()}
              className="w-full rounded-lg pl-[70px] pr-3 py-2.5 text-[13px] font-medium outline-none transition-all duration-200 bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text)] focus:border-[var(--accent)] focus:shadow-[0_0_0_4px_var(--accent-soft)]"
            />
          </div>
          <button
            onClick={onCheck}
            disabled={loading}
            className="px-5 py-2.5 rounded-full text-[13px] font-semibold flex items-center gap-2 transition-all hover:opacity-90 active:scale-95 bg-[var(--accent)] text-white shadow-sm"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin border-white" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            {loading ? "Checking…" : "Check"}
          </button>
        </div>
        <p className="text-[11px] text-[var(--text-faint)] mt-1">
          Favicon preview uses Google's favicon service. Icon files are probed
          directly; page metadata is fetched via a proxy since browsers can't
          read another site's HTML directly.
        </p>
      </Panel>

      {error && (
        <Panel className="p-4 border-red-200 bg-red-50/50">
          <p className="text-[13px] text-red-600 flex items-center gap-2">
            <XCircle className="w-4 h-4" /> {error}
          </p>
        </Panel>
      )}

      {result && <ResultDisplay result={result} onRetry={onCheck} />}
    </div>
  );
}
