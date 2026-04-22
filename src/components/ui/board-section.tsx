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
];

// Duplicate slides to create a seamless looping carousel feel
const slides = [...baseSlides, ...baseSlides, ...baseSlides];

export const BoardSection = () => {
  const { t } = useLanguage();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Start scrolled to the middle copy so the user can scroll left or right seamlessly
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth / 3;
  }, []);

  // When the user scrolls near either end, jump back to the middle copy invisibly
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

  return (
    <section className="py-10 bg-background">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-foreground">
        {t("board.title")}
      </h2>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth px-[5vw]"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          scrollPaddingLeft: "5vw",
          scrollPaddingRight: "5vw",
        } as React.CSSProperties}
      >
        <div className="flex gap-4 pb-2" style={{ width: "max-content" }}>
          {slides.map((s, i) => (
            <div
              key={i}
              className="snap-start shrink-0 overflow-hidden rounded-2xl shadow-lg"
              style={{ width: "min(40vw, 320px)", aspectRatio: "4 / 5" }}
            >
              <img
                src={s.src}
                alt={s.alt}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
