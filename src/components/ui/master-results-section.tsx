import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
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
    <section className="py-10 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-8">
          <Button asChild size="lg" className="rounded-full shadow-md">
            <a href="/downloads/Masters-Admission-2026.xlsx" download>
              <Download className="mr-2 h-5 w-5" />
              Master's Admission Results
            </a>
          </Button>
        </div>
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
  );
};
