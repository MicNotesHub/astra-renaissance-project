-- 1. Remove the BIEF Third Year "Financial Markets and Institutions" handout
DELETE FROM public.handouts WHERE id = 145;

-- 2. Create the magistrali_handouts table
CREATE TABLE public.magistrali_handouts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  program TEXT NOT NULL,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  semester INTEGER,
  exam_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.magistrali_handouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Magistrali handouts are viewable by everyone"
ON public.magistrali_handouts FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create Magistrali handouts"
ON public.magistrali_handouts FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update Magistrali handouts"
ON public.magistrali_handouts FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete Magistrali handouts"
ON public.magistrali_handouts FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE TRIGGER update_magistrali_handouts_updated_at
BEFORE UPDATE ON public.magistrali_handouts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();