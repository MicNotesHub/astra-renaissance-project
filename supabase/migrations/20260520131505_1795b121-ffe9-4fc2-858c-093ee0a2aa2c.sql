DO $$
BEGIN
  UPDATE public.handouts SET file_url = REPLACE(file_url, 'https://cdn.astrabocconi.com/storage/', 'https://jsuzhbspinevkzmhibop.supabase.co/storage/') WHERE file_url LIKE 'https://cdn.astrabocconi.com/storage/%';
  UPDATE public.magistrali_handouts SET url = REPLACE(url, 'https://cdn.astrabocconi.com/storage/', 'https://jsuzhbspinevkzmhibop.supabase.co/storage/') WHERE url LIKE 'https://cdn.astrabocconi.com/storage/%';
  UPDATE public.clmg_handouts SET url = REPLACE(url, 'https://cdn.astrabocconi.com/storage/', 'https://jsuzhbspinevkzmhibop.supabase.co/storage/') WHERE url LIKE 'https://cdn.astrabocconi.com/storage/%';
END $$;