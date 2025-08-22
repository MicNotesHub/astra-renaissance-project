-- Drop the existing policy first
DROP POLICY IF EXISTS "Representatives are viewable by everyone" ON public.representatives;

-- Drop the trigger since we're removing updated_at
DROP TRIGGER IF EXISTS update_representatives_updated_at ON public.representatives;

-- Simplify the representatives table to only keep essential fields
ALTER TABLE public.representatives 
DROP COLUMN IF EXISTS role,
DROP COLUMN IF EXISTS bio,
DROP COLUMN IF EXISTS order_index,
DROP COLUMN IF EXISTS is_active,
DROP COLUMN IF EXISTS created_at,
DROP COLUMN IF EXISTS updated_at;

-- Rename image_url to url for consistency
ALTER TABLE public.representatives 
RENAME COLUMN image_url TO url;

-- Create the simplified policy
CREATE POLICY "Representatives are viewable by everyone" 
ON public.representatives 
FOR SELECT 
USING (true);