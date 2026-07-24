import { DEFAULT_WHATSAPP_TEMPLATE } from "./contact";
import type { Product, Section } from "./types";

// Datos de ejemplo para desarrollo local (fase A).
// El contenido real vendrá de Supabase (fase B) y se cargará vía el panel admin.

export const mockSections: Section[] = [
  { id: "sec-marketing", name: "IA para Marketing", slug: "ia-marketing", sortOrder: 1, active: true },
  { id: "sec-presencia", name: "Presencia Digital", slug: "presencia-digital", sortOrder: 2, active: true },
  { id: "sec-automatizacion", name: "Automatización", slug: "automatizacion", sortOrder: 3, active: true },
  { id: "sec-empresas", name: "IA para Empresas", slug: "ia-empresas", sortOrder: 4, active: true },
];

export const mockProducts: Product[] = [
  {
    id: "prod-avatar-ia",
    sectionId: "sec-marketing",
    name: "Avatar IA",
    description:
      "Tu avatar hablando en video a partir de una foto, con el guion que necesites. Ideal para reels y presentaciones.",
    priceLabel: "$6.000 CLP",
    imageUrl: null,
    whatsappMessage: DEFAULT_WHATSAPP_TEMPLATE,
    featured: true,
    sortOrder: 1,
    active: true,
  },
  {
    id: "prod-landing",
    sectionId: "sec-presencia",
    name: "Landing Page",
    description:
      "Página de una sola sección para mostrar tu negocio y captar clientes, lista en pocos días.",
    priceLabel: "USD 150",
    imageUrl: null,
    whatsappMessage: DEFAULT_WHATSAPP_TEMPLATE,
    featured: false,
    sortOrder: 1,
    active: true,
  },
  {
    id: "prod-catalogo",
    sectionId: "sec-presencia",
    name: "Catálogo Digital",
    description:
      "Sitio tipo catálogo, mobile-first, con tus productos o servicios organizados y botón directo de cotización.",
    priceLabel: "USD 250",
    imageUrl: null,
    whatsappMessage: DEFAULT_WHATSAPP_TEMPLATE,
    featured: true,
    sortOrder: 2,
    active: true,
  },
  {
    id: "prod-auto-ig",
    sectionId: "sec-automatizacion",
    name: "Automatización Instagram",
    description:
      "Respuestas automáticas a comentarios y mensajes directos en Instagram para no perder ningún lead.",
    priceLabel: "USD 300",
    imageUrl: null,
    whatsappMessage: DEFAULT_WHATSAPP_TEMPLATE,
    featured: false,
    sortOrder: 1,
    active: true,
  },
  {
    id: "prod-auto-wsp",
    sectionId: "sec-automatizacion",
    name: "Automatización WhatsApp",
    description:
      "Flujos de WhatsApp Business que responden, agendan y derivan consultas automáticamente.",
    priceLabel: "USD 500",
    imageUrl: null,
    whatsappMessage: DEFAULT_WHATSAPP_TEMPLATE,
    featured: false,
    sortOrder: 2,
    active: true,
  },
  {
    id: "prod-agente-ia",
    sectionId: "sec-empresas",
    name: "Agente IA",
    description:
      "Agente inteligente entrenado con la información de tu empresa para responder consultas y tareas repetitivas.",
    priceLabel: "USD 900+",
    imageUrl: null,
    whatsappMessage: DEFAULT_WHATSAPP_TEMPLATE,
    featured: false,
    sortOrder: 1,
    active: true,
  },
  {
    id: "prod-transformacion",
    sectionId: "sec-empresas",
    name: "Transformación Digital",
    description:
      "Proyecto integral de automatización e IA a la medida de tu empresa, por fases.",
    priceLabel: "USD 2.000–10.000",
    imageUrl: null,
    whatsappMessage: DEFAULT_WHATSAPP_TEMPLATE,
    featured: false,
    sortOrder: 2,
    active: true,
  },
];
