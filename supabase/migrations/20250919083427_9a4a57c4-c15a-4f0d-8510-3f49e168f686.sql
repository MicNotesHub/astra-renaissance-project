-- Update CNSU representative to use correct image from Supabase storage
UPDATE public.representatives 
SET url = 'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/representatives/nardelli carmine.jpg'
WHERE name = 'Carmine Nardelli' AND section = 'CNSU';