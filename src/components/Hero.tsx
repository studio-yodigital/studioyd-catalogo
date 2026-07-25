import Image from "next/image";
import { Zap, Users, Clock3, Sparkles, MessageCircle, Bot } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { generalWhatsAppLink, GENERAL_WHATSAPP_MESSAGE } from "@/lib/contact";

const HERO_BENEFITS = [
  { icon: Zap, label: "Más eficiencia" },
  { icon: Users, label: "Más clientes" },
  { icon: Clock3, label: "Ahorra tiempo" },
  { icon: Sparkles, label: "Soluciones con IA" },
];

export function Hero() {
  const whatsappHref = generalWhatsAppLink(GENERAL_WHATSAPP_MESSAGE);

  return (
    <section id="inicio" className="bg-navy-deep px-4 pb-16 pt-14 text-white sm:pt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <h1 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            Soluciones digitales que <span className="text-gold-light">impulsan</span> tu negocio
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base text-white/75 sm:text-lg lg:mx-0">
            {siteConfig.description}
          </p>

          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full bg-gold px-6 py-3 text-center text-sm font-semibold text-navy transition hover:brightness-95 sm:w-auto"
            >
              Cotizar por WhatsApp
            </a>
            <a
              href="#servicios"
              className="w-full rounded-full border border-white/25 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
            >
              Ver servicios
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-white/70 lg:justify-start">
            {HERO_BENEFITS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-gold-light" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative mx-auto aspect-square w-64 sm:w-80">
            <Image
              src="/brand/logo.png"
              alt={siteConfig.name}
              fill
              sizes="320px"
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>

          <div className="absolute -left-2 top-4 flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-navy shadow-lg sm:left-0">
            <Bot className="h-5 w-5 text-gold" aria-hidden="true" />
            <div className="text-xs">
              <p className="font-semibold">Automatizaciones</p>
              <p className="text-navy/60">Trabajando 24/7</p>
            </div>
          </div>

          <div className="absolute -right-2 bottom-6 flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-navy shadow-lg sm:right-0">
            <MessageCircle className="h-5 w-5 text-gold" aria-hidden="true" />
            <p className="text-xs font-semibold">Chatbots con IA</p>
          </div>
        </div>
      </div>
    </section>
  );
}
