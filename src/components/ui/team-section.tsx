import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const TeamSection = () => {
  const [representatives, setRepresentatives] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const rappresentantiSections = [
    {
      name: "CDD",
      description: "Commissione di Disciplina Didattica - Gestione delle questioni disciplinari e didattiche",
      icon: "⚖️"
    },
    {
      name: "DIPARTIMENTI",
      description: "Rappresentanza nei diversi dipartimenti accademici dell'università",
      icon: "🏛️"
    },
    {
      name: "ISU",
      description: "Istituto per il Sostegno Universitario - Servizi per il diritto allo studio",
      icon: "🎓"
    },
    {
      name: "QUALITÀ",
      description: "Commissione per la Qualità - Monitoraggio e miglioramento della qualità didattica",
      icon: "⭐"
    },
    {
      name: "SCUOLA DI GIURISPRUDENZA",
      description: "Rappresentanza nella Scuola di Giurisprudenza",
      icon: "⚖️"
    },
    {
      name: "SCUOLA MAGISTRALE",
      description: "Rappresentanza nelle scuole magistrali e corsi di laurea magistrale",
      icon: "🎯"
    },
    {
      name: "SCUOLA TRIENNALE",
      description: "Rappresentanza nelle scuole triennali e corsi di laurea triennale",
      icon: "📚"
    },
    {
      name: "SPORT",
      description: "Rappresentanza nelle attività sportive e ricreative universitarie",
      icon: "⚽"
    },
    {
      name: "VALUTAZIONE",
      description: "Commissione di Valutazione - Valutazione delle performance accademiche",
      icon: "📊"
    }
  ];

  useEffect(() => {
    fetchRepresentatives();
  }, []);

  const fetchRepresentatives = async () => {
    try {
      const { data, error } = await supabase
        .from('representatives')
        .select('*')
        .order('section', { ascending: true })
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching representatives:', error);
        return;
      }

      setRepresentatives(data || []);
    } catch (error) {
      console.error('Error fetching representatives:', error);
    } finally {
      setLoading(false);
    }
  };


  // Group representatives by section
  const representativesBySection = representatives.reduce((acc, rep) => {
    if (!acc[rep.section]) {
      acc[rep.section] = [];
    }
    acc[rep.section].push(rep);
    return acc;
  }, {} as Record<string, any[]>);

  const handleSectionClick = (sectionName: string) => {
    setSelectedSection(selectedSection === sectionName ? null : sectionName);
  };

  return <section id="team" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8
      }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 hero-text">
            🏛️ I Nostri Rappresentanti
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Scopri le diverse aree di rappresentanza studentesca. I nostri rappresentanti lavorano in vari organi e commissioni per tutelare i tuoi diritti e migliorare la vita universitaria.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Caricamento rappresentanti...</p>
          </div>
        ) : (
          <>
            {/* Sections Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {rappresentantiSections.map((section, index) => {
                const sectionReps = representativesBySection[section.name] || [];
                const isExpanded = selectedSection === section.name;
                
                return (
                  <motion.div key={index} initial={{
                    opacity: 0,
                    y: 30
                  }} whileInView={{
                    opacity: 1,
                    y: 0
                  }} viewport={{
                    once: true
                  }} transition={{
                    duration: 0.6,
                    delay: index * 0.1
                  }}>
                    <Card className="glass-card premium-shadow hover:shadow-glow transition-all duration-300 group h-full">
                      <CardContent className="p-6">
                        <div className="text-center mb-4">
                          <div className="text-4xl mb-3">{section.icon}</div>
                          <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                            {section.name}
                          </h3>
                          {sectionReps.length > 0 && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {sectionReps.length} rappresentant{sectionReps.length === 1 ? 'e' : 'i'}
                            </p>
                          )}
                        </div>

                        <div className="space-y-4">
                          <p className="text-sm text-muted-foreground text-center">
                            {section.description}
                          </p>

                          <div className="flex justify-center pt-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="w-full"
                              onClick={() => handleSectionClick(section.name)}
                            >
                              {isExpanded ? 'Nascondi' : sectionReps.length > 0 ? 'Vedi Rappresentanti' : 'Scopri di più'}
                            </Button>
                          </div>

                          {/* Representatives for this section */}
                          {isExpanded && sectionReps.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 space-y-4"
                            >
                              <div className="grid grid-cols-2 gap-6">
                                {sectionReps.map((rep, repIndex) => (
                                  <div key={rep.id} className="flex flex-col items-center space-y-2">
                                    {rep.url && (
                                      <img 
                                        src={rep.url || '/placeholder.svg'} 
                                        alt={rep.name}
                                        className="w-28 h-28 rounded-full object-cover shadow-md hover:shadow-lg transition-shadow"
                                        onError={(e) => {
                                          e.currentTarget.src = '/placeholder.svg';
                                        }}
                                      />
                                    )}
                                    <p className="text-sm font-medium text-center">{rep.name}</p>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}

                          {/* Message when no representatives */}
                          {isExpanded && sectionReps.length === 0 && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 p-3 text-center text-sm text-muted-foreground bg-muted/50 rounded-lg"
                            >
                              Nessun rappresentante attualmente disponibile per questa sezione.
                            </motion.div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}

      </div>
    </section>;
};