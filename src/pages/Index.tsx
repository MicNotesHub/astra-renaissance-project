import { Navigation } from "@/components/ui/navigation";
import { HeroSection } from "@/components/ui/hero-section";
import { DispensenSection } from "@/components/ui/dispensen-section";
import { MasterResultsSection } from "@/components/ui/master-results-section";
import { CalcolatoriSection } from "@/components/ui/calcolatori-section";
import { FreeAtBSection } from "@/components/ui/freeatb-section";
import { EventiSection } from "@/components/ui/eventi-section";
import { Footer } from "@/components/ui/footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      
      <MasterResultsSection />
      <DispensenSection />
      <CalcolatoriSection />
      <FreeAtBSection />
      <EventiSection />
      <Footer />
    </div>
  );
};

export default Index;
