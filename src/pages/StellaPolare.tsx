import { useEffect, useMemo, useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  FileText,
  Loader2,
  Youtube,
  ArrowLeft,
  CalendarDays,
  CalendarRange,
  Palette,
  TrendingUp,
  Globe2,
  Scale,
  Trophy,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import stellaPolareHero from "@/assets/stella-polare-hero.png";
import { useLanguage } from "@/contexts/LanguageContext";

interface Article {
  id: number;
  Title: string | null;
  URL: string | null;
  created_at: string;
  category: string;
  theme: string | null;
}

type MainView = "home" | "weekly" | "monthly";
type WeeklyTheme = "arte" | "economia" | "international" | "legal" | "sport";

const PODCAST_URL = "https://www.youtube.com/@astrabocconi99";

const themeMatchers: Record<WeeklyTheme, (val: string) => boolean> = {
  arte: (v) => /(arte|cultura|cinema|teatro|art|culture|theatre|theater)/i.test(v),
  economia: (v) => /(econom)/i.test(v),
  international: (v) => /(international|internazional)/i.test(v),
  legal: (v) => /(legal|legge|giurid)/i.test(v),
  sport: (v) => /(sport)/i.test(v),
};

export default function StellaPolare() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<MainView>("home");
  const [activeTheme, setActiveTheme] = useState<WeeklyTheme | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from("Stella_Polare")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching articles:", error);
      } else {
        setArticles((data as Article[]) || []);
      }
      setLoading(false);
    };
    fetchArticles();
  }, []);

  const weeklyArticles = useMemo(
    () => articles.filter((a) => a.category === "settimanale"),
    [articles]
  );
  const monthlyArticles = useMemo(
    () => articles.filter((a) => a.category === "mensile"),
    [articles]
  );

  const themedArticles = useMemo(() => {
    if (!activeTheme) return [];
    const matcher = themeMatchers[activeTheme];
    return weeklyArticles.filter((a) => {
      const haystack = `${a.theme ?? ""} ${a.Title ?? ""}`;
      return matcher(haystack);
    });
  }, [weeklyArticles, activeTheme]);

  const themes: { key: WeeklyTheme; icon: typeof Palette; gradient: string }[] = [
    { key: "arte", icon: Palette, gradient: "from-rose-500/20 to-orange-500/20" },
    { key: "economia", icon: TrendingUp, gradient: "from-emerald-500/20 to-teal-500/20" },
    { key: "international", icon: Globe2, gradient: "from-sky-500/20 to-indigo-500/20" },
    { key: "legal", icon: Scale, gradient: "from-amber-500/20 to-yellow-500/20" },
    { key: "sport", icon: Trophy, gradient: "from-violet-500/20 to-fuchsia-500/20" },
  ];

  const goHome = () => {
    setView("home");
    setActiveTheme(null);
  };

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
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center text-lg text-muted-foreground mb-10"
          >
            {t("stellapolare.subtitle")}
          </motion.p>

          <AnimatePresence mode="wait">
            {/* HOME: 3 main buttons */}
            {view === "home" && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-stretch"
              >
                {/* Settimanale (left) */}
                <button
                  onClick={() => setView("weekly")}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-10 text-left shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 hover:border-primary/40 md:translate-y-2"
                >
                  <CalendarDays className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {t("stellapolare.weekly")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("stellapolare.weeklySubtitle")}
                  </p>
                </button>

                {/* Mensile (center, highlighted) */}
                <button
                  onClick={() => setView("monthly")}
                  className="group relative overflow-hidden rounded-2xl border-[3px] border-primary bg-card p-8 md:p-12 text-left shadow-xl ring-4 ring-primary/10 transition-all hover:shadow-2xl hover:-translate-y-1 hover:ring-primary/20"
                >
                  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/10 blur-2xl" />
                  <CalendarRange className="w-12 h-12 text-primary mb-4 relative" />
                  <h3 className="text-3xl font-bold text-foreground mb-2 relative">
                    {t("stellapolare.monthly")}
                  </h3>
                  <p className="text-sm text-muted-foreground relative">
                    {t("stellapolare.monthlyTitle")}
                  </p>
                </button>

                {/* Podcast (right) */}
                <a
                  href={PODCAST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-10 text-left shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 hover:border-red-500/40 md:translate-y-2"
                >
                  <Youtube className="w-10 h-10 text-red-500 mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                    {t("stellapolare.podcastBtn")}
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("stellapolare.podcast")}
                  </p>
                </a>
              </motion.div>
            )}

            {/* WEEKLY: theme picker or themed articles list */}
            {view === "weekly" && (
              <motion.div
                key="weekly"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <Button
                    variant="ghost"
                    onClick={() => (activeTheme ? setActiveTheme(null) : goHome())}
                    className="gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {t("stellapolare.back")}
                  </Button>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">
                    {activeTheme
                      ? t(`stellapolare.theme.${activeTheme}`)
                      : t("stellapolare.weeklyTitle")}
                  </h2>
                  <div className="w-20" />
                </div>

                {!activeTheme ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {themes.map(({ key, icon: Icon, gradient }) => (
                      <button
                        key={key}
                        onClick={() => setActiveTheme(key)}
                        className={`group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${gradient} p-6 text-left shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 hover:border-primary/40`}
                      >
                        <Icon className="w-8 h-8 text-foreground mb-3" />
                        <h4 className="text-lg font-semibold text-foreground">
                          {t(`stellapolare.theme.${key}`)}
                        </h4>
                      </button>
                    ))}
                  </div>
                ) : (
                  <ArticlesList
                    loading={loading}
                    articles={themedArticles}
                    emptyText={t("stellapolare.noArticles")}
                    fallbackTitle={t("stellapolare.article")}
                  />
                )}
              </motion.div>
            )}

            {/* MONTHLY: list */}
            {view === "monthly" && (
              <motion.div
                key="monthly"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <Button variant="ghost" onClick={goHome} className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    {t("stellapolare.back")}
                  </Button>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">
                    {t("stellapolare.monthlyTitle")}
                  </h2>
                  <div className="w-20" />
                </div>

                <ArticlesList
                  loading={loading}
                  articles={monthlyArticles}
                  emptyText={t("stellapolare.noArticles")}
                  fallbackTitle={t("stellapolare.article")}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ArticlesList({
  loading,
  articles,
  emptyText,
  fallbackTitle,
}: {
  loading: boolean;
  articles: Article[];
  emptyText: string;
  fallbackTitle: string;
}) {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }
  if (articles.length === 0) {
    return <p className="text-center text-muted-foreground py-12">{emptyText}</p>;
  }
  return (
    <div className="flex flex-col items-center gap-4">
      {articles.map((article, index) => (
        <motion.a
          key={article.id}
          href={article.URL || "#"}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 + index * 0.05 }}
          className="w-full max-w-md"
        >
          <Button
            size="lg"
            className="w-full gap-3 px-8 py-6 text-lg font-semibold"
          >
            <FileText className="w-5 h-5" />
            <span className="truncate">{article.Title || fallbackTitle}</span>
            <ExternalLink className="w-4 h-4 ml-auto" />
          </Button>
        </motion.a>
      ))}
    </div>
  );
}
