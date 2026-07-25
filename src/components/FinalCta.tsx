import { generalWhatsAppLink, GENERAL_WHATSAPP_MESSAGE } from "@/lib/contact";

export function FinalCta() {
  const whatsappHref = generalWhatsAppLink(GENERAL_WHATSAPP_MESSAGE);

  return (
    <section id="contacto" className="px-4 py-16">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 rounded-3xl bg-navy px-6 py-12 text-center text-white sm:flex-row sm:justify-between sm:text-left">
        <div>
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
            ¿Listo para llevar tu negocio al <span className="text-gold-light">siguiente nivel</span>?
          </h2>
          <p className="mt-2 text-sm text-white/75">Escríbenos por WhatsApp y conversemos.</p>
        </div>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy transition hover:brightness-95"
        >
          Cotizar por WhatsApp
        </a>
      </div>
    </section>
  );
}
