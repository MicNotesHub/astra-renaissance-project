import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Target } from "lucide-react";

export function ElectionSection() {
  return (
    <section id="elezioni" className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            EleBocconi2025
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
        </div>

        <Card className="glass-card premium-shadow max-w-5xl mx-auto">
          <CardContent className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-left">
                <div className="flex items-center mb-6">
                  <Calendar className="h-8 w-8 text-primary mr-4" />
                  <span className="text-lg font-semibold text-primary">14 e 15 Aprile</span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Gli studenti di Bocconi avranno l'opportunità di scegliere chi li rappresenterà nei prossimi anni.
                </h3>
                
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  <span className="font-semibold text-primary">ASTRA</span> scende in campo con un'idea chiara: 
                  trasformare le esigenze degli studenti in azioni concrete. Siamo qui per dare spazio alle tue idee, 
                  semplificare la vita universitaria e costruire insieme un'esperienza migliore per tutti.
                </p>
                
                <p className="text-lg text-muted-foreground mb-8">
                  Segna le date e fai la differenza. <span className="font-semibold">Il 14 e 15 aprile, scegli</span>{" "}
                  <span className="font-bold text-primary">ASTRA</span>.
                </p>
                
                <Button size="lg" className="transition-spring">
                  Scopri il nostro programma
                </Button>
              </div>

              <div className="animate-fade-in">
                <div className="relative">
                  <div className="bg-gradient-hero rounded-2xl p-8 text-white">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <Users className="h-12 w-12 mx-auto mb-4 opacity-90" />
                        <h4 className="text-lg font-semibold mb-2">Rappresentanza</h4>
                        <p className="text-sm opacity-90">La tua voce al centro</p>
                      </div>
                      
                      <div className="text-center">
                        <Target className="h-12 w-12 mx-auto mb-4 opacity-90" />
                        <h4 className="text-lg font-semibold mb-2">Obiettivi Concreti</h4>
                        <p className="text-sm opacity-90">Azioni reali per tutti</p>
                      </div>
                    </div>
                    
                    <div className="mt-8 text-center">
                      <div className="text-3xl font-bold mb-2">14-15 Aprile</div>
                      <div className="text-lg opacity-90">Vota ASTRA</div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full animate-float"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary/30 rounded-full animate-float" style={{ animationDelay: "2s" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}