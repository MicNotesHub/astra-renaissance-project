import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import painting from "@/assets/astra-vangogh.jpg";

/**
 * Alternative hero — Van Gogh painted background with a fixed parallax effect.
 * Mirrors the original hero text (ASTRA logo + subtitle).
 */
export function HeroSectionVanGogh() {
  const { t } = useLanguage();

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${painting})` }}
    >
      {/* Tinted overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(225_70%_10%/0.55)] via-[hsl(225_75%_8%/0.45)] to-[hsl(225_80%_6%/0.75)]" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Astra Logo — floats up and down */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src="/lovable-uploads/79a8e832-7749-4713-905f-e6adaa18938c.png"
                alt="ASTRA Bocconi"
                className="h-20 w-auto filter brightness-0 invert drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
              />
            </motion.div>
          </motion.div>

          {/* Subtitle */}
          <p className="text-xl text-white/95 mb-12 max-w-3xl mx-auto leading-relaxed font-thin md:text-base drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            {t("hero.subtitle")}
          </p>
        </motion.div>

      </div>

      {/* Preview label */}
      <div className="absolute top-4 left-4 z-20">
        <span className="text-xs uppercase tracking-[0.3em] text-white/70">
          Preview · Van Gogh hero
        </span>
      </div>
    </section>
  );
}
