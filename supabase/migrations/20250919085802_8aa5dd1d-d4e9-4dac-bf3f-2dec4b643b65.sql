-- Fix security issue: Restrict access to event registration data
-- Add user_id column to link registrations to authenticated users
ALTER TABLE public.event_registrations 
ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- Drop the existing insecure SELECT policy
DROP POLICY IF EXISTS "Users can view their own registrations" ON public.event_registrations;

-- Create secure SELECT policy - users can only see their own registrations
CREATE POLICY "Users can view their own registrations" 
ON public.event_registrations 
FOR SELECT 
USING (
  -- Allow users to see registrations where:
  -- 1. They are authenticated and user_id matches their auth.uid()
  -- 2. OR they are authenticated and the email matches their auth.email() (for legacy anonymous registrations)
  (auth.uid() IS NOT NULL AND user_id = auth.uid()) 
  OR 
  (auth.uid() IS NOT NULL AND user_email = auth.email())
);

-- Update the INSERT policy to set user_id for authenticated users
DROP POLICY IF EXISTS "Anyone can register for events" ON public.event_registrations;

CREATE POLICY "Anyone can register for events" 
ON public.event_registrations 
FOR INSERT 
WITH CHECK (
  -- Allow insert if:
  -- 1. User is authenticated and user_id matches auth.uid()
  -- 2. OR user_id is null (anonymous registration)
  user_id = auth.uid() OR user_id IS NULL
);

-- Add policy for authenticated users to update their own registrations
CREATE POLICY "Users can update their own registrations" 
ON public.event_registrations 
FOR UPDATE 
USING (
  (auth.uid() IS NOT NULL AND user_id = auth.uid()) 
  OR 
  (auth.uid() IS NOT NULL AND user_email = auth.email())
);