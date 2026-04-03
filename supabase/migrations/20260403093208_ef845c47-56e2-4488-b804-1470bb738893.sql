
-- Remove EMIT course
DELETE FROM "cours-subject_MS_exchange" WHERE course = 'EMIT';

-- Reset sequence
SELECT setval(pg_get_serial_sequence('"cours-subject_MS_exchange"', 'id'), (SELECT COALESCE(MAX(id), 0) FROM "cours-subject_MS_exchange"));

-- Insert ITE (Innovation, Technology and Entrepreneurship)
INSERT INTO "cours-subject_MS_exchange" (course, subject, cfu) VALUES
('ITE', 'The Emergence of Entrepreneurial Ventures: Theory and Practice', 6),
('ITE', 'Intellectual Property Law for Business', 6),
('ITE', 'Data Analysis Module I (Data Lab for Entrepreneurship)', 8),
('ITE', 'Venture Capital and Valuation', 6),
('ITE', 'Corporate Venturing and Innovation Strategy', 6),
('ITE', 'Behavioural Skills Seminars', 2),
('ITE', 'Economics of Strategy and Innovation', 8),
('ITE', 'Entrepreneurial Decision Making', 6),
('ITE', 'Data Analysis Module II (Exploratory Data Analysis and Visualization)', 8),
('ITE', 'Industry Dynamics and Innovation Ecosystems', 6),
('ITE', 'Concentration course 1', 6),
('ITE', 'Concentration course 2', 6),
('ITE', 'Elective concentration course', 6),
('ITE', 'Elective', 6),
('ITE', 'Professional English seminars', 2),
('ITE', 'Second language', 4),
('ITE', 'Enhancing Experience - Curricular Supplementary Activities', 2),
('ITE', 'Internship', 8),
('ITE', 'Thesis', 18);
