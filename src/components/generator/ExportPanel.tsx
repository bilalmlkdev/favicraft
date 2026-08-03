// ExportPanel
import { Copy, Terminal, CheckCircle2 } from "lucide-react";
import { Panel} from '../ui/Panel'
import { Label } from "../ui/Label";

interface Props {
  selectedFramework: string;
  setSelectedFramework: (fw: string) => void;
  installCodeSnippet: string;
  aiPromptSnippet: string;
  copiedCode: boolean;
  setCopiedCode: (v: boolean) => void;
  copiedAi: boolean;
  setCopiedAi: (v: boolean) => void;
}

export function ExportPanel({
  selectedFramework,
  setSelectedFramework,
  installCodeSnippet,
  aiPromptSnippet,
  copiedCode,
  setCopiedCode,
  copiedAi,
  setCopiedAi,
}: Props) {
  const frameworks = [
    "HTML",
    "Next.js App Router",
    "React / Vite",
    "Next.js Pages Router",
    "Astro",
    "Nuxt",
    "SvelteKit",
    "WordPress",
  ];

  return (
    <Panel className="p-5 space-y-5 sticky top-24">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-[14px] font-bold tracking-tight text-[var(--text)]">
            Complete Package
          </h3>
          <p className="text-[12px] mt-1 font-medium leading-relaxed text-[var(--text-muted)]">
            favicon.ico plus every PNG size, ready for production.
          </p>
        </div>
      </div>

      <div className="space-y-2 pt-1">
        <Label>Select Framework</Label>
        <div className="flex flex-wrap gap-1.5">
          {frameworks.map((fw) => (
            <button
              key={fw}
              onClick={() => setSelectedFramework(fw)}
              className="text-[11px] px-2.5 py-1 rounded-md font-semibold transition-all duration-200"
              style={
                selectedFramework === fw
                  ? {
                      backgroundColor: "var(--invert)",
                      color: "var(--invert-text)",
                      border: "1px solid var(--invert)",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    }
                  : {
                      backgroundColor: "var(--panel-subtle)",
                      color: "var(--text-muted)",
                      border: "1px solid var(--border)",
                    }
              }
            >
              {fw}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg p-3 text-[12px] shadow-sm bg-[var(--panel-subtle)] border border-[var(--border-strong)] text-[var(--text-muted)]">
        <span className="font-bold tracking-tight block mb-0.5 text-[var(--text)]">
          Where to put files
        </span>
        <span className="font-medium">
          Extract the ZIP and place all generated files in your website's public
          root directory.
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-bold tracking-tight text-[var(--text-muted)]">
            Install snippet
          </span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(installCodeSnippet);
              setCopiedCode(true);
              setTimeout(() => setCopiedCode(false), 2000);
            }}
            className="text-[11px] flex items-center gap-1 transition-all font-semibold hover:opacity-70 active:scale-95 text-[var(--text-faint)]"
          >
            {copiedCode ? (
              <CheckCircle2 className="w-3 h-3 text-green-500" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
            {copiedCode ? "Copied" : "Copy code"}
          </button>
        </div>
        <div className="rounded-lg p-3 overflow-x-auto shadow-inner bg-[var(--code-bg)] border border-[var(--border)]">
          <pre className="text-[11px] font-mono leading-relaxed text-[var(--code-text)]">
            {installCodeSnippet}
          </pre>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-bold tracking-tight flex items-center gap-1 text-[var(--text-muted)]">
            <Terminal className="w-3.5 h-3.5 text-[var(--accent)]" /> AI install
            prompt
          </span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(aiPromptSnippet);
              setCopiedAi(true);
              setTimeout(() => setCopiedAi(false), 2000);
            }}
            className="text-[11px] flex items-center gap-1 transition-all font-semibold hover:opacity-70 active:scale-95 text-[var(--text-faint)]"
          >
            {copiedAi ? (
              <CheckCircle2 className="w-3 h-3 text-green-500" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
            {copiedAi ? "Copied" : "Copy prompt"}
          </button>
        </div>
        <div className="rounded-lg p-3 overflow-x-auto whitespace-pre-wrap shadow-inner bg-[var(--code-bg)] border border-[var(--border)]">
          <pre className="text-[11px] font-mono leading-relaxed text-[var(--code-text)]">
            {aiPromptSnippet}
          </pre>
        </div>
      </div>
    </Panel>
  );
}
