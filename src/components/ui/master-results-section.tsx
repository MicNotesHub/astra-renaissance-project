import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import fundingCover from "@/assets/guide-covers/funding.jpg";
import residenzeCover from "@/assets/guide-covers/residenze.jpg";

const exchangeCards = [
  {
    title: 'Funding',
    description: 'Guida alle agevolazioni economiche',
    cover: fundingCover,
    it: 'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/guide/funding/Guida%20Agevolazioni.pdf',
    en: 'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/guide/funding/Funding%20Guide.pdf',
  },
  {
    title: 'Residenze',
    description: 'Guida alle residenze universitarie',
    cover: residenzeCover,
    it: 'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/guide/residenze/Guida%20Residenze_compressed.pdf',
    en: 'https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/guide/residenze/Residences%20Guide%20(1).pdf',
  },
];

export const MasterResultsSection = () => {
  return (
    <>
      {/* Exchange Section */}
      <section className="py-10 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Exchange
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tutto quello che devi sapere sull'Exchange Program.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl w-full">
              {exchangeCards.map((card) => (
                <Card key={card.title} className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.03] overflow-hidden border-0 p-0">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={card.cover}
                      alt={card.title}
                      className="w-full h-full object-cover object-bottom group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                      <h3 className="text-2xl font-bold text-white drop-shadow-lg mb-1 text-center">
                        {card.title}
                      </h3>
                      <p className="text-sm text-white/80 text-center mb-4 px-2">
                        {card.description}
                      </p>
                      <div className="flex items-center gap-4">
                        {card.it && (
                          <a
                            href={card.it}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/60 hover:border-white hover:scale-110 transition-all duration-200 shadow-lg"
                            title="Italiano"
                          >
                            <img src="https://flagcdn.com/w80/it.png" alt="Italiano" className="w-full h-full object-cover" />
                          </a>
                        )}
                        {card.en && (
                          <a
                            href={card.en}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/60 hover:border-white hover:scale-110 transition-all duration-200 shadow-lg"
                            title="English"
                          >
                            <img src="https://flagcdn.com/w80/gb.png" alt="English" className="w-full h-full object-cover" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Master Admission Results Section */}
      <section className="py-10 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Master Admission Results
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Scopri il recap delle ammissioni ai Master: GPA, CFU e scelta del corso.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <Button
              onClick={() => window.open("https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/Masters%20Admission%202026.xlsx", "_blank")}
              size="lg"
              className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FileSpreadsheet className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Masters Admissions Early Session 2026</span>
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};
