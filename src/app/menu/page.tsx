"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { DM_Serif_Display, Inter } from "next/font/google";
import { menuData } from "../../data/menuData";

const serif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

type Nutrition = {
  calories?: number | null;
  protein_g?: number | null;
  fat_g?: number | null;
  saturated_fat_g?: number | null;
  trans_fat_g?: number | null;
  carbs_g?: number | null;
  sodium_mg?: number | null;
  fibre_g?: number | null;
  sugars_g?: number | null;
  vitamin_a_pct?: number | null;
  vitamin_c_pct?: number | null;
  calcium_pct?: number | null;
  iron_pct?: number | null;
};

type MenuItem = {
  id: string;
  name: string;
  category: string;
  servingSize?: string;
  veganFriendly: boolean;
  glutenFree: boolean;
  nutrition: Nutrition;
  isFavorite: boolean;
  nutritionAvailable: boolean;
  // These fields are optional because they are not present in the supplied JSON.
  image?: string;
  src?: string;
  price?: string | number;
  description?: string;
  ingredients?: string[];
  labels?: string[];
  badge?: string;
};

type MenuData = {
  source?: string;
  nutritionDisclaimer?: string;
  nutritionFields?: Record<string, string>;
  menuItems: MenuItem[];
  addOns: MenuItem[];
};

const data = menuData as unknown as MenuData;

const nutritionLabels: {
  key: keyof Nutrition;
  label: string;
  unit: string;
}[] = [
  { key: "calories", label: "Calories", unit: "kcal" },
  { key: "protein_g", label: "Protein", unit: "g" },
  { key: "fat_g", label: "Total fat", unit: "g" },
  { key: "saturated_fat_g", label: "Saturated fat", unit: "g" },
  { key: "trans_fat_g", label: "Trans fat", unit: "g" },
  { key: "carbs_g", label: "Carbs", unit: "g" },
  { key: "sodium_mg", label: "Sodium", unit: "mg" },
  { key: "fibre_g", label: "Fibre", unit: "g" },
  { key: "sugars_g", label: "Sugars", unit: "g" },
  { key: "vitamin_a_pct", label: "Vitamin A", unit: "%" },
  { key: "vitamin_c_pct", label: "Vitamin C", unit: "%" },
  { key: "calcium_pct", label: "Calcium", unit: "%" },
  { key: "iron_pct", label: "Iron", unit: "%" },
];

function formatValue(value: number, unit: string) {
  const formatted = Number.isInteger(value) ? String(value) : value.toFixed(1);
  return `${formatted}${unit === "%" ? "%" : ` ${unit}`}`;
}

function MenuCard({ item }: { item: MenuItem }) {
  const imageSrc = item.image || item.src;
  const price =
    item.price !== undefined && item.price !== null && String(item.price).trim()
      ? typeof item.price === "number"
        ? `$${item.price.toFixed(2)}`
        : item.price.startsWith("$")
          ? item.price
          : `$${item.price}`
      : "Price unavailable";

  const nutritionValues = nutritionLabels.filter(
    ({ key }) => item.nutrition?.[key] != null,
  );

  return (
    <article
      tabIndex={0}
      aria-label={`${item.name}. Hover or focus to view description and nutrition details.`}
      className="group h-[390px] cursor-pointer [perspective:1200px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#97bc62] focus-visible:ring-offset-4"
    >
      <div
        className="
          relative h-full w-full rounded-3xl
          [transform-style:preserve-3d]
          transition-transform duration-700 ease-in-out
          group-hover:[transform:rotateY(180deg)]
          group-focus:[transform:rotateY(180deg)]
        "
      >
        {/* FRONT: image, item name, and price */}
        <div className="absolute inset-0 overflow-hidden bg-[#e7e7d8] shadow-md [backface-visibility:hidden]">
          {imageSrc ? (
            <Image
              src={"/images/unnamed.webp"}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#e6eadb] via-[#d4dfc5] to-[#b9c9a5] text-[#1f3d1f]">
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                className="mb-3 h-20 w-20 opacity-70"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 43h64l-6 30a9 9 0 0 1-9 7H33a9 9 0 0 1-9-7l-6-30Z" />
                <path d="M14 43c0-7 8-12 18-12 3-12 14-18 24-11 9-6 22-1 23 10 5 1 8 6 7 13" />
                <path d="M35 31c-4-7 0-13 7-15M59 28c4-8 11-8 15-4M43 43l7-9 7 9" />
              </svg>
              <span className="px-6 text-center font-[family-name:var(--font-serif)] text-2xl">
                {item.category}
              </span>
              <span className="mt-2 text-xs uppercase tracking-[0.2em] opacity-70">
                Add an item image
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {item.badge && (
              <span className="rounded-full bg-[#b96d3b] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white">
                {item.badge}
              </span>
            )}
            {item.isFavorite && (
              <span className="rounded-full bg-[#1f3d1f]/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white">
                Favorite
              </span>
            )}
          </div>

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-6">
            <div className="min-w-0">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d7e7c5]">
                {item.category}
              </p>
              <h3 className="font-[family-name:var(--font-serif)] text-2xl leading-tight text-white sm:text-3xl">
                {item.name}
              </h3>
            </div>
            <span className="shrink-0 text-right text-sm font-semibold text-white sm:text-base">
              {price}
            </span>
          </div>

          <span className="absolute right-4 top-4 rounded-full border border-white/40 bg-black/20 px-3 py-1.5 text-[10px] uppercase tracking-widest text-white">
            Hover to explore
          </span>
        </div>

        {/* BACK: description and nutrition details */}
        <div
          className="
            absolute inset-0 flex flex-col overflow-y-auto
            border border-white/10 bg-[#20291f] p-5 text-white shadow-md sm:p-6
            [backface-visibility:hidden] [transform:rotateY(180deg)]
          "
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#e8a06f]">
            {item.category}
          </p>

          <div className="mt-2 flex items-start justify-between gap-3">
            <h3 className="font-[family-name:var(--font-serif)] text-2xl leading-tight sm:text-3xl">
              {item.name}
            </h3>
            <span className="shrink-0 text-sm font-semibold text-[#e8a06f]">
              {price}
            </span>
          </div>

          {item.servingSize && (
            <p className="mt-2 text-xs text-white/55">
              Serving size: {item.servingSize}
            </p>
          )}

          <div className="my-4 h-px w-full shrink-0 bg-white/15" />

          <p className="text-sm leading-6 text-white/75">
            {item.description ||
              "Description has not been added to the menu data yet."}
          </p>

          {item.ingredients && item.ingredients.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#e8a06f]">
                Ingredients
              </p>
              <div className="flex flex-wrap gap-2">
                {item.ingredients.map((ingredient) => (
                  <span
                    key={ingredient}
                    className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-white/80"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#e8a06f]">
              Nutrition information
            </p>

            {!item.nutritionAvailable || nutritionValues.length === 0 ? (
              <p className="text-sm text-white/60">
                Nutrition information unavailable.
              </p>
            ) : (
              <dl className="grid grid-cols-2 gap-2">
                {nutritionValues.map(({ key, label, unit }) => {
                  const value = item.nutrition[key];
                  if (value == null) return null;

                  return (
                    <div
                      key={key}
                      className="rounded-xl bg-white/[0.07] p-2.5"
                    >
                      <dt className="text-[11px] text-white/55">{label}</dt>
                      <dd className="mt-1 text-sm font-semibold">
                        {formatValue(value, unit)}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            )}
          </div>

          <div className="mt-auto flex flex-wrap gap-2 pt-4">
            {item.veganFriendly && (
              <span className="rounded-md bg-[#dce9cd] px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#1f3d1f]">
                Vegan
              </span>
            )}
            {item.glutenFree && (
              <span className="rounded-md bg-[#f1eddf] px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#1f3d1f]">
                Gluten-free
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [veganOnly, setVeganOnly] = useState(false);
  const [glutenFreeOnly, setGlutenFreeOnly] = useState(false);
  const [showAddOns, setShowAddOns] = useState(false);

  const allItems = useMemo(
    () => (showAddOns ? data.addOns ?? [] : data.menuItems ?? []),
    [showAddOns],
  );

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(allItems.map((item) => item.category)))],
    [allItems],
  );

  const filteredItems = useMemo(
    () =>
      allItems.filter((item) => {
        const matchesCategory =
          activeCategory === "All" || item.category === activeCategory;
        const matchesVegan = !veganOnly || item.veganFriendly;
        const matchesGlutenFree = !glutenFreeOnly || item.glutenFree;
        return matchesCategory && matchesVegan && matchesGlutenFree;
      }),
    [allItems, activeCategory, veganOnly, glutenFreeOnly],
  );

  return (
    <main
      className={`${serif.variable} ${sans.variable} min-h-screen w-full scroll-smooth bg-[#f7f4ed] font-[family-name:var(--font-sans)] text-[#1f3d1f]`}
    >
      <header className="mx-auto max-w-screen-2xl px-5 pb-10 pt-14 sm:px-10 sm:pt-20 lg:px-20 lg:pt-28">
        <p className="text-xs font-medium uppercase tracking-[0.2em] sm:text-sm">
          Wise &amp; Wright · Fresh food, thoughtfully made
        </p>

        <h1 className="mt-5 font-[family-name:var(--font-serif)] text-5xl leading-[1.1] sm:text-6xl lg:text-8xl">
          Our <span className="text-[#97bc62]">Menu</span>
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#1f3d1f]/65 sm:text-lg">
          Explore our menu and check the nutrition details, serving sizes, and
          dietary options for each item.
        </p>
      </header>

      <div className="sticky top-0 z-20 border-y border-[#1f3d1f]/10 bg-[#f7f4ed]/95 backdrop-blur">
        <div className="mx-auto max-w-screen-2xl px-5 py-3 sm:px-10 lg:px-20">
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-sm transition-colors ${
                  activeCategory === category
                    ? "border-[#1f3d1f] bg-[#1f3d1f] text-[#f7f4ed]"
                    : "border-[#1f3d1f]/15 hover:border-[#1f3d1f]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={veganOnly}
                onChange={(event) => setVeganOnly(event.target.checked)}
                className="accent-[#1f3d1f]"
              />
              Vegan only
            </label>

            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={glutenFreeOnly}
                onChange={(event) => setGlutenFreeOnly(event.target.checked)}
                className="accent-[#1f3d1f]"
              />
              Gluten-free only
            </label>

            <button
              type="button"
              onClick={() => {
                setShowAddOns((current) => !current);
                setActiveCategory("All");
              }}
              className="ml-auto rounded-full border border-[#1f3d1f]/20 px-4 py-2 transition hover:bg-[#1f3d1f] hover:text-white"
            >
              {showAddOns ? "Show main menu" : "Show add-ons"}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl px-5 sm:px-10 lg:px-20">
        <section className="py-10 sm:py-14 lg:py-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl">
                {showAddOns
                  ? "Add-ons"
                  : activeCategory === "All"
                    ? "All items"
                    : activeCategory}
              </h2>
              <p className="mt-2 text-sm text-[#1f3d1f]/60">
                {filteredItems.length}{" "}
                {filteredItems.length === 1 ? "item" : "items"}
              </p>
            </div>
          </div>

          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {filteredItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-[#1f3d1f]/20 p-10 text-center text-[#1f3d1f]/60">
              No items match these filters.
            </div>
          )}
        </section>

        {data.nutritionDisclaimer && (
          <footer className="border-t border-[#1f3d1f]/10 py-10 text-sm leading-relaxed text-[#1f3d1f]/60 lg:py-14">
            <p>{data.nutritionDisclaimer}</p>
          </footer>
        )}
      </div>
    </main>
  );
}
