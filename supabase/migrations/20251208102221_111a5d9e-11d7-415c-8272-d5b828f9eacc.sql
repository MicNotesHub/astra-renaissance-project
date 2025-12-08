-- Enable RLS on Stella_Polare if not already enabled
ALTER TABLE public."Stella_Polare" ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Stella Polare articles are viewable by everyone"
ON public."Stella_Polare"
FOR SELECT
USING (true);