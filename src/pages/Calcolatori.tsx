import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, GraduationCap, Users } from "lucide-react";
import { CalculatorModal } from "@/components/calculators/calculator-modal";
import { useLanguage } from "@/contexts/LanguageContext";
import { AstraChatButton } from "@/components/ui/astra-chat-button";
import { SEO } from "@/components/SEO";

const Calcolatori = () => {
  const [selectedCalculator, setSelectedCalculator] = useState<string | null>(null);
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const gpaFeatures = [t('calculators.feat.gpa.1'), t('calculators.feat.gpa.2'), t('calculators.feat.gpa.3')];
  const exchangeFeatures = [t('calculators.feat.exchange.1'), t('calculators.feat.exchange.2'), t('calculators.feat.exchange.3')];

  const calcolatori = [{
    id: "graduation",
    title: t('calculators.gpa.title'),
    description: t('calculators.gpa.description'),
    icon: GraduationCap,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
    features: gpaFeatures,
    externalLink: null
  }, {
    id: "graduation-msc",
    title: t('calculators.gpa-msc.title'),
    description: t('calculators.gpa-msc.description'),
    icon: GraduationCap,
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
    features: gpaFeatures,
    externalLink: null
  }, {
    id: "graduation-law",
    title: "GPA & Graduation Score (CLMG / Giurisprudenza)",
    description: "Integrated Master of Arts in Law (5 years, 300 CFU). GPA, base score and final graduation grade.",
    icon: GraduationCap,
    color: "text-rose-500",
    bgColor: "bg-rose-50 dark:bg-rose-950/30",
    features: gpaFeatures,
    externalLink: null
  }, {
    id: "exchange-calculator-ug",
    title: t('calculators.exchange-ug.title'),
    description: t('calculators.exchange-ug.description'),
    icon: Users,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    features: exchangeFeatures,
    externalLink: "/files/EXCHANGE_CALCULATOR_UNDERGRAD.xlsm"
  }, {
    id: "exchange-calculator",
    title: t('calculators.exchange-msc.title'),
    description: t('calculators.exchange-msc.description'),
    icon: Calculator,
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
    features: exchangeFeatures,
    externalLink: null
  }, {
    id: "exchange-calculator-clmg",
    title: t('calculators.exchange-clmg.title'),
    description: t('calculators.exchange-clmg.description'),
    icon: TrendingUp,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
    features: exchangeFeatures,
    externalLink: null
  }];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Calcolatori | ASTRA Bocconi"
        description="Calcolatori accademici Bocconi: GPA, voto di laurea triennale e magistrale, exchange e piano di studi."
        path="/calcolatori"
      />
      <Navigation />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground flex items-center justify-center gap-3">
              <Calculator className="h-12 w-12 text-primary" />
              {t('calculators.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('calculators.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {calcolatori.map((calc, index) => {
              const IconComponent = calc.icon;
              return (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full group transition-all duration-300 bg-[hsl(230,60%,96%)] dark:bg-[hsl(230,30%,15%)] border border-[hsl(230,40%,88%)] dark:border-[hsl(230,30%,25%)] rounded-2xl shadow-sm hover:shadow-[0_8px_30px_-4px_hsl(230,80%,70%,0.35)] hover:-translate-y-1 hover:border-[hsl(230,70%,75%)]">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg ${calc.bgColor} flex items-center justify-center mb-4`}>
                        <IconComponent className={`h-6 w-6 ${calc.color}`} />
                      </div>
                      <CardTitle className="text-[hsl(230,60%,18%)] dark:text-foreground text-2xl font-bold leading-tight">
                        {calc.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-[hsl(230,20%,45%)] dark:text-muted-foreground">
                        {calc.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-[hsl(230,30%,35%)] dark:text-muted-foreground">{t('calculators.features')}</p>
                        <ul className="space-y-1">
                          {calc.features.map((feature, fIndex) => (
                            <li key={fIndex} className="text-sm flex items-center gap-2 text-[hsl(230,30%,25%)] dark:text-foreground">
                              <div className="w-1.5 h-1.5 rounded-full bg-[hsl(230,60%,30%)]"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex gap-2">
                        {calc.externalLink && (
                          <Button 
                            className="flex-1 bg-white hover:bg-white/90 text-[hsl(230,60%,18%)] border border-[hsl(230,40%,88%)] shadow-sm" 
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = calc.externalLink!;
                              link.download = calc.externalLink!.split('/').pop() || '';
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                            }}
                          >
                            Excel Calculator
                          </Button>
                        )}
                        <Button 
                          className={`${calc.externalLink ? 'flex-1' : 'w-full'} bg-[hsl(230,75%,22%)] hover:bg-[hsl(230,75%,28%)] text-white transition-colors`}
                          onClick={() => {
                            if (calc.id === 'exchange-calculator-ug') {
                              navigate('/exchange?type=undergraduate');
                            } else if (calc.id === 'exchange-calculator') {
                              navigate('/exchange?type=graduate');
                            } else if (calc.id === 'exchange-calculator-clmg') {
                              navigate('/exchange?type=law');
                            } else {
                              setSelectedCalculator(calc.id);
                            }
                          }}
                        >
                          {t('calculators.use')}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
      <AstraChatButton />
      
      <CalculatorModal 
        isOpen={selectedCalculator !== null} 
        onClose={() => setSelectedCalculator(null)} 
        calculatorType={selectedCalculator || ''} 
      />
    </div>
  );
};

export default Calcolatori;
