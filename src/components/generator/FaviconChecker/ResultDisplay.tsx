// ResultDisplay – shows favicon, icon files, and metadata
import {
  CheckCircle2,
  XCircle,
  Copy,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  Globe,
} from "lucide-react";
import { useState } from "react";
import { Panel } from "../../ui/Panel";
import { IconPreview } from "../../ui/IconPreview";

interface CheckResult {
  domain: string;
  faviconUrl: string;
  meta: SiteMeta | null;
  metaError: string | null;
  icons: IconProbe[];
}

interface SiteMeta {
  title: string | null;
  description: string | null;
  ogImage: string | null;
  logo: string | null;
  publisher: string | null;
  themeColor: string | null;
}

interface IconProbe {
  label: string;
  path: string;
  found: boolean;
}

interface Props {
  result: CheckResult;
  onRetry: () => void;
}

export function ResultDisplay({ result, onRetry }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.faviconUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Panel className="p-4 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-[13px] font-bold tracking-tight text-[var(--text)]">
              Favicon
            </h3>
            <p className="text-[12px] mt-0.5 font-medium text-[var(--text-muted)]">
              For{" "}
              <span className="font-semibold text-[var(--text)]">
                {result.domain}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1.5 transition-all hover:bg-opacity-80 bg-[var(--panel)] border border-[var(--border-strong)] text-[var(--text)]"
            >
              {copied ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              {copied ? "Copied!" : "Copy URL"}
            </button>
            <button
              onClick={() => window.open(result.faviconUrl, "_blank")}
              className="px-3 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1.5 transition-all hover:bg-opacity-80 bg-[var(--panel)] border border-[var(--border-strong)] text-[var(--text)]"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Open
            </button>
            <button
              onClick={onRetry}
              className="px-3 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1.5 transition-all hover:bg-opacity-80 bg-[var(--panel)] border border-[var(--border-strong)] text-[var(--text)]"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retry
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <IconPreview image={result.faviconUrl} size={64} />
          <div className="space-y-0.5">
            <div className="text-[12px] font-semibold text-[var(--text)]">
              Preview
            </div>
            <div className="text-[11px] text-[var(--text-muted)] break-all">
              {result.faviconUrl}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {[16, 32, 64, 128].map((size) => (
            <div
              key={size}
              className="flex flex-col items-center gap-1 p-3 rounded-lg bg-[var(--panel-subtle)] border border-[var(--border)]"
            >
              <IconPreview image={result.faviconUrl} size={size} />
              <span className="text-[10px] font-mono text-[var(--text-faint)]">
                {size}×{size}
              </span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="p-4 space-y-3">
        <h3 className="text-[13px] font-bold tracking-tight text-[var(--text)]">
          Icon Files Found on Site
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {result.icons.map((icon) => (
            <a
              key={icon.path}
              href={
                icon.found ? `https://${result.domain}${icon.path}` : undefined
              }
              target="_blank"
              rel="noreferrer"
              className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg border text-[12px] font-medium transition-all ${
                icon.found
                  ? "border-[var(--border)] bg-[var(--panel-subtle)] text-[var(--text)] hover:opacity-80 cursor-pointer"
                  : "border-[var(--border)] bg-[var(--panel-subtle)] text-[var(--text-faint)] cursor-default"
              }`}
            >
              <span className="font-mono">{icon.label}</span>
              {icon.found ? (
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 text-[var(--text-faint)] shrink-0" />
              )}
            </a>
          ))}
        </div>
      </Panel>

      <Panel className="p-4 space-y-3">
        <h3 className="text-[13px] font-bold tracking-tight text-[var(--text)]">
          Page Metadata
        </h3>
        {result.metaError && (
          <p className="text-[12px] text-amber-600 flex items-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" /> {result.metaError}
          </p>
        )}
        {result.meta && (
          <div className="flex flex-col sm:flex-row gap-4">
            {result.meta.ogImage && (
              <img
                src={result.meta.ogImage}
                alt="Open Graph preview"
                className="w-full sm:w-48 h-28 object-cover rounded-lg border border-[var(--border)] shrink-0"
              />
            )}
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-faint)] font-medium">
                <Globe className="w-3.5 h-3.5" />{" "}
                {result.meta.publisher || result.domain}
              </div>
              <div className="text-[13px] font-bold text-[var(--text)]">
                {result.meta.title || "No title found"}
              </div>
              <div className="text-[12px] text-[var(--text-muted)]">
                {result.meta.description || "No description found"}
              </div>
              {result.meta.themeColor && (
                <div className="flex items-center gap-2 pt-1">
                  <span
                    className="w-4 h-4 rounded-full border border-[var(--border)]"
                    style={{ backgroundColor: result.meta.themeColor }}
                  />
                  <span className="text-[11px] font-mono text-[var(--text-faint)]">
                    {result.meta.themeColor}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </Panel>
    </>
  );
}
