import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-navy/95 backdrop-blur supports-[backdrop-filter]:bg-navy/90 text-white">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
        <Image
          src="/brand/logo.png"
          alt={siteConfig.name}
          width={44}
          height={44}
          className="h-11 w-11 rounded-full object-cover"
          priority
        />
        <div className="leading-tight">
          <p className="font-serif text-lg font-semibold">
            <span className="text-gold-light">Yo</span>Digital
          </p>
          <p className="text-xs text-white/70">{siteConfig.tagline}</p>
        </div>
      </div>
    </header>
  );
}
