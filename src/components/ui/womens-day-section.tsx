import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import womensDayHero from "@/assets/womens-day-hero.jpg";

export function WomensDaySection() {
  return (
    <section className="relative py-20 overflow-hidden bg-background">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-purple-600 mb-3">
            8 Marzo 2026
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Giornata Internazionale della Donna
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 items-center"
        >
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={womensDayHero}
              alt="Giornata Internazionale della Donna"
              className="w-full h-72 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              Il Ruolo della Donna
            </h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Un articolo della nostra divisione Press dedicato al ruolo della donna nella società contemporanea, 
              in occasione della Giornata Internazionale della Donna.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Leggi l'articolo completo scritto dai nostri ragazzi per scoprire riflessioni, 
              storie e prospettive sul contributo fondamentale delle donne nel mondo di oggi.
            </p>
            <a
              href="/files/IL_RUOLO_DELLA_DONNA_2.docx"
              download
            >
              <Button
                size="lg"
                className="gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 mt-2"
              >
                <FileText className="w-5 h-5" />
                Leggi l'Articolo
                <Download className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
