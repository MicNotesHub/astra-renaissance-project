import { Navigation } from "@/components/ui/navigation";
import { AboutSection } from "@/components/ui/about-section";
import { ValuesSection } from "@/components/ui/values-section";
import { WhatWeDoSection } from "@/components/ui/what-we-do-section";
import { Footer } from "@/components/ui/footer";
import { SEO } from "@/components/SEO";

const ChiSiamo = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Chi Siamo | ASTRA Bocconi"
        description="Storia, missione, valori e attività di ASTRA, l'associazione di rappresentanza degli studenti dell'Università Bocconi."
        path="/chi-siamo"
      />
      <Navigation />
      
      
      <AboutSection />
      <ValuesSection />
      <WhatWeDoSection />
      
      <Footer />
    </div>
  );
};

export default ChiSiamo;