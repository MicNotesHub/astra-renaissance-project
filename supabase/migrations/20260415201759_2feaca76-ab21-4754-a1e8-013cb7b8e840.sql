
-- Rename generic track subjects to BA track names
UPDATE "cours-subject_MS_exchange" SET subject = 'Finance with Big Data' WHERE id = 85 AND course = 'DSBA';
UPDATE "cours-subject_MS_exchange" SET subject = 'Deep Learning for Computer Vision' WHERE id = 86 AND course = 'DSBA';

-- Add DS track 2nd year subjects
INSERT INTO "cours-subject_MS_exchange" (course, subject, cfu) VALUES
('DSBA', 'Stochastic Processes', 8),
('DSBA', 'Machine Learning II', 6);
