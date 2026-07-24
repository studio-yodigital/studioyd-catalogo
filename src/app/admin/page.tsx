import { getAllSections } from "@/lib/admin-data";
import {
  createSection,
  updateSectionName,
  toggleSectionActive,
  deleteSection,
  moveSection,
} from "./actions";

export default async function AdminDashboard() {
  const sections = await getAllSections();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-xl font-semibold text-navy">Secciones</h1>
        <p className="text-sm text-navy/60">
          Organiza el catálogo en secciones. Dentro de cada una agregas los productos.
        </p>
      </div>

      <form
        action={createSection}
        className="flex gap-2 rounded-xl bg-white p-3 shadow-sm"
      >
        <input
          name="name"
          required
          placeholder="Nueva sección (ej. Automatización)"
          className="flex-1 rounded-lg border border-navy/20 px-3 py-2 text-sm outline-none focus:border-gold"
        />
        <button
          type="submit"
          className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white"
        >
          Agregar
        </button>
      </form>

      <ul className="flex flex-col gap-3">
        {sections.map((section, index) => (
          <li key={section.id} className="rounded-xl bg-white p-3 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <form action={moveSection.bind(null, section.id, "up")}>
                  <button
                    type="submit"
                    disabled={index === 0}
                    className="px-1 text-navy/50 disabled:opacity-20"
                    aria-label="Subir"
                  >
                    ▲
                  </button>
                </form>
                <form action={moveSection.bind(null, section.id, "down")}>
                  <button
                    type="submit"
                    disabled={index === sections.length - 1}
                    className="px-1 text-navy/50 disabled:opacity-20"
                    aria-label="Bajar"
                  >
                    ▼
                  </button>
                </form>
              </div>

              <form
                action={updateSectionName.bind(null, section.id)}
                className="flex flex-1 items-center gap-2"
              >
                <input
                  name="name"
                  defaultValue={section.name}
                  className="flex-1 rounded-lg border border-navy/20 px-2 py-1.5 text-sm outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  className="rounded-full border border-navy/20 px-3 py-1.5 text-xs font-semibold text-navy"
                >
                  Guardar
                </button>
              </form>
            </div>

            <div className="mt-2 flex items-center justify-between text-xs">
              <a
                href={`/admin/secciones/${section.id}`}
                className="font-semibold text-gold underline underline-offset-2"
              >
                Gestionar productos →
              </a>

              <div className="flex items-center gap-2">
                <form action={toggleSectionActive.bind(null, section.id, !section.active)}>
                  <button
                    type="submit"
                    className={
                      section.active
                        ? "rounded-full bg-green-100 px-2 py-1 text-green-700"
                        : "rounded-full bg-zinc-200 px-2 py-1 text-zinc-600"
                    }
                  >
                    {section.active ? "Activa" : "Oculta"}
                  </button>
                </form>
                <form action={deleteSection.bind(null, section.id)}>
                  <button type="submit" className="text-red-500">
                    Eliminar
                  </button>
                </form>
              </div>
            </div>
          </li>
        ))}

        {sections.length === 0 && (
          <p className="text-sm text-navy/50">Todavía no hay secciones.</p>
        )}
      </ul>
    </div>
  );
}
