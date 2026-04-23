import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { SparklesCore } from "@/components/ui/sparkles";

/**
 * Alternative hero section — deep royal blue night sky with bright yellow
 * tsparticles sparkles. Mirrors the original hero text (ASTRA logo + subtitle).
 */
export function HeroSectionStarry() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a1a8c]">
      {/* Deep, eye-catching royal blue night sky */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,_#1e3ab8_0%,_#10218f_40%,_#08146b_75%,_#040a3d_100%)]" />

      {/* Bright yellow sparkles */}
      <div className="absolute inset-0">
        <SparklesCore
          id="hero-starry-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={140}
          particleColor="#FDE047"
          speed={3}
          className="h-full w-full"
        />
      </div>

      {/* Soft vignette for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />

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
                className="h-20 w-auto filter brightness-0 invert"
              />
            </motion.div>
          </motion.div>

          {/* Subtitle */}
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-thin md:text-base">
            {t("hero.subtitle")}
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in"
          style={{ animationDelay: "1s" }}
        >
          <div className="flex flex-col items-center text-white/70">
            <div className="w-px h-8 bg-white/50 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Preview label */}
      <div className="absolute top-4 left-4 z-20">
        <span className="text-xs uppercase tracking-[0.3em] text-white/60">
          Preview · Starry hero
        </span>
      </div>
    </section>
  );
}
