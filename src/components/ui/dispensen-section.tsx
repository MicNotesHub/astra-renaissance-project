import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FileText, Download, GraduationCap, ArrowRight, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface Handout {
  id: number;
  subject: string;
  filename: string;
  year: string;
  file_url: string;
  uploaded_at: string;
}

export const DispensenSection = () => {
  const { t } = useLanguage();
  const [handouts, setHandouts] = useState<Handout[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (searchTerm.trim()) {
      searchHandouts();
    } else {
      fetchHandouts();
    }
  }, [searchTerm]);

  const fetchHandouts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('handouts')
        .select('*')
        .order('uploaded_at', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Error fetching handouts:', error);
        return;
      }

      setHandouts(data || []);
      setIsSearching(false);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchHandouts = async () => {
    setLoading(true);
    setIsSearching(true);
    try {
      const { data, error } = await supabase
        .from('handouts')
        .select('*')
        .or(`subject.ilike.%${searchTerm}%,filename.ilike.%${searchTerm}%`)
        .order('uploaded_at', { ascending: false })
        .limit(20);

      if (error) {
        console.error('Error searching handouts:', error);
        return;
      }

      setHandouts(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="dispensen" className="py-12 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }} 
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 hero-text flex items-center justify-center gap-3">
            <GraduationCap className="h-12 w-12 text-primary" />
            {t('handouts.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('handouts.subtitle')}
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.6, delay: 0.3 }} 
          className="mb-8 flex justify-center"
        >
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('handouts.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t('handouts.loading')}</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {handouts.map((handout, index) => (
                <motion.div 
                  key={handout.id} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="glass-card premium-shadow hover:shadow-glow transition-all duration-300 group h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <FileText className="h-8 w-8 text-primary mb-2" />
                        <Badge variant="secondary">{handout.subject}</Badge>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {handout.filename}
                      </CardTitle>
                      <CardDescription>{handout.year}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        className="w-full flex items-center gap-2"
                        onClick={() => window.open(handout.file_url, '_blank')}
                      >
                        <Download className="h-4 w-4" />
                        {t('handouts.download')}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {handouts.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.6 }} 
                className="text-center"
              >
                {isSearching && (
                  <p className="text-muted-foreground mb-4">
                    {handouts.length} {t('handouts.results')}{handouts.length === 1 ? 'o' : 'i'} {t('handouts.resultsFound')} "{searchTerm}"
                  </p>
                )}
                <Link to="/dispense">
                  <Button size="lg" className="flex items-center gap-2">
                    {t('handouts.seeAllGeneral')}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            )}

            {handouts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }} 
                viewport={{ once: true }} 
                className="text-center py-12"
              >
                <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  {isSearching 
                    ? `${t('handouts.noResults')} ${t('handouts.noResultsSearch')} "${searchTerm}".`
                    : `${t('handouts.noResults')}.`
                  }
                </p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};