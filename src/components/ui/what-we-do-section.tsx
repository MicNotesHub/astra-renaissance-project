import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Lightbulb, Globe, GraduationCap, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function WhatWeDoSection() {
  const { t } = useLanguage();

  const services = [
    {
      icon: BookOpen,
      title: t('whatwedo.handouts.title'),
      description: t('whatwedo.handouts.description')
    },
    {
      icon: Globe,
      title: t('whatwedo.exchange.title'),
      description: t('whatwedo.exchange.description')
    },
    {
      icon: Users,
      title: t('whatwedo.representation.title'),
      description: t('whatwedo.representation.description')
    },
    {
      icon: Lightbulb,
      title: t('whatwedo.innovation.title'),
      description: t('whatwedo.innovation.description')
    },
    {
      icon: GraduationCap,
      title: t('whatwedo.career.title'),
      description: t('whatwedo.career.description')
    },
    {
      icon: Heart,
      title: t('whatwedo.wellbeing.title'),
      description: t('whatwedo.wellbeing.description')
    }
  ];

  return (
    <section id="cosa-facciamo" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            {t('whatwedo.title')}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('whatwedo.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.title} 
              className="group hover:shadow-premium transition-spring hover:-translate-y-2 border-border hover:border-primary/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary group-hover:text-white transition-spring mb-6">
                  <service.icon className="h-8 w-8 text-primary group-hover:text-white transition-smooth" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-smooth">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Card className="glass-card premium-shadow max-w-4xl mx-auto">
            <CardContent className="p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                {t('whatwedo.approach.title')}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('whatwedo.approach.description')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}