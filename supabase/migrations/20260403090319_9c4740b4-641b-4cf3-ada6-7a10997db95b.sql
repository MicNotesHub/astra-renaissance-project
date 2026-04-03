
-- Delete existing ACME and GIO entries
DELETE FROM "cours-subject_MS_exchange" WHERE course IN ('ACME', 'GIO');

-- Reset sequence to avoid conflicts
SELECT setval(pg_get_serial_sequence('"cours-subject_MS_exchange"', 'id'), (SELECT COALESCE(MAX(id), 0) FROM "cours-subject_MS_exchange"));

-- Insert complete ACME curriculum
INSERT INTO "cours-subject_MS_exchange" (course, subject, cfu) VALUES
('ACME', 'Management of cultural industries and institutions - module I (strategy and governance)', 6),
('ACME', 'Cultural mediation', 6),
('ACME', 'Quantitative methods for management', 6),
('ACME', 'Performance measurement', 6),
('ACME', 'European and international advanced IP law', 6),
('ACME', 'Behavioural skills seminars', 2),
('ACME', 'Applied research in cultural industries and institutions — module II (marketing and crm in the arts)', 6),
('ACME', 'Project and team management', 6),
('ACME', 'Management of cultural industries and institutions - module II (comparative cultural public policies and fundraising)', 6),
('ACME', 'Concentration''s workshop 1', 6),
('ACME', 'Concentration''s workshop 2', 6),
('ACME', 'Concentration''s workshop 3', 6),
('ACME', 'Concentration''s workshop 4', 6),
('ACME', 'Elective 1', 6),
('ACME', 'Elective 2', 6),
('ACME', 'Professional English seminars', 2),
('ACME', 'Second foreign language', 4),
('ACME', 'Enhancing Experience', 2),
('ACME', 'Internship', 8),
('ACME', 'Thesis', 18);

-- Insert complete GIO curriculum
INSERT INTO "cours-subject_MS_exchange" (course, subject, cfu) VALUES
('GIO', 'Government and international organizations: trends and careers', 3),
('GIO', 'Strategic and HR management in public organizations', 9),
('GIO', 'Quantitative methods for social sciences', 6),
('GIO', 'National and international institutions law', 6),
('GIO', 'Politics and policy making', 6),
('GIO', 'Economics and policy of global markets', 9),
('GIO', 'Policy analysis and evaluation', 8),
('GIO', 'Public accounting and performance management', 9),
('GIO', 'Concentration compulsory course', 6),
('GIO', 'Elective 1', 6),
('GIO', 'Elective 2', 6),
('GIO', 'Elective 3', 6),
('GIO', 'Elective 4', 6),
('GIO', 'Professional English seminars', 2),
('GIO', 'Second language', 4),
('GIO', 'Enhancing Experience', 2),
('GIO', 'Internship', 8),
('GIO', 'Thesis', 18);
