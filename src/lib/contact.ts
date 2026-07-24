import { siteConfig } from "./site-config";

export function buildWhatsAppLink(productName: string, template: string): string {
  const message = template.replace("{producto}", productName);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildInstagramMessage(productName: string, template: string): string {
  return template.replace("{producto}", productName);
}

export function instagramDmLink(): string {
  return `https://ig.me/m/${siteConfig.instagramHandle}`;
}

export const DEFAULT_WHATSAPP_TEMPLATE = "Hola! Quiero cotizar: {producto} 🙌";
