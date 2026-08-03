// How it works
import { Image, Type, Download, Search } from "lucide-react";

export function HowItWorksSection() {
  return (
    <div className="py-26 space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-bold tracking-tight text-[var(--text)]">
          Create Your Favicon in
          <br />3 Simple Steps
        </h2>
        <p className="text-[16px] text-[var(--text-muted)] mt-4 max-w-lg mx-auto">
          Choose a mode, customize your design, and download a complete favicon
          package.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="rounded-2xl bg-[var(--panel)] border border-[var(--border)] overflow-hidden shadow-sm">
          <div className="m-3 rounded-xl bg-[var(--panel-subtle)] p-5 flex items-center justify-center h-[196px]">
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-lg bg-[var(--panel)] border border-[var(--border)] flex items-center justify-center">
                  <Type className="w-6 h-6 text-[var(--text)]" />
                </div>
                <span className="text-[11px] font-medium text-[var(--text-muted)]">
                  Text
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-lg bg-[var(--panel)] border border-[var(--border)] flex items-center justify-center">
                  <Image className="w-6 h-6 text-[var(--text)]" />
                </div>
                <span className="text-[11px] font-medium text-[var(--text-muted)]">
                  Image
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-lg bg-[var(--panel)] border border-[var(--border)] flex items-center justify-center">
                  <Search className="w-6 h-6 text-[var(--text)]" />
                </div>
                <span className="text-[11px] font-medium text-[var(--text-muted)]">
                  Checker
                </span>
              </div>
            </div>
          </div>
          <div className="px-5 pb-5 pt-2">
            <h4 className="text-[15px] font-bold tracking-tight text-[var(--text)]">
              Choose a mode
            </h4>
            <p className="text-[13px] text-[var(--text-muted)] mt-0.5">
              Pick Text Mode to design a custom text favicon, Image Mode to
              upload your own logo, or use the Favicon Checker to preview any
              website's favicon.
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-[var(--panel)] border border-[var(--border)] overflow-hidden shadow-sm">
          <div className="m-3 rounded-xl bg-[var(--panel-subtle)] p-5 flex items-center justify-center h-[196px]">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded bg-[var(--panel)] border border-[var(--border)] flex items-center justify-center">
                <span className="text-[12px] font-bold">F</span>
              </div>
              <div className="w-10 h-10 rounded bg-[var(--panel)] border border-[var(--border)] flex items-center justify-center">
                <span className="text-[12px] font-bold">F</span>
              </div>
              <div className="w-10 h-10 rounded bg-[var(--panel)] border border-[var(--border)] flex items-center justify-center">
                <span className="text-[12px] font-bold">F</span>
              </div>
            </div>
          </div>
          <div className="px-5 pb-5 pt-2">
            <h4 className="text-[15px] font-bold tracking-tight text-[var(--text)]">
              Customize & Preview
            </h4>
            <p className="text-[13px] text-[var(--text-muted)] mt-0.5">
              Adjust colors, fonts, shapes, letter spacing, rotation, shadows,
              strokes, gradients, borders, padding, and more – with real‑time
              previews in browser tabs, search results, and home screens.
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-[var(--panel)] border border-[var(--border)] overflow-hidden shadow-sm">
          <div className="m-3 rounded-xl bg-[var(--panel-subtle)] p-5 flex items-center justify-center h-[196px]">
            <div className="flex flex-col items-center gap-2">
              <Download className="w-8 h-8 text-[var(--accent)]" />
              <span className="text-[12px] font-mono text-[var(--text-muted)]">
                favicon-package.zip
              </span>
            </div>
          </div>
          <div className="px-5 pb-5 pt-2">
            <h4 className="text-[15px] font-bold tracking-tight text-[var(--text)]">
              Download Package
            </h4>
            <p className="text-[13px] text-[var(--text-muted)] mt-0.5">
              Get a complete favicon package with all sizes, manifest, and
              install snippets for your framework.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
