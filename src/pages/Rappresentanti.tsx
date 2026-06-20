import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { SEO } from "@/components/SEO";

const posters = [
  { src: "/representatives/cdd.png", label: "Faculty Council — Collegio dei Docenti" },
  { src: "/representatives/dipartimenti.png", label: "Department Councils — Consigli di Dipartimento" },
  { src: "/representatives/triennale.png", label: "Undergraduate School — Consiglio di Scuola Triennale" },
  { src: "/representatives/magistrale.png", label: "Graduate School — Consiglio di Scuola Magistrale" },
  { src: "/representatives/giurisprudenza.png", label: "Law School — Consiglio di Scuola di Giurisprudenza" },
  { src: "/representatives/isu.png", label: "ISU Steering Committee — Consiglio Direttivo ISU" },
  { src: "/representatives/qualita.png", label: "Quality Committee — Presidio di Qualità" },
  { src: "/representatives/valutazione.png", label: "Evaluation Unit — Nucleo di Valutazione" },
  { src: "/representatives/sport.png", label: "Sport University Committee — Comitato Sportivo Universitario" },
  { src: "/representatives/cnsu.png", label: "CNSU — Consiglio Nazionale degli Studenti Universitari" },
];

const Rappresentanti = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Rappresentanti | ASTRA Bocconi"
        description="Tutti i rappresentanti studenteschi ASTRA negli organi accademici dell'Università Bocconi."
        path="/rappresentanti"
      />
      <Navigation />

      <main className="pt-16">
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 hero-text">
                {t('representatives.title')}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('representatives.subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {posters.map((p, i) => (
                <motion.div
                  key={p.src}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow bg-card"
                >
                  <img
                    src={p.src}
                    alt={p.label}
                    loading="lazy"
                    className="w-full h-auto block"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Rappresentanti;
