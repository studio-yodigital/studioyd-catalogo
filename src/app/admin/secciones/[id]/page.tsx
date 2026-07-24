import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getSectionById, getProductsBySection } from "@/lib/admin-data";
import { DEFAULT_WHATSAPP_TEMPLATE } from "@/lib/contact";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductFeatured,
  toggleProductActive,
  moveProduct,
} from "../../actions";

export default async function SectionProductsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const section = await getSectionById(id);
  if (!section) notFound();

  const products = await getProductsBySection(id);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href="/admin" className="text-sm text-navy/60 underline underline-offset-2">
          ← Secciones
        </Link>
        <h1 className="mt-1 font-serif text-xl font-semibold text-navy">{section.name}</h1>
        <p className="text-sm text-navy/60">Productos de esta sección.</p>
      </div>

      <details className="rounded-xl bg-white p-3 shadow-sm">
        <summary className="cursor-pointer text-sm font-semibold text-navy">
          + Agregar producto
        </summary>
        <form
          action={createProduct.bind(null, id)}
          className="mt-3 flex flex-col gap-3"
        >
          <Field label="Nombre">
            <input name="name" required className={inputClass} />
          </Field>
          <Field label="Descripción">
            <textarea name="description" rows={3} className={inputClass} />
          </Field>
          <Field label="Precio (opcional)">
            <input name="priceLabel" placeholder="ej. USD 150 o $6.000 CLP" className={inputClass} />
          </Field>
          <Field label="Mensaje de WhatsApp (usa {producto} para el nombre)">
            <input name="whatsappMessage" defaultValue={DEFAULT_WHATSAPP_TEMPLATE} className={inputClass} />
          </Field>
          <Field label="Foto">
            <input name="image" type="file" accept="image/*" className="text-sm" />
          </Field>
          <button
            type="submit"
            className="self-start rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white"
          >
            Crear producto
          </button>
        </form>
      </details>

      <ul className="flex flex-col gap-4">
        {products.map((product, index) => (
          <li key={product.id} className="rounded-xl bg-white p-3 shadow-sm">
            <div className="flex gap-3">
              <div className="flex flex-col">
                <form action={moveProduct.bind(null, product.id, id, "up")}>
                  <button
                    type="submit"
                    disabled={index === 0}
                    className="px-1 text-navy/50 disabled:opacity-20"
                    aria-label="Subir"
                  >
                    ▲
                  </button>
                </form>
                <form action={moveProduct.bind(null, product.id, id, "down")}>
                  <button
                    type="submit"
                    disabled={index === products.length - 1}
                    className="px-1 text-navy/50 disabled:opacity-20"
                    aria-label="Bajar"
                  >
                    ▼
                  </button>
                </form>
              </div>

              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-navy">
                {product.imageUrl && (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                )}
              </div>

              <details className="flex-1">
                <summary className="cursor-pointer text-sm font-semibold text-navy">
                  {product.name}
                </summary>
                <form
                  action={updateProduct.bind(null, product.id, id)}
                  className="mt-3 flex flex-col gap-3"
                >
                  <Field label="Nombre">
                    <input name="name" defaultValue={product.name} required className={inputClass} />
                  </Field>
                  <Field label="Descripción">
                    <textarea
                      name="description"
                      rows={3}
                      defaultValue={product.description}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Precio (opcional)">
                    <input
                      name="priceLabel"
                      defaultValue={product.priceLabel ?? ""}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Mensaje de WhatsApp">
                    <input
                      name="whatsappMessage"
                      defaultValue={product.whatsappMessage}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Reemplazar foto (opcional)">
                    <input name="image" type="file" accept="image/*" className="text-sm" />
                  </Field>
                  <button
                    type="submit"
                    className="self-start rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white"
                  >
                    Guardar cambios
                  </button>
                </form>
              </details>
            </div>

            <div className="mt-2 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <form
                  action={toggleProductFeatured.bind(null, product.id, id, !product.featured)}
                >
                  <button
                    type="submit"
                    className={
                      product.featured
                        ? "rounded-full bg-gold/20 px-2 py-1 text-gold"
                        : "rounded-full bg-zinc-100 px-2 py-1 text-zinc-500"
                    }
                  >
                    {product.featured ? "⭐ Destacado" : "Destacar"}
                  </button>
                </form>
                <form action={toggleProductActive.bind(null, product.id, id, !product.active)}>
                  <button
                    type="submit"
                    className={
                      product.active
                        ? "rounded-full bg-green-100 px-2 py-1 text-green-700"
                        : "rounded-full bg-zinc-200 px-2 py-1 text-zinc-600"
                    }
                  >
                    {product.active ? "Visible" : "Oculto"}
                  </button>
                </form>
              </div>
              <form action={deleteProduct.bind(null, product.id, id)}>
                <button type="submit" className="text-red-500">
                  Eliminar
                </button>
              </form>
            </div>
          </li>
        ))}

        {products.length === 0 && (
          <p className="text-sm text-navy/50">Todavía no hay productos en esta sección.</p>
        )}
      </ul>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-navy/20 px-3 py-2 text-sm outline-none focus:border-gold";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-navy/70">
      {label}
      {children}
    </label>
  );
}
