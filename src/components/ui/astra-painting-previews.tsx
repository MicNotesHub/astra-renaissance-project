import { motion } from "framer-motion";
import painting from "@/assets/astra-vangogh.jpg";

/**
 * Preview #1 — Hero-style background showcase
 * Demonstrates how the painting could replace the hero background.
 */
export function AstraPaintingHeroPreview() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[60vh] min-h-[420px] w-full">
        <motion.img
          src={painting}
          alt="ASTRA Bocconi — Van Gogh inspired campus illustration"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1.12 }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/40 to-background/80" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <span className="mb-3 text-xs uppercase tracking-[0.3em] text-primary-foreground/80">
            Preview · Hero background
          </span>
          <h2 className="text-3xl font-light text-primary-foreground md:text-5xl">
            A starry welcome to ASTRA
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-primary-foreground/80 md:text-base">
            The painting used as a full-bleed hero with a slow Ken Burns zoom and a soft gradient overlay.
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Preview #2 — Editorial split layout
 * Painting on one side, content on the other.
 */
export function AstraPaintingSplitPreview() {
  return (
    <section className="w-full bg-background py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 md:grid-cols-5 md:px-8">
        <div className="md:col-span-2 flex flex-col justify-center">
          <span className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Preview · Editorial split
          </span>
          <h2 className="text-3xl font-light text-foreground md:text-4xl">
            An identity, painted.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            A 60/40 split places the painting beside our story — magazine-like, intentional, and unmistakably ours.
          </p>
        </div>
        <div className="md:col-span-3">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl shadow-xl">
            <img
              src={painting}
              alt="ASTRA Bocconi painted illustration"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Preview #3 — Parallax divider strip
 */
export function AstraPaintingParallaxPreview() {
  return (
    <section className="relative w-full">
      <div
        className="relative h-[40vh] min-h-[280px] w-full bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(${painting})` }}
        role="img"
        aria-label="ASTRA Bocconi painted illustration as parallax divider"
      >
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
          <div>
            <span className="mb-2 block text-xs uppercase tracking-[0.3em] text-primary-foreground/80">
              Preview · Parallax divider
            </span>
            <p className="max-w-xl text-lg font-light text-primary-foreground md:text-2xl">
              "Per aspera ad astra."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
