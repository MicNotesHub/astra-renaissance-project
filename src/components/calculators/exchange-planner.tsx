import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Clock, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

interface ExchangeData {
  university: string;
  country: string;
  duration: string;
  housing: string;
  courses: Course[];
}

interface Course {
  id: string;
  name: string;
  credits: number;
  equivalent: string;
}

const universities = [
  { name: "LSE - London School of Economics", country: "Regno Unito", avgCost: 15000 },
  { name: "HEC Paris", country: "Francia", avgCost: 8000 },
  { name: "INSEAD", country: "Francia", avgCost: 12000 },
  { name: "IE Business School", country: "Spagna", avgCost: 10000 },
  { name: "Copenhagen Business School", country: "Danimarca", avgCost: 9000 },
  { name: "WHU Otto Beisheim School", country: "Germania", avgCost: 7000 }
];

export function ExchangePlanner() {
  const [exchangeData, setExchangeData] = useState<ExchangeData>({
    university: '',
    country: '',
    duration: '',
    housing: '',
    courses: []
  });

  const [newCourse, setNewCourse] = useState({
    name: '',
    credits: '',
    equivalent: ''
  });

  const addCourse = () => {
    if (newCourse.name && newCourse.credits && newCourse.equivalent) {
      setExchangeData(prev => ({
        ...prev,
        courses: [...prev.courses, {
          id: Date.now().toString(),
          name: newCourse.name,
          credits: Number(newCourse.credits),
          equivalent: newCourse.equivalent
        }]
      }));
      setNewCourse({ name: '', credits: '', equivalent: '' });
    }
  };

  const removeCourse = (id: string) => {
    setExchangeData(prev => ({
      ...prev,
      courses: prev.courses.filter(course => course.id !== id)
    }));
  };

  const calculateCosts = () => {
    const selectedUni = universities.find(uni => uni.name === exchangeData.university);
    const baseCost = selectedUni?.avgCost || 0;
    
    const housingMultiplier = {
      'dormitory': 1,
      'apartment': 1.3,
      'homestay': 1.1
    }[exchangeData.housing] || 1;

    const durationMultiplier = {
      'semester': 0.5,
      'year': 1,
      'summer': 0.2
    }[exchangeData.duration] || 0.5;

    const totalCost = baseCost * housingMultiplier * durationMultiplier;
    
    return {
      tuition: baseCost * durationMultiplier,
      housing: baseCost * (housingMultiplier - 1) * durationMultiplier,
      total: totalCost
    };
  };

  const costs = calculateCosts();
  const totalCredits = exchangeData.courses.reduce((sum, course) => sum + course.credits, 0);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Exchange Planner</h1>
        <p className="text-muted-foreground">Pianifica il tuo semestre all'estero e calcola crediti e costi</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Planning Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Dettagli Exchange
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="university">Università di Destinazione</Label>
                <Select value={exchangeData.university} onValueChange={(value) => 
                  setExchangeData(prev => ({ 
                    ...prev, 
                    university: value,
                    country: universities.find(uni => uni.name === value)?.country || ''
                  }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona università" />
                  </SelectTrigger>
                  <SelectContent>
                    {universities.map((uni) => (
                      <SelectItem key={uni.name} value={uni.name}>
                        {uni.name} ({uni.country})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="duration">Durata</Label>
                <Select value={exchangeData.duration} onValueChange={(value) => 
                  setExchangeData(prev => ({ ...prev, duration: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona durata" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semester">Semestre (5 mesi)</SelectItem>
                    <SelectItem value="year">Anno accademico (10 mesi)</SelectItem>
                    <SelectItem value="summer">Summer School (2 mesi)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="housing">Tipo di Alloggio</Label>
                <Select value={exchangeData.housing} onValueChange={(value) => 
                  setExchangeData(prev => ({ ...prev, housing: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona alloggio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dormitory">Dormitorio universitario</SelectItem>
                    <SelectItem value="apartment">Appartamento privato</SelectItem>
                    <SelectItem value="homestay">Famiglia ospitante</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Piano di Studi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <Label>Corso all'estero</Label>
                  <Input
                    placeholder="Es. International Finance"
                    value={newCourse.name}
                    onChange={(e) => setNewCourse(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>Crediti</Label>
                  <Input
                    type="number"
                    placeholder="6"
                    value={newCourse.credits}
                    onChange={(e) => setNewCourse(prev => ({ ...prev, credits: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>Equivalenza Bocconi</Label>
                  <Input
                    placeholder="Es. Finanza Aziendale"
                    value={newCourse.equivalent}
                    onChange={(e) => setNewCourse(prev => ({ ...prev, equivalent: e.target.value }))}
                  />
                </div>
              </div>
              
              <Button onClick={addCourse} className="w-full">
                Aggiungi Corso
              </Button>

              <div className="space-y-2">
                {exchangeData.courses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{course.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {course.credits} crediti → {course.equivalent}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCourse(course.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Rimuovi
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Stima Costi
              </CardTitle>
            </CardHeader>
            <CardContent>
              {exchangeData.university ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        €{costs.tuition.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Tasse universitarie</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        €{costs.housing.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Alloggio aggiuntivo</div>
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <div className="text-3xl font-bold text-primary">
                      €{costs.total.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Costo totale stimato</div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    * Stima basata su dati medi. I costi reali possono variare.
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  Seleziona un'università per vedere la stima dei costi
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Riepilogo Crediti
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{totalCredits}</div>
                  <div className="text-sm text-muted-foreground">Crediti totali pianificati</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Crediti minimi richiesti:</span>
                    <Badge variant={totalCredits >= 24 ? "default" : "destructive"}>
                      24 CFU
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Crediti massimi consentiti:</span>
                    <Badge variant={totalCredits <= 36 ? "default" : "destructive"}>
                      36 CFU
                    </Badge>
                  </div>
                </div>

                {totalCredits > 0 && (
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-sm">
                      {totalCredits < 24 && "⚠️ Aggiungi più corsi per raggiungere il minimo"}
                      {totalCredits >= 24 && totalCredits <= 36 && "✅ Piano di studi bilanciato"}
                      {totalCredits > 36 && "⚠️ Troppi crediti, riduci il carico"}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}