-- Create a table for representatives
CREATE TABLE public.representatives (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  section TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.representatives ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is public information)
CREATE POLICY "Representatives are viewable by everyone" 
ON public.representatives 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Authenticated users can create representatives" 
ON public.representatives 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update representatives" 
ON public.representatives 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete representatives" 
ON public.representatives 
FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_representatives_updated_at
BEFORE UPDATE ON public.representatives
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for representative images if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('representatives', 'representatives', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for representative images
CREATE POLICY "Representative images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'representatives');

CREATE POLICY "Authenticated users can upload representative images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'representatives' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update representative images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'representatives' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete representative images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'representatives' AND auth.uid() IS NOT NULL);