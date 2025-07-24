-- Update inconsistent BAI entry and standardize year format
UPDATE handouts SET subject = 'BAI' WHERE subject = 'BAI' AND year = 'First Year';
UPDATE handouts SET year = 'First Year' WHERE year = '1. FIRST YEAR';

-- Verify the updates
SELECT DISTINCT subject, year FROM handouts WHERE subject = 'BAI' OR year LIKE '%FIRST%' ORDER BY year, subject;