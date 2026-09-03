// Testimonials
const columnOne = [
  {
    name: "Ravi Malhotra",
    role: "Product Manager, Nimbuscart",
    content:
      "Favicraft saved me hours of manual resizing. The text mode is brilliant – I created a beautiful favicon in under a minute.",
  },
  {
    name: "Ananya Iyer",
    role: "Founder, Loomstack",
    content:
      "I uploaded my logo and got a complete favicon package with every size I needed. The previews made it easy to choose the right variant.",
  },
  {
    name: "Devraj Sen",
    role: "Engineering Lead, Pixelworks",
    content:
      "The framework snippets are a lifesaver. I integrated the favicon into our Next.js app in seconds – no more hunting for documentation.",
  },
];

const columnTwo = [
  {
    name: "Meera Kapoor",
    role: "Operations Head, Cartlyn",
    content:
      "I love how simple it is. Just type a letter, pick a color, and you have a favicon. It’s perfect for personal projects.",
  },
  {
    name: "Arjun Bhatia",
    role: "Growth Lead, Fernhill Labs",
    content:
      "Favicraft is the only favicon tool I use now. The download package includes everything – manifest, Apple touch, Android – all in one ZIP.",
  },
  {
    name: "Priya Nair",
    role: "Designer, Northcove",
    content:
      "The live previews in browser tabs and Google results helped me pick the best icon size. Highly recommend to every web designer.",
  },
];

const columnThree = [
  {
    name: "Karan Oberoi",
    role: "Co-Founder, Rivergate",
    content:
      "We built our entire favicon setup using Favicraft. The AI install prompt is a neat bonus – our dev team loved it.",
  },
  {
    name: "Simran Kaur",
    role: "Marketing Lead, Basilworks",
    content:
      "It’s free, fast, and works entirely in the browser. No account, no uploads to a server – I really appreciate the privacy.",
  },
  {
    name: "Yash Trivedi",
    role: "Founder, Cobblehatch",
    content:
      "Finally, a favicon generator that actually understands what I need. The export panel with framework snippets is a game changer.",
  },
];

function avatarUrl(name: string) {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
}

function TestimonialCard({
  name,
  role,
  content,
}: {
  name: string;
  role: string;
  content: string;
}) {
  return (
    <div className="p-5 rounded-2xl bg-[var(--panel)] border border-[var(--border)] shadow-sm">
      <p className="text-[14px] leading-relaxed text-[var(--text)] mb-4">
        {content}
      </p>
      <div className="flex items-center gap-3">
        <img
          src={avatarUrl(name)}
          alt={name}
          className="w-9 h-9 rounded-full bg-[var(--accent-soft)]"
        />
        <div>
          <div className="font-semibold text-[13px] text-[var(--text)]">
            {name}
          </div>
          <div className="text-[12px] text-[var(--text-muted)]">{role}</div>
        </div>
      </div>
    </div>
  );
}

function MarqueeColumn({
  items,
  direction,
  duration,
}: {
  items: typeof columnOne;
  direction: "up" | "down";
  duration: number;
}) {
  return (
    <div className="relative h-[560px] overflow-hidden">
      <div
        className={`flex flex-col gap-4 ${direction === "up" ? "animate-marquee-up" : "animate-marquee-down"}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {[...items, ...items].map((t, idx) => (
          <TestimonialCard key={idx} {...t} />
        ))}
      </div>
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[var(--bg)] to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[var(--bg)] to-transparent" />
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <div className="py-16 space-y-12">
      <style>{`
        @keyframes marquee-up { from { transform: translateY(0); } to { transform: translateY(-50%); } }
        @keyframes marquee-down { from { transform: translateY(-50%); } to { transform: translateY(0); } }
        .animate-marquee-up { animation-name: marquee-up; animation-timing-function: linear; animation-iteration-count: infinite; }
        .animate-marquee-down { animation-name: marquee-down; animation-timing-function: linear; animation-iteration-count: infinite; }
        .animate-marquee-up:hover, .animate-marquee-down:hover { animation-play-state: paused; }
      `}</style>
      <div className="text-center space-y-3 pb-10">
        <span className="inline-block px-4 py-1.5 rounded-full border border-[var(--border)] text-[13px] font-medium text-[var(--text)]">
          Testimonials
        </span>
        <h2 className="text-4xl font-bold tracking-tight text-[var(--text)]">
          What Our Users Say
        </h2>
        <p className="text-[16px] text-[var(--text-muted)] max-w-2xl mx-auto">
          See what our customers have to say about us.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <MarqueeColumn items={columnOne} direction="up" duration={26} />
        <MarqueeColumn items={columnTwo} direction="down" duration={32} />
        <MarqueeColumn items={columnThree} direction="up" duration={28} />
      </div>
    </div>
  );
}
