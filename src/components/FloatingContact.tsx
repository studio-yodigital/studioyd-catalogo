"use client";

import { instagramDmLink, GENERAL_WHATSAPP_MESSAGE } from "@/lib/contact";
import { copyToClipboard } from "@/lib/clipboard";
import { InstagramIcon } from "@/components/icons";

export function FloatingContact() {
  const href = instagramDmLink();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => copyToClipboard(GENERAL_WHATSAPP_MESSAGE)}
      aria-label="Escribir por Instagram"
      title="Se copia un mensaje sugerido — pégalo en el chat de Instagram"
      className="fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gold text-navy shadow-lg transition hover:scale-105 hover:brightness-95 sm:h-14 sm:w-14"
    >
      <InstagramIcon className="h-6 w-6 sm:h-7 sm:w-7" />
    </a>
  );
}
