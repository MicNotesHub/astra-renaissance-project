import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
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
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-foreground">
          {t("board.title") || "Board"}
        </h2>
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {slides.map((s, i) => (
              <CarouselItem key={i} className="basis-4/5 sm:basis-1/2 lg:basis-1/3">
                <div className="overflow-hidden rounded-2xl shadow-lg aspect-[4/5]">
                  <img
                    src={s.src}
                    alt={s.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};
