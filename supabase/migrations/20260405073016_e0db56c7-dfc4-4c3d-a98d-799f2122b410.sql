
-- Delete existing Marketing Management data
DELETE FROM "cours-subject_MS_exchange" WHERE course = 'Marketing Management';

-- Reset sequence
SELECT setval(pg_get_serial_sequence('"cours-subject_MS_exchange"', 'id'), (SELECT COALESCE(MAX(id), 0) FROM "cours-subject_MS_exchange"));

-- Insert updated Marketing Management (MM)
INSERT INTO "cours-subject_MS_exchange" (course, subject, cfu) VALUES
('MM', 'Strategic marketing and analytics (Data & analytics for strategic marketing decisions) - Module 1', 8),
('MM', 'Industry analysis (Industrial economics and economics of innovation)', 8),
('MM', 'Behavioural skills seminars', 2),
('MM', 'Channel marketing (Trade evolution analysis and planning)', 6),
('MM', 'Understanding consumer (Consumer behavior and CCT), Module 1', 5),
('MM', 'Understanding consumer (Consumer behavior and CCT), Module 2', 5),
('MM', 'Market research and business forecasting', 6),
('MM', 'Strategic marketing and analytics (Web analytics) - Module 2', 6),
('MM', 'Innovation in the data economy', 5),
('MM', 'Brand management', 5),
('MM', 'Legal issues in marketing', 6),
('MM', 'Elective 1', 6),
('MM', 'Elective 2', 6),
('MM', 'Elective 3', 6),
('MM', 'Elective 4', 6),
('MM', 'Professional English seminars', 2),
('MM', 'Second foreign language', 4),
('MM', 'Enhancing Experience - Curricular Supplementary Activities', 2),
('MM', 'Internship', 8),
('MM', 'Thesis', 18);

-- Insert PPA (Politics and Policy Analysis)
INSERT INTO "cours-subject_MS_exchange" (course, subject, cfu) VALUES
('PPA', 'Methods and Tools for Policy Analysis', 8),
('PPA', 'Public Economics', 8),
('PPA', 'Public Administration', 6),
('PPA', 'Decisions and Organizations', 6),
('PPA', 'Political Science, Module I (Topics in Comparative politics)', 6),
('PPA', 'Law and Policy Making', 6),
('PPA', 'Population Dynamics and Policies', 6),
('PPA', 'Economics and Politics', 6),
('PPA', 'Political Science, Module II (International Relations and Politics)', 6),
('PPA', 'Behavioral Skills Seminar', 2),
('PPA', 'Elective 1', 6),
('PPA', 'Elective 2', 6),
('PPA', 'Elective 3', 6),
('PPA', 'Elective 4', 6),
('PPA', 'Professional English seminars', 2),
('PPA', 'Second foreign language', 4),
('PPA', 'Enhancing Experience - Curricular Supplementary Activities', 2),
('PPA', 'Internship', 8),
('PPA', 'Thesis', 20);

-- Insert TS (Transformative Sustainability)
INSERT INTO "cours-subject_MS_exchange" (course, subject, cfu) VALUES
('TS', 'Behavioural skills and leadership seminar', 2),
('TS', 'Management and Economics for Sustainability - module 1 (Corporate Sustainability Strategies and Governance)', 6),
('TS', 'Sustainable Finance and ESG Investing', 6),
('TS', 'Impact and Sustainability Measurement', 6),
('TS', 'Management and Economics for Sustainability - module 2 (Environmental Economics and Climate Change)', 6),
('TS', 'ESG Law', 6),
('TS', 'Sustainability: policy decision-making and evaluation', 2),
('TS', 'Materials Towards Circular Economy', 6),
('TS', 'Technologies for Energy and Sustainable Transition - module 1 (Ecological Processes, Environmental Impacts and Transition Towards Sustainability)', 6),
('TS', 'Technologies for Energy and Sustainable Transition - module 2 (Technologies for the Energy Transition Towards Sustainability)', 6),
('TS', 'Designing Sustainable Cities', 6),
('TS', 'Innovation for Sustainability', 6),
('TS', 'Business and Marketing Plan Workshop', 3),
('TS', 'Sustainable Entrepreneurship Workshop', 3),
('TS', 'Data Analytics for Sustainability', 6),
('TS', 'Sustainable Operations & Supply Chain Management', 6),
('TS', 'Foreign language', 4),
('TS', 'Diversity and Global Policy / Technologies and Systems for Sustainable Mobility', 6),
('TS', 'Elective', 6),
('TS', 'Internship', 8),
('TS', 'Thesis', 14);
