import { ChevronDown } from "lucide-react";

// Contenido borrador — validar cada respuesta con el fundador antes de publicar,
// en particular cualquier plazo o condición comercial.
const FAQS = [
  {
    question: "¿Cómo cotizo un servicio?",
    answer:
      "Elige el servicio que te interesa y escríbenos por WhatsApp o Instagram con el botón de esa tarjeta. Te respondemos con una propuesta clara.",
  },
  {
    question: "¿Cuánto demora un proyecto?",
    answer:
      "Depende del servicio: algunos se entregan en pocos días y otros, como automatizaciones o proyectos más grandes, se cotizan por fases. Te damos un plazo estimado junto con la propuesta.",
  },
  {
    question: "¿Trabajan con empresas fuera de Chile?",
    answer:
      "Sí, podemos coordinar todo por WhatsApp o Instagram con negocios de otros países de Latinoamérica.",
  },
  {
    question: "No sé qué servicio necesito, ¿qué hago?",
    answer:
      "Cuéntanos el problema que quieres resolver (no la solución) y te recomendamos el servicio que mejor se ajuste a tu negocio y presupuesto.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-center font-serif text-2xl font-semibold text-navy sm:text-3xl">
          Preguntas frecuentes
        </h2>
        <div className="mt-8 flex flex-col divide-y divide-navy/10 rounded-2xl border border-navy/10 bg-white">
          {FAQS.map((item) => (
            <details key={item.question} className="group p-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-navy">
                {item.question}
                <ChevronDown
                  className="h-4 w-4 shrink-0 text-navy/50 transition group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-2 text-sm text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
