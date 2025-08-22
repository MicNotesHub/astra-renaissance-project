import React, { useState, useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, GraduationCap, Briefcase, Plane, Home, Building, MapPin, FileText, Trophy, Monitor, Globe, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('guides')
        .select('category')
        .eq('is_active', true);

      if (error) throw error;
      
      // Get unique categories
      const uniqueCategories = [...new Set(data?.map(guide => guide.category) || [])];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const categoryTitles: Record<string, string> = {
    'associations': 'Associations 101',
    'opzionali': 'Opzionali 101',
    'graduate': 'Graduate 101',
    'stage': 'Stage 101',
    'freemover': 'Freemover 101',
    'residenze': 'Residenze 101',
    'exchange_magistrale': 'Exchange 101 Magistrale',
    'exchange_triennale': 'Exchange 101 Triennale',
    'university': 'University 101',
    'milan': 'Milan 101',
    'burocrazia': 'Burocrazia 101',
    'master_admissions': 'Master Admissions',
    'tesi': 'Tesi 101',
    'ecdl': 'ECDL 101'
  };

  const categoryDescriptions: Record<string, string> = {
    'associations': 'Scopri le associazioni Bocconi!',
    'opzionali': 'Guide per la scelta dei tuoi opzionali',
    'graduate': 'Le nostre guide per la tua magistrale',
    'stage': 'Le nostre guide per il tuo stage',
    'freemover': 'Le nostre guide per il freemover',
    'residenze': 'Guide per le residenze degli studenti',
    'exchange_magistrale': 'Guide per il tuo exchange magistrale',
    'exchange_triennale': 'Guide per il tuo exchange triennale',
    'university': 'Guide al primo anno di Università',
    'milan': 'Scopri Milano prima di trasferirti',
    'burocrazia': 'Come districarsi nella burocrazia italiana',
    'master_admissions': 'Guide per le ammissioni magistrali',
    'tesi': 'Guida per la tesi triennale',
    'ecdl': 'Tutto quello che devi sapere'
  };

  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, any> = {
      'associations': Users,
      'opzionali': BookOpen,
      'graduate': GraduationCap,
      'stage': Briefcase,
      'freemover': Plane,
      'residenze': Home,
      'exchange_magistrale': Globe,
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

  const orderedCategories = categoryOrder.filter(category => categories.includes(category));

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Link to="/" className="mr-6">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Torna alla Home
                </Button>
              </Link>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Guide Universitarie
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Le nostre guide, dagli studenti per gli studenti. Seleziona una categoria per esplorare le guide disponibili.
            </p>
          </div>

          {/* Category Selection Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {orderedCategories.map((category, index) => {
              const IconComponent = getCategoryIcon(category);
              
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-primary/20 h-64 flex flex-col">
                    <CardContent className="p-6 text-center flex flex-col h-full gap-3">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center group-hover:from-primary/15 group-hover:to-primary/10 transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                        <IconComponent className="w-10 h-10 text-primary group-hover:text-primary/90 transition-colors" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center min-h-0">
                        <h3 className="text-lg font-semibold mb-2">
                          {categoryTitles[category] || category}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {categoryDescriptions[category] || ''}
                        </p>
                      </div>
                      <Link to={`/guide/${category}`} className="flex-shrink-0">
                        <Button className="w-full">
                          Esplora Guide
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Empty State */}
          {orderedCategories.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nessuna categoria trovata</h3>
              <p className="text-muted-foreground">
                Non sono ancora disponibili guide.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Guide;