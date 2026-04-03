
-- Remove Management and International Management courses
DELETE FROM "cours-subject_MS_exchange" WHERE course IN ('Management', 'International Management');

-- Reset sequence
SELECT setval(pg_get_serial_sequence('"cours-subject_MS_exchange"', 'id'), (SELECT COALESCE(MAX(id), 0) FROM "cours-subject_MS_exchange"));

-- Insert IM (International Management - Concentrations Track)
INSERT INTO "cours-subject_MS_exchange" (course, subject, cfu) VALUES
('IM', 'Advanced corporate finance for management', 6),
('IM', 'Principles of business analytics', 6),
('IM', 'Behavioural skills seminars', 2),
('IM', 'Performance measurement', 8),
('IM', 'Marketing management – advanced', 6),
('IM', 'Corporate strategy', 8),
('IM', 'Human resources management', 6),
('IM', 'Economy and Society – module 1', 6),
('IM', 'Law course (Labour/IP/Company)', 6),
('IM', 'Business Game', 2),
('IM', 'Economy and Society – module 2', 6),
('IM', 'Compulsory concentration course', 6),
('IM', 'Concentration elective (data analysis)', 6),
('IM', 'Concentration elective', 6),
('IM', 'Free elective', 6),
('IM', 'Professional English seminars', 2),
('IM', 'Second foreign language', 4),
('IM', 'Enhancing Experience - Curricular Supplementary Activities', 2),
('IM', 'Internship', 8),
('IM', 'Thesis', 18);

-- Insert IM-GET (International Management - Global Experience Track)
INSERT INTO "cours-subject_MS_exchange" (course, subject, cfu) VALUES
('IM-GET', 'International finance', 6),
('IM-GET', 'Principles of business analytics', 6),
('IM-GET', 'International finance challenge', 2),
('IM-GET', 'Strategic performance evaluation and measurement', 8),
('IM-GET', 'Marketing Analytics', 6),
('IM-GET', 'Managing Organizations', 6),
('IM-GET', 'Global scenarios, Module 1 (Macroeconomics)', 6),
('IM-GET', 'Global Strategy', 8),
('IM-GET', 'Comparative Corporate Law', 6),
('IM-GET', 'Global scenarios, Module 2 (Geopolitics and business)', 6),
('IM-GET', 'Seminar on collaborative competences', 2),
('IM-GET', 'Elective 1', 6),
('IM-GET', 'Elective 2', 6),
('IM-GET', 'Elective 3', 6),
('IM-GET', 'Global operations and supply chain management', 6),
('IM-GET', 'Professional English seminars', 2),
('IM-GET', 'Second foreign language', 4),
('IM-GET', 'Enhancing Experience - Curricular Supplementary Activities', 2),
('IM-GET', 'Internship', 8),
('IM-GET', 'Thesis', 18);
