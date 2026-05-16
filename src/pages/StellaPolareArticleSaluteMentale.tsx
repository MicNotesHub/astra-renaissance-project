import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import cover from "@/assets/stella-polare-covers/mental-health.jpg";

export default function StellaPolareArticleSaluteMentale() {
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
            <div className="relative w-full aspect-[4/5] sm:aspect-[16/10] overflow-hidden bg-muted">
              <img
                src={cover}
                alt="Mese della prevenzione della salute mentale"
                className="w-full h-full object-contain"
                width={1024}
                height={1280}
              />
            </div>

            <div className="p-8 md:p-14">
              <header className="mb-10">
                <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-3">
                  Maggio 2026 · Mensile
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  Maggio, mese della salute mentale
                </h1>
                <p className="mt-4 text-lg text-muted-foreground italic">
                  Una fragilità diffusa e spesso silenziosa attraversa le nuove generazioni: perché la prevenzione non può più essere rimandata, e quale ruolo hanno scuola, famiglia, istituzioni e diritto nel costruire una vera rete di protezione.
                </p>
              </header>

              <div className="space-y-6 text-foreground/90 leading-relaxed">
                <p>
                  Nel mese dedicato alla prevenzione della salute mentale, diventa inevitabile fermarsi a riflettere su un tema che riguarda sempre più da vicino la società, e in particolare le nuove generazioni. Non si tratta più di un tema confinato agli specialisti, ma di qualcosa che attraversa la quotidianità: la scuola, le relazioni, la crescita. Negli ultimi anni, infatti, questo fenomeno ha assunto una dimensione sempre più evidente, al punto da essere riconosciuto come una delle principali emergenze sanitarie e sociali del nostro tempo. Secondo le stime più recenti, circa un adolescente su cinque manifesta sintomi riconducibili a disturbi mentali, mentre il suicidio rappresenta una delle principali cause di morte nella fascia di età compresa tra i 15 e i 29 anni. Si tratta di dati che non possono essere considerati semplici statistiche, ma che restituiscono l'immagine di una fragilità diffusa, spesso silenziosa, che fatica a emergere e a trovare adeguate forme di ascolto e di intervento.
                </p>

                <p>
                  L'istituzione di un mese dedicato alla prevenzione, pertanto, non ha una funzione meramente simbolica, ma rappresenta un'occasione concreta per portare al centro del dibattito pubblico una questione troppo spesso trascurata. Sensibilizzare l'opinione pubblica, promuovere l'accesso alle informazioni e incentivare il ricorso ai servizi di supporto costituiscono passaggi fondamentali per costruire una cultura della salute mentale fondata sulla consapevolezza e sulla prevenzione.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-2">
                  Oltre l'emergenza: cogliere i segnali
                </h2>
                <p>
                  Di fronte a questi dati, si rischia da un lato di sottovalutare il fenomeno, dall'altro di considerarlo solo quando sfocia in eventi estremi che attirano l'attenzione dei media. In realtà, questa visione è limitante. Nella maggior parte dei casi, infatti, le situazioni di crisi non si manifestano improvvisamente, ma sono precedute da segnali di disagio, talvolta evidenti, talvolta più difficili da cogliere, ma comunque presenti. Il problema, quindi, non risiede soltanto nella gravità degli esiti, quanto nella capacità o, spesso, nell'incapacità del sistema di intercettare tempestivamente tali segnali e di intervenire in modo efficace.
                </p>

                <p>
                  In questo contesto, la salute mentale non può più essere considerata una questione esclusivamente individuale, ma deve essere affrontata come un tema di rilevanza collettiva, che coinvolge l'intero tessuto sociale. Famiglia, scuola, servizi sanitari e istituzioni pubbliche sono chiamati a svolgere un ruolo attivo nella costruzione di una rete di protezione capace di sostenere l'individuo nelle fasi di maggiore vulnerabilità. Tuttavia, tale rete appare spesso frammentata e disomogenea, con conseguenti difficoltà nell'accesso alle cure e nella continuità dei percorsi terapeutici.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-2">
                  La cornice giuridica
                </h2>
                <p>
                  Sotto il profilo giuridico, l'ordinamento italiano riconosce il diritto alla salute come diritto fondamentale dell'individuo, ai sensi dell'articolo 32 della Costituzione, includendo in tale nozione anche la dimensione psichica. Accanto a questo principio generale, esistono strumenti specifici volti alla tutela dei soggetti in condizioni di fragilità, quali l'amministrazione di sostegno o, nei casi più gravi, il trattamento sanitario obbligatorio. Si tratta, tuttavia, di strumenti che intervengono prevalentemente in una fase avanzata del disagio, quando la situazione ha già raggiunto un livello critico. Ne consegue che, pur essendo essenziali, essi non possono rappresentare l'unica risposta del sistema.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-2">
                  Prevenire prima che curare
                </h2>
                <p>
                  Il nodo centrale resta, dunque, quello della prevenzione. Prevenire significa innanzitutto riconoscere il disagio nelle sue manifestazioni iniziali, evitando che esso degeneri in forme più gravi e difficilmente gestibili. Ciò richiede un potenziamento dei servizi territoriali, una maggiore integrazione tra le diverse figure professionali coinvolte e, soprattutto, un cambiamento culturale che consenta di superare lo stigma ancora associato ai disturbi mentali. In questo senso, il mese della prevenzione assume un valore strategico: non solo momento di riflessione, ma anche occasione per promuovere politiche attive e interventi concreti.
                </p>

                <blockquote className="border-l-4 border-primary pl-5 py-2 my-2 bg-muted/40 rounded-r-lg">
                  <p className="italic text-foreground/90">
                    La prevenzione non è solo sanità: è scuola, famiglia, comunità. È un cambiamento culturale che chiede di superare lo stigma.
                  </p>
                </blockquote>

                <p>
                  La prevenzione non può essere intesa esclusivamente in termini sanitari, ma deve essere concepita come un intervento multidimensionale, che tenga conto anche dei fattori sociali, educativi ed economici che incidono sul benessere psichico dell'individuo. In questa prospettiva, la scuola assume un ruolo centrale, non solo come luogo di formazione, ma anche come spazio privilegiato per l'individuazione precoce di situazioni di disagio. Analogamente, la famiglia rappresenta il primo contesto in cui tali segnali possono essere colti e affrontati, purché vi sia un adeguato livello di consapevolezza e di supporto.
                </p>

                <h2 className="text-2xl font-bold text-foreground mt-8 mb-2">
                  Un approccio integrato
                </h2>
                <p className="text-lg font-medium text-foreground">
                  Alla luce di queste considerazioni, appare evidente come la tutela della salute mentale richieda un approccio integrato, capace di coniugare interventi sanitari, strumenti giuridici e responsabilità sociale. I dati relativi alla diffusione del disagio psichico tra i giovani, letti anche alla luce delle iniziative di sensibilizzazione promosse nel mese della prevenzione, impongono una riflessione che vada oltre la dimensione emergenziale, orientandosi verso la costruzione di un sistema realmente in grado di prevenire, prima ancora che curare. Solo attraverso una strategia complessiva e coordinata sarà possibile ridurre il divario tra i bisogni reali della popolazione e le risposte offerte dalle istituzioni, garantendo una tutela effettiva della persona nella sua dimensione più fragile e vulnerabile.
                </p>
              </div>

              <footer className="mt-10 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground italic">— Manfredi Donzelli & Sara Baloshi</p>
              </footer>
            </div>
          </motion.article>
        </div>
      </section>

      <Footer />
    </div>
  );
}
