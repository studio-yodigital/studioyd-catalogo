"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import type { Product } from "@/lib/types";
import { buildInstagramMessage, buildWhatsAppLink, instagramDmLink } from "@/lib/contact";
import { getSectionIcon } from "@/lib/section-icons";
import { copyToClipboard } from "@/lib/clipboard";
import { WhatsAppIcon, InstagramIcon } from "@/components/icons";

export function ProductCard({
  product,
  sectionSlug,
}: {
  product: Product;
  sectionSlug: string;
}) {
  const whatsappLink = buildWhatsAppLink(product.name, product.whatsappMessage);
  const instagramMessage = buildInstagramMessage(product.name, product.whatsappMessage);
  const SectionIcon = getSectionIcon(sectionSlug);
  const benefits = (product.benefits ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-navy to-navy-light">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <SectionIcon className="h-12 w-12 text-gold-light/80" aria-hidden="true" />
          </div>
        )}
        {(product.featured || product.badgeLabel) && (
          <span className="absolute left-2 top-2 rounded-full bg-gold px-2 py-0.5 text-[11px] font-semibold text-navy shadow">
            {product.featured ? "⭐ Destacado" : product.badgeLabel}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-serif text-base font-semibold text-navy">{product.name}</h3>
        <p className="line-clamp-2 text-sm text-muted">{product.description}</p>

        {benefits.length > 0 && (
          <ul className="flex flex-col gap-1 pt-1">
            {benefits.slice(0, 4).map((benefit) => (
              <li key={benefit} className="flex items-start gap-1.5 text-xs text-navy/75">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" aria-hidden="true" />
                {benefit}
              </li>
            ))}
          </ul>
        )}

        {product.priceLabel && (
          <p className="pt-1 text-lg font-semibold text-navy">{product.priceLabel}</p>
        )}

        <div className="mt-auto flex flex-col gap-2 pt-3">
          <a
            href={instagramDmLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => copyToClipboard(instagramMessage)}
            className="flex items-center justify-center gap-1.5 rounded-full bg-navy px-3 py-2 text-sm font-semibold text-white transition hover:bg-navy-light"
            title="Se copia el mensaje sugerido — pégalo en el chat de Instagram"
          >
            <InstagramIcon />
            Cotizar por Instagram
          </a>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-full border border-navy/20 px-3 py-2 text-sm font-semibold text-navy transition hover:bg-navy/5"
          >
            <WhatsAppIcon />
            Cotizar por WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
