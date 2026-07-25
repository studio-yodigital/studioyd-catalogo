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
  benefits: string | null;
  badge_label: string | null;
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
    benefits: row.benefits,
    badgeLabel: row.badge_label,
    featured: row.featured,
    sortOrder: row.sort_order,
    active: row.active,
  };
}

export async function getAllSections(): Promise<Section[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("sections")
    .select("id, name, slug, sort_order, active")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return (data ?? []).map(mapSection);
}

export async function getSectionById(id: string): Promise<Section | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("sections")
    .select("id, name, slug, sort_order, active")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data ? mapSection(data) : null;
}

export async function getProductsBySection(sectionId: string): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, section_id, name, description, price_label, image_url, whatsapp_message, benefits, badge_label, featured, sort_order, active",
    )
    .eq("section_id", sectionId)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return (data ?? []).map(mapProduct);
}
