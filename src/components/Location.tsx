"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";

/* ───────────── CONTENT + IMAGES ───────────── */

const content = {
  eyebrow: "Find us",
  title: "Come hungry. Leave nourished.",
  text: "Our first home is open and serving fresh bowls, salads and shakes every day. More cafés are on the way.",
  locations: [
    {
      open: true,
      badge: "Now open",
      name: "Wise & Wright, Hauz Khas",
      address: "Calgary Canada",
      hours: "Mon – Sun · 8:00 AM – 10:00 PM",
      phone: "+91 98765 43210",
      image: "/images/DSC09172.webp",
      mapsQuery: "Wise & Wright, Calgary, Canada",
      button: "Get directions",
    },
    {
      open: false,
      badge: "Coming soon",
      name: "Wise & Wright, Your next city",
      address: "Location to be announced",
      hours: "Opening 2027",
      phone: "",
      image: "/images/ccc.webp",
      mapsQuery: "",
      button: "Opening soon",
    },
  ],
};

/* ───────────── ICONS ───────────── */

const icons = {
  pin: [
    "M12 21s-7-6-7-11a7 7 0 1 1 14 0c0 5-7 11-7 11Z",
    "M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  ],
  clock: [
    "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z",
    "M12 7v5l3 2",
  ],
  phone: [
    "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z",
  ],
};

function Icon({ name }: { name: keyof typeof icons }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mt-0.5 size-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

/* ───────────── SCROLL REVEAL ───────────── */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    io.observe(el);

    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        shown
          ? "translate-y-0 opacity-100"
          : "translate-y-10 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ───────────── LOCATION SECTION ───────────── */

export default function LocationSection() {
  return (
    <section className="relative isolate w-full overflow-hidden text-white">
      {/* Full-section background image */}
      <Image
        src="/images/unnamed.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover "
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 -z-10 bg-black/50" />

      {/* Optional subtle green tint */}
      <div className="absolute inset-0 -z-10 bg-[#1f3d1f]/20" />

      {/* Section content */}
      <div className="relative z-10 mx-auto max-w-screen-2xl px-5 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-28">
        {/* Header */}
        <Reveal className="ml-auto max-w-2xl text-right">
  <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/80 sm:text-sm">
    {content.eyebrow}
  </p>

  <h2 className="mt-5 font-poppins text-5xl font-semibold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
    Come Hungry.
    <br />
    Leave nourished.
  </h2>

  <p className="ml-auto mt-5 max-w-xl font-georgia leading-relaxed text-white/85 sm:text-lg">
    {content.text}
  </p>
</Reveal>

        {/* Location Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:mt-14 lg:grid-cols-2 lg:gap-8">
          {content.locations.map((loc, i) => {
            const details = [
              { icon: "pin", text: loc.address },
              { icon: "clock", text: loc.hours },
              ...(loc.phone
                ? [{ icon: "phone", text: loc.phone }]
                : []),
            ] as {
              icon: keyof typeof icons;
              text: string;
            }[];

            return (
              <Reveal key={loc.name} delay={i * 150}>
                <article
                  className={`group flex h-full flex-col rounded-[2rem] border p-3 shadow-xl shadow-black/10 transition-all duration-500 hover:-translate-y-1.5 sm:p-4 ${
                    loc.open
                      ? "border-white/25 bg-white/[0.12] text-white backdrop-blur-xl"
                      : "border-white/15 bg-white/[0.07] text-white/85 backdrop-blur-xl"
                  }`}
                >
                  {/* Location Image */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white/10">
                    <Image
                      src={loc.image}
                      alt={loc.name}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
                        loc.open ? "" : "grayscale"
                      }`}
                    />

                    {/* Image overlay for badge/button contrast */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/10" />

                    {/* Location Badge - Top Left */}
                    <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/85 px-3.5 py-2 text-[11px] font-medium uppercase tracking-wide text-[#1f3d1f] shadow-lg backdrop-blur-md">
                      {loc.open && (
                        <span className="relative flex size-2">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#97bc62]" />
                          <span className="relative inline-flex size-2 rounded-full bg-[#97bc62]" />
                        </span>
                      )}

                      {loc.badge}
                    </span>

                    {/* Get Directions - Top Right */}
                    {loc.open ? (
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          loc.mapsQuery
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn absolute right-4 top-4 inline-flex items-center gap-2 rounded-2xl border border-[#97bc62] bg-[#97bc62] px-3.5 py-3 text-xs font-medium text-[#1f3d1f] shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-white hover:bg-white hover:text-[#1f3d1f] sm:gap-3 sm:px-5 sm:text-sm"
                      >
                        {loc.button}

                        <svg
                          viewBox="0 0 24 24"
                          className="size-4 shrink-0 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M7 17 17 7M8 7h9v9" />
                        </svg>
                      </a>
                    ) : (
                      <span
                        aria-disabled="true"
                        className="absolute right-4 top-4 inline-flex cursor-not-allowed items-center rounded-2xl border border-white/30 bg-black/30 px-3.5 py-3 text-xs font-medium text-white/75 shadow-lg backdrop-blur-xl sm:px-5 sm:text-sm"
                      >
                        {loc.button}
                      </span>
                    )}
                  </div>

                  {/* Location Details */}
                  <div className="flex flex-1 flex-col px-3 pb-3 pt-7 sm:px-5 sm:pb-5">
                    <h3 className="text-2xl leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                      {loc.name}
                    </h3>

                    <ul className="mt-6 space-y-4 text-sm leading-relaxed text-white/85 sm:text-base">
                      {details.map((detail) => (
                        <li
                          key={detail.text}
                          className="flex items-start gap-3"
                        >
                          <Icon name={detail.icon} />

                          <span>{detail.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}