import * as React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SparklesCore } from "@/components/ui/sparkles";
import img1 from "@/assets/board/01-presidents.jpg";
import img2 from "@/assets/board/02-executive.jpg";
import img3 from "@/assets/board/03-representation.jpg";
import img4 from "@/assets/board/04-media.jpg";
import img5 from "@/assets/board/05-tech.jpg";
import img6 from "@/assets/board/06-student-service.jpg";
import img7 from "@/assets/board/07-partnership.jpg";
import img8 from "@/assets/board/08-conferences.jpg";
import img9 from "@/assets/board/09-sport.jpg";
import img10 from "@/assets/board/10-events.jpg";
import img11 from "@/assets/board/11-legal.jpg";
import img12 from "@/assets/board/12-international.jpg";
import img13 from "@/assets/board/13-press.jpg";
import img14 from "@/assets/board/14-career-service.jpg";

const baseSlides = [
  { src: img1, alt: "Presidents" },
  { src: img2, alt: "Executive" },
  { src: img3, alt: "Representation" },
  { src: img4, alt: "Media" },
  { src: img5, alt: "Tech" },
  { src: img6, alt: "Student Service" },
  { src: img7, alt: "Partnership" },
  { src: img8, alt: "Conferences" },
  { src: img9, alt: "Sport" },
  { src: img10, alt: "Events" },
  { src: img11, alt: "Legal" },
  { src: img12, alt: "International" },
  { src: img13, alt: "Press" },
  { src: img14, alt: "Career Service" },
];

// Triple buffer so we can seamlessly wrap forward and backward.
const slides = [...baseSlides, ...baseSlides, ...baseSlides];
const SIDE_PADDING = "clamp(20px, 5vw, 56px)";
// Pixels per second for the auto-scrolling marquee.
const AUTO_SPEED = 40;

export const BoardSection = () => {
  const { t } = useLanguage();
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const pausedRef = React.useRef(false);
  const rafRef = React.useRef<number | null>(null);
  const lastTimeRef = React.useRef<number | null>(null);

  // Recenter into the middle copy without animation. Used on mount and to
  // wrap seamlessly when we cross a boundary.
  const wrapIfNeeded = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const third = el.scrollWidth / 3;
    if (!third) return;
    if (el.scrollLeft >= third * 2) {
      el.scrollLeft -= third;
    } else if (el.scrollLeft < third) {
      el.scrollLeft += third;
    }
  }, []);

  // Initial centering on the middle copy.
  React.useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const center = () => {
      el.scrollLeft = el.scrollWidth / 3;
    };
    center();
    const imgs = el.querySelectorAll("img");
    imgs.forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", center, { once: true });
        img.addEventListener("error", center, { once: true });
      }
    });
  }, []);

  // Continuous auto-scroll loop — true infinite marquee feel.
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const tick = (time: number) => {
      if (lastTimeRef.current == null) lastTimeRef.current = time;
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;
      if (!pausedRef.current) {
        el.scrollLeft += AUTO_SPEED * dt;
        wrapIfNeeded();
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTimeRef.current = null;
    };
  }, [wrapIfNeeded]);

  // Translate vertical mouse-wheel scroll into horizontal scroll.
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
      wrapIfNeeded();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [wrapIfNeeded]);

  // Wrap on every scroll event to handle drag/touch/keyboard scrolling too.
  const handleScroll = React.useCallback(() => {
    wrapIfNeeded();
  }, [wrapIfNeeded]);

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
    lastTimeRef.current = null;
  };

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLDivElement>("[data-board-card]");
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.6;
    el.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <section className="relative py-10 overflow-hidden bg-[#0a1a8c]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,_#1e3ab8_0%,_#10218f_40%,_#08146b_75%,_#040a3d_100%)]" />
      <div className="absolute inset-0">
        <SparklesCore
          id="board-starry-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={90}
          particleColor="#FDE047"
          speed={3}
          className="h-full w-full"
        />
      </div>
      <h2 className="relative z-10 mb-8 text-center text-3xl font-bold text-white md:text-4xl">
        {t("board.title")}
      </h2>
      <div
        className="relative z-10 w-full"
        style={{ paddingLeft: SIDE_PADDING, paddingRight: SIDE_PADDING }}
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        <button
          type="button"
          aria-label="Previous"
          onClick={() => scrollByCard(-1)}
          className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-background/80 p-2 shadow-lg backdrop-blur transition hover:bg-background md:flex"
        >
          <svg className="h-5 w-5 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => scrollByCard(1)}
          className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-background/80 p-2 shadow-lg backdrop-blur transition hover:bg-background md:flex"
        >
          <svg className="h-5 w-5 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="w-full overflow-x-auto overflow-y-hidden"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          } as React.CSSProperties}
        >
          <div className="flex w-max gap-4 pb-2">
            {slides.map((s, i) => (
              <div
                key={`${s.alt}-${i}`}
                data-board-card
                className="shrink-0 overflow-hidden rounded-2xl shadow-lg"
                style={{ width: "min(40vw, 320px)", aspectRatio: "4 / 5" }}
              >
                <img
                  src={s.src}
                  alt={s.alt}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
