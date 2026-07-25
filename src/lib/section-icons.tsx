import {
  Sparkles,
  Globe,
  Zap,
  BrainCircuit,
  MessageCircle,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";

const ICONS_BY_SLUG: Record<string, LucideIcon> = {
  "ia-marketing": Sparkles,
  "presencia-digital": Globe,
  automatizacion: Zap,
  "ia-empresas": BrainCircuit,
  chatbots: MessageCircle,
};

export function getSectionIcon(slug: string): LucideIcon {
  return ICONS_BY_SLUG[slug] ?? LayoutGrid;
}
