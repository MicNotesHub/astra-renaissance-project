import * as React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
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

const slides = [...baseSlides, ...baseSlides, ...baseSlides];
const SIDE_PADDING = "clamp(20px, 5vw, 56px)";

export const BoardSection = () => {
  const { t } = useLanguage();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const recenter = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Land exactly at the start of the second copy so "Presidents" is the
    // first visible card with no previous slide peeking on the left.
    el.scrollTo({ left: el.scrollWidth / 3, behavior: "instant" as ScrollBehavior });
  }, []);

  React.useLayoutEffect(() => {
    recenter();
    // Re-center once images have loaded (scrollWidth depends on layout).
    const imgs = scrollRef.current?.querySelectorAll("img") ?? [];
    let pending = 0;
    imgs.forEach((img) => {
      if (!img.complete) {
        pending += 1;
        img.addEventListener("load", recenter, { once: true });
        img.addEventListener("error", recenter, { once: true });
      }
    });
    if (pending === 0) recenter();
  }, [recenter]);

  const handleScroll = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const third = el.scrollWidth / 3;
    if (el.scrollLeft <= third * 0.1) {
      el.scrollLeft += third;
    } else if (el.scrollLeft >= third * 1.9) {
      el.scrollLeft -= third;
    }
  }, []);

  // Translate vertical mouse-wheel scroll into horizontal scroll so desktop
  // users (with a regular mouse, not a trackpad) can browse the carousel.
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      // Ignore if the user is intentionally scrolling horizontally already.
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLDivElement>("[data-board-card]");
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.6;
    el.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <section className="py-10 bg-background">
      <h2 className="mb-8 text-center text-3xl font-bold text-foreground md:text-4xl">
        {t("board.title")}
      </h2>
      <div className="relative w-full" style={{ paddingLeft: SIDE_PADDING, paddingRight: SIDE_PADDING }}>
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
          className="w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            scrollPaddingLeft: SIDE_PADDING,
            scrollPaddingRight: SIDE_PADDING,
          } as React.CSSProperties}
        >
          <div className="flex w-max gap-4 pb-2">
            {slides.map((s, i) => (
              <div
                key={`${s.alt}-${i}`}
                data-board-card
                className="snap-start shrink-0 overflow-hidden rounded-2xl shadow-lg"
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
