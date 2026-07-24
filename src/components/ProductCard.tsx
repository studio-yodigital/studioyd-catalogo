"use client";

import Image from "next/image";
import type { Product } from "@/lib/types";
import { buildInstagramMessage, buildWhatsAppLink, instagramDmLink } from "@/lib/contact";

export function ProductCard({ product }: { product: Product }) {
  const whatsappLink = buildWhatsAppLink(product.name, product.whatsappMessage);
  const instagramMessage = buildInstagramMessage(product.name, product.whatsappMessage);

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm">
      <div className="relative aspect-square w-full bg-gradient-to-br from-navy to-navy-light">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-serif text-2xl font-semibold text-gold-light/90">
              {initials(product.name)}
            </span>
          </div>
        )}
        {product.featured && (
          <span className="absolute left-2 top-2 rounded-full bg-gold px-2 py-0.5 text-[11px] font-semibold text-navy shadow">
            ⭐ Destacado
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="font-serif text-base font-semibold text-navy">{product.name}</h3>
        <p className="line-clamp-3 text-sm text-navy/70">{product.description}</p>
        {product.priceLabel && (
          <p className="text-sm font-semibold text-gold">{product.priceLabel}</p>
        )}

        <div className="mt-auto flex flex-col gap-2 pt-2">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-full bg-[#25D366] px-3 py-2 text-sm font-semibold text-white transition hover:brightness-95"
          >
            <WhatsAppIcon />
            Cotizar por WhatsApp
          </a>
          <a
            href={instagramDmLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => copyToClipboard(instagramMessage)}
            className="flex items-center justify-center gap-1.5 rounded-full border border-navy/20 px-3 py-2 text-sm font-semibold text-navy transition hover:bg-navy/5"
            title="Se copia el mensaje sugerido — pégalo en el chat de Instagram"
          >
            <InstagramIcon />
            Cotizar por Instagram
          </a>
        </div>
      </div>
    </article>
  );
}

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

function copyToClipboard(text: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    navigator.clipboard.writeText(text).catch(() => {
      /* silencioso: si falla, el usuario igual llega al chat */
    });
  }
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.35a9.9 9.9 0 0 0 4.62 1.15h.01c5.46 0 9.91-4.45 9.91-9.9C21.96 6.45 17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.4 1.3-1.93 1.34-.5.05-1.02.24-3.42-.71-2.88-1.15-4.73-4.07-4.87-4.26-.14-.19-1.16-1.55-1.16-2.95 0-1.4.73-2.09.99-2.38.26-.28.57-.35.76-.35h.55c.18 0 .42-.03.64.5.24.57.81 1.98.88 2.13.07.14.11.31.02.5-.09.19-.14.31-.28.47-.14.16-.29.36-.42.48-.14.14-.28.28-.12.56.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.19-.28.37-.23.62-.14.26.09 1.63.77 1.91.91.28.14.47.21.54.33.07.12.07.68-.17 1.36Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.06 1.97.24 2.43.42.61.24 1.05.53 1.51.99.46.46.75.9.99 1.51.18.46.36 1.26.42 2.43.06 1.25.07 1.65.07 4.85s0 3.6-.07 4.85c-.06 1.17-.24 1.97-.42 2.43-.24.61-.53 1.05-.99 1.51-.46.46-.9.75-1.51.99-.46.18-1.26.36-2.43.42-1.25.06-1.65.07-4.85.07s-3.6 0-4.85-.07c-1.17-.06-1.97-.24-2.43-.42-.61-.24-1.05-.53-1.51-.99-.46-.46-.75-.9-.99-1.51-.18-.46-.36-1.26-.42-2.43C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.85c.06-1.17.24-1.97.42-2.43.24-.61.53-1.05.99-1.51.46-.46.9-.75 1.51-.99.46-.18 1.26-.36 2.43-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 2.7a7.1 7.1 0 1 0 0 14.2 7.1 7.1 0 0 0 0-14.2Zm0 2.16a4.94 4.94 0 1 1 0 9.88 4.94 4.94 0 0 1 0-9.88Zm7.36-2.4a1.16 1.16 0 1 1-2.32 0 1.16 1.16 0 0 1 2.32 0Z" />
    </svg>
  );
}
