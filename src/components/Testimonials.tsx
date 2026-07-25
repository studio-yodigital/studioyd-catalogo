type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

// Vacío a propósito: todavía no hay reseñas reales de clientes.
// Cuando existan, agrégalas acá y la sección se muestra sola.
const TESTIMONIALS: Testimonial[] = [];

export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section className="bg-cream px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-serif text-2xl font-semibold text-navy sm:text-3xl">
          Lo que dicen nuestros clientes
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <blockquote
              key={testimonial.name}
              className="rounded-2xl border border-navy/10 bg-white p-5 text-sm text-navy/80"
            >
              <p>&ldquo;{testimonial.quote}&rdquo;</p>
              <footer className="mt-3 text-xs font-semibold text-navy">
                {testimonial.name} · <span className="font-normal text-muted">{testimonial.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
