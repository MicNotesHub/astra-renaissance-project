import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, GraduationCap } from "lucide-react";
import { CalculatorModal } from "../calculators/calculator-modal";

export const CalcolatoriSection = () => {
  const [selectedCalculator, setSelectedCalculator] = useState<string | null>(null);
  const calcolatori = [
    {
      id: "graduation",
      title: "GPA & Graduation Score",
      description: "Calcola il tuo voto di laurea previsto basato sui tuoi esami",
      icon: GraduationCap,
      color: "text-indigo-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
      features: ["Voto di laurea su 110", "GPA su 30", "Bonus configurabili"]
    },
    {
      id: "exchange-calculator",
      title: "Exchange Calculator MSc",
      description: "Calcola il tuo Exchange Score e scopri le destinazioni disponibili",
      icon: Calculator,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
      features: ["Calcolo Exchange Score", "Destinazioni per continente", "Acceptance Rate"]
    }
  ];

  return (
    <section id="calcolatori" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 hero-text flex items-center justify-center gap-3">
            <Calculator className="h-12 w-12 text-primary" />
            Calcolatori Smart
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tool intelligenti per ottimizzare il tuo percorso universitario. Pianifica, calcola e raggiungi i tuoi obiettivi accademici.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calcolatori.map((calc, index) => {
            const IconComponent = calc.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
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
                      <p className="text-sm font-medium text-muted-foreground">Funzionalità:</p>
                      <ul className="space-y-1">
                        {calc.features.map((feature, fIndex) => (
                          <li key={fIndex} className="text-sm flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      className="w-full group-hover:bg-primary-light transition-colors"
                      onClick={() => setSelectedCalculator(calc.id)}
                    >
                      Usa Calcolatore
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Card className="glass-card premium-shadow max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Hai un'idea per un nuovo calcolatore?</h3>
              <p className="text-muted-foreground mb-6">
                Suggerisci nuovi tool che potrebbero aiutare la community studentesca!
              </p>
              <Button variant="outline" size="lg">
                Proponi un Calcolatore
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <CalculatorModal 
        isOpen={selectedCalculator !== null}
        onClose={() => setSelectedCalculator(null)}
        calculatorType={selectedCalculator || ''}
      />
    </section>
  );
};