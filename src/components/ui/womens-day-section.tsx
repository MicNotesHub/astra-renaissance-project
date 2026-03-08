import { motion } from "framer-motion";
import { FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function WomensDaySection() {
  const { t } = useLanguage();
  return (
    <section className="relative py-16 overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(45 80% 96%), hsl(48 90% 90%), hsl(45 80% 96%))" }}>
      {/* Mimosa decorative dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Left mimosa cluster */}
        <div className="absolute top-6 left-8 flex flex-col gap-2 opacity-40">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
          </div>
          <div className="flex gap-1.5 ml-1">
            <div className="w-2 h-2 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-300" />
            <div className="w-2 h-2 rounded-full bg-yellow-400" />
          </div>
          <div className="flex gap-2 ml-2">
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
            <div className="w-2 h-2 rounded-full bg-yellow-400" />
          </div>
        </div>

        {/* Right mimosa cluster */}
        <div className="absolute bottom-8 right-10 flex flex-col gap-2 opacity-40">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-300" />
          </div>
          <div className="flex gap-2 ml-2">
            <div className="w-2 h-2 rounded-full bg-yellow-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-300" />
          </div>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-2 h-2 rounded-full bg-yellow-300" />
          </div>
        </div>

        {/* Scattered small dots */}
        <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-yellow-300 opacity-30" />
        <div className="absolute top-1/2 left-1/5 w-2.5 h-2.5 rounded-full bg-yellow-400 opacity-25" />
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-yellow-300 opacity-30" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <span className="inline-block text-sm font-semibold tracking-widest uppercase" style={{ color: "hsl(45 70% 40%)" }}>
            {t('womensDay.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t('womensDay.title')}
          </h2>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "hsl(30 20% 35%)" }}>
            {t('womensDay.description')}
          </p>
          <a href="/files/Astra_women_s_day.pdf" target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="gap-3 mt-4 border-0 text-white"
              style={{ background: "linear-gradient(135deg, hsl(45 80% 45%), hsl(35 70% 45%))" }}
            >
              <FileText className="w-5 h-5" />
              {t('womensDay.cta')}
              <ExternalLink className="w-4 h-4" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
