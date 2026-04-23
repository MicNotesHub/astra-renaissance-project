import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function StellaPolareArticleAprilCulture() {
  const author = "Viktoria Kriatsiotis";
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link to="/stella-polare">
            <Button variant="ghost" className="gap-2 mb-6">
              <ArrowLeft className="w-4 h-4" />
              Stella Polare
            </Button>
          </Link>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-card border border-border rounded-2xl shadow-lg p-8 md:p-14 prose prose-neutral dark:prose-invert max-w-none"
          >
            <header className="mb-10 not-prose">
              <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-3">
                Arte, Cultura, Cinema e Teatro
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                April, the month of cultural overload
              </h1>
            </header>

            <section>
              <h2 className="text-2xl font-bold text-foreground mt-8 mb-3">Design Week</h2>
              <p className="text-foreground/90 leading-relaxed">
                Every year, in April, the city of fashion opens its doors to one of the most remarkable events in the world of design. Design Week consists of the conjunction of Salone del Mobile, known as one of the most prestigious and notable international design and furnishing fairs, and Fuorisalone, the citywide network of experimental design installations distributed across different venues.
              </p>
              <p className="text-foreground/90 leading-relaxed mt-4">
                Salone del Mobile will take place from the 21st to the 26th at Fiera Milano, Rho. Providing a ground for showcasing design and furnishing elements from world-leading italian and international companies, it acts as a meeting point for exhibitors, and a catalyst for visibility and countless business opportunities.
              </p>
              <p className="text-foreground/90 leading-relaxed mt-4">
                The fair is joined by Fuorisalone between the 20th and the 26th held in various neighborhoods dedicated to different styles and elements. The events run under the theme <em>Be the project</em>, inviting the crowds to approach designing as a way to express and recognize oneself in change. With bio-based materials, high craftsmanship, hybridization and the integration of physical and digital, the theme promotes sustainability and responsibility while embracing the human being as the driver of transformation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mt-10 mb-3">Miart &amp; Milano Art Week</h2>
              <p className="text-foreground/90 leading-relaxed">
                Every year Milan transforms into a magnet for contemporary art-enthusiasts with the two events running simultaneously. While Miart as the concrete international modern art fair provides the commercial element, Milano Art Week aims to celebrate contemporary creativity, highlighting the city's role as an artistic powerhouse and a crucial centerpoint for the artistic circle both on a national and international level.
              </p>
              <p className="text-foreground/90 leading-relaxed mt-4">
                Miart will take place between the 17th and the 19th at Allianz MiCo. The fair primarily serves as a marketplace for a unique blend of modern (20th century) and contemporary works of art, boosting both the artistic and economic scene of the city. With the title <em>New Directions</em>, this year's edition focuses on metamorphosis, improvisation and explores the ways of blending traditional standards with innovation.
              </p>
              <p className="text-foreground/90 leading-relaxed mt-4">
                Between the 13th and the 19th, Milan will host the 10th edition Art Week, creating a space for showcasing talent and for engaging wider audiences in the world of contemporary art in all of its forms. With the involvement of more than 230 cultural institutions, this week invites the public to explore the themes of identity, memory, geopolitics and the environment, and favors collaboration and interaction between artists, host institutions and the public through over 400 different events.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mt-10 mb-3">Gelato Week</h2>
              <p className="text-foreground/90 leading-relaxed">
                And now the fun part, Italy will host its annual Gelato Week between the 14th and the 19th of April in 11 different cities across the country. The main scope of the event is to promote artisanal quality while boosting tourism in the host cities allowing participants to explore urban areas through a large variety of trails. This week, people get the chance to buy a ticket for a city and neighborhood of their choice, which allows them to visit 5 different ice cream shops and try their products over the course of 6 days. The event brings together locals and tourists, industry professionals and the general public. People get to discover something new every day of the week, be that a new neighborhood, a new favorite ice cream place, or a flavor.
              </p>
            </section>
          </motion.article>
        </div>
      </section>

      <Footer />
    </div>
  );
}
