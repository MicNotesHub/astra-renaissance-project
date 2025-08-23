import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, GraduationCap, Users } from "lucide-react";
import { CalculatorModal } from "../calculators/calculator-modal";
import { useLanguage } from "@/contexts/LanguageContext";
export const CalcolatoriSection = () => {
  const [selectedCalculator, setSelectedCalculator] = useState<string | null>(null);
  const { t } = useLanguage();
  
  const calcolatori = [{
    id: "graduation",
    title: t('calculators.gpa.title'),
    description: t('calculators.gpa.description'),
    icon: GraduationCap,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
    features: ["Voto di laurea su 110", "GPA su 30", "Bonus configurabili"]
  }, {
    id: "exchange-calculator",
    title: t('calculators.exchange-msc.title'),
    description: t('calculators.exchange-msc.description'),
    icon: Calculator,
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
    features: ["Calcolo Exchange Score", "Destinazioni per continente", "Acceptance Rate"]
  }, {
    id: "exchange-calculator-clmg",
    title: t('calculators.exchange-clmg.title'),
    description: t('calculators.exchange-clmg.description'),
    icon: TrendingUp,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
    features: ["Calcolo Exchange Score", "Destinazioni per continente", "Acceptance Rate"]
  }, {
    id: "exchange-calculator-ug",
    title: t('calculators.exchange-ug.title'),
    description: t('calculators.exchange-ug.description'),
    icon: Users,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    features: ["Calcolo Exchange Score", "Destinazioni per continente", "Acceptance Rate"]
  }];
  return <section id="calcolatori" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8
      }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 hero-text flex items-center justify-center gap-3">
            <Calculator className="h-12 w-12 text-primary" />
            {t('calculators.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('calculators.subtitle')}
          </p>
        </motion.div>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {calcolatori.map((calc, index) => {
          const IconComponent = calc.icon;
           return <motion.div key={index} initial={{
             opacity: 0,
             y: 30
           }} whileInView={{
             opacity: 1,
             y: 0
           }} viewport={{
             once: true
           }} transition={{
             duration: 0.6,
             delay: index * 0.1
           }} className="flex-shrink-0 w-80">
                 <Card className="glass-card premium-shadow hover:shadow-glow transition-all duration-300 group h-full">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${calc.bgColor} flex items-center justify-center mb-4`}>
                      <IconComponent className={`h-6 w-6 ${calc.color}`} />
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {calc.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {calc.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">{t('calculators.features')}</p>
                      <ul className="space-y-1">
                        {calc.features.map((feature, fIndex) => <li key={fIndex} className="text-sm flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            {feature}
                          </li>)}
                      </ul>
                    </div>
                    
                    <Button className="w-full group-hover:bg-primary-light transition-colors" onClick={() => setSelectedCalculator(calc.id)}>
                      {t('calculators.use')}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>;
        })}
        </div>

        {/* Call to Action */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8,
        delay: 0.4
      }} className="text-center mt-16">
          
        </motion.div>
      </div>

      <CalculatorModal isOpen={selectedCalculator !== null} onClose={() => setSelectedCalculator(null)} calculatorType={selectedCalculator || ''} />
    </section>;
};