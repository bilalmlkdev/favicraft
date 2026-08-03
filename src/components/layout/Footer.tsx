// Footer
export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden pt-12 pb-4">
      <div className="relative max-w-[1100px] mx-auto px-6 lg:px-14">
        <div
          className="flex items-center justify-center pointer-events-none select-none leading-[1]"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 40%, transparent 90%)",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 40%, transparent 90%)",
          }}
        >
          <span className="text-[80px] sm:text-[120px] md:text-[200px] lg:text-[280px] font-extrabold font-DM tracking-tighter text-gray-200">
            Favicraft
          </span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center text-[13px] text-[var(--text-faint)]">
          <p>© {new Date().getFullYear()} Trackhatke. All rights reserved.</p>
          <p>
            Made by{" "}
            <a
              href="https://github.com/byllzz"
              className="hover:text-[var(--accent)] transition-colors"
            >
              Bilal Malik (byllzz)
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
