import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const TeamSection = () => {
  const rappresentantiSections = [
    {
      name: "CDD",
      description: "Commissione di Disciplina Didattica - Gestione delle questioni disciplinari e didattiche",
      icon: "⚖️"
    },
    {
      name: "DIPARTIMENTI",
      description: "Rappresentanza nei diversi dipartimenti accademici dell'università",
      icon: "🏛️"
    },
    {
      name: "ISU",
      description: "Istituto per il Sostegno Universitario - Servizi per il diritto allo studio",
      icon: "🎓"
    },
    {
      name: "QUALITÀ",
      description: "Commissione per la Qualità - Monitoraggio e miglioramento della qualità didattica",
      icon: "⭐"
    },
    {
      name: "SCUOLA DI GIURISPRUDENZA",
      description: "Rappresentanza nella Scuola di Giurisprudenza",
      icon: "⚖️"
    },
    {
      name: "SCUOLA MAGISTRALE",
      description: "Rappresentanza nelle scuole magistrali e corsi di laurea magistrale",
      icon: "🎯"
    },
    {
      name: "SCUOLA TRIENNALE",
      description: "Rappresentanza nelle scuole triennali e corsi di laurea triennale",
      icon: "📚"
    },
    {
      name: "SPORT",
      description: "Rappresentanza nelle attività sportive e ricreative universitarie",
      icon: "⚽"
    },
    {
      name: "VALUTAZIONE",
      description: "Commissione di Valutazione - Valutazione delle performance accademiche",
      icon: "📊"
    }
  ];

  return <section id="team" className="py-20 bg-background">
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 hero-text">
            🏛️ I Nostri Rappresentanti
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Scopri le diverse aree di rappresentanza studentesca. I nostri rappresentanti lavorano in vari organi e commissioni per tutelare i tuoi diritti e migliorare la vita universitaria.
          </p>
        </motion.div>

        {/* Sections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {rappresentantiSections.map((section, index) => <motion.div key={index} initial={{
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
        }}>
              <Card className="glass-card premium-shadow hover:shadow-glow transition-all duration-300 group h-full cursor-pointer">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-3">{section.icon}</div>
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                      {section.name}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground text-center">
                      {section.description}
                    </p>

                    <div className="flex justify-center pt-2">
                      <Button size="sm" variant="outline" className="w-full">
                        Scopri di più
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>)}
        </div>

      </div>
    </section>;
};