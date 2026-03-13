import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Zap, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import freeatbLogo from "@/assets/freeatb-logo.png";

export const FreeAtBSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: MapPin,
      title: t('freeatb.feature1.title'),
      description: t('freeatb.feature1.description'),
    },
    {
      icon: Search,
      title: t('freeatb.feature2.title'),
      description: t('freeatb.feature2.description'),
    },
    {
      icon: Zap,
      title: t('freeatb.feature3.title'),
      description: t('freeatb.feature3.description'),
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <img src={freeatbLogo} alt="Free@B" className="h-14 w-auto" />
            <h2 className="text-4xl md:text-5xl font-bold hero-text">
              Free@B
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('freeatb.subtitle')}
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-glow transition-all duration-300 rounded-2xl border-none bg-accent"
              >
                <div className="w-14 h-14 bg-primary/15 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <IconComponent className="h-6 w-6 text-primary-light" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="overflow-hidden border-none">
            <div className="p-8 md:p-12 text-primary-foreground text-center bg-gradient-hero">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  {t('freeatb.cta.title')}
                </h3>
                <p className="text-lg opacity-90 mb-8">
                  {t('freeatb.cta.description')}
                </p>
                <Button
                  size="lg"
                  className="bg-background text-primary hover:bg-background/90 flex items-center gap-2 mx-auto px-8 py-6 text-xl rounded-3xl"
                  onClick={() => window.open('https://freeatb.it', '_blank')}
                >
                  {t('freeatb.cta.button')}
                  <ExternalLink className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};