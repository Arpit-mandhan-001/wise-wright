"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const delay = (s: number) => ({ animationDelay: `${s}s` });

const slides = [
  {
    image: "/images/dish1.webp",
  },
  {
    image: "/images/dish.webp",
  },
  {
    image: "/images/meal.webp",
  },
  {
    image: "/images/dish2.webp",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  return (
    <section
      className="relative flex h-[100svh] w-full flex-col justify-between overflow-hidden bg-stone-950 text-white select-none"
      onMouseEnter={() => setIsPaused(false)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slideshow with Zoom effect & Crossfade */}
      {/* Background Slideshow with Zoom effect & Crossfade */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current
                ? "opacity-100 z-10 scale-105 transition-transform duration-[5000ms]"
                : "opacity-0 z-0 scale-100"
            }`}
          >
            <Image
              src={slide.image}
              alt="Food background"
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        ))}

        {/* Dark overlay covering the entire background */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
      </div>

      {/* Decorative Subtle Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Main Content Area */}
      <div className="relative z-20  flex w-full flex-1 flex-col items-start justify-center pl-3 pb-10 text-left sm:pl-6 md:pb-10 lg:pl-10 mt-20">
        <div className="w-full max-w-4xl">
          {/* Headline */}
          <div className="space-y-3">
            <p className="text-xs font-poppins font-bold uppercase tracking-widest sm:text-[16px] md:text-[18px] text-[#abef4c]">
              Taste Meets Wellness
            </p>

            <h1 className="text-4xl font-bold font-my-font leading-[0.9] tracking-wide text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.65)] sm:text-5xl md:text-7xl lg:text-[90px]">
              Better Eating
            </h1>

            <p className="tracking-wide text-[10px] sm:text-[12px] md:text[15px] lg:text-[18px] font-semibold">
              Fresh ingredients. Thought choices.
              <br />
              Everyday nourishment.
            </p>
          </div>

          {/* CTA Button */}
          <div className="mt-5 md:mt-10 flex justify-left">
            <a
              href="#menu"
              style={delay(0.6)}
              className="opacity-0 animate-up motion-reduce:animate-none motion-reduce:opacity-100 relative z-0 inline-flex max-w-full items-center justify-center self-end overflow-hidden rounded-xl sm:rounded-2xl border border-[#97bc62] bg-[#97bc62] px-4 py-2.5 text-[0.65rem] sm:px-5 sm:py-3 sm:text-xs md:px-6 md:py-3 md:text-sm lg:px-8 lg:py-3.5 lg:text-[.78rem] uppercase tracking-[.12em] sm:tracking-[.14em] lg:tracking-[.16em] text-[#1f3d1f] backdrop-blur-3xl transition-colors duration-500 before:absolute before:inset-0 before:-z-10 before:translate-y-full before:bg-[#1f3d1f] before:transition-transform before:duration-500 hover:border-[#1f3d1f] hover:text-white hover:before:translate-y-0 dark:border-[#97bc62] dark:hover:border-[#1f3d1f] dark:hover:text-white font-black"
            >
              See Our Menu
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
