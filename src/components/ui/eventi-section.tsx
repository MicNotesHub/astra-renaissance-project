import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock, ArrowRight, BookOpen } from "lucide-react";
import { useState } from "react";

export const EventiSection = () => {
  const [activeView, setActiveView] = useState("prossimi");

  const eventiProssimi = [
    {
      title: "Career Day 2024",
      date: "15 Marzo 2024",
      time: "09:00 - 18:00",
      location: "Aula Magna Bocconi",
      description: "Incontra le migliori aziende del settore e scopri opportunità di stage e lavoro",
      attendees: 250,
      type: "Networking",
      featured: true
    },
    {
      title: "Workshop: Excel Avanzato",
      date: "22 Marzo 2024", 
      time: "14:30 - 17:30",
      location: "Lab Informatica A3",
      description: "Masterclass su funzioni avanzate, pivot e automazione in Excel",
      attendees: 45,
      type: "Workshop",
      featured: false
    },
    {
      title: "Conferenza: Sostenibilità nel Business",
      date: "28 Marzo 2024",
      time: "18:00 - 20:00", 
      location: "Aula N01",
      description: "Esperti internazionali discutono il futuro sostenibile delle aziende",
      attendees: 180,
      type: "Conferenza",
      featured: true
    }
  ];

  const eventiPassati = [
    {
      title: "Presentazione ASTRA 2024",
      date: "10 Gennaio 2024",
      location: "Aula Magna",
      description: "Presentazione del nuovo team e degli obiettivi per l'anno",
      attendees: 300,
      recap: "Disponibile",
      photos: 25
    },
    {
      title: "Networking Aperitivo",
      date: "5 Febbraio 2024",
      location: "Terrazza Bocconi",
      description: "Evento di networking informale con studenti e alumni",
      attendees: 120,
      recap: "Disponibile", 
      photos: 40
    }
  ];

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
            {eventiProssimi.map((evento, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`glass-card premium-shadow hover:shadow-glow transition-all duration-300 group ${evento.featured ? 'ring-2 ring-primary/20' : ''}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant={evento.featured ? "default" : "secondary"}>
                            {evento.type}
                          </Badge>
                          {evento.featured && (
                            <Badge variant="outline" className="text-primary border-primary">
                              In Evidenza
                            </Badge>
                          )}
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
                          <span>{evento.date}</span>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <Clock className="h-5 w-5 text-primary" />
                          <span>{evento.time}</span>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <MapPin className="h-5 w-5 text-primary" />
                          <span>{evento.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <Users className="h-5 w-5 text-primary" />
                          <span>{evento.attendees} partecipanti registrati</span>
                        </div>
                      </div>
                      
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
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Eventi Passati */}
        {activeView === "passati" && (
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {eventiPassati.map((evento, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="glass-card premium-shadow hover:shadow-glow transition-all duration-300 group">
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {evento.title}
                    </CardTitle>
                    <CardDescription>{evento.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{evento.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{evento.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Users className="h-4 w-4 text-primary" />
                        <span>{evento.attendees} partecipanti</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Recap Evento
                      </Button>
                      <Button variant="outline" size="sm">
                        📸 Foto ({evento.photos})
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
