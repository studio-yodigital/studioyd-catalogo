import { HeartHandshake, MessageCircleMore, BrainCircuit, MapPin } from "lucide-react";

const ITEMS = [
  { icon: HeartHandshake, label: "Atención personalizada" },
  { icon: MessageCircleMore, label: "Respuesta rápida por WhatsApp" },
  { icon: BrainCircuit, label: "Especialistas en IA para PYMEs" },
  { icon: MapPin, label: "Con base en Chile" },
];

export function TrustBar() {
  return (
    <section className="border-y border-navy/10 bg-cream">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-6 sm:grid-cols-4">
        {ITEMS.map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2 text-center">
            <Icon className="h-5 w-5 text-gold" aria-hidden="true" />
            <p className="text-xs font-medium text-navy/80 sm:text-sm">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
