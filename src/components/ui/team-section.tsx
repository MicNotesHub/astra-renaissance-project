import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Mail, Linkedin, MessageCircle, Users } from "lucide-react";
import { useState } from "react";

export const TeamSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrgano, setSelectedOrgano] = useState("tutti");

  const teamMembers = [
    {
      name: "Marco Rossi",
      role: "Presidente ASTRA",
      organo: "Direttivo",
      year: "3° Anno",
      course: "BIEM",
      bio: "Appassionato di innovazione e tecnologia, coordina le attività della rappresentanza studentesca",
      image: "/lovable-uploads/79a8e832-7749-4713-905f-e6adaa18938c.png",
      contacts: {
        email: "marco.rossi@studbocconi.it",
        linkedin: "marco-rossi-bocconi",
        unilink: "@marcorossi"
      },
      expertise: ["Leadership", "Innovazione", "Networking"]
    },
    {
      name: "Sofia Chen",
      role: "Vice Presidente",
      organo: "Direttivo", 
      year: "2° Anno",
      course: "BESS",
      bio: "Responsabile delle relazioni esterne e coordinamento eventi",
      image: "/lovable-uploads/b01b09dd-7caf-43e1-9dc2-a6d5e15349fd.png",
      contacts: {
        email: "sofia.chen@studbocconi.it",
        linkedin: "sofia-chen-bocconi",
        unilink: "@sofiachen"
      },
      expertise: ["Eventi", "Relazioni Esterne", "Comunicazione"]
    },
    {
      name: "Alessandro Bianchi",
      role: "Rappresentante Lauree Triennali",
      organo: "Consiglio di Scuola",
      year: "3° Anno",
      course: "CLEAM",
      bio: "Rappresenta gli studenti triennali nelle decisioni accademiche",
      image: "/lovable-uploads/79a8e832-7749-4713-905f-e6adaa18938c.png",
      contacts: {
        email: "alessandro.bianchi@studbocconi.it",
        linkedin: "alessandro-bianchi",
        unilink: "@alessandrobianchi"
      },
      expertise: ["Didattica", "Advocacy", "Policy"]
    },
    {
      name: "Emma Martinez",
      role: "Coordinatrice Dispense",
      organo: "Progetti Speciali",
      year: "2° Anno", 
      course: "BIG",
      bio: "Gestisce la piattaforma dispense e coordina i tutor",
      image: "/lovable-uploads/b01b09dd-7caf-43e1-9dc2-a6d5e15349fd.png",
      contacts: {
        email: "emma.martinez@studbocconi.it",
        linkedin: "emma-martinez",
        unilink: "@emmamartinez"
      },
      expertise: ["Tutoring", "Gestione Contenuti", "Support"]
    },
    {
      name: "Luca Ferrari",
      role: "Responsabile Tecnologia",
      organo: "Progetti Speciali",
      year: "1° Anno",
      course: "BIEM",
      bio: "Sviluppo e manutenzione delle piattaforme digitali ASTRA",
      image: "/lovable-uploads/79a8e832-7749-4713-905f-e6adaa18938c.png",
      contacts: {
        email: "luca.ferrari@studbocconi.it",
        linkedin: "luca-ferrari-dev",
        unilink: "@lucaferrari"
      },
      expertise: ["Sviluppo", "AI", "Tech Innovation"]
    },
    {
      name: "Giulia Romano",
      role: "Social Media Manager", 
      organo: "Comunicazione",
      year: "2° Anno",
      course: "BESS",
      bio: "Gestisce i canali social e la comunicazione digitale",
      image: "/lovable-uploads/b01b09dd-7caf-43e1-9dc2-a6d5e15349fd.png",
      contacts: {
        email: "giulia.romano@studbocconi.it",
        linkedin: "giulia-romano-social",
        unilink: "@giuliaromano"
      },
      expertise: ["Social Media", "Content Creation", "Branding"]
    }
  ];

  const organi = ["tutti", "Direttivo", "Consiglio di Scuola", "Progetti Speciali", "Comunicazione"];

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOrgano = selectedOrgano === "tutti" || member.organo === selectedOrgano;
    return matchesSearch && matchesOrgano;
  });

  return (
    <section id="team" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 hero-text">
            🧑‍💻 Il Nostro Team
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conosci i rappresentanti che lavorano per migliorare la tua esperienza universitaria. Un team diversificato con competenze complementari.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cerca per nome, ruolo o corso..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2 items-center">
            <Filter className="h-4 w-4 text-muted-foreground" />
            {organi.map((organo) => (
              <Button
                key={organo}
                variant={selectedOrgano === organo ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedOrgano(organo)}
                className="capitalize"
              >
                {organo}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="glass-card premium-shadow hover:shadow-glow transition-all duration-300 group h-full">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium">{member.role}</p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {member.course}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {member.year}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground text-center">
                      {member.bio}
                    </p>

                    <div className="flex flex-wrap gap-1 justify-center">
                      {member.expertise.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-center gap-2 pt-2">
                      <Button size="sm" variant="outline" className="p-2">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="p-2">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="p-2">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">Nessun membro trovato con i filtri attuali.</p>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <Card className="glass-card premium-shadow max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">12</div>
                  <div className="text-sm text-muted-foreground">Rappresentanti Attivi</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">4</div>
                  <div className="text-sm text-muted-foreground">Organi Rappresentati</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">8</div>
                  <div className="text-sm text-muted-foreground">Corsi di Laurea</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">2000+</div>
                  <div className="text-sm text-muted-foreground">Studenti Rappresentati</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};