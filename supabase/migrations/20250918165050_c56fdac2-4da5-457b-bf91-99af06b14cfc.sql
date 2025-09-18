-- Enable RLS on images table and add policy to allow public read access
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Images are viewable by everyone" 
ON images 
FOR SELECT 
USING (true);