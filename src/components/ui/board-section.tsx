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

const slides = [
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

export const BoardSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-10 bg-background">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-foreground">
        {t("board.title")}
      </h2>
      <div
        className="w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
      >
        <div className="flex gap-4 pl-[5vw] pr-[5vw] pb-2" style={{ width: "max-content" }}>
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
