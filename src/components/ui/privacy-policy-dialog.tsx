import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PrivacyPolicyDialogProps {
  children: React.ReactNode;
}

export function PrivacyPolicyDialog({ children }: PrivacyPolicyDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Privacy Policy di www.astrabocconi.com</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6 text-sm">
            <p>
              Per avere informazioni circa i tuoi dati personali raccolti, le finalità ed i soggetti con cui i dati vengono condivisi, contatta il Titolare.
            </p>
            <p>
              Per avere più informazioni e conoscere i tuoi diritti puoi anche visualizzare la versione completa di questa privacy policy, tramite il collegamento in basso a destra.
            </p>

            <div>
              <h3 className="font-semibold text-base mb-2">Informazioni di contatto</h3>
              <h4 className="font-medium mb-1">Titolare del Trattamento dei Dati</h4>
              <p>Per maggiori informazioni sul titolare, contattare il seguente indirizzo email:</p>
              <p className="font-medium">Indirizzo email del Titolare: info@astrabocconi.com</p>
            </div>

            <p className="text-xs text-muted-foreground">
              iubenda ospita questo contenuto e raccoglie solo i Dati Personali strettamente necessari alla sua fornitura.
            </p>

            <div>
              <h3 className="font-semibold text-base mb-2">Tipologie di Dati raccolti</h3>
              <p>Il Titolare non fornisce una lista di tipologie di Dati Personali raccolti.</p>
              <p>
                Dettagli completi su ciascuna tipologia di Dati Personali raccolti sono forniti nelle sezioni dedicate di questa privacy policy o mediante specifici testi informativi visualizzati prima della raccolta dei Dati stessi.
              </p>
              <p>
                I Dati Personali possono essere liberamente forniti dall'Utente o, nel caso di Dati di Utilizzo, raccolti automaticamente durante l'uso di questa Applicazione.
              </p>
              <p>
                Se non diversamente specificato, tutti i Dati richiesti da questa Applicazione sono obbligatori. Se l'Utente rifiuta di comunicarli, potrebbe essere impossibile per questa Applicazione fornire il Servizio.
              </p>
              <p>
                L'eventuale utilizzo di Cookie - o di altri strumenti di tracciamento - da parte di questa Applicazione o dei titolari dei servizi terzi utilizzati da questa Applicazione ha la finalità di fornire il Servizio richiesto dall'Utente, oltre alle ulteriori finalità descritte nel presente documento.
              </p>
              <p>
                L'Utente si assume la responsabilità dei Dati Personali di terzi ottenuti, pubblicati o condivisi mediante questa Applicazione.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">Modalità e luogo del trattamento dei Dati raccolti</h3>
              <h4 className="font-medium mb-1">Modalità di trattamento</h4>
              <p>
                Il Titolare adotta le opportune misure di sicurezza volte ad impedire l'accesso, la divulgazione, la modifica o la distruzione non autorizzate dei Dati Personali.
              </p>
              <p>
                Il trattamento viene effettuato mediante strumenti informatici e/o telematici, con modalità organizzative e con logiche strettamente correlate alle finalità indicate.
              </p>

              <h4 className="font-medium mb-1 mt-3">Luogo</h4>
              <p>
                I Dati sono trattati presso le sedi operative del Titolare ed in ogni altro luogo in cui le parti coinvolte nel trattamento siano localizzate.
              </p>
              <p>
                I Dati Personali dell'Utente potrebbero essere trasferiti in un paese diverso da quello in cui l'Utente si trova.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">Periodo di conservazione</h3>
              <p>
                Se non diversamente indicato in questo documento, i Dati Personali sono trattati e conservati per il tempo richiesto dalla finalità per la quale sono stati raccolti e potrebbero essere conservati per un periodo più lungo a causa di eventuali obbligazioni legali o sulla base del consenso degli Utenti.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">Base giuridica del trattamento</h3>
              <p>Il Titolare tratta Dati Personali relativi all'Utente in caso sussista una delle seguenti condizioni:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>l'Utente ha prestato il consenso per una o più finalità specifiche;</li>
                <li>il trattamento è necessario all'esecuzione di un contratto con l'Utente;</li>
                <li>il trattamento è necessario per adempiere un obbligo legale;</li>
                <li>il trattamento è necessario per l'esecuzione di un compito di interesse pubblico;</li>
                <li>il trattamento è necessario per il perseguimento del legittimo interesse del Titolare o di terzi.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">Diritti dell'Utente sulla base del GDPR</h3>
              <p>Gli Utenti possono esercitare determinati diritti con riferimento ai Dati trattati dal Titolare:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>revocare il consenso</strong> in ogni momento;</li>
                <li><strong>opporsi al trattamento</strong> dei propri Dati;</li>
                <li><strong>accedere ai propri Dati</strong> e ottenere informazioni sul trattamento;</li>
                <li><strong>verificare e chiedere la rettificazione</strong> dei propri Dati;</li>
                <li><strong>ottenere la limitazione del trattamento</strong>;</li>
                <li><strong>ottenere la cancellazione</strong> dei propri Dati Personali;</li>
                <li><strong>ricevere i propri Dati</strong> in formato strutturato;</li>
                <li><strong>proporre reclamo</strong> all'autorità competente.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">Come esercitare i diritti</h3>
              <p>
                Eventuali richieste di esercizio dei diritti dell'Utente possono essere indirizzate al Titolare attraverso i recapiti forniti in questo documento. La richiesta è gratuita e il Titolare risponderà nel più breve tempo possibile, in ogni caso entro un mese.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">Definizioni e riferimenti legali</h3>
              
              <h4 className="font-medium mb-1">Dati Personali (o Dati)</h4>
              <p className="mb-2">
                Costituisce dato personale qualunque informazione che, direttamente o indirettamente, anche in collegamento con qualsiasi altra informazione, renda identificata o identificabile una persona fisica.
              </p>

              <h4 className="font-medium mb-1">Utente</h4>
              <p className="mb-2">
                L'individuo che utilizza questa Applicazione che, salvo ove diversamente specificato, coincide con l'Interessato.
              </p>

              <h4 className="font-medium mb-1">Titolare del Trattamento (o Titolare)</h4>
              <p className="mb-2">
                La persona fisica o giuridica che determina le finalità e i mezzi del trattamento di dati personali. Il Titolare del Trattamento, salvo quanto diversamente specificato, è il titolare di questa Applicazione.
              </p>
            </div>

            <div className="border-t pt-4">
              <p className="text-xs text-muted-foreground mb-2">
                <strong>Ultima modifica:</strong> 17 gennaio 2024
              </p>
              <p className="text-xs text-muted-foreground">
                iubenda ospita questo contenuto e raccoglie solo i Dati Personali strettamente necessari alla sua fornitura.
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}