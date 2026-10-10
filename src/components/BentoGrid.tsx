import Image from "next/image";

const images = [
  { src: "/images/restaurant-interior.jpg", alt: "Restaurant interior", className: "md:col-span-4 md:row-span-2" },
  { src: "/images/cocktails-1.jpg", alt: "Colorful cocktails", className: "md:col-span-2" },
  { src: "/images/cocktail-woman.jpg", alt: "Cocktail served at the bar", className: "md:col-span-2" },
  { src: "/images/food-1.jpg", alt: "Gourmet food", className: "md:col-span-2" },
  { src: "/images/cocktails-2.jpg", alt: "Drinks at the bar", className: "md:col-span-2" },
  { src: "/images/friends-toast.jpg", alt: "Friends enjoying drinks", className: "md:col-span-2 md:row-span-2" },
  { src: "/images/friends-toast.jpg", alt: "Friends enjoying drinks", className: "md:col-span-2 md:row-span-2" },
  { src: "/images/food-2.jpg", alt: "Restaurant dish", className: "md:col-span-2" },
  { src: "/images/cocktails-3.jpg", alt: "Cocktail collection", className: "md:col-span-2" },
  { src: "/images/food-3.jpg", alt: "Food served at the table", className: "md:col-span-2" },
  { src: "/images/bar-scene.jpg", alt: "Bartender mixing drinks", className: "md:col-span-2" },
  { src: "/images/cocktail-4.jpg", alt: "Signature red cocktail", className: "md:col-span-2" },
  { src: "/images/restaurant-exterior.jpg", alt: "Restaurant exterior", className: "md:col-span-2" },
  { src: "/images/burgers.jpg", alt: "Mini burgers", className: "md:col-span-2" },
  { src: "/images/dining-table.jpg", alt: "Food shared at a table", className: "md:col-span-2" },
  { src: "/images/restaurant-drinks.jpg", alt: "Restaurant drinks", className: "md:col-span-2" },
  { src: "/images/dining-experience.jpg", alt: "Restaurant dining experience", className: "md:col-span-2" },
  { src: "/images/cocktail-5.jpg", alt: "Colorful signature drink", className: "md:col-span-2" },
  { src: "/images/restaurant-building.jpg", alt: "Restaurant building", className: "md:col-span-2" },
];

export default function BentoGrid() {
  return (
    <section className="h-screen min-h-screen w-full overflow-hidden bg-white p-2">
      <div className="relative grid h-full w-full grid-cols-2 grid-rows-9 gap-2 md:grid-cols-12 md:grid-rows-4">
        {images.map((image, index) => (
          <div
            key={image.src}
            className={`group relative min-h-0 min-w-0 overflow-hidden bg-neutral-200 ${image.className}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              sizes="(max-width: 767px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ))}

        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="Follow us on Instagram"
          className="absolute left-1/2 top-1/2 z-10 flex size-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-white px-3 text-center shadow-lg transition-transform duration-300 hover:scale-105 sm:size-28"
        >
          <span className="text-xs font-semibold text-neutral-800">
            Follow Us On
          </span>
          <span className="mt-1 text-xs font-medium text-amber-600">
            Instagram
          </span>
        </a>
      </div>
    </section>
  );
}