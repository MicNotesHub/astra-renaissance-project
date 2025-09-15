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
    'about.innovation.title': 'Innovazione',
    'about.innovation.description': 'Promuoviamo soluzioni innovative per migliorare l\'esperienza universitaria attraverso tecnologia e creatività.',
    'about.community.title': 'Community',
    'about.community.description': 'Costruiamo una community forte e collaborativa che supporta ogni studente nel raggiungimento dei propri obiettivi.',
    'about.future.title': 'Futuro',
    'about.future.description': 'Prepariamo gli studenti per il futuro professionale con opportunità concrete e orientamento personalizzato.',
    
    // Values Section
    'values.title': 'I Nostri Valori',
    'values.subtitle': 'I principi che guidano ogni nostra azione e decisione',
    'values.ambition.title': 'Ambizione',
    'values.ambition.description': 'Non è arrivismo, ma volontà di spingersi oltre. Guardare avanti, cercare soluzioni migliori e non fermarsi mai.',
    'values.communication.title': 'Comunicazione',
    'values.communication.description': 'Le idee valgono solo se vengono ascoltate. Il dialogo tra studenti e Università è la chiave per costruire un vero cambiamento.',
    'values.dedication.title': 'Dedizione',
    'values.dedication.description': 'Nulla si ottiene senza costanza e impegno. Solo chi si mette in gioco ogni giorno può lasciare il segno.',
    
    // What We Do Section
    'whatwedo.title': 'Cosa Facciamo',
    'whatwedo.subtitle': 'La nostra visione della rappresentanza si sviluppa attraverso tre aspetti fondamentali dell\'esperienza universitaria',
    'whatwedo.handouts.title': 'Dispense e Materiali',
    'whatwedo.handouts.description': 'Accesso facilitato a dispense, appunti e materiali di studio per tutti i corsi',
    'whatwedo.exchange.title': 'Exchange Program',
    'whatwedo.exchange.description': 'Supporto completo per programmi di scambio internazionale e opportunità all\'estero',
    'whatwedo.representation.title': 'Rappresentanza Attiva',
    'whatwedo.representation.description': 'La tua voce negli organi universitari per migliorare l\'esperienza di tutti',
    'whatwedo.innovation.title': 'Innovazione Didattica',
    'whatwedo.innovation.description': 'Promuoviamo nuovi metodi di apprendimento e tecnologie per la formazione',
    'whatwedo.career.title': 'Orientamento Carriera',
    'whatwedo.career.description': 'Guide e supporto per costruire il tuo percorso professionale',
    'whatwedo.wellbeing.title': 'Benessere Studenti',
    'whatwedo.wellbeing.description': 'Iniziative per il benessere psicofisico e l\'equilibrio studio-vita',
    'whatwedo.approach.title': 'Un approccio a 360° per la tua esperienza universitaria',
    'whatwedo.approach.description': 'Non ci limitiamo alla rappresentanza tradizionale. Creiamo un ecosistema di supporto che accompagna ogni studente dal primo giorno fino alla laurea, costruendo una community forte e collaborativa.',
    
    // Team Section
    'team.title': 'Il Nostro Team',
    'team.subtitle': 'Conosci i rappresentanti che lavorano per migliorare la tua esperienza universitaria. Un team diversificato con competenze complementari.',
    'team.search': 'Cerca per nome, ruolo o corso...',
    'team.all': 'tutti',
    'team.presidency': 'Presidenza',
    'team.senate': 'Senato Accademico',
    'team.events': 'Eventi',
    'team.innovation': 'Innovazione',
    'team.communication': 'Comunicazione',
    'team.exchange': 'Exchange',
    'team.welfare': 'Welfare',
    'team.no-results': 'Nessun membro trovato con i filtri attuali.',
    'team.stats.representatives': 'Rappresentanti Attivi',
    'team.stats.bodies': 'Organi Rappresentati',
    'team.stats.courses': 'Corsi di Laurea',
    'team.stats.students': 'Studenti Rappresentati',
    
    // Representatives Section
    'representatives.title': '🏛️ I Nostri Rappresentanti',
    'representatives.subtitle': 'Scopri le diverse aree di rappresentanza studentesca. I nostri rappresentanti lavorano in vari organi e commissioni per tutelare i tuoi diritti e migliorare la vita universitaria.',
    'representatives.loading': 'Caricamento rappresentanti...',
    'representatives.viewReps': 'Vedi Rappresentanti',
    'representatives.hide': 'Nascondi',
    'representatives.learnMore': 'Scopri di più',
    'representatives.count': 'rappresentant',
    'representatives.countSingle': 'e',
    'representatives.countPlural': 'i',
    'representatives.noReps': 'Nessun rappresentante attualmente disponibile per questa sezione.',
    'representatives.cdd.description': 'Commissione di Disciplina Didattica - Gestione delle questioni disciplinari e didattiche',
    'representatives.dipartimenti.description': 'Rappresentanza nei diversi dipartimenti accademici dell\'università',
    'representatives.isu.description': 'Istituto per il Sostegno Universitario - Servizi per il diritto allo studio',
    'representatives.qualita.description': 'Commissione per la Qualità - Monitoraggio e miglioramento della qualità didattica',
    'representatives.giurisprudenza.description': 'Rappresentanza nella Scuola di Giurisprudenza',
    'representatives.magistrale.description': 'Rappresentanza nelle scuole magistrali e corsi di laurea magistrale',
    'representatives.triennale.description': 'Rappresentanza nelle scuole triennali e corsi di laurea triennale',
    'representatives.sport.description': 'Rappresentanza nelle attività sportive e ricreative universitarie',
    'representatives.valutazione.description': 'Commissione di Valutazione - Valutazione delle performance accademiche',
    
    // Handouts Section
    'handouts.title': 'Dispense e Guide',
    'handouts.subtitle': 'Accedi alle risorse di studio condivise dalla community. Trova dispense, riassunti e guide per ogni corso.',
    'handouts.search': 'Cerca per materia o nome file...',
    'handouts.firstYear': '1° Anno',
    'handouts.secondYear': '2° Anno',
    'handouts.thirdYear': '3° Anno',
    'handouts.loading': 'Caricamento dispense...',
    'handouts.uploaded': 'Caricato:',
    'handouts.download': 'Scarica PDF',
    'handouts.seeAll': 'Vedi tutte le dispense del',
    'handouts.seeAllGeneral': 'Vedi tutte le dispense',
    'handouts.results': 'risultat',
    'handouts.resultsFound': 'trovato per',
    'handouts.noResults': 'Nessuna dispensa',
    'handouts.noResultsSearch': 'trovata per',
    'handouts.noResultsYear': 'disponibile per',
    
    // Astra Polare Section
    'astrapolare.title': 'Astra Polare',
    'astrapolare.subtitle': 'Il nostro magazine digitale. Contenuti, storie e media che raccontano la vita universitaria dal punto di vista degli studenti.',
    'astrapolare.recent': 'Più Recenti',
    'astrapolare.popular': 'Più Visti',
    'astrapolare.trending': 'Trending',
    'astrapolare.loading': 'Caricamento contenuti...',
    'astrapolare.error': 'Errore nel caricamento dei contenuti',
    'astrapolare.retry': 'Riprova',
    'astrapolare.noContent': 'Nessun contenuto disponibile al momento.',
    'astrapolare.slides': 'slides',
    'astrapolare.views': 'views',
    'astrapolare.visualizations': 'visualizzazioni',
    'astrapolare.followSocial': 'Seguici sui Social',
    'astrapolare.followDescription': 'Non perdere i nostri contenuti! Seguici su TikTok e Instagram per restare aggiornato.',
    'astrapolare.tiktok': '📱 TikTok',
    'astrapolare.instagram': '📸 Instagram',
    
    // Astra GPT Section
    'astragpt.title': 'Astra GPT',
    'astragpt.powered': 'Powered by AI',
    'astragpt.subtitle': 'Il tuo assistente virtuale intelligente per navigare la vita universitaria Bocconi. Sempre disponibile, sempre aggiornato.',
    'astragpt.description': 'Scopri il nuovo AstraGPT 2.0 - potenziato con l\'intelligenza artificiale più avanzata per supportarti nella tua vita universitaria Bocconi.',
    'astragpt.try': 'Prova Astra GPT 2.0!',
    'astragpt.open': 'Apri AstraGPT 2.0',
    
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
    'calculators.exchange-ug.description': 'Calcola il tuo Exchange Score per l\'Undergraduate e scopri le destinazioni disponibili',
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
    'about.innovation.title': 'Innovation',
    'about.innovation.description': 'We promote innovative solutions to improve the university experience through technology and creativity.',
    'about.community.title': 'Community',
    'about.community.description': 'We build a strong and collaborative community that supports every student in achieving their goals.',
    'about.future.title': 'Future',
    'about.future.description': 'We prepare students for their professional future with concrete opportunities and personalized guidance.',
    
    // Values Section
    'values.title': 'Our Values',
    'values.subtitle': 'The principles that guide every action and decision we make',
    'values.ambition.title': 'Ambition',
    'values.ambition.description': 'It\'s not careerism, but the will to push beyond. Looking ahead, seeking better solutions and never stopping.',
    'values.communication.title': 'Communication',
    'values.communication.description': 'Ideas are only valuable if they are heard. Dialogue between students and University is the key to building real change.',
    'values.dedication.title': 'Dedication',
    'values.dedication.description': 'Nothing is achieved without perseverance and commitment. Only those who put themselves on the line every day can make a mark.',
    
    // What We Do Section
    'whatwedo.title': 'What We Do',
    'whatwedo.subtitle': 'Our vision of representation develops through three fundamental aspects of the university experience',
    'whatwedo.handouts.title': 'Handouts and Materials',
    'whatwedo.handouts.description': 'Facilitated access to handouts, notes and study materials for all courses',
    'whatwedo.exchange.title': 'Exchange Program',
    'whatwedo.exchange.description': 'Complete support for international exchange programs and opportunities abroad',
    'whatwedo.representation.title': 'Active Representation',
    'whatwedo.representation.description': 'Your voice in university bodies to improve everyone\'s experience',
    'whatwedo.innovation.title': 'Educational Innovation',
    'whatwedo.innovation.description': 'We promote new learning methods and technologies for education',
    'whatwedo.career.title': 'Career Guidance',
    'whatwedo.career.description': 'Guides and support to build your professional path',
    'whatwedo.wellbeing.title': 'Student Wellbeing',
    'whatwedo.wellbeing.description': 'Initiatives for psychophysical wellbeing and study-life balance',
    'whatwedo.approach.title': 'A 360° approach to your university experience',
    'whatwedo.approach.description': 'We are not limited to traditional representation. We create a support ecosystem that accompanies every student from day one to graduation, building a strong and collaborative community.',
    
    // Team Section
    'team.title': 'Our Team',
    'team.subtitle': 'Meet the representatives who work to improve your university experience. A diverse team with complementary skills.',
    'team.search': 'Search by name, role or course...',
    'team.all': 'all',
    'team.presidency': 'Presidency',
    'team.senate': 'Academic Senate',
    'team.events': 'Events',
    'team.innovation': 'Innovation',
    'team.communication': 'Communication',
    'team.exchange': 'Exchange',
    'team.welfare': 'Welfare',
    'team.no-results': 'No members found with current filters.',
    'team.stats.representatives': 'Active Representatives',
    'team.stats.bodies': 'Represented Bodies',
    'team.stats.courses': 'Degree Courses',
    'team.stats.students': 'Represented Students',
    
    // Representatives Section
    'representatives.title': '🏛️ Our Representatives',
    'representatives.subtitle': 'Discover the different areas of student representation. Our representatives work in various bodies and commissions to protect your rights and improve university life.',
    'representatives.loading': 'Loading representatives...',
    'representatives.viewReps': 'View Representatives',
    'representatives.hide': 'Hide',
    'representatives.learnMore': 'Learn More',
    'representatives.count': 'representative',
    'representatives.countSingle': '',
    'representatives.countPlural': 's',
    'representatives.noReps': 'No representatives currently available for this section.',
    'representatives.cdd.description': 'Teaching Discipline Commission - Management of disciplinary and teaching matters',
    'representatives.dipartimenti.description': 'Representation in the university\'s various academic departments',
    'representatives.isu.description': 'Institute for University Support - Services for the right to study',
    'representatives.qualita.description': 'Quality Commission - Monitoring and improvement of teaching quality',
    'representatives.giurisprudenza.description': 'Representation in the School of Law',
    'representatives.magistrale.description': 'Representation in master\'s schools and master\'s degree courses',
    'representatives.triennale.description': 'Representation in bachelor\'s schools and bachelor\'s degree courses',
    'representatives.sport.description': 'Representation in university sports and recreational activities',
    'representatives.valutazione.description': 'Evaluation Commission - Assessment of academic performance',
    
    // Handouts Section
    'handouts.title': 'Handouts and Guides',
    'handouts.subtitle': 'Access study resources shared by the community. Find handouts, summaries and guides for every course.',
    'handouts.search': 'Search by subject or file name...',
    'handouts.firstYear': '1st Year',
    'handouts.secondYear': '2nd Year',
    'handouts.thirdYear': '3rd Year',
    'handouts.loading': 'Loading handouts...',
    'handouts.uploaded': 'Uploaded:',
    'handouts.download': 'Download PDF',
    'handouts.seeAll': 'See all handouts for',
    'handouts.seeAllGeneral': 'See all handouts',
    'handouts.results': 'result',
    'handouts.resultsFound': 'found for',
    'handouts.noResults': 'No handouts',
    'handouts.noResultsSearch': 'found for',
    'handouts.noResultsYear': 'available for',
    
    // Astra Polare Section
    'astrapolare.title': 'Astra Polare',
    'astrapolare.subtitle': 'Our digital magazine. Content, stories and media that tell university life from the students\' perspective.',
    'astrapolare.recent': 'Most Recent',
    'astrapolare.popular': 'Most Viewed',
    'astrapolare.trending': 'Trending',
    'astrapolare.loading': 'Loading content...',
    'astrapolare.error': 'Error loading content',
    'astrapolare.retry': 'Retry',
    'astrapolare.noContent': 'No content available at the moment.',
    'astrapolare.slides': 'slides',
    'astrapolare.views': 'views',
    'astrapolare.visualizations': 'views',
    'astrapolare.followSocial': 'Follow Us on Social Media',
    'astrapolare.followDescription': 'Don\'t miss our content! Follow us on TikTok and Instagram to stay updated.',
    'astrapolare.tiktok': '📱 TikTok',
    'astrapolare.instagram': '📸 Instagram',
    
    // Astra GPT Section
    'astragpt.title': 'Astra GPT',
    'astragpt.powered': 'Powered by AI',
    'astragpt.subtitle': 'Your intelligent virtual assistant to navigate Bocconi university life. Always available, always updated.',
    'astragpt.description': 'Discover the new AstraGPT 2.0 - powered by the most advanced artificial intelligence to support you in your Bocconi university life.',
    'astragpt.try': 'Try Astra GPT 2.0!',
    'astragpt.open': 'Open AstraGPT 2.0',
    
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