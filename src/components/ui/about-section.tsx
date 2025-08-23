import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function AboutSection() {
  const { t } = useLanguage();
  
  const aboutItems = [
    {
      icon: Lightbulb,
      title: t('about.innovation.title'),
      description: t('about.innovation.description')
    },
    {
      icon: Users,
      title: t('about.community.title'),
      description: t('about.community.description')
    },
    {
      icon: Target,
      title: t('about.future.title'),
      description: t('about.future.description')
    }
  ];
  
  return (
    <section id="about" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            {t('about.title')}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {t('about.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {aboutItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="glass-card premium-shadow h-[300px] flex flex-col hover:shadow-glow transition-all duration-300">
                <CardContent className="flex flex-col items-center text-center h-full justify-center p-8">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-center">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}