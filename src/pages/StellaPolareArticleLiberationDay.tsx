import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import liberationCover from "@/assets/stella-polare-covers/liberation-day.jpeg";

export default function StellaPolareArticleLiberationDay() {
  const author = "Marco Ferraù";
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
            className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="relative w-full aspect-[4/5] sm:aspect-[16/10] overflow-hidden bg-[hsl(225,75%,20%)]">
              <img
                src={liberationCover}
                alt="25th April — Liberation Day"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-8 md:p-14">
              <header className="mb-10">
                <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-3">
                  Aprile 2026 · Mensile
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  For all the days April 25th
                </h1>
                <p className="mt-4 text-lg text-muted-foreground italic">
                  Memoria, Resistenza e libertà: perché il 25 aprile riguarda ancora ognuno di noi.
                </p>
              </header>

              <div className="space-y-6 text-foreground/90 leading-relaxed">
                <p>
                  Every year we look at the calendar and notice certain dates marked in red:
                  days we associate with moments of celebration and relaxation, but whose meaning
                  risks being lost due to the annual recurrence. Among these is{" "}
                  <strong>April 25, Liberation Day</strong>. But liberation from whom? And from what?
                </p>

                <p>
                  To understand this, it's necessary to remember that in 1922, with the rise to
                  power of Benito Mussolini and the creation of the Fascist Party, Italy entered a
                  dictatorial era marked by the repression of freedom and strong nationalism. In
                  the years that followed, the regime allied itself with Nazi Germany, dragging the
                  country into World War II and subjecting it to all the laws imposed by the
                  Germans. <strong>April 25, 1945</strong> marks the symbolic day of Italy's
                  liberation from Nazi-Fascism. During the final phase of the conflict, thanks to
                  the joint efforts of the Allied forces and the partisan resistance, the country
                  was gradually liberated from German occupation and the fascist regime, closing
                  the worst chapter in the country's history.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-2">
                  The Italian Resistance
                </h2>
                <p>
                  The exploits of the Italian Resistance, a broad and diverse movement that was
                  particularly active between 1943 and 1945, are undoubtedly memorable, contributing
                  decisively to the liberation. After September 8, 1943, thousands of men and women
                  joined partisan groups, organized into brigades such as the{" "}
                  <em>Garibaldi</em> (Communist-inspired), <em>Giustizia e Libertà</em> (linked to
                  the Action Party), and the <em>Matteotti</em> (Socialist).
                </p>

                <p>
                  Among the most important figures who influenced the course of the war were{" "}
                  <strong>Ferruccio Parri</strong>, future Prime Minister in 1945;{" "}
                  <strong>Sandro Pertini</strong>, then President of the Republic from 1978 to 1985;
                  and <strong>Tina Anselmi</strong>, partisan courier and the first female minister
                  in the history of the Republic, appointed Minister of Labor in 1976.
                </p>

                <blockquote className="border-l-4 border-primary pl-5 py-2 my-2 bg-muted/40 rounded-r-lg">
                  <p className="italic text-foreground/90">
                    Approximately <strong>250,000 partisans</strong> were active during the
                    liberation, while over <strong>35,000 lost their lives</strong>. Around{" "}
                    <strong>70,000 women</strong> served alongside them, often as couriers,
                    crucial for liaison and the transport of weapons and information.
                  </p>
                </blockquote>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-2">
                  Symbolic episodes
                </h2>
                <p>
                  Among the symbolic episodes of that period were the{" "}
                  <strong>Four Days of Naples</strong> (September 1943), when the Resistance
                  spontaneously rose up against the German occupation, managing to liberate the
                  city even before the arrival of the Allies, sending a strong signal of the
                  direction Italians wanted their nation to take.
                </p>

                <p>
                  Among the many stories of the Resistance, one of the most significant is that
                  of <strong>Irma Bandiera</strong>, a young partisan from Bologna. She was
                  arrested by the fascists in 1944 and tortured for days to reveal information
                  about her comrades and despite this, she refused to disclose any information.
                  In the end she was killed and her body left in the street as a warning. Her
                  choice represents one of the most powerful symbols of the courage and sacrifice
                  that characterized the partisan struggle.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-2">
                  Why it still matters today
                </h2>
                <p>
                  The unity of the Italian people contributed to the defeat of the Nazi occupation
                  and the fascist regime and to the birth of a new democratic Italy, whose values
                  were enshrined in the <strong>1948 Constitution</strong>. Remembering means
                  committing ourselves to ensuring that what happened never happens again,
                  countering all forms of hatred — a sentiment we see resurging more violently
                  every day.
                </p>

                <p>
                  In the delicate geopolitical situation we live in today, it is crucial to rely
                  on the importance of memory, so that we citizens do not remain silent in the
                  face of blatant displays of hatred. It is essential that diplomatic channels
                  form the basis of dialogue between nations, avoiding the use of threats and
                  blockades that inevitably affect everyone's lives.
                </p>

                <p className="text-lg font-medium text-foreground">
                  Liberation Day is a moment when we should all pause to reflect on how fortunate
                  we are to have left this historic period behind, but it must also be a moment
                  when community engagement becomes a priority. Today more than ever, let us
                  celebrate the importance of April 25th — and let every day be April 25th.
                </p>
              </div>

              <footer className="mt-10 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground italic">— {author}</p>
              </footer>
            </div>
          </motion.article>
        </div>
      </section>

      <Footer />
    </div>
  );
}
