-- Create tables for Astra resources and events

-- Table for study materials/dispense
CREATE TABLE public.resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  course_name TEXT NOT NULL,
  course_code TEXT,
  academic_year TEXT NOT NULL,
  semester INTEGER CHECK (semester IN (1, 2)),
  resource_type TEXT NOT NULL CHECK (resource_type IN ('pdf', 'slides', 'notes', 'exercises', 'book')),
  file_url TEXT,
  file_size INTEGER,
  upload_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  uploaded_by UUID,
  downloads_count INTEGER DEFAULT 0,
  tags TEXT[],
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table for events
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL CHECK (event_type IN ('conference', 'workshop', 'networking', 'career', 'social', 'academic')),
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  location TEXT,
  is_online BOOLEAN DEFAULT false,
  meeting_link TEXT,
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  registration_required BOOLEAN DEFAULT true,
  registration_deadline TIMESTAMP WITH TIME ZONE,
  organizer_name TEXT,
  organizer_contact TEXT,
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table for event registrations
CREATE TABLE public.event_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  registration_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  attendance_status TEXT DEFAULT 'registered' CHECK (attendance_status IN ('registered', 'attended', 'no_show')),
  UNIQUE(event_id, user_email)
);

-- Enable Row Level Security
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for resources (public read, admin write)
CREATE POLICY "Resources are viewable by everyone" 
ON public.resources 
FOR SELECT 
USING (is_public = true);

CREATE POLICY "Authenticated users can upload resources" 
ON public.resources 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own resources" 
ON public.resources 
FOR UPDATE 
USING (uploaded_by = auth.uid());

-- RLS Policies for events (public read for upcoming events)
CREATE POLICY "Public events are viewable by everyone" 
ON public.events 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create events" 
ON public.events 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- RLS Policies for event registrations
CREATE POLICY "Users can view their own registrations" 
ON public.event_registrations 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can register for events" 
ON public.event_registrations 
FOR INSERT 
WITH CHECK (true);

-- Indexes for better performance
CREATE INDEX idx_resources_course ON public.resources(course_name, academic_year);
CREATE INDEX idx_resources_type ON public.resources(resource_type);
CREATE INDEX idx_events_date ON public.events(start_date);
CREATE INDEX idx_events_status ON public.events(status);
CREATE INDEX idx_event_registrations_event ON public.event_registrations(event_id);

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_resources_updated_at
  BEFORE UPDATE ON public.resources
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for resources
INSERT INTO public.resources (title, description, course_name, course_code, academic_year, semester, resource_type, tags) VALUES
('Dispense Matematica Generale', 'Appunti completi di Matematica Generale con esercizi risolti', 'Matematica Generale', 'MAT001', '2023-2024', 1, 'notes', ARRAY['matematica', 'analisi', 'esercizi']),
('Slides Microeconomia', 'Slide delle lezioni di Microeconomia Prof. Rossi', 'Microeconomia', 'ECO201', '2023-2024', 1, 'slides', ARRAY['economia', 'microeconomia', 'teoria']),
('Esercizi Statistica', 'Raccolta di esercizi di Statistica con soluzioni', 'Statistica', 'STAT101', '2023-2024', 2, 'exercises', ARRAY['statistica', 'probabilità', 'esercizi']),
('Dispense Diritto Commerciale', 'Riassunto completo di Diritto Commerciale', 'Diritto Commerciale', 'DIR301', '2023-2024', 2, 'notes', ARRAY['diritto', 'commerciale', 'riassunto']);

-- Insert sample data for events
INSERT INTO public.events (title, description, event_type, start_date, end_date, location, registration_required, organizer_name, tags) VALUES
('Career Day Bocconi 2024', 'Incontro con le principali aziende per opportunità di stage e lavoro', 'career', '2024-03-15 09:00:00+01', '2024-03-15 18:00:00+01', 'Aula Magna Bocconi', true, 'Astra Career Team', ARRAY['career', 'lavoro', 'networking']),
('Workshop Excel Avanzato', 'Corso pratico su Excel per analisi finanziarie', 'workshop', '2024-03-22 14:00:00+01', '2024-03-22 17:00:00+01', 'Aula 10 Velodromo', true, 'Matteo Ferrari', ARRAY['excel', 'finanza', 'skill']),
('Aperitivo di Benvenuto', 'Evento social per accogliere le nuove matricole', 'social', '2024-02-28 18:30:00+01', '2024-02-28 21:00:00+01', 'Bar Campus Bocconi', false, 'Giulia Romano', ARRAY['social', 'matricole', 'networking']),
('Conferenza Sostenibilità', 'Tavola rotonda su business e sostenibilità ambientale', 'conference', '2024-04-10 15:00:00+02', '2024-04-10 17:30:00+02', 'Aula Magna', true, 'Elena Rossi', ARRAY['sostenibilità', 'business', 'ambiente']);