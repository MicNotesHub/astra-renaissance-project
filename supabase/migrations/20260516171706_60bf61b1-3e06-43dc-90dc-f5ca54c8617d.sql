DO $$
DECLARE
  old_host CONSTANT text := 'https://jsuzhbspinevkzmhibop.supabase.co/storage/';
  new_host CONSTANT text := 'https://cdn.astrabocconi.com/storage/';
BEGIN
  UPDATE public.guides SET file_url = REPLACE(file_url, old_host, new_host) WHERE file_url LIKE old_host || '%';
  UPDATE public.guides SET thumbnail_url = REPLACE(thumbnail_url, old_host, new_host) WHERE thumbnail_url LIKE old_host || '%';

  UPDATE public.handouts SET file_url = REPLACE(file_url, old_host, new_host) WHERE file_url LIKE old_host || '%';

  UPDATE public.magistrali_handouts SET url = REPLACE(url, old_host, new_host) WHERE url LIKE old_host || '%';

  UPDATE public.clmg_handouts SET url = REPLACE(url, old_host, new_host) WHERE url LIKE old_host || '%';

  UPDATE public.representatives SET url = REPLACE(url, old_host, new_host) WHERE url LIKE old_host || '%';

  UPDATE public.astra_polare_media_content SET thumbnail_url = REPLACE(thumbnail_url, old_host, new_host) WHERE thumbnail_url LIKE old_host || '%';

  UPDATE public.events SET image_url = REPLACE(image_url, old_host, new_host) WHERE image_url LIKE old_host || '%';

  UPDATE public.images SET url = REPLACE(url, old_host, new_host) WHERE url LIKE old_host || '%';

  UPDATE public.pdf_files SET url = REPLACE(url, old_host, new_host) WHERE url LIKE old_host || '%';

  UPDATE public.resources SET file_url = REPLACE(file_url, old_host, new_host) WHERE file_url LIKE old_host || '%';

  UPDATE public."Stella_Polare" SET "URL" = REPLACE("URL", old_host, new_host) WHERE "URL" LIKE old_host || '%';
END $$;