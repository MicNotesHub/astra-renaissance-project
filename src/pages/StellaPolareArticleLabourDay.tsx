import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import labourCover from "@/assets/stella-polare-covers/labour-day.png";

export default function StellaPolareArticleLabourDay() {
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
                src={labourCover}
                alt="1° Maggio — Festa dei Lavoratori"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-8 md:p-14">
              <header className="mb-10">
                <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-3">
                  Maggio 2026 · Mensile
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  1° Maggio, il lavoro come valore civile e sociale
                </h1>
                <p className="mt-4 text-lg text-muted-foreground italic">
                  La Festa dei Lavoratori non è soltanto una ricorrenza simbolica, ma un momento per riflettere sul significato del lavoro, sui diritti conquistati nel tempo e sulle sfide che ancora oggi attraversano la società.
                </p>
              </header>

              <div className="space-y-6 text-foreground/90 leading-relaxed">
                <p>
                  Il 1° maggio è una data che, ogni anno, richiama l'attenzione su uno dei temi più importanti della vita collettiva: il lavoro. Non si tratta solo di una festa o di una ricorrenza inserita nel calendario civile, ma di una giornata che porta con sé un significato profondo, legato alla dignità della persona, ai diritti sociali e al valore della partecipazione nella società.
                </p>

                <p>
                  La Festa dei Lavoratori nasce da una storia fatta di lotte, rivendicazioni e richieste di giustizia. Tra la fine dell'Ottocento e l'inizio del Novecento, migliaia di lavoratori iniziarono a chiedere condizioni più umane, orari meno pesanti e tutele che fino a quel momento non erano garantite. Quelle mobilitazioni hanno lasciato un segno importante nella storia sociale e politica di molti Paesi, perché hanno contribuito a costruire diritti che oggi spesso vengono dati per scontati, ma che in realtà sono il risultato di sacrifici e battaglie molto lunghe.
                </p>

                <p>
                  Ed è proprio per questo che il 1° maggio continua ad avere un valore così forte. Ricordare questa giornata significa ricordare che il lavoro non può essere considerato soltanto come produzione, rendimento o necessità economica. Dietro il lavoro ci sono persone, storie, aspettative, fatiche e possibilità di costruire il proprio futuro. In questo senso, il lavoro non riguarda solo l'aspetto materiale della vita, ma anche quello umano e sociale.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-2">
                  Un mondo del lavoro in trasformazione
                </h2>
                <p>
                  Oggi questa riflessione è ancora più attuale. Il mondo del lavoro è cambiato moltissimo e continua a cambiare velocemente. Da una parte ci sono l'innovazione, la tecnologia, nuove professioni e nuove opportunità; dall'altra, però, restano presenti problemi che non possono essere ignorati. La precarietà, le disuguaglianze, la mancanza di stabilità e le difficoltà che molte persone incontrano nel costruire un percorso professionale solido sono questioni che riguardano il presente in modo molto concreto.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-2">
                  Sicurezza e dignità
                </h2>
                <p>
                  Accanto a questo, c'è poi il tema della sicurezza, che ogni anno torna purtroppo al centro del dibattito pubblico. Le morti sul lavoro e gli incidenti che continuano a verificarsi ricordano quanto sia ancora necessario parlare di tutela, responsabilità e rispetto della persona. Non si può accettare che il lavoro, che dovrebbe rappresentare uno strumento di crescita e autonomia, diventi invece un luogo di rischio o di fragilità.
                </p>

                <blockquote className="border-l-4 border-primary pl-5 py-2 my-2 bg-muted/40 rounded-r-lg">
                  <p className="italic text-foreground/90">
                    Nessun risultato economico può valere più della vita umana.
                  </p>
                </blockquote>

                <p>
                  Il 1° maggio, quindi, non parla soltanto del passato. Parla anche del presente e, soprattutto, del futuro. È una giornata che invita a fermarsi e a riflettere sul tipo di società che si vuole costruire. Una società giusta non è soltanto quella che cresce o produce di più, ma quella che riesce a garantire diritti, dignità e opportunità reali. Parlare di lavoro significa parlare anche di equità, di rispetto e di responsabilità collettiva.
                </p>

                <p>
                  In questo senso, la Festa dei Lavoratori conserva un valore civile molto forte. Ricorda che il lavoro deve rimanere uno strumento di realizzazione personale e di partecipazione sociale, non una condizione di incertezza permanente. Quando mancano tutele, retribuzioni adeguate o stabilità, viene meno non solo la serenità individuale, ma anche una parte importante dell'equilibrio sociale.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-2">
                  Memoria e consapevolezza
                </h2>
                <p>
                  Per questo il 1° maggio non può essere ridotto a una celebrazione formale. È una ricorrenza che chiede consapevolezza. Chiede di ricordare le conquiste ottenute nel tempo, ma anche di guardare con attenzione alle difficoltà che ancora oggi attraversano il mondo del lavoro. In una fase storica segnata da cambiamenti rapidi, questa giornata continua a ricordare quanto sia importante mettere al centro la persona, la sua dignità e i suoi diritti.
                </p>

                <p className="text-lg font-medium text-foreground">
                  Più che una semplice festa, il 1° maggio resta quindi un'occasione di memoria e riflessione. Memoria di chi ha lottato per ottenere condizioni più giuste, e riflessione su quanto ci sia ancora da fare perché il lavoro continui a essere davvero sinonimo di dignità, sicurezza e cittadinanza. Ed è proprio in questo equilibrio tra passato e presente che questa giornata conserva ancora oggi tutta la sua forza.
                </p>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      <Footer />
    </div>
  );
}
