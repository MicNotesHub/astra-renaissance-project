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
import { PrimoAnno } from "./pages/PrimoAnno";
import { SecondoAnno } from "./pages/SecondoAnno";
import { TerzoAnno } from "./pages/TerzoAnno";
import CourseHandouts from "./pages/CourseHandouts";
import Guide from "./pages/Guide";
import GuideCategory from "./pages/GuideCategory";
import CLMGDispense from "./pages/CLMGDispense";
import CLMGYearHandouts from "./pages/CLMGYearHandouts";
import StellaPolare from "./pages/StellaPolare";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Extract PDF content on app load
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
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/chi-siamo" element={<ChiSiamo />} />
              <Route path="/rappresentanti" element={<Rappresentanti />} />
              <Route path="/dispense" element={<Dispense />} />
              <Route path="/dispense/primo-anno" element={<PrimoAnno />} />
              <Route path="/dispense/primo-anno/:courseName" element={<CourseHandouts />} />
              <Route path="/dispense/secondo-anno" element={<SecondoAnno />} />
              <Route path="/dispense/secondo-anno/:courseName" element={<CourseHandouts />} />
              <Route path="/dispense/terzo-anno" element={<TerzoAnno />} />
              <Route path="/dispense/terzo-anno/:courseName" element={<CourseHandouts />} />
              <Route path="/dispense/clmg" element={<CLMGDispense />} />
              <Route path="/dispense/clmg/:year" element={<CLMGYearHandouts />} />
              <Route path="/guide" element={<Guide />} />
              <Route path="/guide/:category" element={<GuideCategory />} />
              <Route path="/stella-polare" element={<StellaPolare />} />
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
