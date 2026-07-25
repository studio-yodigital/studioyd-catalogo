"use client";

import { generalWhatsAppLink, instagramDmLink, GENERAL_WHATSAPP_MESSAGE } from "@/lib/contact";
import { copyToClipboard } from "@/lib/clipboard";
import { InstagramIcon } from "@/components/icons";

export function FinalCta() {
  const whatsappHref = generalWhatsAppLink(GENERAL_WHATSAPP_MESSAGE);
  const instagramHref = instagramDmLink();

  return (
    <section id="contacto" className="px-4 py-16">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 rounded-3xl bg-navy px-6 py-12 text-center text-white sm:flex-row sm:justify-between sm:text-left">
        <div>
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
            ¿Listo para llevar tu negocio al <span className="text-gold-light">siguiente nivel</span>?
          </h2>
          <p className="mt-2 text-sm text-white/75">Escríbenos por Instagram y conversemos.</p>
        </div>
        <div className="flex shrink-0 flex-col items-center gap-2">
          <a
            href={instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => copyToClipboard(GENERAL_WHATSAPP_MESSAGE)}
            title="Se copia un mensaje sugerido — pégalo en el chat de Instagram"
            className="flex items-center gap-1.5 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy transition hover:brightness-95"
          >
            <InstagramIcon className="h-4 w-4" />
            Cotizar por Instagram
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/60 underline underline-offset-2 hover:text-white/80"
          >
            o por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
