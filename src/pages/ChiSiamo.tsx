import { Navigation } from "@/components/ui/navigation";
import { AboutSection } from "@/components/ui/about-section";
import { ValuesSection } from "@/components/ui/values-section";
import { WhatWeDoSection } from "@/components/ui/what-we-do-section";
import { Footer } from "@/components/ui/footer";

const ChiSiamo = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <AboutSection />
      <ValuesSection />
      <WhatWeDoSection />
      
      <Footer />
    </div>
  );
};

export default ChiSiamo;