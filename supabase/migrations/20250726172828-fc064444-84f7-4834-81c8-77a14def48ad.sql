-- Create guides table for storing different guide documents
CREATE TABLE public.guides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- e.g., 'associazioni', 'opzionali', 'graduate', 'stage', 'freemover', 'exchange'
  file_url TEXT NOT NULL,
  thumbnail_url TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.guides ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (guides should be visible to everyone)
CREATE POLICY "Guides are viewable by everyone" 
ON public.guides 
FOR SELECT 
USING (is_active = true);

-- Create policy for authenticated users to create guides
CREATE POLICY "Authenticated users can create guides" 
ON public.guides 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- Create policy for authenticated users to update guides
CREATE POLICY "Authenticated users can update guides" 
ON public.guides 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_guides_updated_at
BEFORE UPDATE ON public.guides
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();