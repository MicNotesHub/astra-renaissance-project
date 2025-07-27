-- First: Delete all existing rows from astra_polare_media_content
DELETE FROM public.astra_polare_media_content;

-- Second: Insert the 3 new rows for the Astra Polare content
INSERT INTO public.astra_polare_media_content (
  title, 
  description, 
  platform, 
  content_type, 
  slides, 
  views, 
  likes, 
  media_link,
  thumbnail_url
) VALUES 
(
  'Welcome Week Experience 🎉',
  'Highlights indimenticabili dalla Welcome Week di Bocconi - Carosello di foto.',
  'Instagram',
  'carousel',
  3,
  '1.0K',
  80,
  'https://www.instagram.com/p/DMnAnx2oclT/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/astra-polare-media-storage/Screenshot 2025-07-27 alle 19.12.55.png'
),
(
  'Investimenti Alternativi 📈',
  'Approfondimenti sulle strategie di investimento innovative - Carosello di foto.',
  'Instagram',
  'carousel',
  4,
  '1.5K',
  120,
  'https://www.instagram.com/p/DJZhRVYov4d/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/astra-polare-media-storage/Screenshot 2025-07-27 alle 19.14.40.png'
),
(
  'Vacanze Bocconiane ☀️',
  'Ricordi dalle vacanze degli studenti Bocconi - Carosello di foto.',
  'Instagram',
  'carousel',
  3,
  '2.0K',
  180,
  'https://www.instagram.com/reel/DGNftIxt_24/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/astra-polare-media-storage/Screenshot 2025-07-27 alle 19.16.34.png'
);