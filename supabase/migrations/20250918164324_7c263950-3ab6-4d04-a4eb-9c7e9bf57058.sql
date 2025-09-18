-- Remove duplicate Open Wine events (keep the first one)
DELETE FROM events WHERE id IN (
  '8c77ed45-cb53-427e-8da7-599cbc91e1a7',
  'e055b6a5-5231-495a-895f-d32de4d51f06'
);

-- Remove duplicate Astra Edicola events (keep the first one) 
DELETE FROM events WHERE id IN (
  '3f2ebdc3-5547-4f6f-acaa-de9dcaef958d',
  '2116f222-6a06-4be9-a4dd-687882f14e33'
);