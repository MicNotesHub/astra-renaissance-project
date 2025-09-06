import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";

const Rappresentanti = () => {
  const [representatives, setRepresentatives] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const { t } = useLanguage();

  const rappresentantiSections = [
    {
      name: "CDD",
      description: t('representatives.cdd.description'),
      icon: "⚖️"
    },
    {
      name: "DIPARTIMENTI",
      description: t('representatives.dipartimenti.description'),
      icon: "🏛️"
    },
    {
      name: "ISU",
      description: t('representatives.isu.description'),
      icon: "🎓"
    },
    {
      name: "QUALITÀ",
      description: t('representatives.qualita.description'),
      icon: "⭐"
    },
    {
      name: "SCUOLA DI GIURISPRUDENZA",
      description: t('representatives.giurisprudenza.description'),
      icon: "⚖️"
    },
    {
      name: "SCUOLA MAGISTRALE",
      description: t('representatives.magistrale.description'),
      icon: "🎯"
    },
    {
      name: "SCUOLA TRIENNALE",
      description: t('representatives.triennale.description'),
      icon: "📚"
    },
    {
      name: "SPORT",
      description: t('representatives.sport.description'),
      icon: "⚽"
    },
    {
      name: "VALUTAZIONE",
      description: t('representatives.valutazione.description'),
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 hero-text">
                {t('representatives.title')}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('representatives.subtitle')}
              </p>
            </motion.div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t('representatives.loading')}</p>
              </div>
            ) : (
              <>
                {/* Sections Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {rappresentantiSections.map((section, index) => {
                    const sectionReps = representativesBySection[section.name] || [];
                    const isExpanded = selectedSection === section.name;
                    
                    return (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <Card className="glass-card premium-shadow hover:shadow-glow transition-all duration-300 group h-full">
                          <CardContent className="p-6">
                            <div className="text-center mb-4">
                              <div className="text-4xl mb-3">{section.icon}</div>
                              <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                                {section.name}
                              </h3>
                              {sectionReps.length > 0 && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {sectionReps.length} {t('representatives.count')}{sectionReps.length === 1 ? t('representatives.countSingle') : t('representatives.countPlural')}
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
                                  {isExpanded ? t('representatives.hide') : sectionReps.length > 0 ? t('representatives.viewReps') : t('representatives.learnMore')}
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
                                  {t('representatives.noReps')}
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
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Rappresentanti;