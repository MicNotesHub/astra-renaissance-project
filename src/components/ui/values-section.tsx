import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, MessageCircle, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function ValuesSection() {
  const { t } = useLanguage();

  return (
    <section id="valori" className="py-32 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            {t('values.title')}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('values.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {[
            {
              icon: Lightbulb,
              title: t('values.ambition.title'),
              description: t('values.ambition.description'),
              gradient: "from-yellow-400 to-orange-500",
              delay: "0s"
            },
            {
              icon: MessageCircle,
              title: t('values.communication.title'), 
              description: t('values.communication.description'),
              gradient: "from-blue-400 to-purple-500",
              delay: "0.3s"
            },
            {
              icon: Heart,
              title: t('values.dedication.title'),
              description: t('values.dedication.description'),
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
                  <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute inset-0 w-16 h-16 mx-auto animate-ping opacity-20">
                    <div className={`w-full h-full bg-gradient-to-br ${value.gradient} rounded-2xl`}></div>
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