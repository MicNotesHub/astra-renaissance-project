import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Sparkles, ExternalLink, MessageSquare } from "lucide-react";

export function AstraGPTSection() {
  return (
    <section id="astragpt" className="py-32 bg-gradient-hero relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-white/5 rounded-full animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-3/4 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: "4s" }}></div>
        <div className="absolute bottom-1/4 left-1/6 w-20 h-20 bg-white/8 rounded-full animate-float" style={{ animationDelay: "3s" }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <div className="animate-fade-in-left">
            <div className="flex items-center mb-8">
              <div className="relative">
                <Bot className="h-12 w-12 text-white mr-4 animate-glow-pulse" />
                <Sparkles className="h-6 w-6 text-yellow-300 absolute -top-2 -right-2 animate-spin" />
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-white">
                ASTRA GPT
              </h2>
            </div>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Prova il nuovo <span className="font-bold text-yellow-300">ASTRA GPT</span>, 
              una risorsa importante per qualsiasi informazione riguardante l'Università Bocconi ed ASTRA!
            </p>
            
            <div className="space-y-4 mb-10">
              {[
                "Informazioni su corsi e programmi",
                "Servizi e supporto studentesco", 
                "Eventi e iniziative ASTRA",
                "Procedure universitarie"
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center text-white/80 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <MessageSquare className="h-5 w-5 mr-3 text-yellow-300" />
                  {feature}
                </div>
              ))}
            </div>
            
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 transition-all duration-300 font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl hover:scale-105 group"
              onClick={() => window.open('https://chatgpt.com/g/g-QAGU04uut-astra-gpt', '_blank')}
            >
              Inizia a chattare
              <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          {/* Right side - Visual */}
          <div className="animate-fade-in-right">
            <Card className="glass-card premium-shadow border-white/20 backdrop-blur-lg overflow-hidden group hover:shadow-glow transition-all duration-500">
              <CardContent className="p-0">
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 p-8">
                  {/* Chat interface mockup */}
                  <div className="space-y-4">
                    <div className="flex items-center mb-6">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center mr-3">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-white font-semibold">ASTRA GPT</span>
                      <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                    
                    {/* Mock chat messages */}
                    <div className="space-y-3">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white/90 text-sm animate-fade-in" style={{ animationDelay: "0.5s" }}>
                        Ciao! Come posso aiutarti con le informazioni su Bocconi?
                      </div>
                      <div className="bg-primary/20 backdrop-blur-sm rounded-lg p-3 text-white/90 text-sm ml-8 animate-fade-in" style={{ animationDelay: "1s" }}>
                        Quali sono gli orari della biblioteca?
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white/90 text-sm animate-fade-in" style={{ animationDelay: "1.5s" }}>
                        La biblioteca è aperta dal lunedì al venerdì dalle 8:00 alle 24:00...
                      </div>
                    </div>
                    
                    {/* Typing indicator */}
                    <div className="flex items-center text-white/60 animate-pulse">
                      <div className="flex space-x-1 mr-2">
                        <div className="w-1 h-1 bg-white/60 rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-1 h-1 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                      ASTRA GPT sta scrivendo...
                    </div>
                  </div>
                  
                  {/* Floating sparkles */}
                  <div className="absolute top-4 right-4">
                    <Sparkles className="h-4 w-4 text-yellow-300 animate-spin" />
                  </div>
                  <div className="absolute bottom-6 left-6">
                    <Sparkles className="h-3 w-3 text-blue-300 animate-pulse" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}