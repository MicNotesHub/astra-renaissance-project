
-- Add exam_type column to handouts table
ALTER TABLE public.handouts ADD COLUMN exam_type TEXT;

-- Populate exam_type based on filename patterns
UPDATE public.handouts SET exam_type = 
  CASE 
    WHEN filename ILIKE '%General%' THEN 'generale'
    WHEN filename ILIKE '%Partial%' OR filename ILIKE '%Parziale%' THEN 'parziale'
    WHEN filename ILIKE '%Full%' THEN 'generale'
    ELSE NULL
  END;
