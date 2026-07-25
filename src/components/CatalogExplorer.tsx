"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Product, Section } from "@/lib/types";
import { ProductGrid } from "./ProductGrid";

type SectionGroup = { section: Section; products: Product[] };

export function CatalogExplorer({
  featuredProducts,
  sectionGroups,
}: {
  featuredProducts: Product[];
  sectionGroups: SectionGroup[];
}) {
  const [query, setQuery] = useState("");
  const [activeSectionId, setActiveSectionId] = useState<string>("all");

  const sectionSlugById = useMemo(() => {
    const map: Record<string, string> = {};
    for (const { section } of sectionGroups) map[section.id] = section.slug;
    return map;
  }, [sectionGroups]);

  const normalizedQuery = query.trim().toLowerCase();

  const searchResults = useMemo(() => {
    if (!normalizedQuery) return null;
    return sectionGroups
      .flatMap((group) => group.products)
      .filter(
        (product) =>
          product.name.toLowerCase().includes(normalizedQuery) ||
          product.description.toLowerCase().includes(normalizedQuery),
      );
  }, [normalizedQuery, sectionGroups]);

  const visibleGroups =
    activeSectionId === "all"
      ? sectionGroups
      : sectionGroups.filter((group) => group.section.id === activeSectionId);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/40"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar un servicio..."
            className="w-full rounded-full border border-navy/15 bg-white py-2 pl-9 pr-4 text-sm text-navy outline-none focus:border-gold"
          />
        </div>

        {!normalizedQuery && (
          <div className="flex flex-wrap gap-2">
            <CategoryPill
              label="Todos"
              active={activeSectionId === "all"}
              onClick={() => setActiveSectionId("all")}
            />
            {sectionGroups.map(({ section }) => (
              <CategoryPill
                key={section.id}
                label={section.name}
                active={activeSectionId === section.id}
                onClick={() => setActiveSectionId(section.id)}
              />
            ))}
          </div>
        )}
      </div>

      {normalizedQuery ? (
        searchResults && searchResults.length > 0 ? (
          <ProductGrid products={searchResults} sectionSlugById={sectionSlugById} />
        ) : (
          <p className="text-center text-sm text-navy/50">
            No encontramos servicios para &ldquo;{query}&rdquo;.
          </p>
        )
      ) : (
        <>
          {activeSectionId === "all" && featuredProducts.length > 0 && (
            <section>
              <h3 className="mb-3 flex items-center gap-2 font-serif text-lg font-semibold text-navy">
                ⭐ Destacados
              </h3>
              <ProductGrid products={featuredProducts} sectionSlugById={sectionSlugById} />
            </section>
          )}

          {visibleGroups.map(({ section, products }) => (
            <section key={section.id}>
              <h3 className="mb-3 font-serif text-lg font-semibold text-navy">{section.name}</h3>
              <ProductGrid products={products} sectionSlugById={sectionSlugById} />
            </section>
          ))}
        </>
      )}
    </div>
  );
}

function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "rounded-full bg-navy px-4 py-1.5 text-sm font-semibold text-white"
          : "rounded-full border border-navy/15 px-4 py-1.5 text-sm font-medium text-navy/70 transition hover:border-navy/30"
      }
    >
      {label}
    </button>
  );
}
