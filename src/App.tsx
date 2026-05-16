import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useEffect } from "react";
import { extractPdfContent } from "@/utils/extract-pdf-content";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dispense from "./pages/Dispense";
import ChiSiamo from "./pages/ChiSiamo";
import Rappresentanti from "./pages/Rappresentanti";
import CourseYears from "./pages/CourseYears";
import CourseHandouts from "./pages/CourseHandouts";
import Guide from "./pages/Guide";
import GuideCategory from "./pages/GuideCategory";
import CLMGDispense from "./pages/CLMGDispense";
import CLMGYearHandouts from "./pages/CLMGYearHandouts";
import MagistraliHandouts from "./pages/MagistraliHandouts";
import StellaPolare from "./pages/StellaPolare";
import StellaPolareArticleAprilCulture from "./pages/StellaPolareArticleAprilCulture";
import StellaPolareArticleReferendumGiustizia from "./pages/StellaPolareArticleReferendumGiustizia";
import StellaPolareArticleAgroalimentare from "./pages/StellaPolareArticleAgroalimentare";
import StellaPolareArticleNoBorders from "./pages/StellaPolareArticleNoBorders";
import StellaPolareArticleGasolineGeopolitics from "./pages/StellaPolareArticleGasolineGeopolitics";
import StellaPolareArticleItalianFootballCrisis from "./pages/StellaPolareArticleItalianFootballCrisis";
import StellaPolareArticleAstraNewsInfluencers from "./pages/StellaPolareArticleAstraNewsInfluencers";
import StellaPolareArticleLiberationDay from "./pages/StellaPolareArticleLiberationDay";
import StellaPolareArticleLabourDay from "./pages/StellaPolareArticleLabourDay";
import StellaPolareArticleSaluteMentale from "./pages/StellaPolareArticleSaluteMentale";
import Calcolatori from "./pages/Calcolatori";
import ExchangeEmbed from "./pages/ExchangeEmbed";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    extractPdfContent().catch(error => {
      console.error('PDF extraction failed:', error);
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/chi-siamo" element={<ChiSiamo />} />
              <Route path="/rappresentanti" element={<Rappresentanti />} />
              <Route path="/calcolatori" element={<Calcolatori />} />
              <Route path="/exchange" element={<ExchangeEmbed />} />
              <Route path="/dispense" element={<Dispense />} />
              <Route path="/dispense/magistrali" element={<MagistraliHandouts />} />
              <Route path="/dispense/clmg" element={<CLMGDispense />} />
              <Route path="/dispense/clmg/:year" element={<CLMGYearHandouts />} />
              <Route path="/dispense/:courseName" element={<CourseYears />} />
              <Route path="/dispense/:courseName/:year" element={<CourseHandouts />} />
              <Route path="/guide" element={<Guide />} />
              <Route path="/guide/:category" element={<GuideCategory />} />
              <Route path="/stella-polare" element={<StellaPolare />} />
              <Route path="/stella-polare/april-cultural-overload" element={<StellaPolareArticleAprilCulture />} />
              <Route path="/stella-polare/referendum-giustizia-2026" element={<StellaPolareArticleReferendumGiustizia />} />
              <Route path="/stella-polare/impresa-governance-agroalimentare" element={<StellaPolareArticleAgroalimentare />} />
              <Route path="/stella-polare/no-borders-just-stories" element={<StellaPolareArticleNoBorders />} />
              <Route path="/stella-polare/gasoline-and-geopolitics" element={<StellaPolareArticleGasolineGeopolitics />} />
              <Route path="/stella-polare/italian-football-crisis" element={<StellaPolareArticleItalianFootballCrisis />} />
              <Route path="/stella-polare/astra-news-influencers" element={<StellaPolareArticleAstraNewsInfluencers />} />
              <Route path="/stella-polare/liberation-day-april-25" element={<StellaPolareArticleLiberationDay />} />
              <Route path="/stella-polare/labour-day-may-1" element={<StellaPolareArticleLabourDay />} />
              <Route path="/stella-polare/salute-mentale-maggio" element={<StellaPolareArticleSaluteMentale />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
