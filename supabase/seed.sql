-- Studio Yo Digital — Catálogo
-- Ejecutar DESPUÉS de schema.sql. Carga las 4 secciones y 7 productos
-- iniciales según docs/04_BUSINESS_MODEL.md del repo de negocio.

with sec as (
  insert into sections (name, slug, sort_order) values
    ('IA para Marketing', 'ia-marketing', 1),
    ('Presencia Digital', 'presencia-digital', 2),
    ('Automatización', 'automatizacion', 3),
    ('IA para Empresas', 'ia-empresas', 4)
  returning id, slug
)
insert into products (section_id, name, description, price_label, featured, sort_order)
select id, v.name, v.description, v.price_label, v.featured, v.sort_order
from sec
join (values
  ('ia-marketing', 'Avatar IA',
   'Tu avatar hablando en video a partir de una foto, con el guion que necesites. Ideal para reels y presentaciones.',
   '$6.000 CLP', true, 1),
  ('presencia-digital', 'Landing Page',
   'Página de una sola sección para mostrar tu negocio y captar clientes, lista en pocos días.',
   'USD 150', false, 1),
  ('presencia-digital', 'Catálogo Digital',
   'Sitio tipo catálogo, mobile-first, con tus productos o servicios organizados y botón directo de cotización.',
   'USD 250', true, 2),
  ('automatizacion', 'Automatización Instagram',
   'Respuestas automáticas a comentarios y mensajes directos en Instagram para no perder ningún lead.',
   'USD 300', false, 1),
  ('automatizacion', 'Automatización WhatsApp',
   'Flujos de WhatsApp Business que responden, agendan y derivan consultas automáticamente.',
   'USD 500', false, 2),
  ('ia-empresas', 'Agente IA',
   'Agente inteligente entrenado con la información de tu empresa para responder consultas y tareas repetitivas.',
   'USD 900+', false, 1),
  ('ia-empresas', 'Transformación Digital',
   'Proyecto integral de automatización e IA a la medida de tu empresa, por fases.',
   'USD 2.000–10.000', false, 2)
) as v(section_slug, name, description, price_label, featured, sort_order)
  on v.section_slug = sec.slug;
