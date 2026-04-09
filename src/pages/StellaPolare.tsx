import { useEffect, useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, Loader2, Youtube, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import stellaPolareHero from "@/assets/stella-polare-hero.png";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Article {
  id: number;
  Title: string | null;
  URL: string | null;
  created_at: string;
  category: string;
}

type CategoryFilter = "all" | "settimanale" | "mensile";

const categoryLabels: Record<CategoryFilter, string> = {
  all: "Tutte le rubriche",
  settimanale: "Rubriche settimanali",
  mensile: "Rubriche mensili",
};

export default function StellaPolare() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<CategoryFilter>("all");

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

  const filteredArticles =
    filter === "all"
      ? articles
      : articles.filter((a) => a.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[35vh] sm:h-[50vh] min-h-[250px] sm:min-h-[400px] flex items-center justify-center overflow-hidden pt-16">
        <img
          src={stellaPolareHero}
          alt="Stella Polare"
          className="absolute inset-0 w-full h-full object-cover object-top sm:object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background" />
      </section>

      {/* Content Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center text-lg text-muted-foreground mb-8"
          >
            Tutte le rubriche redatte dai nostri ragazzi della divisione Press!
          </motion.p>

          {/* Podcast Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-10"
          >
            <a
              href="https://www.youtube.com/@astrabocconi99"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 rounded-xl border border-border bg-card p-5 shadow-sm transition-colors hover:bg-accent/50"
            >
              <Youtube className="w-6 h-6 text-red-500 shrink-0" />
              <span className="font-semibold text-foreground">
                Ascolta il nostro Podcast su YouTube
              </span>
              <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
            </a>
          </motion.div>

          {/* Dropdown Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mb-10"
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 min-w-[220px] justify-between">
                  {categoryLabels[filter]}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="min-w-[220px]">
                {(Object.keys(categoryLabels) as CategoryFilter[]).map((key) => (
                  <DropdownMenuItem
                    key={key}
                    onClick={() => setFilter(key)}
                    className={filter === key ? "bg-accent font-semibold" : ""}
                  >
                    {categoryLabels[key]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>

          {/* Articles List */}
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredArticles.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Nessun articolo disponibile per questa categoria.
            </p>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex flex-col items-center gap-4"
            >
              {filteredArticles.map((article, index) => (
                <motion.a
                  key={article.id}
                  href={article.URL || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.07 }}
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
