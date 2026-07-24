"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { DEFAULT_WHATSAPP_TEMPLATE } from "@/lib/contact";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

// --- Auth -------------------------------------------------------------

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// --- Secciones ----------------------------------------------------------

export async function createSection(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;

  const supabase = await createClient();
  const { count } = await supabase
    .from("sections")
    .select("id", { count: "exact", head: true });

  const baseSlug = slugify(name) || "seccion";
  const slug = `${baseSlug}-${Date.now().toString(36)}`;

  const { error } = await supabase.from("sections").insert({
    name,
    slug,
    sort_order: (count ?? 0) + 1,
  });
  if (error) throw error;

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function updateSectionName(sectionId: string, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;

  const supabase = await createClient();
  const { error } = await supabase.from("sections").update({ name }).eq("id", sectionId);
  if (error) throw error;

  revalidatePath("/admin");
  revalidatePath(`/admin/secciones/${sectionId}`);
  revalidatePath("/");
}

export async function toggleSectionActive(sectionId: string, active: boolean) {
  const supabase = await createClient();
  const { error } = await supabase.from("sections").update({ active }).eq("id", sectionId);
  if (error) throw error;

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function deleteSection(sectionId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("sections").delete().eq("id", sectionId);
  if (error) throw error;

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function moveSection(sectionId: string, direction: "up" | "down") {
  const supabase = await createClient();
  const { data: sections, error } = await supabase
    .from("sections")
    .select("id, sort_order")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  if (!sections) return;

  const index = sections.findIndex((s) => s.id === sectionId);
  const targetIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || targetIndex < 0 || targetIndex >= sections.length) return;

  const current = sections[index];
  const target = sections[targetIndex];

  await Promise.all([
    supabase.from("sections").update({ sort_order: target.sort_order }).eq("id", current.id),
    supabase.from("sections").update({ sort_order: current.sort_order }).eq("id", target.id),
  ]);

  revalidatePath("/admin");
  revalidatePath("/");
}

// --- Productos ------------------------------------------------------------

export async function createProduct(sectionId: string, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;

  const description = String(formData.get("description") ?? "").trim();
  const priceLabel = String(formData.get("priceLabel") ?? "").trim();
  const whatsappMessage =
    String(formData.get("whatsappMessage") ?? "").trim() || DEFAULT_WHATSAPP_TEMPLATE;
  const imageFile = formData.get("image");

  const supabase = await createClient();

  const { count } = await supabase
    .from("products")
    .select("id", { count: "exact", head: true })
    .eq("section_id", sectionId);

  let imageUrl: string | null = null;
  if (imageFile instanceof File && imageFile.size > 0) {
    imageUrl = await uploadProductImage(sectionId, imageFile);
  }

  const { error } = await supabase.from("products").insert({
    section_id: sectionId,
    name,
    description,
    price_label: priceLabel || null,
    whatsapp_message: whatsappMessage,
    image_url: imageUrl,
    sort_order: (count ?? 0) + 1,
  });
  if (error) throw error;

  revalidatePath(`/admin/secciones/${sectionId}`);
  revalidatePath("/");
}

export async function updateProduct(productId: string, sectionId: string, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;

  const description = String(formData.get("description") ?? "").trim();
  const priceLabel = String(formData.get("priceLabel") ?? "").trim();
  const whatsappMessage =
    String(formData.get("whatsappMessage") ?? "").trim() || DEFAULT_WHATSAPP_TEMPLATE;
  const imageFile = formData.get("image");

  const supabase = await createClient();

  const update: Record<string, unknown> = {
    name,
    description,
    price_label: priceLabel || null,
    whatsapp_message: whatsappMessage,
  };

  if (imageFile instanceof File && imageFile.size > 0) {
    update.image_url = await uploadProductImage(sectionId, imageFile);
  }

  const { error } = await supabase.from("products").update(update).eq("id", productId);
  if (error) throw error;

  revalidatePath(`/admin/secciones/${sectionId}`);
  revalidatePath("/");
}

export async function deleteProduct(productId: string, sectionId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", productId);
  if (error) throw error;

  revalidatePath(`/admin/secciones/${sectionId}`);
  revalidatePath("/");
}

export async function toggleProductFeatured(
  productId: string,
  sectionId: string,
  featured: boolean,
) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").update({ featured }).eq("id", productId);
  if (error) throw error;

  revalidatePath(`/admin/secciones/${sectionId}`);
  revalidatePath("/");
}

export async function toggleProductActive(
  productId: string,
  sectionId: string,
  active: boolean,
) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").update({ active }).eq("id", productId);
  if (error) throw error;

  revalidatePath(`/admin/secciones/${sectionId}`);
  revalidatePath("/");
}

export async function moveProduct(
  productId: string,
  sectionId: string,
  direction: "up" | "down",
) {
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from("products")
    .select("id, sort_order")
    .eq("section_id", sectionId)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  if (!products) return;

  const index = products.findIndex((p) => p.id === productId);
  const targetIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || targetIndex < 0 || targetIndex >= products.length) return;

  const current = products[index];
  const target = products[targetIndex];

  await Promise.all([
    supabase.from("products").update({ sort_order: target.sort_order }).eq("id", current.id),
    supabase.from("products").update({ sort_order: current.sort_order }).eq("id", target.id),
  ]);

  revalidatePath(`/admin/secciones/${sectionId}`);
  revalidatePath("/");
}

async function uploadProductImage(sectionId: string, file: File): Promise<string> {
  const supabase = await createClient();
  const extension = file.name.split(".").pop() || "jpg";
  const path = `${sectionId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`;

  const { error } = await supabase.storage.from("product-images").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;

  const { data } = supabase.storage.from("product-images").getPublicUrl(path);
  return data.publicUrl;
}
