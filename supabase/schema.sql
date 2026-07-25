-- Studio Yo Digital — Catálogo
-- Ejecutar completo en Supabase → SQL Editor → New query → Run
-- Es seguro volver a correrlo más de una vez (idempotente).

create extension if not exists pgcrypto;

-- Tablas -----------------------------------------------------------------

create table if not exists sections (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  section_id uuid not null references sections(id) on delete cascade,
  name text not null,
  description text not null default '',
  price_label text,
  image_url text,
  whatsapp_message text not null default 'Hola! Quiero cotizar: {producto} 🙌',
  featured boolean not null default false,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Seguridad (RLS) ----------------------------------------------------------
-- Lectura pública solo de filas activas. Lectura/escritura completa para
-- cualquier usuario autenticado (el único login será el del fundador).

alter table sections enable row level security;
alter table products enable row level security;

drop policy if exists "public read active sections" on sections;
create policy "public read active sections" on sections
  for select using (active = true);

drop policy if exists "authenticated full access sections" on sections;
create policy "authenticated full access sections" on sections
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "public read active products" on products;
create policy "public read active products" on products
  for select using (active = true);

drop policy if exists "authenticated full access products" on products;
create policy "authenticated full access products" on products
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Storage: bucket público para fotos de producto ---------------------------

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "public read product images" on storage.objects;
create policy "public read product images" on storage.objects
  for select using (bucket_id = 'product-images');

drop policy if exists "authenticated upload product images" on storage.objects;
create policy "authenticated upload product images" on storage.objects
  for insert with check (bucket_id = 'product-images' and auth.role() = 'authenticated');

drop policy if exists "authenticated update product images" on storage.objects;
create policy "authenticated update product images" on storage.objects
  for update using (bucket_id = 'product-images' and auth.role() = 'authenticated');

drop policy if exists "authenticated delete product images" on storage.objects;
create policy "authenticated delete product images" on storage.objects
  for delete using (bucket_id = 'product-images' and auth.role() = 'authenticated');

-- Rediseño: beneficios (checklist) y badge libre por producto -------------

alter table products add column if not exists benefits text;
alter table products add column if not exists badge_label text;
