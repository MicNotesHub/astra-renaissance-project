import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { SEO } from "@/components/SEO";
import cover from "@/assets/stella-polare-covers/mental-health-day-october.jpg";

export default function StellaPolareArticleMentalHealthDay() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Mental health deserves more than a day — Stella Polare | ASTRA Bocconi"
        description="World Mental Health Day puts mental health in every feed for one day. The harder question is what happens on October 11, once attention moves elsewhere and the difficulties remain."
        path={location.pathname}
        type="article"
      />
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
            <div className="relative w-full aspect-[4/5] sm:aspect-[16/10] overflow-hidden bg-muted">
              <img
                src={cover}
                alt="A calendar page marked 10 with blank pages receding behind it"
                className="w-full h-full object-cover"
                width={1280}
                height={800}
                loading="lazy"
              />
            </div>

            <div className="p-8 md:p-14">
              <header className="mb-10">
                <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-3">
                  Ottobre 2026 · Mensile
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  Mental health deserves more than a day
                </h1>
                <p className="mt-4 text-lg text-muted-foreground italic">
                  Il 10 ottobre la salute mentale riempie i social. La domanda più difficile è
                  cosa succede l'11 ottobre, quando l'attenzione si sposta altrove e le
                  difficoltà restano.
                </p>
              </header>

              <div className="space-y-6 text-foreground/90 leading-relaxed">
                <p>
                  On October 10, mental health pops up in nearly every social media feed. People
                  post reminders to check on friends, talk about asking for help, share messages
                  about taking a break. Those conversations matter. The harder question is what
                  happens on October 11, once attention moves elsewhere and the difficulties
                  remain.
                </p>
                <p>
                  For students in their twenties, mental health sits inside an especially messy
                  stage of life. University offers freedom, new relationships, and the chance to
                  pick a direction. But it also brings decisions that can feel far bigger than
                  expected. Where to live, what to study. Opportunities to pursue, which
                  friendships to hold onto: suddenly, a lot seems to need an answer.
                </p>
                <p>
                  There is a familiar expectation that these should be the best years of a
                  person's life. It sounds encouraging, until someone ends up feeling lonely in a
                  city they were excited to move to, or unhappy on a course they worked hard to
                  enter. Then the expectation becomes another thing to carry. Alongside the
                  difficulty comes the uncomfortable sense of experiencing university incorrectly.
                </p>
                <p>
                  Still, no single story captures what struggling looks like. A student might
                  withdraw from friends. Another might keep showing up to every class and every
                  dinner. Good grades, a busy social life or a convincing sense of humor reveal
                  only part of someone's experience, and distress does not need to become visible
                  before it deserves to be taken seriously.
                </p>
                <p>
                  Even as conversations about mental health become more familiar, certain
                  reactions stay awkwardly common. A cancelled plan gets read as a lack of
                  interest. Someone who needs an extension is seen as disorganised. A friend who
                  has been distant is quietly left off the next invitation. There may be no
                  deliberate cruelty involved, just an assumption made too quickly.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-2">
                  From awareness to practice
                </h2>
                <p>
                  This is where awareness has to become something practical. It can mean asking
                  before judging, leaving room for an explanation, or accepting that someone may
                  not be ready to provide one. Keeping in touch even when a friend is less present
                  than usual, without demanding a disclosure in return. Nobody should have to
                  share the most private parts of their life to earn a little patience.
                </p>
                <p>
                  The same principle applies at an institutional level. Universities have a
                  responsibility to make support clear and accessible. To take students'
                  difficulties seriously. Encouraging someone to seek help means little if the
                  next step is confusing or hard to access. Student associations also have a part
                  to play in making these conversations part of ordinary campus life, beyond an
                  annual post or event.
                </p>
                <p>
                  World Mental Health Day offers a chance to look at the small habits and
                  expectations that shape how people are treated. A campus becomes more supportive
                  through what happens in classrooms, group chats, friendships, and university
                  offices across the whole year.
                </p>
                <p className="text-lg font-medium text-foreground">
                  October 10 can start a conversation. The days that follow point to how much
                  space there actually is for it.
                </p>
              </div>

              <footer className="mt-10 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground italic">— Giorgia Caruana</p>
              </footer>
            </div>
          </motion.article>
        </div>
      </section>

      <Footer />
    </div>
  );
}
