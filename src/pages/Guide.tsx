import React, { useState, useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, GraduationCap, Briefcase, Plane, Home, Building, MapPin, FileText, Trophy, Monitor, Globe, Calculator, CreditCard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

interface Guide {
  id: string;
  title: string;
  description: string | null;
  category: string;
  file_url: string;
  thumbnail_url: string | null;
  order_index: number;
}

const Guide = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const { data, error } = await supabase
        .from('guides')
        .select('*')
        .eq('is_active', true)
        .order('category')
        .order('order_index');

      if (error) throw error;
      setGuides(data || []);
    } catch (error) {
      console.error('Error fetching guides:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupedGuides = guides.reduce((acc, guide) => {
    if (!acc[guide.category]) {
      acc[guide.category] = [];
    }
    acc[guide.category].push(guide);
    return acc;
  }, {} as Record<string, Guide[]>);

  const categoryTitles: Record<string, string> = {
    'associations': 'Associations 101: scopri le associazioni Bocconi!',
    'opzionali': 'Opzionali 101: le nostre guide per la scelta dei tuoi opzionali!',
    'graduate': 'Graduate 101: le nostre guide per la tua magistrale!',
    'stage': 'Stage 101: le nostre guide per il tuo stage!',
    'freemover': 'Freemover 101: le nostre guide per il freemover!',
    'residenze': 'Residenze 101: le nostre guide per le residenze degli studenti!',
    'exchange_magistrale': 'Exchange 101: le nostre guide per il tuo exchange magistrale!',
    'exchange_triennale': 'Exchange 101: le nostre guide per il tuo exchange triennale!',
    'university': 'University 101: le nostre guide al primo anno di Università!',
    'milan': 'Milan 101: scopri Milano prima di trasferirti!',
    'burocrazia': 'Burocrazia 101: come districarsi nella burocrazia italiana!',
    'master_admissions': 'Master Admissions',
    'tesi': 'Tesi 101: guida per la tesi triennale',
    'ecdl': 'ECDL 101: una guida per tutto quello che devi sapere'
  };

  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, any> = {
      'associations': Users,
      'opzionali': BookOpen,
      'graduate': GraduationCap,
      'stage': Briefcase,
      'freemover': Plane,
      'residenze': Home,
      'exchange_magistrale': Plane,
      'exchange_triennale': Plane,
      'university': Building,
      'milan': MapPin,
      'burocrazia': FileText,
      'master_admissions': Trophy,
      'tesi': FileText,
      'ecdl': Monitor
    };
    return iconMap[category] || Globe;
  };

  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      'associations': 'text-blue-500 bg-blue-50 hover:bg-blue-100',
      'opzionali': 'text-green-500 bg-green-50 hover:bg-green-100',
      'graduate': 'text-purple-500 bg-purple-50 hover:bg-purple-100',
      'stage': 'text-orange-500 bg-orange-50 hover:bg-orange-100',
      'freemover': 'text-cyan-500 bg-cyan-50 hover:bg-cyan-100',
      'residenze': 'text-emerald-500 bg-emerald-50 hover:bg-emerald-100',
      'exchange_magistrale': 'text-sky-500 bg-sky-50 hover:bg-sky-100',
      'exchange_triennale': 'text-indigo-500 bg-indigo-50 hover:bg-indigo-100',
      'university': 'text-rose-500 bg-rose-50 hover:bg-rose-100',
      'milan': 'text-pink-500 bg-pink-50 hover:bg-pink-100',
      'burocrazia': 'text-amber-500 bg-amber-50 hover:bg-amber-100',
      'master_admissions': 'text-yellow-500 bg-yellow-50 hover:bg-yellow-100',
      'tesi': 'text-teal-500 bg-teal-50 hover:bg-teal-100',
      'ecdl': 'text-slate-500 bg-slate-50 hover:bg-slate-100'
    };
    return colorMap[category] || 'text-primary bg-primary/10 hover:bg-primary/20';
  };
  
  const categoryOrder = [
    'associations',
    'opzionali', 
    'graduate',
    'stage',
    'freemover',
    'residenze',
    'exchange_magistrale',
    'exchange_triennale',
    'university',
    'milan',
    'burocrazia',
    'master_admissions',
    'tesi',
    'ecdl'
  ];

  const orderedCategories = categoryOrder.filter(category => groupedGuides[category]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Guide
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold text-primary mb-6">
            Ti serve aiuto? Nessun problema!
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Le nostre guide, dagli studenti per gli studenti
          </p>
        </motion.div>

        {/* Guides Grid */}
        <div className="space-y-12">
          {orderedCategories.map((category, index) => {
            const categoryGuides = groupedGuides[category];
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    {categoryTitles[category] || category}
                  </h3>
                </div>
                
                <div className="w-full text-center">
                  <div className="inline-block">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-items-center">
                      {categoryGuides.map((guide) => {
                        const IconComponent = getCategoryIcon(category);
                        const colorClasses = getCategoryColor(category);
                        
                        return (
                          <motion.div
                            key={guide.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex flex-col items-center space-y-3"
                          >
                            <a
                              href={guide.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`p-6 rounded-2xl border-2 border-transparent transition-all duration-300 cursor-pointer ${colorClasses}`}
                            >
                              <IconComponent size={48} />
                            </a>
                            <p className="text-sm font-medium text-center text-foreground leading-tight">
                              {guide.title}
                            </p>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {Object.keys(groupedGuides).length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              Nessuna guida disponibile al momento.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Guide;