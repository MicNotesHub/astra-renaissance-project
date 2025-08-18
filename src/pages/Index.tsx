import { Navigation } from "@/components/ui/navigation";
import { HeroSection } from "@/components/ui/hero-section";

import { AboutSection } from "@/components/ui/about-section";
import { DispensenSection } from "@/components/ui/dispensen-section";
import { CalcolatoriSection } from "@/components/ui/calcolatori-section";
import { AstraPolareSection } from "@/components/ui/astra-polare-section";
import { MarketplaceSection } from "@/components/ui/marketplace-section";
import { EventiSection } from "@/components/ui/eventi-section";
import { TeamSection } from "@/components/ui/team-section";
import { AstraGPTSection } from "@/components/ui/astra-gpt-section";
import { AstraChatButton } from "@/components/ui/astra-chat-button";
import { Footer } from "@/components/ui/footer";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <Navigation />
      <HeroSection />
      
      <AboutSection />
      <DispensenSection />
      <CalcolatoriSection />
      <AstraPolareSection />
      <MarketplaceSection />
      <EventiSection />
      <AstraGPTSection />
      <TeamSection />
      <Footer />
      
      {/* Astra GPT Chat Button - Fixed in bottom right corner */}
      <AstraChatButton />
    </div>
  );
};

export default Index;
