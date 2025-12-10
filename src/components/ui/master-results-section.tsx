import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, Download, ArrowRight } from "lucide-react";

export const MasterResultsSection = () => {
  const handleDownload = () => {
    window.open(
      "https://jsuzhbspinevkzmhibop.supabase.co/storage/v1/object/public/guides/Masters%20Admission%202026.xlsx",
      "_blank"
    );
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Master Results
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
            onClick={handleDownload}
            size="lg"
            className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
            <FileSpreadsheet className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
            <span>Masters Admissions Early Session 2026</span>
            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
