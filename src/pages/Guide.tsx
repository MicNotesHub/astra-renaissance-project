import React, { useState, useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, GraduationCap, Briefcase, Plane, Home, Building, MapPin, FileText, Trophy, Monitor, Globe, ArrowLeft, DollarSign, Linkedin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import fundingCover from "@/assets/guide-covers/funding.jpg";
import residenzeCover from "@/assets/guide-covers/residenze.jpg";

const categoryCoverMap: Record<string, string> = {
  'funding': fundingCover,
  'residenze': residenzeCover,
};

// Categories with direct language-specific downloads (flag buttons instead of subcategory navigation)
const directDownloadCategories: Record<string, { it?: string; en?: string }> = {
  'funding': {
    it: 'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/guide/funding/Guida%20Agevolazioni.pdf',
    en: 'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/guide/funding/Funding%20Guide.pdf',
  },
  'residenze': {
    it: 'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/guide/residenze/Guida%20Residenze_compressed.pdf',
    en: 'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/guide/residenze/Residences%20Guide%20(1).pdf',
  },
  'linkedin': {
    it: 'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/guide/linkedin/LinkedIn%20IT.pdf',
    en: 'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/guide/linkedin/LinkedIn%20EN.pdf',
  },
  'tesi': {
    it: 'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/guide/tesi%20101/Guida%20Lavoro%20Finale%20e%20Laurea.pdf',
    en: 'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/guide/tesi%20101/Guide%20Final%20Paper%20and%20Graduation.pdf',
  },
  'opzionali': {
    it: 'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/guide/opzionali/OPZIONALI.pdf',
    en: 'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/guide/opzionali/ELECTIVES-GUIDE_merged.pdf',
  },
  'graduate': {
    en: 'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/guide/graduate/Guida-Magistrali.pdf',
  },
  'freemover': {
    it: 'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/guide/freemover/GUIDA-FREE-MOVER-ITA-BOCCONI-PDF.pdf',
    en: 'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/guide/freemover/FREE-MOVER-GUIDE-ENG-BOCCONI.pdf',
  },
  'burocrazia': {
    en: 'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/guide/burocrazia/BUREACURACY101v_merged.pdf',
  },
  'ecdl': {},
};

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
  const { t } = useLanguage();

  const getCategoryTitle = (category: string) => {
    const key = `category.${category}.title`;
    const translated = t(key);
    return translated !== key ? translated : category;
  };

  const getCategoryDescription = (category: string) => {
    const key = `category.${category}.description`;
    const translated = t(key);
    return translated !== key ? translated : '';
  };

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
      'ecdl': Monitor,
      'spring weeks': Briefcase,
      'funding': DollarSign,
      'linkedin': Linkedin
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
      'ecdl': 'text-slate-500 bg-slate-50 hover:bg-slate-100',
      'spring weeks': 'text-violet-500 bg-violet-50 hover:bg-violet-100',
      'funding': 'text-lime-500 bg-lime-50 hover:bg-lime-100',
      'linkedin': 'text-blue-600 bg-blue-50 hover:bg-blue-100'
    };
    return colorMap[category] || 'text-primary bg-primary/10 hover:bg-primary/20';
  };
  
  const categoryOrder = [
    'funding',
    'residenze',
    'ecdl',
    'tesi',
    'linkedin',
    'associations',
    'opzionali', 
    
    'stage',
    'spring weeks',
    'freemover',
    
    'exchange_triennale',
    'university',
    'milan',
    'burocrazia',
    'master_admissions',
  ];

  const orderedCategories = categoryOrder.filter(category => categories.includes(category));

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="text-center">{t('common.loading')}</div>
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
                  {t('guide.backToHome')}
                </Button>
              </Link>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {t('guide.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('guide.subtitle')}
            </p>
          </div>

          {/* Category Selection Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {orderedCategories.map((category, index) => {
              const IconComponent = getCategoryIcon(category);
              const colorClass = getCategoryColor(category);
              
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {directDownloadCategories[category] ? (
                    <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.03] overflow-hidden h-full border-0 p-0">
                      {categoryCoverMap[category] ? (
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={categoryCoverMap[category]}
                            alt={getCategoryTitle(category)}
                            className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${category === 'funding' ? 'object-center' : 'object-bottom'}`}
                          />
                          <div className="absolute inset-0 bg-black/40" />
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                            <h3 className="text-2xl font-bold text-white drop-shadow-lg mb-1 text-center">
                              {getCategoryTitle(category)}
                            </h3>
                            <p className="text-sm text-white/80 text-center mb-4 px-2">
                              {getCategoryDescription(category)}
                            </p>
                            <div className="flex items-center gap-4">
                              {directDownloadCategories[category].it && (
                                <a
                                  href={directDownloadCategories[category].it}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/60 hover:border-white hover:scale-110 transition-all duration-200 shadow-lg"
                                  title="Italiano"
                                >
                                  <img src="https://flagcdn.com/w80/it.png" alt="Italiano" className="w-full h-full object-cover" />
                                </a>
                              )}
                              {directDownloadCategories[category].en && (
                                <a
                                  href={directDownloadCategories[category].en}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/60 hover:border-white hover:scale-110 transition-all duration-200 shadow-lg"
                                  title="English"
                                >
                                  <img src="https://flagcdn.com/w80/gb.png" alt="English" className="w-full h-full object-cover" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className={`relative h-64 overflow-hidden ${colorClass}`}>
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                            <IconComponent className="w-12 h-12 mb-3 opacity-90" />
                            <h3 className="text-2xl font-bold drop-shadow-lg mb-1 text-center">
                              {getCategoryTitle(category)}
                            </h3>
                            <p className="text-sm opacity-80 text-center mb-4 px-2">
                              {getCategoryDescription(category)}
                            </p>
                            <div className="flex items-center gap-4">
                              {directDownloadCategories[category].it && (
                                <a
                                  href={directDownloadCategories[category].it}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-9 h-9 rounded-full overflow-hidden border-2 border-current/40 hover:scale-110 transition-all duration-200"
                                  title="Italiano"
                                >
                                  <img src="https://flagcdn.com/w80/it.png" alt="Italiano" className="w-full h-full object-cover" />
                                </a>
                              )}
                              {directDownloadCategories[category].en && (
                                <a
                                  href={directDownloadCategories[category].en}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-9 h-9 rounded-full overflow-hidden border-2 border-current/40 hover:scale-110 transition-all duration-200"
                                  title="English"
                                >
                                  <img src="https://flagcdn.com/w80/gb.png" alt="English" className="w-full h-full object-cover" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </Card>
                  ) : (
                    <Link to={`/guide/${category}`}>
                      <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.03] overflow-hidden h-full border-0 p-0">
                        {categoryCoverMap[category] ? (
                          <div className="relative h-64 overflow-hidden">
                            <img
                              src={categoryCoverMap[category]}
                              alt={getCategoryTitle(category)}
                              className="w-full h-full object-cover object-bottom group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/40" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                              <h3 className="text-2xl font-bold text-white drop-shadow-lg mb-1 text-center">
                                {getCategoryTitle(category)}
                              </h3>
                              <p className="text-sm text-white/80 text-center mb-4 px-2">
                                {getCategoryDescription(category)}
                              </p>
                              <span className="text-white/80 text-sm border border-white/30 rounded-md px-4 py-2">
                                {t('guide.explore')}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className={`relative h-64 overflow-hidden ${colorClass}`}>
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                              <IconComponent className="w-12 h-12 mb-3 opacity-90" />
                              <h3 className="text-2xl font-bold drop-shadow-lg mb-1 text-center">
                                {getCategoryTitle(category)}
                              </h3>
                              <p className="text-sm opacity-80 text-center mb-4 px-2">
                                {getCategoryDescription(category)}
                              </p>
                              <span className="text-sm border border-current/30 rounded-md px-4 py-2 opacity-80">
                                {t('guide.explore')}
                              </span>
                            </div>
                          </div>
                        )}
                      </Card>
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Empty State */}
          {orderedCategories.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('guide.noCategories')}</h3>
              <p className="text-muted-foreground">
                {t('guide.noCategoriesDescription')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Guide;