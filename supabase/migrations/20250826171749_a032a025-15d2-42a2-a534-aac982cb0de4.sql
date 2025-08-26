-- Remove duplicate representatives keeping only the first occurrence (by ID) for each name/section combination
DELETE FROM public.representatives 
WHERE id NOT IN (
    SELECT MIN(id) 
    FROM public.representatives 
    GROUP BY name, section
);