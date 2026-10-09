import Image from "next/image";

const BG_IMAGE = "/images/ccc.webp";

export default function Franchise() {
  return (
    <section className="relative w-full overflow-hidden text-center font-[family-name:var(--font-poppins),system-ui,sans-serif]">
      <style>{`
        @keyframes fw-zoom {
          from {
            transform: scale(1.12);
          }
          to {
            transform: scale(1);
          }
        }

        @keyframes fw-up {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .fw-anim {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Background Image */}
      <Image
        src={BG_IMAGE}
        alt="Two fresh healthy salad bowls"
        width={1672}
        height={941}
        priority
        className="fw-anim absolute inset-0 h-full w-full object-cover"
        style={{
          animation: "fw-zoom 2.4s cubic-bezier(.2,.8,.2,1) both",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[500px] items-center justify-center px-6 py-24 sm:min-h-[550px] md:min-h-[600px]">
        <div className="max-w-3xl">
          <h2
            className="fw-anim text-4xl font-semibold leading-tight tracking-tight text-white opacity-0 sm:text-5xl md:text-6xl"
            style={{
              animation:
                "fw-up 1.1s .2s cubic-bezier(.2,.8,.2,1) forwards",
            }}
          >
            Wise &amp; Wright Franchise
          </h2>

          <p
            className="fw-anim mx-auto mt-6 max-w-2xl text-[15px] font-light leading-relaxed text-[#f5f1e8] opacity-0"
            style={{
              animation:
                "fw-up 1.1s .4s cubic-bezier(.2,.8,.2,1) forwards",
            }}
          >
            We are looking for dedicated franchisees in target markets to
            expand the Wise &amp; Wright brand. If you’re interested or think
            you’re perfect for this opportunity, please submit your
            information below and we’ll contact you soon to discuss the
            business deeper.
          </p>

          <a
            href="#franchise-form"
            className="
              relative z-0 mt-10 inline-flex
              overflow-hidden rounded-full
              border border-white
              px-6 py-3.5
              text-[.78rem] font-medium uppercase
              tracking-[.16em] text-white
              transition-colors duration-500
              before:absolute before:inset-0 before:-z-10
              before:translate-y-full before:bg-amber-400
              before:transition-transform before:duration-500
              hover:border-leaf hover:text-black
              hover:before:translate-y-0
            "
          >
            Application Form
          </a>
        </div>
      </div>
    </section>
  );
}