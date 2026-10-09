import type { ReactNode } from "react";

/* ───────────────────────── DUMMY DATA ─────────────────────────
   Paste your image paths / URLs into the empty "image" fields.
   Example: image: "/images/bowl.png"  or  "https://..."
   Empty fields show a clean placeholder, so nothing ever looks broken. */
const data = {
  hero: {
    title: "Craving something",
    accent: "fresh?",
    image: "/images/dish1.webp",
  },
  franchise: { label: "Franchise with us", image: "" },
  brand: { name: "Wise & Wright", tagline: "Bowls · Salads · Shakes", logo: "" },
  mascot: { image: "/images/dish2.webp" },
  delivery: {
    title: "Fresh bowls,",
    accent: "delivered in minutes",
    image: "",
  },
  chat: {
    messages: [
      { from: "them", text: "Hi! Where are you?", avatar: "" },
      { from: "me", text: "Hey! I'm on the way", avatar: "" },
    ],
  },
  offer: { badge: "20%", label: "Off your first bowl", image: "" },
};

/* ───────────────────────── HELPERS ───────────────────────── */

// Image with graceful empty-state (never a broken icon)
function Img({
  src,
  alt,
  fit = "cover",
  className = "",
}: {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
  className?: string;
}) {
  if (!src) {
    return (
      <div
        aria-label={alt}
        className={`flex items-center justify-center bg-black/[.05] text-[10px] font-medium uppercase tracking-[.2em] text-black/30 ${className}`}
      >
        Image
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      draggable={false}
      className={`h-full w-full ${fit === "cover" ? "object-cover" : "object-contain"} transition-transform duration-[900ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.05] ${className}`}
    />
  );
}

function Card({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      style={{ animationDelay: `${delay}s` }}
      className={`bento-in group relative min-h-0 min-w-0 overflow-hidden amp(16px,2.6vh,32px)] opacity-0 transition-transform duration-500 ease-out hover:-translate-y-0.5 ${className}`}
    >
      {children}
    </div>
  );
}

const star = Array.from({ length: 24 }, (_, i) => {
  const a = (Math.PI * 2 * i) / 24 - Math.PI / 2;
  const r = i % 2 ? 40 : 50;
  return `${50 + r * Math.cos(a)},${50 + r * Math.sin(a)}`;
}).join(" ");

/* ───────────────────────── COMPONENT ───────────────────────── */

export default function BentoGrid() {
  return (
    <section className="h-screen w-full overflow-hidden bg-[#0a0a0a] p-2.5 font-[family-name:var(--font-poppins),system-ui,sans-serif] md:p-4">
      <style>{`
        @keyframes bento-in { from { opacity: 0; transform: translateY(24px) scale(.97); } to { opacity: 1; transform: none; } }
        @keyframes bento-float { 50% { transform: translateY(-6px); } }
        .bento-in { animation: bento-in .9s cubic-bezier(.2,.8,.2,1) forwards; }
        .bento-float { animation: bento-float 5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .bento-in { animation: none; opacity: 1; }
          .bento-float { animation: none; }
        }
      `}</style>

      <div className="grid h-full w-full grid-flow-dense grid-cols-2 grid-rows-5 gap-2.5 md:grid-cols-[1fr_1fr_1.1fr] md:grid-rows-3 md:gap-4">
        {/* 1 · Headline */}
        <Card
  delay={0.05}
  className="col-span-2 flex items-center gap-[3%] overflow-hidden bg-white px-[3%] md:col-span-2 md:col-start-1 md:row-start-1"
>
  {/* Image — ~60% */}
  <div className="h-[80%] min-w-0 flex-[3] overflow-hidden ">
    <Img
      src={"images/bowls.png"}
      alt="Customer ordering a healthy bowl"
      fit="contain"
      className="h-full w-full "
    />
  </div>

  {/* Text — ~40% */}
  <div className="min-w-0 flex-[2]">
    <h2 className="font-serif text-[clamp(1.35rem,5.4vh,4.2rem)] font-normal leading-[1.05] tracking-tight text-[#0a0a0a]">
      {data.hero.title}
      <br />
      <em className="text-[#E07A3F]">{data.hero.accent}</em>
    </h2>
  </div>
</Card>

        {/* 2 · Franchise image */}
        <Card
          delay={0.15}
          className="bg-[#0a0a0a] md:col-start-3 md:row-start-1"
        >
          <Img src={"images/shakes.webp"} alt="Franchise partnership" className="object-bottom" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
         
        </Card>

        {/* 3 · Brand */}
        <Card
          delay={0.25}
          className="flex flex-col items-center justify-center gap-[4%] bg-[#1f3d1f] text-center md:col-start-2 md:row-start-2"
        >
          <div className="grid size-[clamp(44px,11vh,92px)] place-items-center overflow-hidden %] bg-[#E07A3F] shadow-lg shadow-black/20">
            {data.brand.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.brand.logo} alt="Wise & Wright logo" className="h-full w-full object-cover" />
            ) : (
              <span className="font-serif text-[clamp(1.1rem,3.6vh,2.4rem)] italic text-white">
                W&amp;W
              </span>
            )}
          </div>
          <h3 className="font-serif text-[clamp(1.2rem,4.2vh,3rem)] leading-none text-[#f5f1e8]">
            {data.brand.name}
          </h3>
          <p className="text-[clamp(8px,1.5vh,12px)] font-light uppercase tracking-[.28em] text-[#97bc62]">
            {data.brand.tagline}
          </p>
        </Card>

        {/* 4 · Mascot / chef image */}
        <Card
  delay={0.2}
  className="overflow-hidden bg-[#f5f1e8] p-0 md:col-start-1 md:row-start-2"
>
  <Img
    src="images/dish2.webp"
    alt="Wise & Wright mascot"
    fit="cover"
    className="h-full w-full"
  />
</Card>

        {/* 5 · Tall delivery card */}
        <Card
  delay={0.3}
  className="row-span-2 overflow-hidden bg-white p-0 md:col-start-3 md:row-span-2 md:row-start-2"
>
  <div className="h-full w-full overflow-hidden">
    <Img
      src="images/dish1.webp"
      alt="Delivery illustration"
      fit="cover"
      className="h-full w-full"
    />
  </div>
</Card>

        {/* 6 · Chat */}
        <Card
  delay={0.35}
  className="overflow-hidden bg-[#97bc62] p-0 md:col-start-1 md:row-start-3"
>
  <Img
    src="images/dish1.webp"
    alt="Fresh healthy bowl"
    className="h-full w-full object-cover"
  />
</Card>

        {/* 7 · Offer image */}
        <Card
          delay={0.4}
          className="col-span-2 bg-[#E07A3F] md:col-span-1 md:col-start-2 md:row-start-3"
        >
          <Img src={"images/dish4.webp"} alt="Fresh healthy bowl" />
        </Card>
      </div>
    </section>
  );
}