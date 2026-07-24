import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "./actions";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-full flex-col bg-[#f5f4f1]">
      {user && (
        <header className="flex items-center justify-between bg-navy px-4 py-3 text-white">
          <Link href="/admin" className="font-serif font-semibold">
            <span className="text-gold-light">Yo</span>Digital · Admin
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/" target="_blank" className="text-white/70 hover:text-white">
              Ver sitio
            </Link>
            <form action={signOut}>
              <button type="submit" className="text-white/70 hover:text-white">
                Salir
              </button>
            </form>
          </div>
        </header>
      )}
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">{children}</main>
    </div>
  );
}
