-- Remove duplicate representatives using ROW_NUMBER() to keep only the first occurrence
DELETE FROM public.representatives
WHERE id IN (
    SELECT id
    FROM (
        SELECT id,
               ROW_NUMBER() OVER (PARTITION BY name, section ORDER BY id) as row_num
        FROM public.representatives
    ) duplicates
    WHERE row_num > 1
);