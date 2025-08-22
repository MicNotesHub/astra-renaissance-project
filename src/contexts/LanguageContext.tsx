import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'it' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

const translations = {
  it: {
    // Navigation
    'nav.representatives': 'Rappresentanti',
    'nav.handouts': 'Dispense',
    'nav.exchange': 'Exchange',
    'nav.directory': 'Directory',
    'nav.guides': 'Guide',
    'nav.about': 'Chi Siamo',
    
    // Hero Section
    'hero.subtitle': 'La tua associazione studentesca di riferimento in Bocconi. Scopri tutti i servizi e le opportunità che mettiamo a disposizione per rendere la tua esperienza universitaria indimenticabile.',
    'hero.aboutUs': 'Chi Siamo',
    'hero.contact': 'Contattaci',
    
    // About Section
    'about.title': 'Chi Siamo',
    'about.subtitle': 'ASTRA è l\'associazione studentesca che rappresenta gli studenti della Bocconi, offrendo servizi, supporto e opportunità per migliorare l\'esperienza universitaria di tutti.',
    
    // Calculators Section
    'calculators.title': 'Calcolatori Smart',
    'calculators.subtitle': 'Tool intelligenti per ottimizzare il tuo percorso universitario. Pianifica, calcola e raggiungi i tuoi obiettivi accademici.',
    'calculators.gpa.title': 'GPA & Graduation Score',
    'calculators.gpa.description': 'Calcola il tuo voto di laurea previsto basato sui tuoi esami',
    'calculators.exchange-msc.title': 'Exchange Calculator MSc',
    'calculators.exchange-msc.description': 'Calcola il tuo Exchange Score e scopri le destinazioni disponibili',
    'calculators.exchange-clmg.title': 'Exchange Calculator CLMG',
    'calculators.exchange-clmg.description': 'Calcola il tuo punteggio per l\'exchange in Giurisprudenza',
    'calculators.exchange-ug.title': 'Exchange Calculator UG',
    'calculators.exchange-ug.description': 'Calcola il tuo Exchange Score per l\'Undergraduate',
    'calculators.features': 'Funzionalità:',
    'calculators.use': 'Usa Calcolatore',
    
    // Marketplace Section
    'marketplace.title': 'ASTRA x UniMarket',
    'marketplace.subtitle': 'Il marketplace ufficiale per studenti Bocconi. Merchandising esclusivo e prodotti essenziali per la vita universitaria.',
    'marketplace.features.exchange': 'Scambio Veloce',
    'marketplace.features.exchange.description': 'Incontra il venditore direttamente in università',
    'marketplace.features.community': 'Community Sicura',
    'marketplace.features.community.description': 'Accesso riservato agli studenti universitari',
    'marketplace.features.commission': 'Zero Commissioni',
    'marketplace.features.commission.description': 'Scambia o vendi gratuitamente',
    'marketplace.add': 'Aggiungi',
    'marketplace.cta.title': 'Scopri il Marketplace Completo',
    'marketplace.cta.button': 'Visita UniMarket',
    'marketplace.cta.description': 'Oltre 200 prodotti esclusivi per studenti. Libri usati, merchandising ufficiale, gadget tech e molto altro.',
    
    // Events Section
    'events.title': 'Eventi e Conferenze',
    'events.subtitle': 'Partecipa agli eventi ASTRA. Workshop, conferenze e networking per arricchire la tua esperienza universitaria.',
    'events.upcoming': 'Prossimi Eventi',
    'events.past': 'Eventi Passati',
    'events.loading': 'Caricamento eventi...',
    'events.no-upcoming': 'Nessun evento prossimo disponibile',
    'events.no-past': 'Nessun evento passato disponibile',
    'events.register': 'Registrati all\'Evento',
    'events.registration-unavailable': 'Registrazione non disponibile',
    'events.add-calendar': 'Aggiungi al Calendario',
    
    // Footer
    'footer.rights': 'Tutti i diritti riservati.',
    'footer.resources': 'Risorse',
    'footer.support': 'Supporto',
    'footer.social': 'Social',
    'footer.handouts': 'Dispense',
    'footer.calculators': 'Calcolatori',
    'footer.guides': 'Guide',
    'footer.contact': 'Contatti',
    'footer.faq': 'FAQ',
    'footer.privacy': 'Privacy',
    
    // Guide Categories
    'guide.title': 'Guide Universitarie',
    'guide.subtitle': 'Le nostre guide, dagli studenti per gli studenti. Seleziona una categoria per esplorare le guide disponibili.',
    'guide.explore': 'Esplora Guide',
    'guide.backToGuides': 'Torna alle Guide',
    'guide.backToHome': 'Torna alla Home',
    'guide.exploreAll': 'Esplora tutte le guide disponibili per questa categoria',
    'guide.noGuides': 'Nessuna guida trovata',
    'guide.noGuidesDescription': 'Non sono ancora disponibili guide per questa categoria.',
    'guide.noCategories': 'Nessuna categoria trovata',
    'guide.noCategoriesDescription': 'Non sono ancora disponibili guide.',
    
    // Guide Category Titles
    'category.associations.title': 'Associations 101',
    'category.associations.description': 'Scopri le associazioni Bocconi!',
    'category.opzionali.title': 'Opzionali 101',
    'category.opzionali.description': 'Guide per la scelta dei tuoi opzionali',
    'category.graduate.title': 'Graduate 101',
    'category.graduate.description': 'Le nostre guide per la tua magistrale',
    'category.stage.title': 'Stage 101',
    'category.stage.description': 'Le nostre guide per il tuo stage',
    'category.freemover.title': 'Freemover 101',
    'category.freemover.description': 'Le nostre guide per il freemover',
    'category.residenze.title': 'Residenze 101',
    'category.residenze.description': 'Guide per le residenze degli studenti',
    'category.exchange_magistrale.title': 'Exchange 101 Magistrale',
    'category.exchange_magistrale.description': 'Guide per il tuo exchange magistrale',
    'category.exchange_triennale.title': 'Exchange 101 Triennale',
    'category.exchange_triennale.description': 'Guide per il tuo exchange triennale',
    'category.university.title': 'University 101',
    'category.university.description': 'Guide al primo anno di Università',
    'category.milan.title': 'Milan 101',
    'category.milan.description': 'Scopri Milano prima di trasferirti',
    'category.burocrazia.title': 'Burocrazia 101',
    'category.burocrazia.description': 'Come districarsi nella burocrazia italiana',
    'category.master_admissions.title': 'Master Admissions',
    'category.master_admissions.description': 'Guide per le ammissioni magistrali',
    'category.tesi.title': 'Tesi 101',
    'category.tesi.description': 'Guida per la tesi triennale',
    'category.ecdl.title': 'ECDL 101',
    'category.ecdl.description': 'Tutto quello che devi sapere',
    
    // Common
    'common.loading': 'Caricamento...',
    'common.error': 'Errore',
    'common.unexpectedError': 'Si è verificato un errore imprevisto',
    'common.categoryNotFound': 'Categoria non trovata',
    'common.readMore': 'Leggi di più',
    'common.learnMore': 'Scopri di più',
  },
  en: {
    // Navigation
    'nav.representatives': 'Representatives',
    'nav.handouts': 'Handouts',
    'nav.exchange': 'Exchange',
    'nav.directory': 'Directory',
    'nav.guides': 'Guides',
    'nav.about': 'About Us',
    
    // Hero Section
    'hero.subtitle': 'Your reference student association at Bocconi. Discover all the services and opportunities we provide to make your university experience unforgettable.',
    'hero.aboutUs': 'About Us',
    'hero.contact': 'Contact Us',
    
    // About Section
    'about.title': 'About Us',
    'about.subtitle': 'ASTRA is the student association that represents Bocconi students, offering services, support and opportunities to improve everyone\'s university experience.',
    
    // Calculators Section
    'calculators.title': 'Smart Calculators',
    'calculators.subtitle': 'Intelligent tools to optimize your university journey. Plan, calculate and achieve your academic goals.',
    'calculators.gpa.title': 'GPA & Graduation Score',
    'calculators.gpa.description': 'Calculate your expected graduation grade based on your exams',
    'calculators.exchange-msc.title': 'Exchange Calculator MSc',
    'calculators.exchange-msc.description': 'Calculate your Exchange Score and discover available destinations',
    'calculators.exchange-clmg.title': 'Exchange Calculator CLMG',
    'calculators.exchange-clmg.description': 'Calculate your score for exchange in Law',
    'calculators.exchange-ug.title': 'Exchange Calculator UG',
    'calculators.exchange-ug.description': 'Calculate your Exchange Score for Undergraduate',
    'calculators.features': 'Features:',
    'calculators.use': 'Use Calculator',
    
    // Marketplace Section
    'marketplace.title': 'ASTRA x UniMarket',
    'marketplace.subtitle': 'The official marketplace for Bocconi students. Exclusive merchandise and essential products for university life.',
    'marketplace.features.exchange': 'Quick Exchange',
    'marketplace.features.exchange.description': 'Meet the seller directly at university',
    'marketplace.features.community': 'Safe Community',
    'marketplace.features.community.description': 'Access reserved for university students',
    'marketplace.features.commission': 'Zero Commissions',
    'marketplace.features.commission.description': 'Trade or sell for free',
    'marketplace.add': 'Add',
    'marketplace.cta.title': 'Discover the Complete Marketplace',
    'marketplace.cta.button': 'Visit UniMarket',
    'marketplace.cta.description': 'Over 200 exclusive products for students. Used books, official merchandise, tech gadgets and much more.',
    
    // Events Section
    'events.title': 'Events and Conferences',
    'events.subtitle': 'Participate in ASTRA events. Workshops, conferences and networking to enrich your university experience.',
    'events.upcoming': 'Upcoming Events',
    'events.past': 'Past Events',
    'events.loading': 'Loading events...',
    'events.no-upcoming': 'No upcoming events available',
    'events.no-past': 'No past events available',
    'events.register': 'Register for Event',
    'events.registration-unavailable': 'Registration not available',
    'events.add-calendar': 'Add to Calendar',
    
    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.resources': 'Resources',
    'footer.support': 'Support',
    'footer.social': 'Social',
    'footer.handouts': 'Handouts',
    'footer.calculators': 'Calculators',
    'footer.guides': 'Guides',
    'footer.contact': 'Contact',
    'footer.faq': 'FAQ',
    'footer.privacy': 'Privacy',
    
    // Guide Categories
    'guide.title': 'University Guides',
    'guide.subtitle': 'Our guides, from students for students. Select a category to explore available guides.',
    'guide.explore': 'Explore Guides',
    'guide.backToGuides': 'Back to Guides',
    'guide.backToHome': 'Back to Home',
    'guide.exploreAll': 'Explore all available guides for this category',
    'guide.noGuides': 'No guides found',
    'guide.noGuidesDescription': 'No guides are available for this category yet.',
    'guide.noCategories': 'No categories found',
    'guide.noCategoriesDescription': 'No guides are available yet.',
    
    // Guide Category Titles
    'category.associations.title': 'Associations 101',
    'category.associations.description': 'Discover Bocconi associations!',
    'category.opzionali.title': 'Optional Courses 101',
    'category.opzionali.description': 'Guides for choosing your electives',
    'category.graduate.title': 'Graduate 101',
    'category.graduate.description': 'Our guides for your Master\'s degree',
    'category.stage.title': 'Internship 101',
    'category.stage.description': 'Our guides for your internship',
    'category.freemover.title': 'Freemover 101',
    'category.freemover.description': 'Our guides for freemover programs',
    'category.residenze.title': 'Residences 101',
    'category.residenze.description': 'Guides for student residences',
    'category.exchange_magistrale.title': 'Exchange 101 Master\'s',
    'category.exchange_magistrale.description': 'Guides for your Master\'s exchange',
    'category.exchange_triennale.title': 'Exchange 101 Bachelor\'s',
    'category.exchange_triennale.description': 'Guides for your Bachelor\'s exchange',
    'category.university.title': 'University 101',
    'category.university.description': 'Guides for your first year at University',
    'category.milan.title': 'Milan 101',
    'category.milan.description': 'Discover Milan before moving here',
    'category.burocrazia.title': 'Bureaucracy 101',
    'category.burocrazia.description': 'How to navigate Italian bureaucracy',
    'category.master_admissions.title': 'Master Admissions',
    'category.master_admissions.description': 'Guides for Master\'s admissions',
    'category.tesi.title': 'Thesis 101',
    'category.tesi.description': 'Guide for your Bachelor\'s thesis',
    'category.ecdl.title': 'ECDL 101',
    'category.ecdl.description': 'Everything you need to know',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.unexpectedError': 'An unexpected error occurred',
    'common.categoryNotFound': 'Category not found',
    'common.readMore': 'Read more',
    'common.learnMore': 'Learn more',
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('it');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['it']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};