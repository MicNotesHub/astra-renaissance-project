import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, MessageCircle, Zap, Brain, Users } from "lucide-react";
import { motion } from "framer-motion";

export function AstraGPTSection() {
  const features = [
    {
      icon: MessageCircle,
      title: "Chat Intelligente",
      description: "Risposte immediate alle tue domande su procedure, scadenze e servizi universitari"
    },
    {
      icon: Brain,
      title: "Conoscenza Integrata",
      description: "Accesso istantaneo a dispense, guide e informazioni sui rappresentanti"
    },
    {
      icon: Users,
      title: "Connessione Diretta",
      description: "Ti mette in contatto con il rappresentante giusto per ogni esigenza specifica"
    },
    {
      icon: Zap,
      title: "Sempre Disponibile",
      description: "24/7 a tua disposizione, anche quando gli uffici sono chiusi"
    }
  ];

  return (
    <section id="astra-gpt" className="py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full animate-float blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full animate-float blur-2xl" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Bot className="h-5 w-5 text-primary" />
            <span className="text-primary font-semibold">Powered by AI</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Astra <span className="text-primary">GPT</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Il tuo assistente virtuale intelligente per navigare la vita universitaria Bocconi. 
            Sempre disponibile, sempre aggiornato.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left side - Features */}
          <div className="space-y-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex gap-4 group"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right side - Demo Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="glass-card premium-shadow hover:shadow-glow transition-all duration-500 overflow-hidden">
              <CardContent className="p-8">
                <div className="space-y-4">
                  {/* Chat Example */}
                  <div className="space-y-3">
                    <div className="flex justify-end">
                      <div className="bg-primary text-white px-4 py-2 rounded-2xl rounded-br-md max-w-xs">
                        Come posso trovare le dispense di Matematica?
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-muted px-4 py-2 rounded-2xl rounded-bl-md max-w-xs">
                        Perfetto! Puoi trovarle nella sezione Dispense. Abbiamo tutto il materiale di Matematica Generale e Analisi I. Vuoi che ti mostri i link diretti? 📚
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <div className="bg-primary text-white px-4 py-2 rounded-2xl rounded-br-md max-w-xs">
                        Sì, grazie! E chi posso contattare per dubbi specifici?
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-muted px-4 py-2 rounded-2xl rounded-bl-md max-w-xs">
                        Per questioni didattiche contatta Alessandro Martini! È il nostro Responsabile Didattica del Senato Accademico 👨‍🎓
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      Astra GPT è online e pronto ad aiutarti
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="glass-card premium-shadow max-w-4xl mx-auto">
            <CardContent className="p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Prova Astra GPT ora!
              </h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Clicca sull'icona del chat in basso a destra per iniziare una conversazione. 
                Astra GPT è qui per semplificare la tua esperienza universitaria.
              </p>
              <Button 
                size="lg" 
                className="group"
                onClick={() => {
                  // Scroll to bottom right to highlight the chat button
                  const chatButton = document.querySelector('[data-chat-trigger]');
                  if (chatButton) {
                    (chatButton as HTMLElement).style.animation = 'pulse 1s ease-in-out 3';
                  }
                }}
              >
                <MessageCircle className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Inizia a chattare
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}