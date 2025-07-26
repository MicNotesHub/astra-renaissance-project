-- Enable Row Level Security on course_subjects table
ALTER TABLE public.course_subjects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to course subjects
CREATE POLICY "Course subjects are viewable by everyone" 
ON public.course_subjects 
FOR SELECT 
USING (true);