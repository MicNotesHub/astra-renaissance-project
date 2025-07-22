-- Update the extracted_dispense table to match the simple folder structure
ALTER TABLE public.extracted_dispense 
DROP COLUMN semester,
DROP COLUMN category,
DROP COLUMN metadata;

-- Add a simple folder_path column to track the year/course structure
ALTER TABLE public.extracted_dispense 
ADD COLUMN folder_path TEXT NOT NULL DEFAULT '',
ADD COLUMN year_folder TEXT,
ADD COLUMN course_folder TEXT;

-- Update the index to match the new structure
DROP INDEX idx_extracted_dispense_category;
CREATE INDEX idx_extracted_dispense_year_course ON public.extracted_dispense(year_folder, course_folder);

-- Add a comment to clarify the expected structure
COMMENT ON TABLE public.extracted_dispense IS 'Stores files extracted from zip uploads. Expected structure: year/course/files';
COMMENT ON COLUMN public.extracted_dispense.folder_path IS 'Full relative path from zip root (e.g., "2024/Mathematics/lecture1.pdf")';
COMMENT ON COLUMN public.extracted_dispense.year_folder IS 'Year folder name (e.g., "2024", "2023")';
COMMENT ON COLUMN public.extracted_dispense.course_folder IS 'Course folder name (e.g., "Mathematics", "Physics")';

-- Update the academic_year column to be more flexible for year parsing
ALTER TABLE public.extracted_dispense 
ALTER COLUMN academic_year DROP NOT NULL;