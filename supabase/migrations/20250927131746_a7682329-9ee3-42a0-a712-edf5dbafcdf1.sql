-- Update BEMACS course subject names
UPDATE "course_subjects_UG" 
SET subject = 'Applied Mathematics and Statistical Methods 1'
WHERE course = 'BEMACS' AND subject = 'Advanced Mathematics and Statistics 1';

UPDATE "course_subjects_UG" 
SET subject = 'Applied Mathematics and Statistical Methods 2'
WHERE course = 'BEMACS' AND subject = 'Advanced Mathematics and Statistics 2';

UPDATE "course_subjects_UG" 
SET subject = 'Mathematics 1'
WHERE course = 'BEMACS' AND subject = 'Mathematics and Statistics 1';

-- Add new Statistics 1 subject for BEMACS
INSERT INTO "course_subjects_UG" (course, subject, cfu)
VALUES ('BEMACS', 'Statistics 1', 8);