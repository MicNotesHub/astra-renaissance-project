import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Users, GraduationCap, Briefcase, Plane, Home, Building, MapPin, Trophy, Monitor, Globe, DollarSign, Linkedin, Languages } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface Guide {
  id: string;
  title: string;
  description: string | null;
  category: string;
  file_url: string;
  thumbnail_url: string | null;
  order_index: number;
}

const GuideCategory: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { t } = useLanguage();

  const getCategoryTitle = (category: string) => {
    return t(`category.${category}.title`) || category;
  };

  const getCategoryPageTitle = (category: string) => {
    const key = `category.${category}.pageTitle`;
    const translated = t(key);
    return translated !== key ? translated : getCategoryTitle(category);
  };

  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, any> = {
      'associations': Users,
      'opzionali': FileText,
      'graduate': GraduationCap,
      'stage': Briefcase,
      'spring weeks': Briefcase,
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
      'funding': DollarSign,
      'linkedin': Linkedin,
      'languages': Languages
    };
    return iconMap[category] || Globe;
  };

  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      'associations': 'text-blue-500 bg-blue-50 hover:bg-blue-100 border-blue-200',
      'opzionali': 'text-green-500 bg-green-50 hover:bg-green-100 border-green-200',
      'graduate': 'text-purple-500 bg-purple-50 hover:bg-purple-100 border-purple-200',
      'stage': 'text-orange-500 bg-orange-50 hover:bg-orange-100 border-orange-200',
      'spring weeks': 'text-violet-500 bg-violet-50 hover:bg-violet-100 border-violet-200',
      'freemover': 'text-cyan-500 bg-cyan-50 hover:bg-cyan-100 border-cyan-200',
      'residenze': 'text-emerald-500 bg-emerald-50 hover:bg-emerald-100 border-emerald-200',
      'exchange_magistrale': 'text-sky-500 bg-sky-50 hover:bg-sky-100 border-sky-200',
      'exchange_triennale': 'text-indigo-500 bg-indigo-50 hover:bg-indigo-100 border-indigo-200',
      'university': 'text-rose-500 bg-rose-50 hover:bg-rose-100 border-rose-200',
      'milan': 'text-pink-500 bg-pink-50 hover:bg-pink-100 border-pink-200',
      'burocrazia': 'text-amber-500 bg-amber-50 hover:bg-amber-100 border-amber-200',
      'master_admissions': 'text-yellow-500 bg-yellow-50 hover:bg-yellow-100 border-yellow-200',
      'tesi': 'text-teal-500 bg-teal-50 hover:bg-teal-100 border-teal-200',
      'ecdl': 'text-slate-500 bg-slate-50 hover:bg-slate-100 border-slate-200',
      'funding': 'text-lime-500 bg-lime-50 hover:bg-lime-100 border-lime-200',
      'linkedin': 'text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-200',
      'languages': 'text-fuchsia-500 bg-fuchsia-50 hover:bg-fuchsia-100 border-fuchsia-200'
    };
    return colorMap[category] || 'text-primary bg-primary/10 hover:bg-primary/20 border-primary/20';
  };

  const fetchGuides = async () => {
    if (!category) return;

    try {
      // Special case: 'languages' pulls from the handouts table (subject = 'languages')
      if (category === 'languages') {
        const { data, error } = await supabase
          .from('handouts')
          .select('id, filename, file_url')
          .ilike('subject', 'languages')
          .order('filename');

        if (error) {
          console.error('Error fetching language handouts:', error);
          toast({
            title: t('common.error'),
            description: "Impossibile caricare le guide",
            variant: "destructive",
          });
          return;
        }

        // Deduplicate by file_url so duplicate rows show once
        const seen = new Set<string>();
        const mapped: Guide[] = (data || [])
          .filter((row) => {
            if (seen.has(row.file_url)) return false;
            seen.add(row.file_url);
            return true;
          })
          .map((row, idx) => ({
            id: String(row.id),
            title: row.filename,
            description: null,
            category: 'languages',
            file_url: row.file_url,
            thumbnail_url: null,
            order_index: idx,
          }));
        setGuides(mapped);
        return;
      }

      const { data, error } = await supabase
        .from('guides')
        .select('*')
        .eq('category', category)
        .eq('is_active', true)
        .order('order_index');

      if (error) {
        console.error('Error fetching guides:', error);
        toast({
          title: t('common.error'),
          description: "Impossibile caricare le guide",
          variant: "destructive",
        });
        return;
      }

      setGuides(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: t('common.error'),
        description: t('common.unexpectedError'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuides();
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">{t('common.loading')}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="text-center">
            <p className="text-lg text-muted-foreground">Categoria non trovata</p>
          </div>
        </div>
      </div>
    );
  }

  const IconComponent = getCategoryIcon(category);
  const colorClasses = getCategoryColor(category);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Back Navigation */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/guide"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('guideCategory.backToGuides')}
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${colorClasses}`}>
              <IconComponent className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              {getCategoryPageTitle(category)}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('guideCategory.subtitle')}
            </p>
          </motion.div>
        </div>

        {/* Guides Grid */}
        {guides.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">{t('guideCategory.noGuides')}</h3>
            <p className="text-muted-foreground">
              {t('guideCategory.noGuidesDescription')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-items-center max-w-6xl mx-auto">
            {guides.map((guide, index) => {
              const titleLower = guide.title.toLowerCase();
              const isItalian = titleLower.includes('guida') || titleLower.includes('ita') || titleLower.endsWith(' it');
              const isEnglish = titleLower.includes('guide') || titleLower.includes('eng') || titleLower.endsWith(' en');
              const flagUrl = isItalian ? 'https://flagcdn.com/w80/it.png' : isEnglish ? 'https://flagcdn.com/w80/gb.png' : null;

              return (
                <motion.div
                  key={guide.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center space-y-3"
                >
                  <a
                    href={guide.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex items-center justify-center ${colorClasses}`}
                  >
                    <IconComponent size={48} />
                    {flagUrl && (
                      <img
                        src={flagUrl}
                        alt={isItalian ? 'Italiano' : 'English'}
                        className="absolute -top-2 -right-2 w-7 h-7 rounded-full object-cover border-2 border-white shadow-md"
                      />
                    )}
                  </a>
                  <p className="text-sm font-medium text-center text-foreground leading-tight max-w-[150px]">
                    {guide.title}
                  </p>
                  {guide.description && (
                    <p className="text-xs text-muted-foreground text-center max-w-[150px] line-clamp-2">
                      {guide.description}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default GuideCategory;