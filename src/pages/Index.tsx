import { Navigation } from "@/components/ui/navigation";
import { HeroSection } from "@/components/ui/hero-section";
import { AboutSection } from "@/components/ui/about-section";
import { ValuesSection } from "@/components/ui/values-section";
import { AstraGPTSection } from "@/components/ui/astra-gpt-section";
import { WhatWeDoSection } from "@/components/ui/what-we-do-section";
import { Footer } from "@/components/ui/footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ValuesSection />
      <AstraGPTSection />
      <WhatWeDoSection />
      <Footer />
    </div>
  );
};

export default Index;
