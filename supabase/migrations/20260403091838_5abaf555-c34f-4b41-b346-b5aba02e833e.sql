
-- Delete existing FIN entries
DELETE FROM "cours-subject_MS_exchange" WHERE course = 'FIN';

-- Reset sequence
SELECT setval(pg_get_serial_sequence('"cours-subject_MS_exchange"', 'id'), (SELECT COALESCE(MAX(id), 0) FROM "cours-subject_MS_exchange"));

-- Insert Finance Global Experience Track (FIN-GET)
INSERT INTO "cours-subject_MS_exchange" (course, subject, cfu) VALUES
('FIN-GET', 'Financial Reporting and Analysis Lab', 3),
('FIN-GET', 'Corporate finance (Business Valuation)', 6),
('FIN-GET', 'Quantitative finance and derivatives - Module 1', 7),
('FIN-GET', 'Empirical Finance', 8),
('FIN-GET', 'Investment Banking', 6),
('FIN-GET', 'Behavioural skills seminar – Inclusive Communication in a multicultural environment', 2),
('FIN-GET', 'Quantitative finance and derivatives - Module 2', 6),
('FIN-GET', 'Financial Institutions and markets law', 6),
('FIN-GET', 'Financial Data Science', 6),
('FIN-GET', 'Risk management and value in banking and insurance', 6),
('FIN-GET', 'Investments: an international perspective', 6),
('FIN-GET', 'Elective 1', 6),
('FIN-GET', 'Elective 2', 6),
('FIN-GET', 'Elective 3', 6),
('FIN-GET', 'Elective 4', 6),
('FIN-GET', 'Professional English seminars', 2),
('FIN-GET', 'Second foreign language', 4),
('FIN-GET', 'Climate Finance LAB or Enhancing Experience', 2),
('FIN-GET', 'Internship', 8),
('FIN-GET', 'Thesis', 18);

-- Insert Finance Track (FIN)
INSERT INTO "cours-subject_MS_exchange" (course, subject, cfu) VALUES
('FIN', 'Financial Reporting and Analysis Lab', 3),
('FIN', 'Corporate finance (Business Valuation)', 6),
('FIN', 'Quantitative finance and derivatives - Module 1', 7),
('FIN', 'Empirical Finance', 8),
('FIN', 'Investment Banking', 6),
('FIN', 'Behavioural skills seminar – Public Speaking', 2),
('FIN', 'Quantitative finance and derivatives - Module 2', 6),
('FIN', 'Financial Institutions and markets law', 6),
('FIN', 'Financial Data Science', 6),
('FIN', 'Risk management and value in banking and insurance', 6),
('FIN', 'Theory of finance', 6),
('FIN', 'Elective 1', 6),
('FIN', 'Elective 2', 6),
('FIN', 'Elective 3', 6),
('FIN', 'Elective 4', 6),
('FIN', 'Professional English seminars', 2),
('FIN', 'Second foreign language', 4),
('FIN', 'Climate Finance LAB or Enhancing Experience', 2),
('FIN', 'Internship', 8),
('FIN', 'Thesis', 18);
