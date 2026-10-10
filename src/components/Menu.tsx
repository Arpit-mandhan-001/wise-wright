"use client";

import { useState } from "react";
import Image from "next/image";
import { DM_Serif_Display, Inter } from "next/font/google";


/* ───────────── DUMMY DATA + IMAGES (edit everything here) ───────────── */
const content = {
  eyebrow: "Fresh from our kitchen",
  title: "Good taste. Great ingredients.",
  cta: "View the full menu",
  note: "Made to order, made your way. Ask us about swaps and allergens. Menu and prices may vary by café.",
  tabs: ["Our favorites", "Bowls", "Salads", "Toast", "Smoothies", "Espresso", "Matcha & brews"],
  items: [
    { name: "Everyday nourish bowl", desc: "Quinoa, roasted sweet potato, avocado, greens & lemon tahini.", price: 14.5, badge: "Plant-based", category: "Bowls", favorite: true, src: "/images/ccc.webp" },
    { name: "Green goddess salad", desc: "Crunchy greens, cucumber, edamame & our herby green dressing.", price: 13, badge: "Fresh favorite", category: "Salads", favorite: true, src: "/images/dish3.webp" },
    { name: "The avocado toast", desc: "Sourdough, smashed avocado, cherry tomatoes & chili crunch.", price: 10.5, badge: "All-day classic", category: "Toast", favorite: true, src: "/images/dish2.webp" },
    { name: "Berry bright smoothie", desc: "Strawberry, blueberry, banana & creamy oat milk. Pure sunshine.", price: 8, badge: "Dairy-free", category: "Smoothies", favorite: true, src: "/images/shakes.webp" },
    { name: "Oat milk flat white", desc: "Double ristretto, silky steamed oat milk & a smooth finish.", price: 5.5, badge: "Barista pick", category: "Espresso", favorite: true, src: "/images/shakes2.webp" },
    { name: "Ceremonial iced matcha", desc: "Stone-ground matcha whisked with oat milk over ice.", price: 7, badge: "Dairy-free", category: "Matcha & brews", favorite: false, src: "/images/machine.webp" },
  ],
};

export default function MenuSection() {
  const [active, setActive] = useState(content.tabs[0]);

  const items = content.items.filter((i) =>
    active === content.tabs[0] ? i.favorite : i.category === active,
  );

  return (
    <section
    id="menu"
      className= {`w-full bg-[#f7f4ed] text-[#1f3d1f]`}
    >
      <div className="mx-auto max-w-screen-2xl px-5 py-12 sm:px-10 sm:py-16 lg:px-20 lg:py-20">
        {/* Header */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide sm:text-sm">{content.eyebrow}</p>
            <h2 className="mt-5 max-w-[11em] font-poppins text-5xl font-bold leading-[0.9]
            tracking-tight sm:text-6xl lg:text-7xl">
              {content.title}
            </h2>
          </div>

          <a
            href="/menu"
            className="inline-flex items-center justify-between gap-8 self-start rounded-2xl border border-[#1f3d1f] px-7 py-4 text-base font-medium transition-colors duration-300 hover:bg-[#1f3d1f] hover:text-[#f7f4ed] md:self-auto"
          >
            {content.cta}
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </a>
        </div>

        {/* Tabs */}
        <div className="-mx-5 mt-10 flex gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 lg:mt-12 [&::-webkit-scrollbar]:hidden">
          {content.tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`shrink-0 rounded-full border px-6 py-3.5 text-sm transition-colors duration-300 ${
                active === tab
                  ? "border-[#1f3d1f] bg-[#1f3d1f] text-[#f7f4ed]"
                  : "border-[#1f3d1f]/15 hover:border-[#1f3d1f]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <article key={item.name} className="group flex flex-col">
              <div className="relative aspect-[387/350] overflow-hidden bg-[#1f3d1f]/10">
                <Image
                  src={item.src}
                  alt={item.name}
                  fill
                  sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>

              <h3 className="mt-7 font-poppins font-semibold tracking-tight text-3xl leading-tight">{item.name}</h3>
              <p className="mt-3 text-base font-georgia leading-relaxed text-[#1f3d1f]/80">{item.desc}</p>

              <div className="mt-auto flex items-center justify-between pt-8">
                <span className="text-xl">${item.price.toFixed(2)}</span>
                <button
                  aria-label={`Add ${item.name}`}
                  className="grid size-10 place-items-center rounded-full border border-[#1f3d1f]/15 transition-colors duration-300 hover:border-[#97bc62] hover:bg-[#97bc62]"
                >
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}