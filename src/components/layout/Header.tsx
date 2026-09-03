// Header
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";

export default function Header() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/bilalmlkdev/favicraft")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <header className="fixed top-3 w-full max-w-[400px] left-1/2 -translate-x-1/2 h-12 rounded-full bg-black text-white z-50 border-b border-white/10">
      <div className="max-w-[400px] mx-auto h-full pl-5 pr-2 flex items-center justify-between relative">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[20px] tracking-tight font-gelasio relative top-0.5">
            Favicraft.
          </span>
        </div>
        <div className="flex items-center gap-1">
          <a
            href="https://github.com/bilalmlkdev/favicraft"
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
