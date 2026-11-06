import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { SEO } from "@/components/SEO";
import cover from "@/assets/stella-polare-covers/astra-press-october-21.jpg";

export default function StellaPolareArticleAstraPress() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Two protests, two narratives: who decides what makes the news? — Stella Polare | ASTRA Bocconi"
        description="Milan’s shattered windows monopolised the coverage while voices from the South struggled to be heard. A reflection on the business of attention and the responsibility of the media."
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
                alt="A camera lens spotlighting one crowd of protesters while another stays in shadow"
                className="w-full h-full object-cover"
                width={1280}
                height={800}
                loading="lazy"
              />
            </div>

            <div className="p-8 md:p-14">
              <header className="mb-10">
                <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-3">
                  4 novembre 2026 · Mensile
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  Two protests, two narratives: who decides what makes the news?
                </h1>
                <p className="mt-4 text-lg text-muted-foreground italic">
                  Milan’s shattered windows monopolised the coverage while voices from the South struggled to be heard. A reflection on the business of attention and the responsibility of the media.
                </p>
              </header>

              <div className="space-y-6 text-foreground/90 leading-relaxed">
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-2">1. Clashes and Protests</h2>
                <p>Who decides what makes the news?</p>
                <p>Is information still serving the public&#x27;s right to know?</p>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-2">2. Two Protests, Two Narratives</h2>
                <p>The demonstrations of recent days have occupied opposite ends of the Italian media landscape. The shattered shop windows and violent scenes in Milan&#x27;s Piazza Duomo have almost monopolized the coverage of the protests, while voices from the South seem to be struggling to gain attention.</p>
                <p>But what accounts for this difference?</p>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-2">3. The business of attention</h2>
                <p>To understand what drives the press to devote coverage to one story rather than another, we must first bear in mind that information today is an industry and, as such, must respond to market demands.</p>
                <p>Today, news is a commodity, and its value is primarily determined by its ability to capture our attention.</p>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-2">4. What determines what deserves media coverage?</h2>
                <p>The images coming out of Milan carry a strong emotional impact: they shock, provoke, and divide.</p>
                <p>&quot;Urban warfare,&quot; &quot;violence against law enforcement,&quot; and &quot;uprising&quot; are all expressions that are far from objective or purely descriptive. They almost always leave room for interpretations that are often deeply ideological.</p>
                <p>They create divisions that contribute little to meaningful debate but are essential to generating clicks.</p>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-2">5. What we see and what remains unseen</h2>
                <p>Violence is clear-cut and immediate. Reporting on it is as easy as reacting to it.</p>
                <p>A peaceful and thoughtful protest, however legitimate and necessary, is inherently less immediate. Explaining its underlying issues requires time and attention, two increasingly scarce commodities in today&#x27;s world. As a result, the necessary complexity of the issue risks overshadowing its urgency.</p>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-2">6. The responsibility of the media</h2>
                <p>Although no one today can completely escape the forces of rampant consumerism, journalism should still strive to distance itself from mere polemical entertainment.</p>
                <p>Simply satisfying and fueling an existing, constant, and predictable demand means giving up on helping readers independently identify which questions are worth asking and how to find their own answers.</p>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-2">7. Reality and Its representation</h2>
                <p>Protests, the rising cost of living, and blocked highways exist even far from cameras and front-page headlines. Yet, in a society like ours, what fails to find a place in the media narrative struggles to enter public debate. Being excluded from that narrative means losing a prominent place among society&#x27;s perceived priorities.</p>
                <p>If the farmers, transport workers, and producers of this country fail to gain public attention, we may never see any meaningful developments. But one thing will be certain: the value of a news story will have become nothing more than a measure of its visibility.</p>
              </div>

              <footer className="mt-10 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground italic">— Giuliano Firenze</p>
              </footer>
            </div>
          </motion.article>
        </div>
      </section>

      <Footer />
    </div>
  );
}
