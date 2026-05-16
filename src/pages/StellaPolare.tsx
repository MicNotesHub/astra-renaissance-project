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
  Newspaper,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import stellaPolareHero from "@/assets/stella-polare-hero.png";
import sportCover from "@/assets/stella-polare-sport-cover.jpeg";
import internationalCover from "@/assets/stella-polare-covers/international.jpg";
import astraNewsCover from "@/assets/stella-polare-covers/astranews.jpg";
import legalCover from "@/assets/stella-polare-covers/legal.jpg";
import economicsCover from "@/assets/stella-polare-covers/economics.jpg";
import arteCulturaCover from "@/assets/stella-polare-covers/arte-cultura.jpg";
import liberationDayCover from "@/assets/stella-polare-covers/liberation-day.jpeg";
import labourDayCover from "@/assets/stella-polare-covers/labour-day.png";
import mentalHealthCover from "@/assets/stella-polare-covers/mental-health.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

type ManualCategory = "arte" | "economia" | "international" | "legal" | "sport" | "astranews";

interface ManualArticle {
  slug: string;
  href: string;
  category: ManualCategory;
  eyebrow: string;
  title: string;
  excerpt: string;
  accent: string;
}

const manualArticles: ManualArticle[] = [
  {
    slug: "impresa-governance-agroalimentare",
    href: "/stella-polare/impresa-governance-agroalimentare",
    category: "legal",
    eyebrow: "Aprile 2026",
    title: "Impresa e Governance Agroalimentare: il futuro del food italiano",
    excerpt:
      "La conferenza di Astra Bocconi, Corporate Law Academy e INSUD: quadro normativo, ddl 1519/2026, contraffazione, filiera e imprese familiari nel settore agroalimentare.",
    accent: "from-amber-500 to-yellow-500",
  },
  {
    slug: "april-cultural-overload",
    href: "/stella-polare/april-cultural-overload",
    category: "arte",
    eyebrow: "Aprile 2026",
    title: "April, the month of cultural overload",
    excerpt:
      "Design Week, Miart & Milano Art Week e Gelato Week: tutti gli eventi che rendono aprile il mese più ricco di cultura in Italia.",
    accent: "from-rose-500 to-orange-500",
  },
  {
    slug: "referendum-giustizia-2026",
    href: "/stella-polare/referendum-giustizia-2026",
    category: "legal",
    eyebrow: "Marzo 2026",
    title: "Referendum sulla giustizia: contenuti, posizioni e esito del voto",
    excerpt:
      "Separazione delle carriere, doppio CSM e sorteggio: cosa prevedeva la riforma costituzionale, le ragioni del Sì e del No e l'esito del voto.",
    accent: "from-amber-500 to-yellow-500",
  },
  {
    slug: "no-borders-just-stories",
    href: "/stella-polare/no-borders-just-stories",
    category: "international",
    eyebrow: "International",
    title: "No borders, just stories",
    excerpt:
      "Una nuova rubrica dedicata all'ascolto e alla condivisione: uno spazio sicuro dove gli studenti internazionali possono raccontare la loro storia.",
    accent: "from-sky-500 to-indigo-500",
  },
  {
    slug: "gasoline-and-geopolitics",
    href: "/stella-polare/gasoline-and-geopolitics",
    category: "economia",
    eyebrow: "Economia",
    title: "The relationship between gasoline and geopolitics",
    excerpt:
      "Dal Covid alla guerra in Ucraina fino alle tensioni in Medio Oriente: come i prezzi del carburante riflettono gli equilibri geopolitici globali.",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    slug: "italian-football-crisis",
    href: "/stella-polare/italian-football-crisis",
    category: "sport",
    eyebrow: "Sport",
    title: "The structural crisis of Italian football",
    excerpt:
      "Dalla mancata qualificazione ai Mondiali ai problemi del settore giovanile: perché il calcio italiano è in crisi e cosa serve per cambiare.",
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    slug: "astra-news-influencers",
    href: "/stella-polare/astra-news-influencers",
    category: "astranews",
    eyebrow: "Aprile 2026",
    title: "Astra hosts Emily Pallini and Rachele Santoro",
    excerpt:
      "Una conversazione con due delle content creator più seguite in Italia: dal percorso professionale all'identità online, fino al futuro del mestiere con l'AI.",
    accent: "from-blue-500 to-cyan-500",
  },
];

interface MonthlyManualArticle {
  slug: string;
  href: string;
  cover: string;
  eyebrow: string;
  title: string;
  excerpt: string;
  accent: string;
  author: string;
}

const monthlyManualArticles: MonthlyManualArticle[] = [
  {
    slug: "labour-day-may-1",
    href: "/stella-polare/labour-day-may-1",
    cover: labourDayCover,
    eyebrow: "Maggio 2026 · Mensile",
    title: "1° Maggio, il lavoro come valore civile e sociale",
    excerpt:
      "La Festa dei Lavoratori non è soltanto una ricorrenza simbolica, ma un momento per riflettere sul significato del lavoro, sui diritti conquistati nel tempo e sulle sfide che ancora attraversano la società.",
    accent: "from-blue-600 via-blue-500 to-sky-400",
    author: "Giorgia Caruana",
  },
  {
    slug: "liberation-day-april-25",
    href: "/stella-polare/liberation-day-april-25",
    cover: liberationDayCover,
    eyebrow: "Aprile 2026 · Mensile",
    title: "For all the days April 25th",
    excerpt:
      "Memoria, Resistenza e libertà: perché il 25 aprile riguarda ancora ognuno di noi. Un viaggio nelle storie che hanno costruito l'Italia democratica.",
    accent: "from-red-600 via-white to-green-600",
    author: "Marco Ferraù",
  },
];

interface Article {
  id: number;
  Title: string | null;
  URL: string | null;
  created_at: string;
  category: string;
  theme: string | null;
}

type MainView = "home" | "weekly" | "monthly";
type WeeklyTheme = "arte" | "economia" | "international" | "legal" | "sport" | "astranews";

const PODCAST_URL = "https://youtube.com/@astrabocconi99?si=rA0hFwtnOQJufgVF";

const themeMatchers: Record<WeeklyTheme, (val: string) => boolean> = {
  arte: (v) => /(arte|cultura|cinema|teatro|art|culture|theatre|theater)/i.test(v),
  economia: (v) => /(econom)/i.test(v),
  international: (v) => /(international|internazional)/i.test(v),
  legal: (v) => /(legal|legge|giurid)/i.test(v),
  sport: (v) => /(sport)/i.test(v),
  astranews: (v) => /(astra\s*news|astranews)/i.test(v),
};

const STORAGE_KEY = "stellaPolare:lastView";

interface StoredView {
  view: MainView;
  activeTheme: WeeklyTheme | null;
}

export default function StellaPolare() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<MainView>(() => {
    if (typeof window === "undefined") return "home";
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return "home";
      return (JSON.parse(raw) as StoredView).view ?? "home";
    } catch {
      return "home";
    }
  });
  const [activeTheme, setActiveTheme] = useState<WeeklyTheme | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return (JSON.parse(raw) as StoredView).activeTheme ?? null;
    } catch {
      return null;
    }
  });
  const { t } = useLanguage();

  // Persist current view so we can restore it after visiting an article.
  useEffect(() => {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ view, activeTheme } satisfies StoredView)
      );
    } catch {
      /* ignore */
    }
  }, [view, activeTheme]);

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

  const themes: { key: WeeklyTheme; icon: typeof Palette; gradient: string; cover?: string }[] = [
    { key: "international", icon: Globe2, gradient: "from-sky-500/20 to-indigo-500/20", cover: internationalCover },
    { key: "astranews", icon: Newspaper, gradient: "from-blue-500/20 to-cyan-500/20", cover: astraNewsCover },
    { key: "legal", icon: Scale, gradient: "from-amber-500/20 to-yellow-500/20", cover: legalCover },
    { key: "economia", icon: TrendingUp, gradient: "from-emerald-500/20 to-teal-500/20", cover: economicsCover },
    { key: "arte", icon: Palette, gradient: "from-rose-500/20 to-orange-500/20", cover: arteCulturaCover },
    { key: "sport", icon: Trophy, gradient: "from-muted/40 to-muted/20", cover: sportCover },
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
                    {themes.map(({ key, icon: Icon, gradient, cover }) => (
                      <button
                        key={key}
                        onClick={() => setActiveTheme(key)}
                        className={`group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${gradient} text-left shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 hover:border-primary/40 ${cover ? "" : "p-6"}`}
                      >
                        {cover ? (
                          <div className="relative w-full aspect-[4/3] overflow-hidden">
                            <img
                              src={cover}
                              alt={t(`stellapolare.theme.${key}`)}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 p-5">
                              <h4 className="text-2xl font-serif italic font-semibold text-white tracking-wide drop-shadow-lg">
                                {t(`stellapolare.theme.${key}`)}
                              </h4>
                            </div>
                          </div>
                        ) : (
                          <>
                            <Icon className="w-8 h-8 text-foreground mb-3" />
                            <h4 className="text-lg font-semibold text-foreground">
                              {t(`stellapolare.theme.${key}`)}
                            </h4>
                          </>
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <>
                    {/* Manual featured articles for this theme */}
                    {manualArticles.filter((a) => a.category === activeTheme).length > 0 && (
                      <div className="flex flex-wrap gap-5 mb-8 justify-center sm:justify-start">
                        {manualArticles
                          .filter((a) => a.category === activeTheme)
                          .map((a) => (
                            <Link
                              key={a.slug}
                              to={a.href}
                              className="group block w-full max-w-[280px]"
                            >
                              <article className="aspect-[3/4] bg-card border border-border rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col p-5 relative">
                                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${a.accent}`} />
                                <p className="text-[10px] uppercase tracking-widest text-primary font-semibold mb-2 mt-1">
                                  {a.eyebrow}
                                </p>
                                <h4 className="text-base font-bold text-foreground leading-snug mb-2.5 group-hover:text-primary transition-colors line-clamp-3">
                                  {a.title}
                                </h4>
                                <div className="w-10 h-px bg-border mb-2.5" />
                                <p className="text-[12px] text-muted-foreground leading-relaxed line-clamp-6 flex-1">
                                  {a.excerpt}
                                </p>
                                <div className="mt-3 flex items-center gap-1 text-[12px] font-medium text-primary">
                                  Leggi
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </div>
                              </article>
                            </Link>
                          ))}
                      </div>
                    )}
                    <ArticlesList
                      loading={loading}
                      articles={themedArticles}
                      emptyText={
                        manualArticles.filter((a) => a.category === activeTheme).length > 0
                          ? ""
                          : t("stellapolare.noArticles")
                      }
                      fallbackTitle={t("stellapolare.article")}
                    />
                  </>
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

                {/* Manual featured monthly articles with cover-card style */}
                {monthlyManualArticles.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {monthlyManualArticles.map((a) => (
                      <Link
                        key={a.slug}
                        to={a.href}
                        className="group block"
                      >
                        <article className="bg-card border border-border rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">
                          <div className="relative w-full aspect-[4/5] overflow-hidden bg-muted">
                            <img
                              src={a.cover}
                              alt={a.title}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${a.accent}`} />
                          </div>
                          <div className="p-5 flex flex-col flex-1">
                            <p className="text-[10px] uppercase tracking-widest text-primary font-semibold mb-2">
                              {a.eyebrow}
                            </p>
                            <h4 className="text-lg font-bold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-3">
                              {a.title}
                            </h4>
                            <div className="w-10 h-px bg-border mb-2.5" />
                            <p className="text-[12px] text-muted-foreground leading-relaxed line-clamp-5 flex-1">
                              {a.excerpt}
                            </p>
                            <div className="mt-4 flex items-center justify-between">
                              <span className="text-[11px] text-muted-foreground italic">
                                — {a.author}
                              </span>
                              <span className="flex items-center gap-1 text-[12px] font-medium text-primary">
                                Leggi
                                <ExternalLink className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                )}

                <ArticlesList
                  loading={loading}
                  articles={monthlyArticles}
                  emptyText=""
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
