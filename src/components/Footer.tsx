import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="bg-navy-deep py-8 text-white/80">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-4 text-center text-sm">
        <p className="font-serif text-base text-white">
          <span className="text-gold-light">Yo</span>Digital
        </p>
        <p>{siteConfig.description}</p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-2 text-white/70">
          <a
            href={`https://instagram.com/${siteConfig.instagramHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold-light"
          >
            @{siteConfig.instagramHandle}
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="hover:text-gold-light"
          >
            {siteConfig.email}
          </a>
        </div>
        <p className="pt-4 text-xs text-white/50">
          © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
