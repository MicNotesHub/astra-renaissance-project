-- Create storage bucket for uploaded files
INSERT INTO storage.buckets (id, name, public) VALUES ('dispense-uploads', 'dispense-uploads', false);

-- Create storage policies for dispense uploads
CREATE POLICY "Authenticated users can upload dispense files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'dispense-uploads' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can view dispense files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'dispense-uploads' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update their dispense files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'dispense-uploads' AND auth.uid() IS NOT NULL);

-- Create table for tracking uploaded zip files
CREATE TABLE public.dispense_uploads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT,
  uploaded_by UUID REFERENCES auth.users(id),
  upload_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  processing_status TEXT NOT NULL DEFAULT 'pending',
  extraction_path TEXT,
  total_files INTEGER DEFAULT 0,
  processed_files INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on dispense_uploads
ALTER TABLE public.dispense_uploads ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for dispense_uploads
CREATE POLICY "Users can view their own uploads" 
ON public.dispense_uploads 
FOR SELECT 
USING (uploaded_by = auth.uid());

CREATE POLICY "Users can create their own uploads" 
ON public.dispense_uploads 
FOR INSERT 
WITH CHECK (uploaded_by = auth.uid());

CREATE POLICY "Users can update their own uploads" 
ON public.dispense_uploads 
FOR UPDATE 
USING (uploaded_by = auth.uid());

-- Create table for individual files extracted from zip
CREATE TABLE public.extracted_dispense (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  upload_id UUID NOT NULL REFERENCES public.dispense_uploads(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  relative_path TEXT NOT NULL,
  file_size BIGINT,
  file_type TEXT,
  course_code TEXT,
  course_name TEXT,
  academic_year TEXT,
  semester INTEGER,
  category TEXT, -- 'slides', 'exercises', 'notes', 'exams', etc.
  extracted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on extracted_dispense
ALTER TABLE public.extracted_dispense ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for extracted_dispense
CREATE POLICY "Users can view extracted files from their uploads" 
ON public.extracted_dispense 
FOR SELECT 
USING (upload_id IN (SELECT id FROM public.dispense_uploads WHERE uploaded_by = auth.uid()));

-- Create indexes for better performance
CREATE INDEX idx_dispense_uploads_user ON public.dispense_uploads(uploaded_by);
CREATE INDEX idx_dispense_uploads_status ON public.dispense_uploads(processing_status);
CREATE INDEX idx_extracted_dispense_upload ON public.extracted_dispense(upload_id);
CREATE INDEX idx_extracted_dispense_course ON public.extracted_dispense(course_code, academic_year);
CREATE INDEX idx_extracted_dispense_category ON public.extracted_dispense(category);

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_dispense_uploads_updated_at
BEFORE UPDATE ON public.dispense_uploads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_extracted_dispense_updated_at
BEFORE UPDATE ON public.extracted_dispense
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();