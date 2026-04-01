
-- Delete old ESS subjects
DELETE FROM "cours-subject_MS_exchange" WHERE course = 'ESS';

-- Re-insert ESS with full curriculum
INSERT INTO "cours-subject_MS_exchange" (id, course, subject, cfu) VALUES
(31, 'ESS', 'Advanced Mathematics for Economics and Social Sciences', 8),
(32, 'ESS', 'Advanced Statistics for Economics and Social Sciences', 8),
(33, 'ESS', 'Foundations of Social Sciences - Module I', 6),
(34, 'ESS', 'Competition Law and Practice', 6),
(35, 'ESS', 'Behavioural Skills Seminars', 2),
(115, 'ESS', 'Econometrics', 8),
(116, 'ESS', 'Elective 1', 6),
(117, 'ESS', 'Elective 2', 6),
(118, 'ESS', 'Elective 3', 6),
(119, 'ESS', 'Elective 4', 6),
(120, 'ESS', 'Elective 5', 6),
(121, 'ESS', 'Elective 6', 6),
(122, 'ESS', 'Professional English Seminars', 2),
(123, 'ESS', 'Second Foreign Language', 4),
(124, 'ESS', 'Enhancing Experience - Curricular Supplementary Activities', 2),
(125, 'ESS', 'Internship', 8),
(126, 'ESS', 'Thesis', 18);

-- Insert DAAIHS
INSERT INTO "cours-subject_MS_exchange" (id, course, subject, cfu) VALUES
(127, 'DAAIHS', 'Advanced Statistics for Health Sciences', 8),
(128, 'DAAIHS', 'Advanced Computer Programming', 9),
(129, 'DAAIHS', 'Artificial Intelligence - Module 1', 6),
(130, 'DAAIHS', 'Privacy, Ethics and Regulations in the Application of AI - Seminar', 2),
(131, 'DAAIHS', 'Machine Learning', 8),
(132, 'DAAIHS', 'Artificial Intelligence - Module 2', 6),
(133, 'DAAIHS', 'Data Systems in Healthcare', 6),
(134, 'DAAIHS', 'Elective 1', 6),
(135, 'DAAIHS', 'Biology and Genetics', 4),
(136, 'DAAIHS', 'Data Science for Clinics', 8),
(137, 'DAAIHS', 'Clinical Epidemiology', 10),
(138, 'DAAIHS', 'Next Generation Sequencing and Bioinformatics', 7),
(139, 'DAAIHS', 'Applications of AI in Health Sciences', 10),
(140, 'DAAIHS', 'Elective 2', 6),
(141, 'DAAIHS', 'Guidelines for Quality Assessment and Reporting in AI - Seminar', 2),
(142, 'DAAIHS', 'Foreign Language', 2),
(143, 'DAAIHS', 'Internship', 6),
(144, 'DAAIHS', 'Thesis', 14);
