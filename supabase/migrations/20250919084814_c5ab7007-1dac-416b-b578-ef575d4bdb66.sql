-- Update CNSU representative image URL to correct path
UPDATE public.representatives 
SET url = 'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/rappresentnati/photo%20rappresentanti%20(1)/cnsu/nardelli%20carmine.jpg'
WHERE name = 'Carmine Nardelli' AND section = 'CNSU';