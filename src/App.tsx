// App root
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import Header from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { FeaturesSection } from "./components/sections/FeaturesSection";
import { FaqSection } from "./components/sections/FaqSection";
import { TestimonialsSection } from "./components/sections/TestimoinalsSection";
import GeneratorWorkspace from "./components/generator/GeneratorWorkspace";
import { Loader } from "./components/ui/Loader";
import  type { Mode } from "./types";

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const [mode, setMode] = useState<Mode>("image");
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // Simulate initial app load
  useEffect(() => {
    const timer = setTimeout(() => setIsAppLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // const scrollToGenerator = () => {
  //   if (lenisRef.current) {
  //     lenisRef.current.scrollTo("#generator", { duration: 1.2 });
  //   } else {
  //     document
  //       .getElementById("generator")
  //       ?.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  if (isAppLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
        <Loader size={48} color="var(--accent)" />
      </div>
    );
  }

  return (
    <div className="min-h-screen font-DM transition-colors relative duration-300 antialiased selection:bg-indigo-500/30">
      <Header />
      <main className="max-w-[1380px] mx-auto px-6 lg:px-14 pt-40 pb-16 md:pb-16">
        <div className="relative overflow-hidden mb-20">
          <div
            className="absolute inset-0 -z-10"
            style={{
              maskImage:
                "radial-gradient(ellipse 70% 55% at 50% 50%, black 35%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 55% at 50% 50%, black 35%, transparent 100%)",
            }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px]" />
          </div>
          <div className="relative z-10 flex flex-col items-center text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="inline-flex items-center text-xs bg-linear-to-br from-white via-white to-blue-100/80 px-3 rounded-full shadow-sm border-transparent ring ring-neutral-600/20 py-1.5 text-[var(--text-muted)]">
              Browser‑Based Favicon Generator
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-[102px] font-normal tracking-tight leading-[1.1] text-[var(--text)] font-gelasio">
              Text. Image. Favicon.
              <br />
              Made Precisely.
            </h1>
            <p className="text-[16px] sm:text-[18px] max-w-[720px] leading-relaxed font-medium text-[var(--text-muted)]">
              Design or upload a favicon, preview it at real browser sizes, and
              export a complete package – ICO, PNG, Apple, Android, manifest,
              and install snippets.
            </p>
          </div>
        </div>

        <div id="generator" className="scroll-mt-24">
          <GeneratorWorkspace mode={mode} setMode={setMode} />
        </div>

        <FeaturesSection />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
