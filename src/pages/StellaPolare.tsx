import { useEffect, useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import stellaPolareHero from "@/assets/stella-polare-hero.png";

interface Article {
  id: number;
  Title: string | null;
  URL: string | null;
  created_at: string;
}

export default function StellaPolare() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from("Stella_Polare")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching articles:", error);
      } else {
        setArticles(data || []);
      }
      setLoading(false);
    };

    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section with Image as Background/Title */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden pt-16">
        <img 
          src={stellaPolareHero} 
          alt="Stella Polare" 
          className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background"></div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center text-lg text-muted-foreground mb-12"
          >
            Tutti gli articoli mensili redatti dai nostri ragazzi della divisione Press!
          </motion.p>

          {/* Articles Grid */}
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : articles.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Nessun articolo disponibile al momento.
            </p>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center gap-4"
            >
              {articles.map((article, index) => (
                <motion.a
                  key={article.id}
                  href={article.URL || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="w-full max-w-md"
                >
                  <Button 
                    size="lg" 
                    className="w-full gap-3 px-8 py-6 text-lg font-semibold"
                  >
                    <FileText className="w-5 h-5" />
                    {article.Title || "Articolo"}
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </Button>
                </motion.a>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
