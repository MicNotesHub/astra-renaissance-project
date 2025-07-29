import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client"; // usa il tuo client corretto
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
} from "lucide-react";

export const EventiSection = () => {
  const [eventi, setEventi] = useState<any[]>([]);
  const [activeView, setActiveView] = useState<"prossimi" | "passati">("prossimi");

  useEffect(() => {
    const fetchEventi = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("start_date", { ascending: true });

      if (!error) setEventi(data || []);
    };

    fetchEventi();
  }, []);

  const now = new Date();
  const prossimi = eventi.filter((e) => new Date(e.start_date) >= now);
  const passati = eventi.filter((e) => new Date(e.start_date) < now);

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

  return (
    <section id="eventi" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Titolo */}
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

        {/* Toggle */}
        <div className="flex justify-center mb-12">
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
        </div>

        {/* Lista eventi */}
        {activeView === "prossimi" && prossimi.map((evento, i) => (
          <motion.div
            key={evento.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <Card className="glass-card premium-shadow mb-6">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex gap-2 mb-2">
                      <Badge variant="secondary">{evento.event_type}</Badge>
                    </div>
                    <CardTitle>{evento.title}</CardTitle>
                    <CardDescription>{evento.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6 text-muted-foreground">
                  <div className="space-y-2">
                    <div className="flex gap-2 items-center">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{formatDate(evento.start_date)}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{formatTime(evento.start_date)}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{evento.location}</span>
                    </div>
                    {evento.max_participants && (
                      <div className="flex gap-2 items-center">
                        <Users className="h-4 w-4 text-primary" />
                        <span>{evento.max_participants} partecipanti</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center gap-3">
                    <Button>Registrati all'Evento</Button>
                    <Button variant="outline">Aggiungi al Calendario</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {activeView === "passati" && passati.map((evento, i) => (
          <motion.div
            key={evento.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <Card className="glass-card premium-shadow mb-6">
              <CardHeader>
                <CardTitle>{evento.title}</CardTitle>
                <CardDescription>{evento.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-2">
                <div className="flex gap-2 items-center">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>{formatDate(evento.start_date)}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{evento.location}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
