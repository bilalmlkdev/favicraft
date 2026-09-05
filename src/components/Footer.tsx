// src/components/Footer.tsx
const COLUMNS = [
  {
    title: "Tools",
    links: [
      { label: "Image", href: "/image" },
      { label: "Text", href: "/text" },
      { label: "Emoji", href: "/emoji" },
      { label: "SVG", href: "/svg" },
    ],
  },
  {
    title: "Output",
    links: [
      { label: "favicon.ico", href: "/" },
      { label: "PNG sizes", href: "/" },
      { label: "Touch icons", href: "/" },
      { label: "Web manifest", href: "/" },
    ],
  },
  {
    title: "Project",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/bilalmlkdev/favicraft",
        external: true,
      },
      {
        label: "README",
        href: "https://github.com/bilalmlkdev/favicraft#readme",
        external: true,
      },
      {
        label: "Issues",
        href: "https://github.com/bilalmlkdev/favicraft/issues",
        external: true,
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-dashed border-line-dark font-mono text-[13px]">
      <div className="mx-auto max-w-[1100px] px-5 py-10">
        <div className="dashed-box grid divide-x divide-dashed divide-line-dark sm:grid-cols-3">
          {COLUMNS.map((col) => (
            <div key={col.title} className="p-5">
              <p className="mb-3 font-bold text-fg underline decoration-line-dark underline-offset-4">
                {col.title}
              </p>
              <ul className="space-y-1.5 text-muted-dark">
                {col.links.map((link) => {
                  const isExternal = "external" in link && link.external;
                  return (
                    <li key={link.label}>
                      {isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-fg transition-colors"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <a
                          href={link.href}
                          className="hover:text-fg transition-colors"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-col gap-2 border-t border-dashed border-line-dark pt-4 text-[12px] text-muted-dark sm:flex-row sm:items-center sm:justify-between">
          <span>favicraft, runs entirely in your browser</span>
          <div>
            <a
              href="https://github.com/bilalmlkdev/favicraft"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link mr-3 hover:underline"
            >
              Star on GitHub
            </a>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
