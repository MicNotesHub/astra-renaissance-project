-- Add semester and exam_type columns to clmg_handouts for filtering support
ALTER TABLE public.clmg_handouts
ADD COLUMN semester integer,
ADD COLUMN exam_type text;

-- Update the RLS policies are already in place for clmg_handouts
-- No new policies needed since existing SELECT policy allows all reads