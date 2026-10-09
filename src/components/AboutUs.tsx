const tags = ["Bowls", "Salads", "Health Shakes"];

// Entrance animation: fades up, staggered by delay (seconds)
const reveal =
  "opacity-0 animate-up motion-reduce:animate-none motion-reduce:opacity-100";

const delay = (s: number) => ({
  animationDelay: `${s}s`,
});

export default function AboutUs() {
  return (
    <section className="grid min-h-screen grid-cols-1 md:grid-cols-[1.1fr_.9fr]">
      {/* Left / Text side */}
      <div className="flex flex-col justify-center bg-black px-6 pt-12 pb-14 text-white md:px-[clamp(24px,6vw,96px)] md:py-16">
        {/* Label */}
        <div
          className={`${reveal} flex items-center gap-3.5 text-[.72rem] font-medium uppercase tracking-[.28em]`}
        >
          <span className="h-px w-11 origin-left bg-ember animate-grow motion-reduce:animate-none" />
          About Us
        </div>

        {/* Heading */}
        <h1
          style={delay(0.15)}
          className={`${reveal} my-6 font-serif text-[clamp(2.4rem,5.4vw,4.6rem)] font-normal leading-[1.06] tracking-tight`}
        >
          Eat <em className="text-leaf">wise.</em>
          <br />
          Live {" "}
          <span className="">
            right.
            </span>
        </h1>

        {/* Description */}
        <p
          style={delay(0.3)}
          className={`${reveal} max-w-[480px] text-neutral-400`}
        >
          Wise &amp; Wright is a home for fresh, wholesome food.{" "}
          <strong className="font-medium text-white">
            Healthy eating shouldn&apos;t feel like a sacrifice,
          </strong>{" "}
          so every bowl, salad and shake is made with real ingredients,
          balanced to nourish and prepared to be enjoyed.
        </p>

        {/* Button */}
        <a
          href="#menu"
          style={delay(0.6)}
          className={`${reveal} relative z-0 mt-10 self-start overflow-hidden rounded-full border border-white px-8 py-3.5 text-[.78rem] font-medium uppercase tracking-[.16em] text-white transition-colors duration-500 before:absolute before:inset-0 before:-z-10 before:translate-y-full before:bg-leaf before:transition-transform before:duration-500 hover:border-leaf hover:text-black hover:before:translate-y-0`}
        >
          Discover more
        </a>
      </div>

      {/* Right / Image side */}
      <div
        className="
          relative order-first
          min-h-[300px]
          overflow-hidden
          bg-ink
          bg-[url('/images/quality_quantity.webp')]
          bg-cover
          bg-center
          bg-no-repeat
          md:order-none
          md:min-h-[420px]
        "
      />
    </section>
  );
}