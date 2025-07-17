import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, MessageCircle, Heart } from "lucide-react";

export function ValuesSection() {
  return (
    <section id="valori" className="py-32 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            I Nostri Valori
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I principi che guidano ogni nostra azione e decisione
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {[
            {
              icon: Lightbulb,
              title: "Ambizione",
              description: "Non è arrivismo, ma volontà di spingersi oltre. Guardare avanti, cercare soluzioni migliori e non fermarsi mai.",
              gradient: "from-yellow-400 to-orange-500",
              delay: "0s"
            },
            {
              icon: MessageCircle,
              title: "Comunicazione", 
              description: "Le idee valgono solo se vengono ascoltate. Il dialogo tra studenti e Università è la chiave per costruire un vero cambiamento.",
              gradient: "from-blue-400 to-purple-500",
              delay: "0.3s"
            },
            {
              icon: Heart,
              title: "Dedizione",
              description: "Nulla si ottiene senza costanza e impegno. Solo chi si mette in gioco ogni giorno può lasciare il segno.",
              gradient: "from-pink-400 to-red-500",
              delay: "0.6s"
            }
          ].map((value, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-0 hover:shadow-2xl transition-all duration-700 animate-fade-in-up hover:-translate-y-4"
              style={{ animationDelay: value.delay }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <CardContent className="p-8 relative z-10">
                <div className="mb-6 relative">
                  <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${value.gradient} rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    <value.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute inset-0 w-20 h-20 mx-auto animate-ping opacity-20">
                    <div className={`w-full h-full bg-gradient-to-br ${value.gradient} rounded-3xl`}></div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-6 group-hover:text-primary transition-colors duration-300">
                  {value.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed text-lg group-hover:text-foreground/80 transition-colors duration-300">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}