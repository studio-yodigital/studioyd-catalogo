import { MessageSquareText, FileText, Rocket, CheckCircle2 } from "lucide-react";

// Contenido borrador — validar la redacción de cada paso con el fundador antes de publicar.
const STEPS = [
  {
    icon: MessageSquareText,
    title: "Cuéntanos tu proyecto",
    description: "Escríbenos por WhatsApp o Instagram y cuéntanos qué necesita tu negocio.",
  },
  {
    icon: FileText,
    title: "Te enviamos una propuesta",
    description: "Cotizamos de forma clara y sin compromiso, según el servicio que elijas.",
  },
  {
    icon: Rocket,
    title: "Desarrollamos",
    description: "Nos encargamos de todo el proceso, de principio a fin.",
  },
  {
    icon: CheckCircle2,
    title: "Entregamos y escalamos",
    description: "Revisamos juntos el resultado y vemos el siguiente paso para tu negocio.",
  },
];

export function HowWeWork() {
  return (
    <section id="como-trabajamos" className="bg-cream px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-serif text-2xl font-semibold text-navy sm:text-3xl">
          Así trabajamos
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, description }, index) => (
            <div key={title} className="relative flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <span className="mt-3 text-xs font-semibold text-gold">Paso {index + 1}</span>
              <h3 className="mt-1 font-serif text-base font-semibold text-navy">{title}</h3>
              <p className="mt-1 text-sm text-muted">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
