"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { generalWhatsAppLink, GENERAL_WHATSAPP_MESSAGE } from "@/lib/contact";

const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#como-trabajamos", label: "Cómo trabajamos" },
  { href: "#faq", label: "FAQ" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const whatsappHref = generalWhatsAppLink(GENERAL_WHATSAPP_MESSAGE);

  return (
    <header className="sticky top-0 z-50 bg-navy/95 backdrop-blur supports-[backdrop-filter]:bg-navy/90 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <a href="#inicio" className="flex items-center gap-3">
          <Image
            src="/brand/logo.png"
            alt={siteConfig.name}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
            priority
          />
          <span className="font-serif text-lg font-semibold">
            <span className="text-gold-light">Yo</span>Digital
          </span>
        </a>

        <nav className="hidden items-center gap-6 text-sm text-white/80 lg:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-navy transition hover:brightness-95"
          >
            Cotizar por WhatsApp
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="text-white lg:hidden"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-white/10 bg-navy px-4 py-3 lg:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-2 py-2 text-sm text-white/80 transition hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-2 rounded-full bg-gold px-4 py-2 text-center text-sm font-semibold text-navy"
          >
            Cotizar por WhatsApp
          </a>
        </nav>
      )}
    </header>
  );
}
