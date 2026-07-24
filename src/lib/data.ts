import { createClient } from "@/lib/supabase/server";
import type { Product, Section } from "@/lib/types";

type SectionRow = {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
  active: boolean;
};

type ProductRow = {
  id: string;
  section_id: string;
  name: string;
  description: string;
  price_label: string | null;
  image_url: string | null;
  whatsapp_message: string;
  featured: boolean;
  sort_order: number;
  active: boolean;
};

function mapSection(row: SectionRow): Section {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    sortOrder: row.sort_order,
    active: row.active,
  };
}

function mapProduct(row: ProductRow): Product {
  return {
    id: row.id,
    sectionId: row.section_id,
    name: row.name,
    description: row.description,
    priceLabel: row.price_label,
    imageUrl: row.image_url,
    whatsappMessage: row.whatsapp_message,
    featured: row.featured,
    sortOrder: row.sort_order,
    active: row.active,
  };
}

export async function getPublicCatalog(): Promise<{
  sections: Section[];
  products: Product[];
}> {
  const supabase = await createClient();

  const [{ data: sectionRows, error: sectionsError }, { data: productRows, error: productsError }] =
    await Promise.all([
      supabase
        .from("sections")
        .select("id, name, slug, sort_order, active")
        .eq("active", true)
        .order("sort_order", { ascending: true }),
      supabase
        .from("products")
        .select(
          "id, section_id, name, description, price_label, image_url, whatsapp_message, featured, sort_order, active",
        )
        .eq("active", true)
        .order("sort_order", { ascending: true }),
    ]);

  if (sectionsError) throw sectionsError;
  if (productsError) throw productsError;

  return {
    sections: (sectionRows ?? []).map(mapSection),
    products: (productRows ?? []).map(mapProduct),
  };
}
