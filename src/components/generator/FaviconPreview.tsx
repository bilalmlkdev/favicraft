
// FaviconPreview – mockups
import { Globe, Search, Bookmark, Smartphone } from "lucide-react";

interface FaviconPreviewProps {
  renderIcon: (size: number) => React.ReactNode;
}

export function FaviconPreview({ renderIcon }: FaviconPreviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {/* Browser Tab */}
      <div className="rounded-lg p-3 space-y-2">
        <div className="flex items-center gap-1 text-[13px] font-medium text-[var(--text)]">
          <Globe size={14} className="relative bottom-[1px]" /> Browser Tab
        </div>
        <div className="rounded-md overflow-hidden shadow-sm bg-[var(--panel)] border border-[var(--border-strong)]">
          <div className="px-2.5 py-1.5 flex items-center gap-1.5 bg-[var(--panel-subtle)] border-b border-[var(--border-strong)]">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <div className="w-2 h-2 rounded-full bg-amber-400"></div>
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
            </div>
            <div className="flex-1 bg-[var(--panel)] rounded px-1.5 py-0.5 text-[10px] text-[var(--text-faint)] border border-[var(--border-strong)] flex items-center gap-1.5">
              {renderIcon(10)}
              <span className="truncate">Your Website — Home</span>
              <span className="ml-auto text-[9px] text-[var(--text-faint)]">⌘</span>
            </div>
          </div>
          <div className="p-2.5 flex items-center gap-1.5 border-b border-[var(--border)]">
            {renderIcon(13)}
            <span className="text-[12px] font-semibold truncate text-[var(--text)]">Your Website — Home</span>
            <span className="ml-auto text-[9px] text-[var(--text-faint)]">⌘</span>
          </div>
          <div className="px-2.5 py-1.5 flex items-center gap-1.5 text-[11px] text-[var(--text-faint)]">
            <div className="w-2.5 h-2.5 rounded-full border border-[var(--border-strong)]"></div>
            <span>yoursite.com</span>
          </div>
        </div>
      </div>

      {/* Google Result */}
      <div className="rounded-lg p-3 space-y-2">
        <div className="flex items-center gap-1 text-[12px] font-medium text-[var(--text)]">
          <Search size={14} className="relative bottom-[1px]" /> Google Result
        </div>
        <div className="rounded-md p-3 shadow-sm bg-[var(--panel)] border border-[var(--border-strong)]">
          <div className="flex items-center gap-2">
            {renderIcon(16)}
            <div>
              <div className="text-[12px] font-semibold text-[var(--text)]">Your Website</div>
              <div className="text-[10px] text-[var(--text-muted)]">https://yoursite.com</div>
            </div>
          </div>
          <p className="text-[13px] font-medium text-blue-600 hover:underline cursor-pointer mt-1">Your Website — Home</p>
          <p className="text-[11px] line-clamp-1 text-[var(--text-faint)]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
        </div>
      </div>

      {/* Bookmark */}
      <div className="rounded-lg p-3 space-y-2">
        <div className="flex items-center gap-1.5 text-[12px] font-medium text-[var(--text)]">
          <Bookmark className="relative bottom-[1px]" size={14} /> Bookmark
        </div>
        <div className="rounded-md overflow-hidden shadow-sm bg-[var(--panel)] border border-[var(--border-strong)]">
          <div className="p-2.5 flex items-center gap-2 bg-[var(--accent-soft)] border-b border-[var(--border-strong)]">
            {renderIcon(14)}
            <span className="font-semibold text-[12px] text-[var(--text)]">Your Website</span>
          </div>
          <div className="p-2.5 flex items-center gap-2 text-[var(--text-faint)] border-b border-[var(--border-strong)]">
            <div className="w-3.5 h-3.5 rounded bg-[var(--border-strong)]"></div>
            <span className="font-medium text-[11px]">GitHub</span>
          </div>
          <div className="p-2.5 flex items-center gap-2 text-[var(--text-faint)]">
            <div className="w-3.5 h-3.5 rounded bg-[var(--border-strong)]"></div>
            <span className="font-medium text-[11px]">Stack Overflow</span>
          </div>
        </div>
      </div>

      {/* Home Screen */}
      <div className="rounded-lg p-3 space-y-2">
        <div className="flex items-center gap-1.5 text-[12px] font-medium text-[var(--text)]">
          <Smartphone size={14} className="relative bottom-[1px]" /> Home Screen
        </div>
        <div className="rounded-md p-3.5 flex justify-around items-center shadow-sm bg-gradient-to-br from-[var(--panel)] to-[var(--panel-subtle)] border border-[var(--border-strong)]">
          <div className="flex flex-col items-center gap-1">
            {renderIcon(36)}
            <span className="text-[9px] font-semibold text-[var(--text)]">Your Website</span>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-40">
            <div className="w-9 h-9 rounded-[10px] bg-[var(--border-strong)]"></div>
            <span className="text-[9px] font-medium text-[var(--text-faint)]">Mail</span>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-40">
            <div className="w-9 h-9 rounded-[10px] bg-[var(--border-strong)]"></div>
            <span className="text-[9px] font-medium text-[var(--text-faint)]">Photos</span>
          </div>
        </div>
      </div>
    </div>
  );
}
