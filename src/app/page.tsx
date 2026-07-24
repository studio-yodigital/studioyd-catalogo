import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ProductGrid } from "@/components/ProductGrid";
import { getPublicCatalog } from "@/lib/data";
import { buildCatalogView } from "@/lib/catalog-view";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 0;

export default async function Home() {
  const { sections: allSections, products: allProducts } = await getPublicCatalog();
  const { featuredProducts, sections } = buildCatalogView(allSections, allProducts);

  return (
    <>
      <Header />

      <main className="flex-1">
        <section className="bg-navy px-4 pb-10 pt-8 text-center text-white">
          <div className="mx-auto max-w-2xl">
            <h1 className="font-serif text-2xl font-semibold sm:text-3xl">
              Catálogo de servicios
            </h1>
            <p className="mt-2 text-sm text-white/75 sm:text-base">
              {siteConfig.description}
            </p>
            <p className="mt-3 text-xs text-gold-light">
              Elige un servicio y escríbenos para cotizarlo al instante.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-5xl space-y-10 px-4 py-8">
          {featuredProducts.length > 0 && (
            <section>
              <h2 className="mb-3 flex items-center gap-2 font-serif text-lg font-semibold text-navy">
                ⭐ Destacados
              </h2>
              <ProductGrid products={featuredProducts} />
            </section>
          )}

          {sections.map(({ section, products }) => (
            <section key={section.id}>
              <h2 className="mb-3 font-serif text-lg font-semibold text-navy">
                {section.name}
              </h2>
              <ProductGrid products={products} />
            </section>
          ))}

          {featuredProducts.length === 0 && sections.length === 0 && (
            <p className="text-center text-sm text-navy/60">
              Todavía no hay productos publicados.
            </p>
          )}
        </div>
      </main>

      <FloatingWhatsApp />
      <Footer />
    </>
  );
}
