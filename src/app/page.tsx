import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { CatalogExplorer } from "@/components/CatalogExplorer";
import { HowWeWork } from "@/components/HowWeWork";
import { Faq } from "@/components/Faq";
import { Testimonials } from "@/components/Testimonials";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { FadeIn } from "@/components/FadeIn";
import { getPublicCatalog } from "@/lib/data";
import { buildCatalogView } from "@/lib/catalog-view";

export const revalidate = 0;

export default async function Home() {
  const { sections: allSections, products: allProducts } = await getPublicCatalog();
  const { featuredProducts, sections } = buildCatalogView(allSections, allProducts);
  const isEmpty = featuredProducts.length === 0 && sections.length === 0;

  return (
    <>
      <Header />

      <main className="flex-1">
        <Hero />

        <FadeIn>
          <TrustBar />
        </FadeIn>

        <section id="servicios" className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-center font-serif text-2xl font-semibold text-navy sm:text-3xl">
            Servicios destacados
          </h2>
          <div className="mt-10">
            {isEmpty ? (
              <p className="text-center text-sm text-navy/60">
                Todavía no hay productos publicados.
              </p>
            ) : (
              <CatalogExplorer featuredProducts={featuredProducts} sectionGroups={sections} />
            )}
          </div>
        </section>

        <FadeIn>
          <HowWeWork />
        </FadeIn>

        <FadeIn>
          <Testimonials />
        </FadeIn>

        <FadeIn>
          <Faq />
        </FadeIn>

        <FadeIn>
          <FinalCta />
        </FadeIn>
      </main>

      <FloatingWhatsApp />
      <Footer />
    </>
  );
}
