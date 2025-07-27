import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Download, Search, Filter, Upload } from "lucide-react";
import { useState } from "react";
export const DispensenSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("tutti");
  const dispense = [{
    title: "Matematica Generale",
    description: "Dispensa completa con esercizi svolti",
    course: "Matematica",
    year: "1° Anno",
    downloads: 145,
    uploadDate: "2024-01-15"
  }, {
    title: "Microeconomia - Teoria del Consumatore",
    description: "Capitoli 1-5 con grafici e esempi",
    course: "Economia",
    year: "1° Anno",
    downloads: 98,
    uploadDate: "2024-01-12"
  }, {
    title: "Diritto Commerciale - Società",
    description: "Focus su SPA e SRL",
    course: "Diritto",
    year: "2° Anno",
    downloads: 67,
    uploadDate: "2024-01-10"
  }];
  const filters = ["tutti", "1° Anno", "2° Anno", "3° Anno"];
  const filteredDispense = dispense.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "tutti" || item.year === selectedFilter;
    return matchesSearch && matchesFilter;
  });
  return <section id="dispensen" className="py-20 bg-gradient-subtle">
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
            📚 Dispense e Guide
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Accedi alle risorse di studio condivise dalla community. Trova dispense, riassunti e guide per ogni corso.
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
      }} className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Cerca per materia o titolo..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
          
          <div className="flex gap-2 items-center">
            <Filter className="h-4 w-4 text-muted-foreground" />
            {filters.map(filter => <Button key={filter} variant={selectedFilter === filter ? "default" : "outline"} size="sm" onClick={() => setSelectedFilter(filter)} className="capitalize">
                {filter}
              </Button>)}
          </div>

          
        </motion.div>

        {/* Dispense Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDispense.map((item, index) => <motion.div key={index} initial={{
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
              <Card className="glass-card premium-shadow hover:shadow-glow transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <BookOpen className="h-8 w-8 text-primary mb-2" />
                    <Badge variant="secondary">{item.year}</Badge>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {item.title}
                  </CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Corso: {item.course}</span>
                      <span>{item.downloads} download</span>
                    </div>
                    
                    <Button className="w-full flex items-center gap-2 group-hover:bg-primary-light transition-colors">
                      <Download className="h-4 w-4" />
                      Scarica PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>)}
        </div>

        {filteredDispense.length === 0 && <motion.div initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} viewport={{
        once: true
      }} className="text-center py-12">
            <p className="text-muted-foreground">Nessuna dispensa trovata con i filtri attuali.</p>
          </motion.div>}
      </div>
    </section>;
};