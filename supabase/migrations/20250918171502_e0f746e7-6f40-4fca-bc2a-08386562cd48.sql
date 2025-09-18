-- Add content column to pdf_files table to store extracted text
ALTER TABLE public.pdf_files ADD COLUMN content TEXT;

-- Add index for better search performance on content
CREATE INDEX IF NOT EXISTS idx_pdf_files_content_gin ON public.pdf_files USING gin(to_tsvector('english', content));

-- Add index for name search as well
CREATE INDEX IF NOT EXISTS idx_pdf_files_name ON public.pdf_files USING gin(to_tsvector('english', name));