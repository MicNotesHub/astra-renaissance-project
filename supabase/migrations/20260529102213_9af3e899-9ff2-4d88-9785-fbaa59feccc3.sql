UPDATE public.pdf_files
SET url = replace(url, 'https://cdn.astrabocconi.com', 'https://jsuzhbspinevkzmhibop.supabase.co')
WHERE url LIKE 'https://cdn.astrabocconi.com/%';