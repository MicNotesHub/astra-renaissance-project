import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WomensDaySection() {
  return (
    <section className="relative py-16 overflow-hidden bg-background">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-muted-foreground">
            8 Marzo 2026 — Giornata Internazionale della Donna
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Il Ruolo della Donna
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Leggi l'articolo completo per scoprire riflessioni, storie e prospettive sul contributo fondamentale delle donne nel mondo di oggi.
          </p>
          <a href="/files/IL_RUOLO_DELLA_DONNA_2.docx" download>
            <Button size="lg" className="gap-3 mt-4">
              <FileText className="w-5 h-5" />
              Leggi l'Articolo
              <Download className="w-4 h-4" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
