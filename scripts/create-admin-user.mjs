// Crea (o actualiza la contraseña de) el usuario admin del panel /admin.
// Uso: node scripts/create-admin-user.mjs <email> <password>
// Requiere NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en .env.local

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

function loadEnvLocal() {
  const content = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  for (const line of content.split("\n")) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match) process.env[match[1]] ??= match[2];
  }
}

loadEnvLocal();

const [, , email, password] = process.argv;
if (!email || !password) {
  console.error("Uso: node scripts/create-admin-user.mjs <email> <password>");
  process.exit(1);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const { data: existing } = await supabase.auth.admin.listUsers();
const found = existing?.users.find((u) => u.email === email);

if (found) {
  const { error } = await supabase.auth.admin.updateUserById(found.id, { password });
  if (error) throw error;
  console.log(`Contraseña actualizada para ${email}`);
} else {
  const { error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (error) throw error;
  console.log(`Usuario admin creado: ${email}`);
}
