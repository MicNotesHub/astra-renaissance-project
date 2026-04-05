
-- Remove CLELI
DELETE FROM public."cours-subject_MS_exchange" WHERE course = 'CLELI';

-- Remove AFC
DELETE FROM public."cours-subject_MS_exchange" WHERE course = 'AFC';

-- Insert AFM subjects
INSERT INTO public."cours-subject_MS_exchange" (course, subject, cfu) VALUES
('AFM', 'Data analysis for business decisions', 6),
('AFM', 'Corporate Reporting – Module 1 Corporate financial reporting', 8),
('AFM', 'Financial management and financial markets', 8),
('AFM', 'Corporate governance', 6),
('AFM', 'Behavioural skills seminars', 2),
('AFM', 'Fair value accounting, reporting and valuation', 8),
('AFM', 'Macroeconomic trends for Business decisions', 6),
('AFM', 'Performance measurement and control systems', 8),
('AFM', 'Business law', 6),
('AFM', 'Corporate Reporting – Module 2 Non financial and sustainability reporting', 6),
('AFM', 'Elective 1', 6),
('AFM', 'Elective 2', 6),
('AFM', 'Elective 3', 6),
('AFM', 'Elective 4', 6),
('AFM', 'Professional English seminars', 2),
('AFM', 'Second language', 4),
('AFM', 'Enhancing Experience - Curricular Supplementary Activities', 2),
('AFM', 'Internship', 6),
('AFM', 'Thesis', 18);
