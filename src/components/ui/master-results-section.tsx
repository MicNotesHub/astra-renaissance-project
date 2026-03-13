import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, FileSpreadsheet, ArrowRight } from "lucide-react";

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
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => window.open("https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/guide/exchange%20triennale/University_Brochure%20.pdf", "_blank")}
                size="lg"
                className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FileText className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                <span>Undergrad Brochure</span>
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button
                onClick={() => window.open("https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/guide/exchange%20triennale/ASTRA-Exchange-Guide-UG-ENG-26-27.pdf", "_blank")}
                size="lg"
                className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FileText className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                <span>Undergrad Guide</span>
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
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
