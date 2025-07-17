import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Lightbulb, Globe, GraduationCap, Heart } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: BookOpen,
    title: "Dispense e Materiali",
    description: "Accesso facilitato a dispense, appunti e materiali di studio per tutti i corsi"
  },
  {
    icon: Globe,
    title: "Exchange Program",
    description: "Supporto completo per programmi di scambio internazionale e opportunità all'estero"
  },
  {
    icon: Users,
    title: "Rappresentanza Attiva",
    description: "La tua voce negli organi universitari per migliorare l'esperienza di tutti"
  },
  {
    icon: Lightbulb,
    title: "Innovazione Didattica",
    description: "Promuoviamo nuovi metodi di apprendimento e tecnologie per la formazione"
  },
  {
    icon: GraduationCap,
    title: "Orientamento Carriera",
    description: "Guide e supporto per costruire il tuo percorso professionale"
  },
  {
    icon: Heart,
    title: "Benessere Studenti",
    description: "Iniziative per il benessere psicofisico e l'equilibrio studio-vita"
  }
];

export function WhatWeDoSection() {
  return (
    <section id="cosa-facciamo" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Cosa Facciamo
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            La nostra visione della rappresentanza si sviluppa attraverso tre aspetti fondamentali
            dell'esperienza universitaria
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
                Un approccio a 360° per la tua esperienza universitaria
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Non ci limitiamo alla rappresentanza tradizionale. Creiamo un ecosistema di supporto 
                che accompagna ogni studente dal primo giorno fino alla laurea, 
                costruendo una community forte e collaborativa.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}