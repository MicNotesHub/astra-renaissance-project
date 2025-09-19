-- Update CNSU representative image URL to the provided public path
UPDATE public.representatives 
SET url = 'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/rappresentnati/photo%20rappresentanti%20(1)/cnsu/Nardelli%20Carmine.jpg'
WHERE name = 'Carmine Nardelli' AND section = 'CNSU';