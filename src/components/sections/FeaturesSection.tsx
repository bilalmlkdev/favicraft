// Features
import { Zap, Palette, Shield, Code, Smartphone, Search } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Preview",
    description:
      "See your favicon live in browser tabs, Google results, bookmarks, and home screens before you download.",
  },
  {
    icon: Palette,
    title: "Text Mode with Advanced Styling",
    description:
      "Design a text‑based favicon with custom fonts, colors, shapes, letter spacing, rotation, shadows, strokes, gradients, border, padding, and more – no image upload needed.",
  },
  {
    icon: Shield,
    title: "Image Mode",
    description:
      "Upload any PNG, JPG, WebP, or SVG and we’ll generate all required sizes and formats automatically.",
  },
  {
    icon: Search,
    title: "Favicon Checker",
    description:
      "Enter any domain to instantly preview its favicon – see if a website has one, and copy the icon URL.",
  },
  {
    icon: Code,
    title: "Framework Snippets",
    description:
      "Get ready‑to‑use install code for React, Next.js, Astro, Nuxt, SvelteKit, WordPress, and more.",
  },
  {
    icon: Smartphone,
    title: "All Platforms",
    description:
      "Every size for desktop, iOS (Apple Touch), Android (Chrome), and PWA manifests – included in one package.",
  },
];

export function FeaturesSection() {
  return (
    <div className="py-26 space-y-12">
      <div className="text-center">
        <h2 className="text-4xl flex flex-col items-center font-bold tracking-tight text-[var(--text)]">
          <span className="text-black px-2 py-1">Powerful Features</span>{" "}
          <span>For Perfect Favicons</span>
        </h2>
        <p className="text-[16px] text-[var(--text-muted)] mt-4 max-w-[350px] mx-auto">
          Everything you need to create, preview, and deploy a professional
          favicon.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border)] border border-[var(--border)] overflow-hidden">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div key={idx} className="p-12 border-b border-[var(--border)]">
              <div className="flex items-center justify-start gap-3 mb-4">
                <Icon className="w-5 h-5" />
                <h4 className="text-[18px] font-bold tracking-tight text-[var(--text)]">
                  {feature.title}
                </h4>
              </div>
              <p className="text-[16px] leading-relaxed text-[var(--text-muted)]">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
