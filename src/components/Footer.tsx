"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface RotateTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const RotateText = ({ children, className = "" }: RotateTextProps) => {
  return (
    <span
      className={`
        inline-block
        transition-colors
        duration-300
        ease-in-out
        hover:text-[#E07A3F]
        ${className}
      `}
    >
      {children}
    </span>
  );
};

interface SocialIconProps {
  children: ReactNode;
  href?: string;
}

const SocialIcon = ({ children, href = "#" }: SocialIconProps) => {
  return (
    <Link
      href={href}
      className="
        flex h-10 w-10 shrink-0 items-center justify-center
        rounded-full
        border border-black/15
        text-black/70
        transition-all duration-300
        hover:border-black
        hover:bg-black
        hover:text-white
      "
    >
      {children}
    </Link>
  );
};

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-[#F5F5DC] text-[#171717]">
      {/* =====================================================
          TOP DIVIDER
      ===================================================== */}

      <div className="mx-5 border-t border-black/10 sm:mx-10 md:mx-12 lg:mx-24" />

      {/* =====================================================
          FOOTER CONTENT
      ===================================================== */}

      <div
        className="
          grid
          gap-12
          px-5
          py-14
          sm:gap-14
          sm:px-10
          sm:py-16
          md:px-12
          lg:grid-cols-[1.5fr_1fr_1fr_1.2fr_1fr]
          lg:gap-10
          lg:px-24
          lg:py-20
        "
      >
        {/* ===================================================
            BRAND
        =================================================== */}

        <div className="min-w-0">
          {/* LOGO - UNCHANGED */}

          <Link href="/" className="group flex items-center gap-3 sm:gap-4">
            <Image
              src="/images/logo.jpeg"
              alt="Hashhbit Studio"
              width={100}
              height={100}
              className="object-contain "
            />
          </Link>

          {/* DESCRIPTION - UNCHANGED */}

          <div className="group mt-8 max-w-[380px] font-raleway text-sm font-semibold leading-6 sm:text-base">
            Fresh ingredients, global flavors,
            <br />
            and healthy choices.
          </div>
        </div>

        {/* ===================================================
            QUICK LINKS
        =================================================== */}

        <div className="min-w-0 ">
          <div className="font-poppins text-sm font-bold uppercase tracking-wide">
            Quick Link
          </div>

          <nav className="mt-6 flex flex-col gap-4 font-semibold">
            <Link
              href="/"
              className="group w-fit text-sm text-black/60 transition-colors hover:text-black"
            >
              <RotateText>Home</RotateText>
            </Link>

            <Link
              href="/about"
              className="group w-fit text-sm text-black/60 transition-colors hover:text-black"
            >
              <RotateText>About Us</RotateText>
            </Link>

            <Link
              href="/menu"
              className="group w-fit text-sm text-black/60 transition-colors hover:text-black"
            >
              <RotateText>Menu</RotateText>
            </Link>

            <Link
              href="/review"
              className="group w-fit text-sm text-black/60 transition-colors hover:text-black"
            >
              <RotateText>Careers</RotateText>
            </Link>

            {/* <Link
              href="/faqs"
              className="group w-fit text-sm text-black/60 transition-colors hover:text-black"
            >
              <RotateText>FAQs</RotateText>
            </Link> */}
          </nav>
        </div>

        {/* ===================================================
            OPEN HOURS
        =================================================== */}

        <div className="min-w-0">
          <div className="font-poppins text-sm font-bold uppercase tracking-wide">
            Open Hour
          </div>

          <div className="mt-6 space-y-4 text-sm leading-6 text-black/60">
            <div>
              <p className="font-medium text-black">Mon - Fri</p>

              <p className="font-semibold">9:00 AM - 9:00 PM</p>
            </div>

            <div>
              <p className="font-medium text-black">Sat - Sun</p>

              <p className="font-semibold">9:00 AM - 11:00 PM</p>
            </div>
          </div>
        </div>

        {/* ===================================================
            ADDRESS
        =================================================== */}

        <div className="min-w-0">
          <div className="font-poppins text-sm font-bold uppercase tracking-wide">
            Address
          </div>

          <p className="mt-6 max-w-[220px] text-sm leading-6 text-black/60 font-semibold">
            Gaali no. 335
            <br />
            near raju halwai,
            <br />
            Canada
          </p>

          {/* CONTACT */}

          <div className="mt-7">
            <div className="font-poppins text-sm font-bold uppercase tracking-wide">
              Contact Us
            </div>

            <a
              href="tel:+6281234567890"
              className="
              font-semibold
                mt-4
                block
                w-fit
                text-sm
                text-black/60
                transition-colors
                hover:text-black
              "
            >
              +401 456 7890
            </a>
          </div>
        </div>

        {/* ===================================================
            EMAIL + FOLLOW US
        =================================================== */}

        <div className="min-w-0">
          {/* EMAIL */}

          <div className="font-poppins text-sm font-bold uppercase tracking-wide">
            Email
          </div>

          <a
            href="mailto:hello@urbanbites.com"
            className="
            font-semibold
              mt-4
              block
              w-fit
              max-w-full
              break-all
              text-sm
              text-black/60
              transition-colors
              hover:text-black
            "
          >
            hello@wiseandwright.com
          </a>

          {/* FOLLOW US */}

          <div className="mt-8">
            <div className="font-poppins text-sm font-bold uppercase tracking-wide">
              Follow Us
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <SocialIcon href="#">
                <span className="text-sm font-semibold">f</span>
              </SocialIcon>

              <SocialIcon href="#">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </SocialIcon>

              <SocialIcon href="#">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 12C21 12 21 16.5 20.4 18.2C20.1 19.1 19.4 19.8 18.5 20.1C16.8 20.7 12 20.7 12 20.7C12 20.7 7.2 20.7 5.5 20.1C4.6 19.8 3.9 19.1 3.6 18.2C3 16.5 3 12 3 12C3 12 3 7.5 3.6 5.8C3.9 4.9 4.6 4.2 5.5 3.9C7.2 3.3 12 3.3 12 3.3C12 3.3 16.8 3.3 18.5 3.9C19.4 4.2 20.1 4.9 20.4 5.8C21 7.5 21 12 21 12Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M10 15L15 12L10 9V15Z" fill="currentColor" />
                </svg>
              </SocialIcon>

              <SocialIcon href="#">
                <span className="text-sm font-semibold">X</span>
              </SocialIcon>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM DIVIDER
      ===================================================== */}

      <div className="mx-5 border-t border-black/10 sm:mx-10 md:mx-12 lg:mx-24" />

      {/* =====================================================
          COPYRIGHT
      ===================================================== */}

      <div
        className="
    relative
    flex
    min-h-[60px]
    flex-col
    items-center
    justify-center
    gap-3
    px-5
    py-6
    sm:px-10
    md:px-12
    lg:px-24
    lg:flex-row
  "
      >
        {/* Copyright - Left */}
        <div
          className="
      min-w-0
      font-bold
      tracking-widest
      lg:absolute
      lg:left-24
    "
        >
          <RotateText className="text-[10px] text-black/40">
            © Wise and Wright.
          </RotateText>
        </div>

        {/* Developer Credit - Center */}
        <div className="text-center text-sm text-black/50">
          Designed & Developed by{" "}
          <a
            href="https://www.monkartlabs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-blue-500"
          >
            Monkart Labs.
          </a>
        </div>
      </div>
    </footer>
  );
}
