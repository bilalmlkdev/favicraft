// Header
import { Type, ImageIcon, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";

type Mode = "text" | "image" | "checker";

interface HeaderProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
  scrollToGenerator?: () => void;
}

const TABS: { id: Mode; label: string; icon: typeof Type }[] = [
  { id: "text", label: "Text to favicon", icon: Type },
  { id: "image", label: "Image to favicon", icon: ImageIcon },
  { id: "checker", label: "Favicon Checker", icon: Search },
];

export default function Header({
  mode,
  setMode,
  scrollToGenerator,
}: HeaderProps) {
  const [stars, setStars] = useState<number | null>(null);
  const [modeOpen, setModeOpen] = useState(false);
  const modeRef = useRef<HTMLDivElement>(null);

  const activeTab = TABS.find((t) => t.id === mode) ?? TABS[0];
  const ActiveIcon = activeTab.icon;

  useEffect(() => {
    fetch("https://api.github.com/repos/byllzz/favicraft")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modeRef.current && !modeRef.current.contains(e.target as Node)) {
        setModeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (id: Mode) => {
    setMode(id);
    setModeOpen(false);
    scrollToGenerator?.();
  };

  return (
    <header className="fixed top-3 w-full max-w-[400px] left-1/2 -translate-x-1/2 h-12 rounded-full bg-black text-white z-50 border-b border-white/10">
      <div className="max-w-[400px] mx-auto h-full pl-5 pr-2 flex items-center justify-between relative">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[20px] tracking-tight font-gelasio">
            Favicraft.
          </span>
        </div>
        <div className="flex items-center gap-1">
          <a
            href="https://github.com/byllzz/favicraft"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white text-black border border-white/10transition-colors text-[13px] font-medium"
          >
            <FaGithub size={15} />
            {stars ?? 6}
          </a>
        </div>
      </div>
    </header>
  );
}
