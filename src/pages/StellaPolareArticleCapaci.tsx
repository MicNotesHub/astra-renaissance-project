import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { SEO } from "@/components/SEO";
import capaciCover from "@/assets/stella-polare-covers/capaci-23-maggio.jpg";

export default function StellaPolareArticleCapaci() {
  const location = useLocation();
  const authors = "Francesco Carletta · Manfredi Donzelli · Marco Ferraù";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Capaci, 23 Maggio 1992 — Stella Polare | ASTRA Bocconi"
        description="A più di trent'anni dalla strage di Capaci: il sacrificio di Giovanni Falcone, la reazione dello Stato e l'eredità della lotta alla mafia."
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
            <div className="relative w-full aspect-[4/5] sm:aspect-[16/10] overflow-hidden bg-[hsl(225,75%,12%)]">
              <img
                src={capaciCover}
                alt="Capaci, 23 Maggio 1992"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8 md:p-14">
              <header className="mb-10">
                <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-3">
                  Maggio 2026 · Mensile
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  Capaci, 23 Maggio 1992, ore 17:58
                </h1>
                <p className="mt-4 text-lg text-muted-foreground italic">
                  Memoria, Stato di diritto e l'eredità di Giovanni Falcone a più di trent'anni dalla strage.
                </p>
              </header>

              <div className="space-y-6 text-foreground/90 leading-relaxed">
                <p>
                  La strage di Capaci rappresenta uno dei momenti più tragici e simbolici della storia della Repubblica Italiana. Il 23 maggio 1992, sull'autostrada che dall'aeroporto di Punta Raisi conduce a Palermo, un attentato organizzato da Cosa Nostra uccise il giudice Giovanni Falcone, la moglie Francesca Morvillo e gli agenti della scorta Vito Schifani, Rocco Dicillo e Antonio Montinaro. Al di là delle spaventose proporzioni di un attacco che ha lasciato una terra sgomenta e ferita, resta indelebile nella memoria collettiva il coraggio umano e professionale di Falcone, Morvillo e degli uomini della scorta, impegnati fino all'ultimo nella lotta contro la mafia.
                </p>
                <p>
                  L'attentato costituisce in realtà solo il culmine della lunga guerra condotta da Cosa Nostra contro lo Stato italiano, coronando una strategia di violenza che già negli anni Settanta e Ottanta aveva prodotto omicidi, attentati e intimidazioni contro magistrati, giornalisti, politici e rappresentanti delle istituzioni. È in questo clima di crescente tensione che venne istituito il pool antimafia di Palermo, di cui Giovanni Falcone e Paolo Borsellino furono protagonisti centrali. Attraverso tecniche investigative innovative, e grazie soprattutto al maxiprocesso contro Cosa Nostra, Falcone contribuì a colpire l'organizzazione mafiosa ai suoi vertici, incrinandone gli equilibri interni e i rapporti di potere sul territorio. La risposta di Cosa Nostra a Capaci costituì dunque un diretto confronto con lo Stato stesso e la sua capacità di affermare legalità e giustizia.
                </p>
                <p>
                  Una giustizia di cui i cittadini avevano disperato bisogno, come dimostrato dalla profonda ondata di indignazione in tutta Italia e da quella che venne conosciuta come la "primavera di Palermo": una stagione di mobilitazione civile e di rinnovato impegno collettivo nel contrasto a una piaga stratificata sul territorio per decenni.
                </p>
                <p>
                  Migliaia di cittadini, associazioni, studenti e movimenti scesero in piazza per manifestare contro Cosa Nostra e chiedere una risposta concreta da parte delle istituzioni. Ancora oggi il sacrificio di Giovanni Falcone, Francesca Morvillo e degli uomini della loro scorta continua a rappresentare un simbolo di coraggio, responsabilità e difesa dei valori democratici e dello Stato di diritto.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-2">
                  La reazione dello Stato
                </h2>
                <p>
                  La morte di Giovanni Falcone non colpì dunque soltanto un magistrato simbolo della lotta alla mafia: scosse profondamente tutto il Paese. Proprio da quel clima di paura e indignazione patì la reazione immediata dello Stato, che decise di rafforzare gli strumenti contro la criminalità organizzata.
                </p>
                <p>
                  Pochi giorni dopo la strage venne approvato il decreto-legge n. 306 del 1992, poi convertito nella legge n. 356 dello stesso anno. Uno degli aspetti più significativi riguardò il regime carcerario: fu reso più severo il cosiddetto <strong>"41-bis"</strong>, pensato per i detenuti mafiosi più pericolosi. Lo scopo era chiaro: impedire ai boss di continuare a mantenere contatti con le organizzazioni criminali dall'interno del carcere. Vennero quindi limitati colloqui, comunicazioni e possibilità di rapporti con l'esterno. Nel corso degli anni, la Corte costituzionale ha confermato la legittimità di queste misure, precisando al contempo la necessità di garantire la tutela dei diritti fondamentali dei detenuti.
                </p>
                <p>
                  Parallelamente, lo Stato iniziò a colpire la mafia sul piano economico, seguendo l'intuizione che Falcone aveva sostenuto durante le sue indagini: si rafforzarono i sequestri e le confische dei beni mafiosi, perché togliere denaro, aziende e patrimoni alle organizzazioni criminali significava indebolirle concretamente.
                </p>
                <p>
                  Importante fu anche la riorganizzazione delle indagini. Con le nuove norme nacquero la <strong>Direzione Nazionale Antimafia</strong> e le <strong>Direzioni Distrettuali Antimafia</strong>, create per coordinare meglio il lavoro delle procure. Falcone aveva più volte sostenuto che la mafia fosse un fenomeno unitario e che, proprio per questo, non potesse essere combattuta con iniziative separate e senza collaborazione tra magistrati. Le leggi approvate dopo la morte del giudice Falcone non furono soltanto una risposta all'emergenza del momento, ma segnarono un cambiamento profondo nel modo in cui lo Stato italiano affronta la criminalità organizzata.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-2">
                  L'eredità di Giovanni Falcone
                </h2>
                <p>
                  Oggi siamo continuamente esposti a un flusso costante di informazioni che ci fa arrivare a fine giornata con la testa colma di notizie, immagini e contenuti. Viviamo così in fretta che spesso non sappiamo nemmeno che giorno sia, fino quasi a perdere il conto del tempo che passa. Per molti giovani, le ricorrenze storiche rischiano di diventare soltanto un giorno di vacanza, o l'ennesimo servizio ascoltato distrattamente al telegiornale, dove certe commemorazioni vengono trattate come semplici formalità, utili più a sentirsi la coscienza pulita che a fare i conti con ciò che rappresentano.
                </p>
                <p>
                  Eppure esistono uomini e donne che il 23 maggio 1992 lo hanno vissuto davvero, che ricordano perfettamente dov'erano quando avvenne la strage di Capaci e che portano ancora dentro immagini e ricordi indelebili di quell'orrore. Non dobbiamo dimenticare che da quegli anni è nato qualcosa: un sistema antimafia che ha trasformato il dolore in strumenti concreti. Come ricordato poc'anzi la confisca dei beni, il reato di associazione mafiosa, la collaborazione dei pentiti, le procure specializzate, la cooperazione tra magistratura e forze dell'ordine, misure nate dal sangue di chi ha combattuto la mafia in prima linea e che hanno permesso allo Stato di colpire sia i singoli criminali sia l'intera struttura economica e politica di Cosa Nostra.
                </p>
                <p>
                  Questo modello, costruito a caro prezzo, è oggi uno dei più avanzati al mondo. E non riguarda soltanto l'Italia: la criminalità organizzata agisce su scala globale, investe denaro in diversi Paesi e sfrutta le debolezze degli Stati. Combatterla richiede cooperazione internazionale, e richiede che l'esperienza italiana, nata dal sacrificio di magistrati come Giovanni Falcone e Paolo Borsellino, diventi un riferimento condiviso.
                </p>
                <p className="text-lg font-medium text-foreground">
                  Ma tutto parte da qui, da una scelta individuale e collettiva: informarsi, capire, non tacere. Perché, come sappiamo, la mafia uccide. E il silenzio pure.
                </p>
              </div>

              <footer className="mt-10 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground italic">— {authors}</p>
              </footer>
            </div>
          </motion.article>
        </div>
      </section>

      <Footer />
    </div>
  );
}
