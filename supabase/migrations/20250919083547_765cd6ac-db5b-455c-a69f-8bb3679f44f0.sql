-- Update CNSU representative to use correct image from rappresentnati bucket
UPDATE public.representatives 
SET url = 'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/rappresentnati/nardelli carmine.jpg'
WHERE name = 'Carmine Nardelli' AND section = 'CNSU';