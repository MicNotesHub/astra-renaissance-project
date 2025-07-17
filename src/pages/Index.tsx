import { Navigation } from "@/components/ui/navigation";
import { HeroSection } from "@/components/ui/hero-section";
import { ElectionSection } from "@/components/ui/election-section";
import { WhatWeDoSection } from "@/components/ui/what-we-do-section";
import { Footer } from "@/components/ui/footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ElectionSection />
      <WhatWeDoSection />
      <Footer />
    </div>
  );
};

export default Index;
