import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function AstraGPTSection() {
  const { t } = useLanguage();

  return <section id="astra-gpt" className="py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-30 text-blue-600">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full animate-float blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-400/20 rounded-full animate-float blur-2xl" style={{
        animationDelay: "2s"
      }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Bot className="h-5 w-5 text-primary" />
            <span className="text-primary font-semibold">{t('astragpt.powered')}</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold hero-text mb-6">
            {t('astragpt.title')}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {t('astragpt.subtitle')}
          </p>
        </div>

        {/* Minimal content */}
        <div className="text-center mb-12">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('astragpt.description')}
          </p>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="glass-card premium-shadow max-w-4xl mx-auto">
            <CardContent className="p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold hero-text mb-6">
                {t('astragpt.try')}
              </h3>
              
              <Button size="lg" className="group" onClick={() => {
                window.open('https://chatgpt.com/g/g-68a3286941e081a4973c7111bad27752-astragpt-2-0', '_blank');
              }}>
                <MessageCircle className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                {t('astragpt.open')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
}