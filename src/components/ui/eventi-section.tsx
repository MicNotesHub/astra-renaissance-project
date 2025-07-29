import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  ArrowRight,
  BookOpen,
} from "lucide-react";

const supabase = createClient("SUPABASE_URL", "SUPABASE_ANON_KEY");

export const EventiSection = () => {
  const [activeView, setActiveView] = useState<"prossimi" | "passati">("prossimi");
  const [eventi, setEventi] = useState<any[]>([]);

  useEffect(() => {
    const fetchEventi = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("start_date", { ascending: true });

      if (!error) setEventi(data || []);
      else console.error("Errore caricamento eventi:", error);
    };

    fetchEventi();
  }, []);

  const now = new Date();
  const eventiProssimi = eventi.filter(
    (e) => e.start_date && new Date(e.start_date) >= now
  );
  const eventiPassati = eventi.filter(
    (e) => e.start_date && new Date(e.start_date) < now
  );

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  const formatTime = (d: string) =>
    new Date(d).toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const renderEventoCard = (evento: any, index: number, isPast = false) => (
    <motion.div
      key={evento.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card
        className={`glass-card premium-shadow hover:shadow-glow transition-all duration-300 group ${
          !isPast && evento.featured ? "ring-2 ring-primary/20" : ""
        }`}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              {evento.event_type && (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{evento.event_type}</Badge>
                </div>
              )}
              <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                {evento.title}
              </CardTitle>
              <CardDescription className="text-base">
                {evento.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <span>{formatDate(evento.start_date)}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <span>{formatTime(evento.start_date)}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{evento.location}</span>
              </div>
              {evento.max_participants && (
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <span>{evento.max_participants} partecipanti registrati</span>
                </div>
              )}
            </div>

            {!isPast && (
              <div className="flex flex-col justify-between">
                <div className="space-y-3">
                  <Button className="w-full group-hover:bg-primary-light transition-colors">
                    Registrati all'Evento
                  </Button>
                  <Button variant="outline" className="w-full">
                    Aggiungi al Calendario
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <section id="eventi" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 hero-text">
            📅 Eventi e Conferenze
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Partecipa agli eventi ASTRA. Workshop, conferenze e networking per arricchire la tua esperienza universitaria.
          </p>
        </motion.div>

        {/* Toggle Prossimi/Passati */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="glass-card p-1 rounded-lg inline-flex">
            <Button
              variant={activeView === "prossimi" ? "default" : "ghost"}
              onClick={() => setActiveView("prossimi")}
              className="rounded-md"
            >
              Prossimi Eventi
            </Button>
            <Button
              variant={activeView === "passati" ? "default" : "ghost"}
              onClick={() => setActiveView("passati")}
              className="rounded-md"
            >
              Eventi Passati
            </Button>
          </div>
        </motion.div>

        {/* Render eventi */}
        {activeView === "prossimi" && (
          <div className="space-y-6 mb-12">
            {eventiProssimi.length > 0 ? (
              eventiProssimi.map((e, i) => renderEventoCard(e, i))
            ) : (
              <p className="text-center text-muted-foreground">Nessun evento in programma</p>
            )}
          </div>
        )}

        {activeView === "passati" && (
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {eventiPassati.length > 0 ? (
              eventiPassati.map((e, i) => renderEventoCard(e, i, true))
            ) : (
              <p className="text-center text-muted-foreground">Nessun evento passato</p>
            )}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <Card className="glass-card premium-shadow max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Hai un'idea per un evento?</h3>
              <p className="text-muted-foreground mb-6">
                Suggerisci workshop, conferenze o eventi che vorresti vedere organizzati da ASTRA!
              </p>
              <Button className="flex items-center gap-2">
                Proponi un Evento
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
