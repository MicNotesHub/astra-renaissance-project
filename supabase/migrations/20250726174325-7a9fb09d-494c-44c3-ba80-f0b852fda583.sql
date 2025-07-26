-- Add new sample data with the updated categories
DELETE FROM public.guides; -- Clear existing sample data

INSERT INTO public.guides (
  title,
  description,
  category,
  thumbnail_url,
  media_link,
  content_type,
  order_index
) VALUES 
(
  'Associations 101',
  'Scopri le associazioni Bocconi!',
  'associations',
  '/lovable-uploads/79a8e832-7749-4713-905f-e6adaa18938c.png',
  'https://guides.astrabocconi.com/associations.pdf',
  'video',
  1
),
(
  'Opzionali 101',
  'Le nostre guide per la scelta dei tuoi opzionali!',
  'opzionali',
  '/lovable-uploads/b01b09dd-7caf-43e1-9dc2-a6d5e15349fd.png',
  'https://guides.astrabocconi.com/opzionali.pdf',
  'video',
  2
),
(
  'Graduate 101',
  'Le nostre guide per la tua magistrale!',
  'graduate',
  '/lovable-uploads/79a8e832-7749-4713-905f-e6adaa18938c.png',
  'https://guides.astrabocconi.com/graduate.pdf',
  'video',
  3
),
(
  'Stage 101',
  'Le nostre guide per il tuo stage!',
  'stage',
  '/lovable-uploads/b01b09dd-7caf-43e1-9dc2-a6d5e15349fd.png',
  'https://guides.astrabocconi.com/stage.pdf',
  'video',
  4
),
(
  'Freemover 101',
  'Le nostre guide per il freemover!',
  'freemover',
  '/lovable-uploads/79a8e832-7749-4713-905f-e6adaa18938c.png',
  'https://guides.astrabocconi.com/freemover.pdf',
  'video',
  5
),
(
  'Residenze 101',
  'Le nostre guide per le residenze degli studenti!',
  'residenze',
  '/lovable-uploads/b01b09dd-7caf-43e1-9dc2-a6d5e15349fd.png',
  'https://guides.astrabocconi.com/residenze.pdf',
  'video',
  6
),
(
  'Exchange 101 - Magistrale',
  'Le nostre guide per il tuo exchange magistrale!',
  'exchange_magistrale',
  '/lovable-uploads/79a8e832-7749-4713-905f-e6adaa18938c.png',
  'https://guides.astrabocconi.com/exchange-magistrale.pdf',
  'video',
  7
),
(
  'Exchange 101 - Triennale',
  'Le nostre guide per il tuo exchange triennale!',
  'exchange_triennale',
  '/lovable-uploads/b01b09dd-7caf-43e1-9dc2-a6d5e15349fd.png',
  'https://guides.astrabocconi.com/exchange-triennale.pdf',
  'video',
  8
),
(
  'University 101',
  'Le nostre guide al primo anno di Università!',
  'university',
  '/lovable-uploads/79a8e832-7749-4713-905f-e6adaa18938c.png',
  'https://guides.astrabocconi.com/university.pdf',
  'video',
  9
),
(
  'Milan 101',
  'Scopri Milano prima di trasferirti!',
  'milan',
  '/lovable-uploads/b01b09dd-7caf-43e1-9dc2-a6d5e15349fd.png',
  'https://guides.astrabocconi.com/milan.pdf',
  'video',
  10
),
(
  'Burocrazia 101',
  'Come districarsi nella burocrazia italiana!',
  'burocrazia',
  '/lovable-uploads/79a8e832-7749-4713-905f-e6adaa18938c.png',
  'https://guides.astrabocconi.com/burocrazia.pdf',
  'video',
  11
),
(
  'Master Admissions',
  'Guida completa per le ammissioni ai master',
  'master_admissions',
  '/lovable-uploads/b01b09dd-7caf-43e1-9dc2-a6d5e15349fd.png',
  'https://guides.astrabocconi.com/master-admissions.pdf',
  'video',
  12
),
(
  'Tesi 101',
  'Guida per la tesi triennale',
  'tesi',
  '/lovable-uploads/79a8e832-7749-4713-905f-e6adaa18938c.png',
  'https://guides.astrabocconi.com/tesi.pdf',
  'video',
  13
),
(
  'ECDL 101',
  'Una guida per tutto quello che devi sapere',
  'ecdl',
  '/lovable-uploads/b01b09dd-7caf-43e1-9dc2-a6d5e15349fd.png',
  'https://guides.astrabocconi.com/ecdl.pdf',
  'video',
  14
);