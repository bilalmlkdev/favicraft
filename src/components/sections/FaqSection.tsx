// FAQ
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I generate a favicon?",
    answer:
      "Choose Text Mode to design a text‑based favicon, or Image Mode to upload your own logo. Customize colors, fonts, and shapes, then download the complete package.",
  },
  {
    question: "What advanced customization options are available in Text Mode?",
    answer:
      "Beyond basic font, color, and shape, you can adjust letter spacing, text rotation, add shadows and strokes, apply a gradient background, set a custom border (width, style, color), control padding, and even fine‑tune the border radius – all in real time.",
  },
  {
    question: "What does the Favicon Checker do?",
    answer:
      "Enter any domain (without https://) and we'll fetch its favicon using Google's service. You can preview the icon at multiple sizes, copy its URL, or open it in a new tab – perfect for quickly checking if a site has a favicon.",
  },
  {
    question: "What file formats are supported for upload?",
    answer:
      "We support PNG, JPG, WebP, and SVG images. For best results, use a high‑resolution image with a transparent background.",
  },
  {
    question: "Can I preview my favicon before downloading?",
    answer:
      "Yes! The live preview shows your favicon inside browser tabs, Google search results, bookmarks, and mobile home screens – exactly how it will look.",
  },
  {
    question: "Is Favicraft free to use?",
    answer:
      "Absolutely. Favicraft is completely free with no hidden charges. Generate as many favicons as you like.",
  },
  {
    question: "What sizes and formats are included in the package?",
    answer:
      "The ZIP includes favicon.ico, favicon-16x16.png, favicon-32x32.png, favicon-48x48.png, apple-touch-icon.png, android-chrome-192x192.png, android-chrome-512x512.png, and a site.webmanifest.",
  },
  {
    question: "How do I integrate the favicon into my website?",
    answer:
      'Use the "Install snippet" section on the export panel to get framework‑specific code. You can also copy an AI prompt to help your assistant integrate it automatically.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pt-26 space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold tracking-tight text-[var(--text)]">
          Frequently Asked Questions
        </h2>
        <p className="text-[16px] text-[var(--text-muted)] mt-2">
          Everything you need to know about favicon generation
        </p>
      </div>
      <div className="max-w-3xl mx-auto space-y-2">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="border-b border-[var(--border)]">
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between py-4 text-left focus:outline-none"
              >
                <span className="text-[16px] font-semibold text-[var(--text)]">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[var(--text-muted)] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`transition-all duration-200 overflow-hidden ${isOpen ? "max-h-48 pb-4 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <p className="text-[14px] leading-relaxed text-[var(--text-muted)]">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-center mt-8">
        <p className="text-[14px] text-[var(--text-muted)]">
          Still have questions? We're here to help.{" "}
          <a
            href="#"
            className="underline hover:text-[var(--accent)] transition-colors"
          >
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
}
