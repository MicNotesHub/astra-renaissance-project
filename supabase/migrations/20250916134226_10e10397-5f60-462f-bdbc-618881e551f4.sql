-- Create PDF files table for chatbot knowledge
CREATE TABLE public.pdf_files (
  name TEXT NOT NULL,
  url TEXT NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.pdf_files ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read PDFs (for chatbot access)
CREATE POLICY "PDFs are viewable by everyone" 
ON public.pdf_files 
FOR SELECT 
USING (true);

-- Allow authenticated users to manage PDFs
CREATE POLICY "Authenticated users can create PDFs" 
ON public.pdf_files 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update PDFs" 
ON public.pdf_files 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete PDFs" 
ON public.pdf_files 
FOR DELETE 
USING (auth.uid() IS NOT NULL);