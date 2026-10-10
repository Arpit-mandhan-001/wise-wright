"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";

/* ───────────── DUMMY DATA + IMAGES (edit everything here) ───────────── */
const content = {
  eyebrow: "About Us",
  title: "Eat wise.",
  accent: "Live right.",
  text: "Wise & Wright is a home for fresh, wholesome food. Healthy eating shouldn't feel like a sacrifice, so every bowl, salad and shake is made with real ingredients, balanced to nourish and prepared to be enjoyed.",
  hint: "Drag the card",
  autoplayMs: 5000,
  stories: [
    { src: "/images/dish1.webp", alt: "A colourful wholesome bowl", tag: "Bowls", title: "Built around balance" },
    { src: "/images/dish1.webp", alt: "A crisp green salad", tag: "Salads", title: "Tossed fresh to order" },
    { src: "/images/dish1.webp", alt: "A creamy health shake", tag: "Shakes", title: "Blended with real fruit" },
    { src: "/images/dish1.webp", alt: "Our kitchen team preparing food", tag: "Our kitchen", title: "Made with care, daily" },
    { src: "/images/dish1.webp", alt: "Guests enjoying a meal together", tag: "Our guests", title: "Good food, good company" },
  ],
};

const n = content.stories.length;
const mod = (a: number) => ((a % n) + n) % n;

// Resting transform + opacity for each stack position (-1 = card flying away)
const stack = (p: number, dir: number) =>
  p === 1
    ? { transform: "translate(-9%, 1%) rotate(-5deg) scale(.95)", opacity: 1 }
    : p === 2
      ? { transform: "translate(9%, 2%) rotate(5deg) scale(.91)", opacity: 0.85 }
      : { transform: `translate(${dir * 140}%, -8%) rotate(${dir * 22}deg)`, opacity: 0 };

export default function AboutUs() {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);
  const [leaving, setLeaving] = useState<1 | -1 | null>(null); // direction the last card flew
  const [entering, setEntering] = useState(false); // card coming back via the prev button
  const [hover, setHover] = useState(false);
  const [reduce, setReduce] = useState(false);

  const start = useRef({ x: 0, y: 0, t: 0 });
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  // Brings the card back in from the side after the prev button
  useEffect(() => {
    if (!entering) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setEntering(false)));
    return () => cancelAnimationFrame(id);
  }, [entering]);

  const fling = (dir: 1 | -1) => {
    setLeaving(dir);
    setIndex((i) => i + 1);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setLeaving(null), 800);
  };

  const back = () => {
    clearTimeout(timer.current);
    setLeaving(null);
    setEntering(true);
    setIndex((i) => i - 1);
  };

  /* Drag to throw */
  const onDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = { x: e.clientX, y: e.clientY, t: Date.now() };
    setDrag({ x: 0, y: 0 });
  };
  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag) return;
    setDrag({ x: e.clientX - start.current.x, y: (e.clientY - start.current.y) * 0.4 });
  };
  const onUp = () => {
    if (!drag) return;
    const speed = Math.abs(drag.x) / Math.max(Date.now() - start.current.t, 1);
    if (Math.abs(drag.x) > 110 || (Math.abs(drag.x) > 30 && speed > 0.6)) fling(drag.x > 0 ? 1 : -1);
    setDrag(null);
  };

  const positions = leaving ? [-1, 0, 1, 2] : [0, 1, 2];
  const paused = hover || !!drag;

  return (
    <section className="relative w-full overflow-hidden font-poppins text-[#1f3d1f] bg-[#D9CDB8]">
      <style>{`@keyframes ring-fill { from { stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }`}</style>

      <div className="mx-auto grid max-w-screen-2xl gap-y-14 px-5 py-16 sm:px-10 sm:py-20 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-0 lg:px-15">
        {/* Text */}
        <div className="max-w-xl lg:col-start-1 lg:row-start-1 lg:self-end">
          <p className="text-xs font-bold uppercase tracking-[.25em] text-[#207803] sm:text-sm">{content.eyebrow}</p>
          <h2 className="mt-6 tracking-tight font-my-font font-semibold text-6xl leading-[0.9] sm:text-7xl lg:text-8xl">
            {content.title}
            <br />
            <p className="text-[#48661e]">{content.accent}</p>
          </h2>
          <p className="mt-5 sm:mt-8 lg:mt-20 text-base leading text-[#1f3d1f]/80 sm:text-lg">{content.text}</p>
        </div>

        {/* Deck */}
        <div
          tabIndex={0}
          onKeyDown={(e) => (e.key === "ArrowRight" ? fling(-1) : e.key === "ArrowLeft" ? back() : null)}
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => setHover(false)}
          aria-roledescription="carousel"
          aria-label="Our story cards"
          className="relative mx-auto aspect-[3/4] w-[min(80vw,24rem)] outline-none sm:w-[22rem] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:w-[28rem] lg:self-center xl:w-[30rem]"
        >
          {positions.map((p) => {
            const story = content.stories[mod(index + p)];
            const top = p === 0;
            const rest = top
              ? entering
                ? { transform: "translate(-130%, 0) rotate(-18deg)", opacity: 0 }
                : drag
                  ? { transform: `translate(${drag.x}px, ${drag.y}px) rotate(${drag.x / 18}deg)`, opacity: 1 }
                  : { transform: "none", opacity: 1 }
              : stack(p, leaving ?? 1);

            return (
              <div
                key={mod(index + p)}
                onPointerDown={top ? onDown : undefined}
                onPointerMove={top ? onMove : undefined}
                onPointerUp={top ? onUp : undefined}
                onPointerCancel={top ? onUp : undefined}
                style={{ ...rest, zIndex: 11 - p }}
                className={`absolute inset-0 overflow-hidden bg-[#97bc62]/30 shadow-2xl shadow-[#1f3d1f]/25 will-change-transform ${
                  drag && top ? "" : "transition-[transform,opacity] duration-700 ease-[cubic-bezier(.2,.8,.2,1)]"
                } ${top ? "cursor-grab touch-pan-y select-none active:cursor-grabbing" : "pointer-events-none"}`}
              >
                <Image
                  src={story.src}
                  alt={story.alt}
                  fill
                  draggable={false}
                  sizes="(min-width:1280px) 26rem, (min-width:1024px) 22rem, 20rem"
                  className="object-cover min-w-[100%]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1f3d1f]/85 to-transparent p-5 pt-16 text-[#f7f4ed] sm:p-6 sm:pt-20">
                  <span className="rounded-full bg-[#97bc62] px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-[#1f3d1f]">
                    {story.tag}
                  </span>
                  <p className="mt-3 font-my-font text-2xl leading-tight sm:text-3xl">{story.title}</p>
                </div>
              </div>
            );
        })}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 lg:col-start-1 lg:row-start-2 lg:mt-12 lg:self-start">
          <button
            onClick={back}
            aria-label="Previous story"
            className="grid size-14 place-items-center rounded-full border border-[#1f3d1f]/15 transition-colors duration-300 hover:border-[#1f3d1f]"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m15 6-6 6 6 6" />
            </svg>
          </button>

          {/* Next button with autoplay progress ring */}
          <button
            onClick={() => fling(-1)}
            aria-label="Next story"
            className="relative grid size-14 place-items-center rounded-full"
          >
            <svg viewBox="0 0 56 56" className="absolute inset-0 -rotate-90" fill="none" aria-hidden>
              <circle cx="28" cy="28" r="26" strokeWidth="2" className="stroke-[#1f3d1f]/15" />
              {!reduce && (
                <circle
                  key={index}
                  cx="28"
                  cy="28"
                  r="26"
                  pathLength={100}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={100}
                  className="stroke-[#97bc62]"
                  onAnimationEnd={() => fling(-1)}
                  style={{
                    animation: `ring-fill ${content.autoplayMs}ms linear forwards`,
                    animationPlayState: paused ? "paused" : "running",
                  }}
                />
              )}
            </svg>
            <span className="grid size-[2.9rem] place-items-center rounded-full bg-[#1f3d1f] text-[#f7f4ed]">
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="m9 6 6 6-6 6" />
              </svg>
            </span>
          </button>

          {/* <span className="text-sm tabular-nums text-[#1f3d1f]/60" aria-live="polite">
            {String(mod(index) + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </span> */}

          <span className="flex items-center gap-2 text-[11px] uppercase tracking-[.2em] text-[#1f3d1f]/60">
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4" />
            </svg>
            {content.hint}
          </span>
        </div>
      </div>
    </section>
  );
}