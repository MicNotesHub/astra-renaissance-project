import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dispense from "./pages/Dispense";
import { PrimoAnno } from "./pages/PrimoAnno";
import { SecondoAnno } from "./pages/SecondoAnno";
import { TerzoAnno } from "./pages/TerzoAnno";
import CourseHandouts from "./pages/CourseHandouts";
import Guide from "./pages/Guide";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dispense" element={<Dispense />} />
          <Route path="/dispense/primo-anno" element={<PrimoAnno />} />
          <Route path="/dispense/primo-anno/:courseName" element={<CourseHandouts />} />
          <Route path="/dispense/secondo-anno" element={<SecondoAnno />} />
          <Route path="/dispense/secondo-anno/:courseName" element={<CourseHandouts />} />
          <Route path="/dispense/terzo-anno" element={<TerzoAnno />} />
          <Route path="/dispense/terzo-anno/:courseName" element={<CourseHandouts />} />
          <Route path="/guide" element={<Guide />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
