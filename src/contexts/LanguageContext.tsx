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
    'nav.home': 'Home',
    'nav.elections': 'Elezioni 2025',
    'nav.representatives': 'Rappresentanti',
    'nav.handouts': 'Dispense',
    'nav.exchange': 'Exchange',
    'nav.directory': 'Rubrica',
    'nav.guides': 'Guide',
    'nav.about': 'Chi Siamo',
    'nav.contact': 'Contattaci',
    
    // Hero Section
    'hero.subtitle': 'La rappresentanza studentesca che mette al centro l\'innovazione, la community e il futuro degli studenti Bocconi.',
    'hero.aboutUs': 'Chi Siamo',
    'hero.contact': 'Contattaci',
    
    // About Section
    'about.title': 'Chi Siamo',
    'about.subtitle': 'La nostra visione della rappresentanza si sviluppa attraverso tre aspetti fondamentali dell\'esperienza universitaria',
    'about.innovation.title': 'Innovazione',
    'about.innovation.description': 'Soluzioni digitali all\'avanguardia per migliorare l\'esperienza studentesca',
    'about.community.title': 'Community',
    'about.community.description': 'Costruiamo ponti tra studenti, creando una rete di supporto e collaborazione',
    'about.future.title': 'Futuro',
    'about.future.description': 'Prepariamo gli studenti alle sfide del domani con visione e determinazione',
    
    // Sections
    'dispense.title': 'Dispense Universitarie',
    'dispense.subtitle': 'Accedi a tutte le dispense organizzate per anno e materia',
    'dispense.explore': 'Esplora Dispense',
    'calculators.title': 'Calcolatori Accademici',
    'calculators.subtitle': 'Strumenti utili per pianificare il tuo percorso universitario',
    'astra.polare.title': 'ASTRA Polare',
    'astra.polare.subtitle': 'La nostra piattaforma per gli exchange internazionali',
    'marketplace.title': 'Marketplace Studentesco',
    'marketplace.subtitle': 'Compra, vendi e scambia con altri studenti Bocconi',
    'events.title': 'Eventi e Iniziative',
    'events.subtitle': 'Scopri tutti gli eventi organizzati da ASTRA',
    'team.title': 'Il Nostro Team',
    'team.subtitle': 'Conosci i rappresentanti che lavorano per te',
    'astra.gpt.title': 'ASTRA GPT',
    'astra.gpt.subtitle': 'L\'assistente AI per tutte le tue domande universitarie',
    
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
    
    // Footer
    'footer.brand.description': 'Per Aspera, ad Astra. La nostra visione della rappresentanza si sviluppa attraverso tre aspetti fondamentali dell\'esperienza universitaria.',
    'footer.location': 'Università Bocconi, Milano',
    'footer.quickLinks': 'Link Rapidi',
    'footer.contact': 'Contattaci',
    'footer.email': 'Email',
    'footer.emergencies': 'Emergenze',
    'footer.emergencyText': 'Sempre disponibili per te',
    'footer.rights': '© 2025 ASTRA Bocconi. Tutti i diritti riservati.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.cookies': 'Cookie Policy',
    
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
    'nav.home': 'Home',
    'nav.elections': 'Elections 2025',
    'nav.representatives': 'Representatives',
    'nav.handouts': 'Handouts',
    'nav.exchange': 'Exchange',
    'nav.directory': 'Directory',
    'nav.guides': 'Guides',
    'nav.about': 'About Us',
    'nav.contact': 'Contact Us',
    
    // Hero Section
    'hero.subtitle': 'The student representation that puts innovation, community and the future of Bocconi students at the center.',
    'hero.aboutUs': 'About Us',
    'hero.contact': 'Contact Us',
    
    // About Section
    'about.title': 'About Us',
    'about.subtitle': 'Our vision of representation develops through three fundamental aspects of the university experience',
    'about.innovation.title': 'Innovation',
    'about.innovation.description': 'Cutting-edge digital solutions to enhance the student experience',
    'about.community.title': 'Community',
    'about.community.description': 'We build bridges between students, creating a network of support and collaboration',
    'about.future.title': 'Future',
    'about.future.description': 'We prepare students for tomorrow\'s challenges with vision and determination',
    
    // Sections
    'dispense.title': 'University Handouts',
    'dispense.subtitle': 'Access all handouts organized by year and subject',
    'dispense.explore': 'Explore Handouts',
    'calculators.title': 'Academic Calculators',
    'calculators.subtitle': 'Useful tools to plan your university journey',
    'astra.polare.title': 'ASTRA Polare',
    'astra.polare.subtitle': 'Our platform for international exchanges',
    'marketplace.title': 'Student Marketplace',
    'marketplace.subtitle': 'Buy, sell and exchange with other Bocconi students',
    'events.title': 'Events and Initiatives',
    'events.subtitle': 'Discover all events organized by ASTRA',
    'team.title': 'Our Team',
    'team.subtitle': 'Meet the representatives working for you',
    'astra.gpt.title': 'ASTRA GPT',
    'astra.gpt.subtitle': 'The AI assistant for all your university questions',
    
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
    
    // Footer
    'footer.brand.description': 'Per Aspera, ad Astra. Our vision of representation develops through three fundamental aspects of the university experience.',
    'footer.location': 'Bocconi University, Milan',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact Us',
    'footer.email': 'Email',
    'footer.emergencies': 'Emergencies',
    'footer.emergencyText': 'Always available for you',
    'footer.rights': '© 2025 ASTRA Bocconi. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.cookies': 'Cookie Policy',
    
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