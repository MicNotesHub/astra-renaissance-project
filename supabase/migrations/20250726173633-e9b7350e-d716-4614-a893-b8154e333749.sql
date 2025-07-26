-- Create astra_polare_media_content table for dynamic media content
CREATE TABLE public.astra_polare_media_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  title TEXT NOT NULL,
  description TEXT,
  platform TEXT NOT NULL CHECK (platform IN ('TikTok', 'Instagram')),
  thumbnail_url TEXT NOT NULL,
  media_link TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('video', 'carousel')),
  duration TEXT,
  slides INTEGER,
  views TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.astra_polare_media_content ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (everyone can view the content)
CREATE POLICY "Astra Polare content is viewable by everyone" 
ON public.astra_polare_media_content 
FOR SELECT 
USING (true);

-- Create policy for authenticated users to create content
CREATE POLICY "Authenticated users can create Astra Polare content" 
ON public.astra_polare_media_content 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- Create policy for authenticated users to update content
CREATE POLICY "Authenticated users can update Astra Polare content" 
ON public.astra_polare_media_content 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

-- Create policy for authenticated users to delete content
CREATE POLICY "Authenticated users can delete Astra Polare content" 
ON public.astra_polare_media_content 
FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_astra_polare_media_content_updated_at
BEFORE UPDATE ON public.astra_polare_media_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for the table
ALTER PUBLICATION supabase_realtime ADD TABLE public.astra_polare_media_content;

-- Set replica identity for realtime functionality
ALTER TABLE public.astra_polare_media_content REPLICA IDENTITY FULL;

-- Insert sample data
INSERT INTO public.astra_polare_media_content (
  title,
  description,
  platform,
  thumbnail_url,
  media_link,
  content_type,
  duration,
  slides,
  views,
  likes
) VALUES 
(
  'Come Sopravvivere agli Esami 📚',
  'Tips and tricks per affrontare la sessione',
  'TikTok',
  '/lovable-uploads/79a8e832-7749-4713-905f-e6adaa18938c.png',
  'https://www.tiktok.com/@astra_bocconi/video/placeholder_exam_tips',
  'video',
  '2:34',
  NULL,
  '1.2K',
  89
),
(
  'Exchange Stories 🌍',
  'Esperienze di studenti Bocconi all''estero',
  'Instagram',
  '/lovable-uploads/b01b09dd-7caf-43e1-9dc2-a6d5e15349fd.png',
  'https://www.instagram.com/p/placeholder_exchange_stories/',
  'carousel',
  NULL,
  8,
  '856',
  67
),
(
  'Networking Events Recap ✨',
  'Highlights dell''ultimo evento ASTRA',
  'Instagram',
  '/lovable-uploads/79a8e832-7749-4713-905f-e6adaa18938c.png',
  'https://www.instagram.com/p/placeholder_networking_recap/',
  'video',
  '1:45',
  NULL,
  '2.1K',
  134
),
(
  'Vita in Campus 🏫',
  'Un giorno tipo nella vita di uno studente Bocconi',
  'TikTok',
  '/lovable-uploads/b01b09dd-7caf-43e1-9dc2-a6d5e15349fd.png',
  'https://www.tiktok.com/@astra_bocconi/video/placeholder_campus_life',
  'video',
  '3:12',
  NULL,
  '2.8K',
  156
);