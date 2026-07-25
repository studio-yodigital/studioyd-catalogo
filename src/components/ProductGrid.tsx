import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

export function ProductGrid({
  products,
  sectionSlugById,
}: {
  products: Product[];
  sectionSlugById: Record<string, string>;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          sectionSlug={sectionSlugById[product.sectionId] ?? ""}
        />
      ))}
    </div>
  );
}
