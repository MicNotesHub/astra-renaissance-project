import { Card, CardContent } from "@/components/ui/card";
import { Star, Target, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-32 bg-gradient-subtle relative overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-primary/20 rounded-full animate-float blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/6 w-48 h-48 bg-primary/30 rounded-full animate-float blur-2xl" style={{ animationDelay: "3s" }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            {t('about.title')}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Users,
              title: t('about.innovation.title'),
              description: t('about.innovation.description'),
              delay: "0s"
            },
            {
              icon: Star,
              title: t('about.community.title'),
              description: t('about.community.description'),
              delay: "0.2s"
            },
            {
              icon: Target,
              title: t('about.future.title'),
              description: t('about.future.description'),
              delay: "0.4s"
            }
          ].map((item, index) => (
            <Card 
              key={index} 
              className="glass-card premium-shadow hover:shadow-glow transition-all duration-500 group animate-fade-in-up hover:-translate-y-2"
              style={{ animationDelay: item.delay }}
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6 relative">
                  <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute inset-0 w-16 h-16 mx-auto bg-gradient-primary rounded-2xl opacity-20 animate-pulse group-hover:opacity-40 transition-opacity"></div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}