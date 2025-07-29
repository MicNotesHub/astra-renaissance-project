import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock, ArrowRight, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const EventiSection = () => {
  const [activeView, setActiveView] = useState("prossimi");
  const [eventi, setEventi] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventi = async () => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('id, title, description, event_type, start_date, location, registration_link, status')
          .order('start_date', { ascending: true });

        if (error) {
          console.error('Errore nel caricamento degli eventi:', error);
          return;
        }

        setEventi(data || []);
      } catch (error) {
        console.error('Errore nel caricamento degli eventi:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventi();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const eventiProssimi = eventi.filter(evento => {
    const eventDate = new Date(evento.start_date);
    const today = new Date();
    return eventDate >= today && evento.status === 'upcoming';
  });

  const eventiPassati = eventi.filter(evento => {
    const eventDate = new Date(evento.start_date);
    const today = new Date();
    return eventDate < today || evento.status === 'completed';
  });

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

        {/* View Toggle */}
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

        {/* Eventi Prossimi */}
        {activeView === "prossimi" && (
          <div className="space-y-6 mb-12">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Caricamento eventi...</p>
              </div>
            ) : eventiProssimi.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Nessun evento prossimo disponibile</p>
              </div>
            ) : (
              eventiProssimi.map((evento, index) => (
                <motion.div
                  key={evento.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="glass-card premium-shadow hover:shadow-glow transition-all duration-300 group">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">
                              {evento.event_type}
                            </Badge>
                          </div>
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
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <Calendar className="h-5 w-5 text-primary" />
                            <span>{formatDate(evento.start_date)}</span>
                          </div>
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <Clock className="h-5 w-5 text-primary" />
                            <span>{formatTime(evento.start_date)}</span>
                          </div>
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <MapPin className="h-5 w-5 text-primary" />
                            <span>{evento.location}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col justify-between">
                          <div className="space-y-3">
                            {evento.registration_link ? (
                              <Button 
                                className="w-full group-hover:bg-primary-light transition-colors"
                                onClick={() => window.open(evento.registration_link, '_blank')}
                              >
                                Registrati all'Evento
                              </Button>
                            ) : (
                              <Button 
                                className="w-full group-hover:bg-primary-light transition-colors"
                                disabled
                              >
                                Registrazione non disponibile
                              </Button>
                            )}
                            <Button variant="outline" className="w-full">
                              Aggiungi al Calendario
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        )}

        {/* Eventi Passati */}
        {activeView === "passati" && (
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Caricamento eventi...</p>
              </div>
            ) : eventiPassati.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Nessun evento passato disponibile</p>
              </div>
            ) : (
              eventiPassati.map((evento, index) => (
                <motion.div
                  key={evento.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="glass-card premium-shadow hover:shadow-glow transition-all duration-300 group">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">
                          {evento.event_type}
                        </Badge>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {evento.title}
                      </CardTitle>
                      <CardDescription>{evento.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>{formatDate(evento.start_date)}</span>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{evento.location}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        )}

        {/* CTA per suggerire eventi */}
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
