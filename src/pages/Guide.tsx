import { useState, useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";
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
    'associazioni': 'Associazioni 101: tutto sulle associazioni!',
    'opzionali': 'Opzionali 101: le nostre guide per la scelta dei tuoi opzionali!',
    'graduate': 'Graduate 101: le nostre guide per la tua magistrale!',
    'stage': 'Stage 101: le nostre guide per il tuo stage!',
    'freemover': 'Freemover 101: le nostre guide per il freemover!',
    'exchange': 'Exchange 101: le nostre guide per l\'exchange!'
  };

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
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Guide
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4">
            Ti serve aiuto? Nessun problema!
          </h2>
          <p className="text-lg text-muted-foreground">
            Le nostre guide, dagli studenti per gli studenti
          </p>
        </motion.div>

        {/* Guides Grid */}
        <div className="space-y-12">
          {Object.entries(groupedGuides).map(([category, categoryGuides], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-foreground">
                {categoryTitles[category] || category}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryGuides.map((guide) => (
                  <Card key={guide.id} className="group hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      {guide.thumbnail_url && (
                        <div className="mb-4 overflow-hidden rounded-lg">
                          <img 
                            src={guide.thumbnail_url} 
                            alt={guide.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      
                      <h4 className="text-xl font-semibold text-foreground mb-2">
                        {guide.title}
                      </h4>
                      
                      {guide.description && (
                        <p className="text-muted-foreground mb-4">
                          {guide.description}
                        </p>
                      )}
                      
                      <div className="flex gap-3">
                        <Button 
                          asChild 
                          className="flex-1"
                          variant="default"
                        >
                          <a 
                            href={guide.file_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                          >
                            <Download className="h-4 w-4" />
                            Scarica Guida
                          </a>
                        </Button>
                        
                        <Button 
                          asChild 
                          variant="outline" 
                          size="icon"
                        >
                          <a 
                            href={guide.file_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          ))}
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