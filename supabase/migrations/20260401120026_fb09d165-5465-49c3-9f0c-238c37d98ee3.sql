
UPDATE "cours-subject_MS_exchange" SET subject = 'Mathematical Methods in Computer Science or Analysis of algorithms and data structures' WHERE id = 12;
DELETE FROM "cours-subject_MS_exchange" WHERE id = 73 AND course = 'AI';
INSERT INTO "cours-subject_MS_exchange" (id, course, subject, cfu) VALUES
(76, 'AI', 'Milan / Turin Track', 6),
(77, 'AI', 'Thesis', 18);
