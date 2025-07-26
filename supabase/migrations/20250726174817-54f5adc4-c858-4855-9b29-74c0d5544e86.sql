-- Add guide data without descriptions
DELETE FROM public.guides; -- Clear existing sample data

INSERT INTO public.guides (
  title,
  category,
  thumbnail_url,
  file_url,
  order_index
) VALUES 
(
  'Associations 101',
  'associations',
  'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/thumbnails/associations.png',
  'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/associations.pdf',
  1
),
(
  'Opzionali 101',
  'opzionali',
  'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/thumbnails/opzionali.png',
  'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/opzionali.pdf',
  2
),
(
  'Graduate 101',
  'graduate',
  'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/thumbnails/graduate.png',
  'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/graduate.pdf',
  3
),
(
  'Stage 101',
  'stage',
  'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/thumbnails/stage.png',
  'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/stage.pdf',
  4
),
(
  'Freemover 101',
  'freemover',
  'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/thumbnails/freemover.png',
  'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/freemover.pdf',
  5
),
(
  'Residenze 101',
  'residenze',
  'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/thumbnails/residenze.png',
  'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/residenze.pdf',
  6
),
(
  'Exchange 101 - Magistrale',
  'exchange_magistrale',
  'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/thumbnails/exchange-magistrale.png',
  'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/exchange-magistrale.pdf',
  7
),
(
  'Exchange 101 - Triennale',
  'exchange_triennale',
  'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/thumbnails/exchange-triennale.png',
  'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/exchange-triennale.pdf',
  8
),
(
  'University 101',
  'university',
  'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/thumbnails/university.png',
  'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/university.pdf',
  9
),
(
  'Milan 101',
  'milan',
  'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/thumbnails/milan.png',
  'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/milan.pdf',
  10
),
(
  'Burocrazia 101',
  'burocrazia',
  'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/thumbnails/burocrazia.png',
  'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/burocrazia.pdf',
  11
),
(
  'Master Admissions',
  'master_admissions',
  'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/thumbnails/master-admissions.png',
  'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/master-admissions.pdf',
  12
),
(
  'Tesi 101',
  'tesi',
  'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/thumbnails/tesi.png',
  'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/tesi.pdf',
  13
),
(
  'ECDL 101',
  'ecdl',
  'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/thumbnails/ecdl.png',
  'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/ecdl.pdf',
  14
);