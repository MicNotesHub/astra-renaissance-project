-- Update all 3 rows to use the Astra logo as fallback (will be handled by frontend)
UPDATE public.astra_polare_media_content 
SET thumbnail_url = NULL;