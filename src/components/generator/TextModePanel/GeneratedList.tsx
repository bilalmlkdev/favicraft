// GeneratedList – shared for text & image
import { Download } from "lucide-react";

interface Props {
  renderIcon: (size: number) => React.ReactNode;
  downloadSingleSize: (size: number, filename: string) => void;
}

export function GeneratedList({ renderIcon, downloadSingleSize }: Props) {
  const items = [
    {
      size: 16,
      label: "16×16",
      desc: "Browser tab",
      filename: "favicon-16x16.png",
    },
    {
      size: 32,
      label: "32×32",
      desc: "Retina tab",
      filename: "favicon-32x32.png",
    },
    {
      size: 48,
      label: "48×48",
      desc: "Windows icon",
      filename: "favicon-48x48.png",
    },
    {
      size: 180,
      label: "180×180",
      desc: "Apple Touch",
      filename: "apple-touch-icon.png",
    },
    {
      size: 192,
      label: "192×192",
      desc: "Android Chrome",
      filename: "android-chrome-192x192.png",
    },
    {
      size: 512,
      label: "512×512",
      desc: "PWA / Splash",
      filename: "android-chrome-512x512.png",
    },
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
      {items.map((item) => (
        <div
          key={item.size}
          className="rounded-lg px-3 py-2 flex flex-col items-center justify-between space-y-1.5 group transition-colors hover:bg-[var(--panel-subtle)] bg-[var(--panel)] border border-[var(--border)]"
        >
          {renderIcon(36)}
          <div className="text-center">
            <span className="text-[11px] font-bold block text-[var(--text)]">
              {item.label}
            </span>
            <span className="text-[9px] font-medium block mt-0.5 text-[var(--text-faint)]">
              {item.desc}
            </span>
          </div>
          <button
            onClick={() => downloadSingleSize(item.size, item.filename)}
            className="w-full py-1 px-2 rounded-full text-[10px] font-semibold flex items-center justify-center gap-0.5 transition-all hover:bg-[var(--panel-subtle)] bg-[var(--panel)] border border-[var(--border-strong)] text-[var(--text)]"
          >
            <Download className="w-2.5 h-2.5" /> Download
          </button>
        </div>
      ))}
    </div>
  );
}
