-- Create CLMG handouts table for law course materials
CREATE TABLE public.clmg_handouts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  course_year TEXT NOT NULL CHECK (course_year IN ('primo_anno', 'secondo_anno', 'terzo_anno', 'quarto_anno', 'quinto_anno')),
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.clmg_handouts ENABLE ROW LEVEL SECURITY;

-- Create policies for CLMG handouts
CREATE POLICY "CLMG handouts are viewable by everyone" 
ON public.clmg_handouts 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create CLMG handouts" 
ON public.clmg_handouts 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update CLMG handouts" 
ON public.clmg_handouts 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete CLMG handouts" 
ON public.clmg_handouts 
FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_clmg_handouts_updated_at
BEFORE UPDATE ON public.clmg_handouts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();