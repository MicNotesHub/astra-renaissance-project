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
  const teamMembers = [{
    name: "Marco Andreoli",
    role: "Presidente",
    organo: "Presidenza",
    year: "3° Anno",
    course: "BIEM",
    bio: "Coordina le attività della rappresentanza e mantiene i rapporti istituzionali con l'università",
    image: "/lovable-uploads/79a8e832-7749-4713-905f-e6adaa18938c.png",
    contacts: {
      email: "marco.andreoli@studenti.unibocconi.it",
      linkedin: "marcoandreolix",
      unilink: "@marcoandreolix"
    },
    expertise: ["Leadership", "Relazioni Istituzionali", "Strategia"]
  }, {
    name: "Sofia Chen",
    role: "Vice Presidente",
    organo: "Presidenza",
    year: "2° Anno",
    course: "BESS",
    bio: "Supporta il presidente nelle attività di coordinamento e gestisce i progetti strategici",
    image: "/lovable-uploads/b01b09dd-7caf-43e1-9dc2-a6d5e15349fd.png",
    contacts: {
      email: "sofia.chen@studenti.unibocconi.it",
      linkedin: "sofiachen",
      unilink: "@sofiachen"
    },
    expertise: ["Coordinamento", "Progetti Strategici", "Management"]
  }, {
    name: "Alessandro Martini",
    role: "Responsabile Didattica",
    organo: "Senato Accademico",
    year: "3° Anno",
    course: "BAFIN",
    bio: "Si occupa di questioni didattiche, orari e rapporti con i docenti",
    image: "/lovable-uploads/79a8e832-7749-4713-905f-e6adaa18938c.png",
    contacts: {
      email: "alessandro.martini@studenti.unibocconi.it",
      linkedin: "alessandromartini",
      unilink: "@alemartini"
    },
    expertise: ["Didattica", "Policy Accademica", "Docenza"]
  }, {
    name: "Giulia Romano",
    role: "Responsabile Eventi",
    organo: "Eventi",
    year: "2° Anno",
    course: "WBB",
    bio: "Organizza conferenze, workshop e attività di networking per la community studentesca",
    image: "/lovable-uploads/b01b09dd-7caf-43e1-9dc2-a6d5e15349fd.png",
    contacts: {
      email: "giulia.romano@studenti.unibocconi.it",
      linkedin: "giuliaromano",
      unilink: "@giuliaromano"
    },
    expertise: ["Event Planning", "Networking", "Community Building"]
  }, {
    name: "Matteo Ferrari",
    role: "Responsabile IT & Innovazione",
    organo: "Innovazione",
    year: "3° Anno",
    course: "BEMACS",
    bio: "Gestisce i sistemi digitali, il sito web e sviluppa soluzioni tecnologiche per gli studenti",
    image: "/lovable-uploads/79a8e832-7749-4713-905f-e6adaa18938c.png",
    contacts: {
      email: "matteo.ferrari@studenti.unibocconi.it",
      linkedin: "matteoferrari",
      unilink: "@matteoferrari"
    },
    expertise: ["Sviluppo Web", "AI", "Digital Innovation"]
  }, {
    name: "Elena Rossi",
    role: "Responsabile Comunicazione",
    organo: "Comunicazione",
    year: "2° Anno",
    course: "CLES",
    bio: "Gestisce i social media, la comunicazione istituzionale e le relazioni con i media",
    image: "/lovable-uploads/b01b09dd-7caf-43e1-9dc2-a6d5e15349fd.png",
    contacts: {
      email: "elena.rossi@studenti.unibocconi.it",
      linkedin: "elenarossi",
      unilink: "@elenarossi"
    },
    expertise: ["Social Media", "Comunicazione", "PR"]
  }, {
    name: "Luca Bianchi",
    role: "Responsabile Exchange",
    organo: "Exchange",
    year: "3° Anno",
    course: "BIG",
    bio: "Supporta gli studenti nei programmi di scambio internazionale e nelle partnership estere",
    image: "/lovable-uploads/79a8e832-7749-4713-905f-e6adaa18938c.png",
    contacts: {
      email: "luca.bianchi@studenti.unibocconi.it",
      linkedin: "lucabianchi",
      unilink: "@lucabianchi"
    },
    expertise: ["Exchange Programs", "International Relations", "Mobility"]
  }, {
    name: "Chiara Conti",
    role: "Responsabile Welfare",
    organo: "Welfare",
    year: "2° Anno",
    course: "BIEF",
    bio: "Si occupa del benessere studentesco, servizi di supporto e iniziative per la qualità della vita",
    image: "/lovable-uploads/b01b09dd-7caf-43e1-9dc2-a6d5e15349fd.png",
    contacts: {
      email: "chiara.conti@studenti.unibocconi.it",
      linkedin: "chiaraconti",
      unilink: "@chiaraconti"
    },
    expertise: ["Student Welfare", "Support Services", "Mental Health"]
  }];
  const organi = ["tutti", "Presidenza", "Senato Accademico", "Eventi", "Innovazione", "Comunicazione", "Exchange", "Welfare"];
  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || member.role.toLowerCase().includes(searchTerm.toLowerCase()) || member.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOrgano = selectedOrgano === "tutti" || member.organo === selectedOrgano;
    return matchesSearch && matchesOrgano;
  });
  return <section id="team" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8
      }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 hero-text">
            🧑‍💻 Il Nostro Team
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conosci i rappresentanti che lavorano per migliorare la tua esperienza universitaria. Un team diversificato con competenze complementari.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6,
        delay: 0.2
      }} className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Cerca per nome, ruolo o corso..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
          
          <div className="flex gap-2 items-center">
            <Filter className="h-4 w-4 text-muted-foreground" />
            {organi.map(organo => <Button key={organo} variant={selectedOrgano === organo ? "default" : "outline"} size="sm" onClick={() => setSelectedOrgano(organo)} className="capitalize">
                {organo}
              </Button>)}
          </div>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredMembers.map((member, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: index * 0.1
        }}>
              <Card className="glass-card premium-shadow hover:shadow-glow transition-all duration-300 group h-full">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    
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
                      {member.expertise.map(skill => <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>)}
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
            </motion.div>)}
        </div>

        {filteredMembers.length === 0 && <motion.div initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} viewport={{
        once: true
      }} className="text-center py-12">
            <p className="text-muted-foreground">Nessun membro trovato con i filtri attuali.</p>
          </motion.div>}

      </div>
    </section>;
};