-- Fix the critical RLS issue on handouts table
ALTER TABLE public.handouts ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to handouts (they should be publicly accessible)
CREATE POLICY "Handouts are viewable by everyone" 
ON public.handouts 
FOR SELECT 
USING (true);

-- Create policy for authenticated users to create handouts
CREATE POLICY "Authenticated users can create handouts" 
ON public.handouts 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- Create policy for authenticated users to update handouts
CREATE POLICY "Authenticated users can update handouts" 
ON public.handouts 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);