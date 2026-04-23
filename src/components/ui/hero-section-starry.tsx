import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMemo } from "react";

/**
 * Alternative hero section — animated starry night sky with aurora gradient.
 * Mirrors the original hero's text (ASTRA logo floating + subtitle) but swaps
 * the video for a CSS-driven lively blue night sky with sparkling yellow stars.
 */
export function HeroSectionStarry() {
  const { t } = useLanguage();

  // Generate a deterministic-ish set of stars (memoized so they don't reshuffle on re-render)
  const stars = useMemo(() => {
    const arr = [] as Array<{
      top: string;
      left: string;
      size: number;
      delay: number;
      duration: number;
      drift: number;
      yellow: boolean;
    }>;
    const total = 220;
    for (let i = 0; i < total; i++) {
      arr.push({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 3 + 1.2, // 1.2px – 4.2px
        delay: Math.random() * 5,
        duration: 1.8 + Math.random() * 2.8,
        drift: 6 + Math.random() * 12,
        yellow: Math.random() < 0.65, // ~65% bright yellow
      });
    }
    return arr;
  }, []);

  // A handful of larger "hero" stars with cross sparkle
  const sparkleStars = useMemo(() => {
    return Array.from({ length: 16 }).map(() => ({
      top: `${10 + Math.random() * 80}%`,
      left: `${10 + Math.random() * 80}%`,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 2,
    }));
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050826]">
      {/* Deep, vivid night sky base — richer royal/cobalt blue */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,_#1e3a8a_0%,_#0b1a5e_35%,_#070a30_70%,_#02030f_100%)]" />

      {/* Animated aurora gradient layer — punchier teal/indigo/magenta */}
      <div className="absolute inset-0 opacity-80 mix-blend-screen animate-aurora bg-[linear-gradient(120deg,_rgba(34,211,238,0.55)_0%,_rgba(99,102,241,0.5)_25%,_rgba(16,185,129,0.45)_50%,_rgba(217,70,239,0.5)_75%,_rgba(34,211,238,0.55)_100%)] bg-[length:300%_300%]" />

      {/* Secondary aurora wave */}
      <div className="absolute inset-0 opacity-60 mix-blend-screen animate-aurora-slow bg-[radial-gradient(ellipse_at_25%_35%,_rgba(56,189,248,0.6),_transparent_55%),radial-gradient(ellipse_at_75%_65%,_rgba(168,85,247,0.55),_transparent_55%),radial-gradient(ellipse_at_50%_85%,_rgba(16,185,129,0.35),_transparent_60%)]" />

      {/* Warm golden glow to make yellow stars pop */}
      <div className="absolute inset-0 opacity-30 mix-blend-screen bg-[radial-gradient(ellipse_at_50%_50%,_rgba(250,204,21,0.18),_transparent_70%)]" />

      {/* Stars layer */}
      <div className="absolute inset-0">
        {stars.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full animate-twinkle-drift"
            style={{
              top: s.top,
              left: s.left,
              width: `${s.size}px`,
              height: `${s.size}px`,
              backgroundColor: s.yellow ? "#FEF08A" : "#F0F9FF",
              boxShadow: s.yellow
                ? `0 0 ${s.size * 4}px rgba(250, 204, 21, 1), 0 0 ${s.size * 8}px rgba(253, 224, 71, 0.8), 0 0 ${s.size * 14}px rgba(250, 204, 21, 0.4)`
                : `0 0 ${s.size * 3}px rgba(186, 230, 253, 0.9), 0 0 ${s.size * 6}px rgba(125, 211, 252, 0.5)`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
              ["--drift" as any]: `${s.drift}px`,
            }}
          />
        ))}

        {/* Larger sparkle stars (cross-shaped via pseudo via SVG) */}
        {sparkleStars.map((s, i) => (
          <span
            key={`sp-${i}`}
            className="absolute animate-twinkle"
            style={{
              top: s.top,
              left: s.left,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                filter: "drop-shadow(0 0 6px rgba(253, 224, 71, 0.9))",
              }}
            >
              <path
                d="M12 2 L13.2 10.8 L22 12 L13.2 13.2 L12 22 L10.8 13.2 L2 12 L10.8 10.8 Z"
                fill="#FDE68A"
              />
            </svg>
          </span>
        ))}
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
