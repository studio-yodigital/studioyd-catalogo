import type { Product, Section } from "./types";

export function buildCatalogView(sections: Section[], products: Product[]) {
  const activeProducts = products.filter((p) => p.active);

  const featuredProducts = activeProducts
    .filter((p) => p.featured)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const sectionsWithProducts = sections
    .filter((s) => s.active)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((section) => ({
      section,
      products: activeProducts
        .filter((p) => p.sectionId === section.id)
        .sort((a, b) => a.sortOrder - b.sortOrder),
    }))
    .filter(({ products }) => products.length > 0);

  return { featuredProducts, sections: sectionsWithProducts };
}
