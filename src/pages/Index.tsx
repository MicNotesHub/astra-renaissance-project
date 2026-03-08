import { Navigation } from "@/components/ui/navigation";
import { HeroSection } from "@/components/ui/hero-section";
import { WomensDaySection } from "@/components/ui/womens-day-section";
import { DispensenSection } from "@/components/ui/dispensen-section";
import { MasterResultsSection } from "@/components/ui/master-results-section";
import { MarketplaceSection } from "@/components/ui/marketplace-section";
import { EventiSection } from "@/components/ui/eventi-section";
import { AstraGPTSection } from "@/components/ui/astra-gpt-section";
import { AstraChatButton } from "@/components/ui/astra-chat-button";
import { Footer } from "@/components/ui/footer";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <Navigation />
      <HeroSection />
      <WomensDaySection />
      
      <MasterResultsSection />
      <DispensenSection />
      <MarketplaceSection />
      <EventiSection />
      <AstraGPTSection />
      <Footer />
      
      {/* Astra GPT Chat Button - Fixed in bottom right corner */}
      <AstraChatButton />
    </div>
  );
};

export default Index;
