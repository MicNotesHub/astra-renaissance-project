import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Calculator, MapPin, Trophy, Heart, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Course {
  id: number;
  course: string;
  subject: string;
  cfu: number;
}

interface Multiplier {
  id: number;
  course: string;
  'GPA mult.': number;
  'NC mult': number;
}

interface Destination {
  ID: number;
  University: string;
  Continent: string;
  'SLOTS 2024/25': number;
  'Highest Score': string;
  'Lowest Score': string;
  'OF WHICH': string;
  Rankings: string;
  'ADDITIONAL ACADEMIC REQUIREMENTS': string;
  'ADDITIONAL LANGUAGE REQUIREMENT': string;
  NOTES: string;
}

interface ExamGrade {
  subject: string;
  grade: number;
  cfu: number;
}

interface CalculatorInputs {
  course: string;
  bachelorGrade: number;
  exams: ExamGrade[];
  useEstimation: boolean;
  manualWA?: number;
  manualNC?: number;
  manualWAMultiplier?: number;
  manualNCMultiplier?: number;
}

const ExchangeCalculator = () => {
  const { toast } = useToast();
  const [courses, setCourses] = useState<string[]>([]);
  const [courseSubjects, setCourseSubjects] = useState<Course[]>([]);
  const [multipliers, setMultipliers] = useState<Multiplier[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [inputs, setInputs] = useState<CalculatorInputs>({
    course: '',
    bachelorGrade: 110,
    exams: [],
    useEstimation: true
  });
  const [exchangeScore, setExchangeScore] = useState<number | null>(null);
  const [favoriteDestinations, setFavoriteDestinations] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (inputs.course) {
      fetchCourseSubjects(inputs.course);
    }
  }, [inputs.course]);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      
      // Fetch unique courses
      const { data: coursesData, error: coursesError } = await supabase
        .from('cours-subject_MS_exchange')
        .select('course')
        .order('course');
      
      if (coursesError) throw coursesError;
      
      const uniqueCourses = [...new Set(coursesData?.map(item => item.course) || [])];
      setCourses(uniqueCourses);

      // Mock data per ora finché non risolviamo l'accesso alle tabelle
      const mockMultipliers = [
        { id: 1, course: 'Management', 'GPA mult.': 1.07, 'NC mult': 0.83 },
        { id: 2, course: 'International Management', 'GPA mult.': 0.97, 'NC mult': 0.96 },
        { id: 3, course: 'Marketing Management', 'GPA mult.': 1.05, 'NC mult': 0.88 },
        { id: 4, course: 'AFC', 'GPA mult.': 1.46, 'NC mult': -0.02 },
        { id: 5, course: 'FIN', 'GPA mult.': 0.64, 'NC mult': 1.82 }
      ];
      setMultipliers(mockMultipliers);

      const mockDestinations = [
        {
          ID: 1,
          University: '2168 - Central European University, Graduate programs',
          Continent: 'Europe',
          'SLOTS 2024/25': 3,
          'Highest Score': '933.042',
          'Lowest Score': '880.926',
          'OF WHICH': 'DSBA(1)',
          Rankings: '',
          'ADDITIONAL ACADEMIC REQUIREMENTS': '',
          'ADDITIONAL LANGUAGE REQUIREMENT': '',
          NOTES: ''
        },
        {
          ID: 2,
          University: '823 - WU - Wirtschaftsuniversität Wien',
          Continent: 'Europe',
          'SLOTS 2024/25': 4,
          'Highest Score': '970.774',
          'Lowest Score': '927.913',
          'OF WHICH': 'IM(2), CLELI(1)',
          Rankings: '',
          'ADDITIONAL ACADEMIC REQUIREMENTS': '',
          'ADDITIONAL LANGUAGE REQUIREMENT': '',
          NOTES: ''
        }
      ];
      setDestinations(mockDestinations);

    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Errore",
        description: "Errore nel caricamento dei dati",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseSubjects = async (courseName: string) => {
    try {
      const { data, error } = await supabase
        .from('cours-subject_MS_exchange')
        .select('*')
        .eq('course', courseName)
        .order('subject');
      
      if (error) throw error;
      setCourseSubjects(data || []);
      
      // Initialize exams array with course subjects
      const initialExams = (data || []).map(subject => ({
        subject: subject.subject,
        grade: 30,
        cfu: subject.cfu
      }));
      
      setInputs(prev => ({ ...prev, exams: initialExams }));
      
    } catch (error) {
      console.error('Error fetching course subjects:', error);
      toast({
        title: "Errore",
        description: "Errore nel caricamento delle materie del corso",
        variant: "destructive"
      });
    }
  };

  const calculateExchangeScore = () => {
    if (!inputs.course || inputs.exams.length === 0) {
      toast({
        title: "Dati mancanti",
        description: "Seleziona un corso e inserisci i voti degli esami",
        variant: "destructive"
      });
      return;
    }

    try {
      // Calculate student's WA (Weighted Average)
      const totalCredits = inputs.exams.reduce((sum, exam) => sum + exam.cfu, 0);
      const weightedSum = inputs.exams.reduce((sum, exam) => sum + (exam.grade * exam.cfu), 0);
      const studentWA = weightedSum / totalCredits;

      // Calculate student's NC (Number of Credits)
      const studentNC = totalCredits;

      // Get multipliers for the course
      const courseMultiplier = multipliers.find(m => m.course === inputs.course);
      
      let waMultiplier, ncMultiplier;
      
      if (inputs.useEstimation && courseMultiplier) {
        waMultiplier = courseMultiplier['GPA mult.'];
        ncMultiplier = courseMultiplier['NC mult'];
      } else {
        waMultiplier = inputs.manualWAMultiplier || 1;
        ncMultiplier = inputs.manualNCMultiplier || 1;
      }

      // Calculate max NC for the course
      const maxNC = courseSubjects.reduce((sum, subject) => sum + subject.cfu, 0);

      // Apply the formula
      const waComponent = ((studentWA * waMultiplier) / 31) * 0.5;
      const ncComponent = ((studentNC * ncMultiplier) / maxNC) * 0.2;
      const bachelorComponent = (inputs.bachelorGrade / 111) * 0.3;
      
      const score = (waComponent + ncComponent + bachelorComponent) * 1000;
      
      setExchangeScore(Math.round(score));
      
      toast({
        title: "Calcolo completato!",
        description: `Il tuo Exchange Score è: ${Math.round(score)}`,
      });

    } catch (error) {
      console.error('Error calculating score:', error);
      toast({
        title: "Errore nel calcolo",
        description: "Si è verificato un errore durante il calcolo",
        variant: "destructive"
      });
    }
  };

  const updateExamGrade = (index: number, grade: number) => {
    const updatedExams = [...inputs.exams];
    updatedExams[index].grade = grade;
    setInputs(prev => ({ ...prev, exams: updatedExams }));
  };

  const getDestinationsByContinent = () => {
    if (!exchangeScore) return {};
    
    const grouped = destinations.reduce((acc, dest) => {
      const continent = dest.Continent || 'Other';
      if (!acc[continent]) acc[continent] = [];
      
      const minScore = parseFloat(dest['Lowest Score']?.replace(',', '.') || '0');
      const maxScore = parseFloat(dest['Highest Score']?.replace(',', '.') || '0');
      const delta = exchangeScore - minScore;
      const acceptanceRate = minScore > 0 ? Math.min(100, Math.max(0, (delta / minScore) * 100)) : 0;
      
      acc[continent].push({
        ...dest,
        minScore,
        maxScore,
        delta,
        acceptanceRate
      });
      
      return acc;
    }, {} as Record<string, any[]>);

    // Sort destinations within each continent by acceptance rate
    Object.keys(grouped).forEach(continent => {
      grouped[continent].sort((a, b) => b.acceptanceRate - a.acceptanceRate);
    });

    return grouped;
  };

  const toggleFavorite = (destId: number) => {
    setFavoriteDestinations(prev => 
      prev.includes(destId) 
        ? prev.filter(id => id !== destId)
        : [...prev, destId]
    );
  };

  const destinationsByContinent = getDestinationsByContinent();

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-3">
          <Calculator className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Exchange Calculator MSc</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Calcola il tuo Exchange Score e scopri le destinazioni disponibili per il tuo semestre all'estero
        </p>
      </motion.div>

      <Tabs defaultValue="input" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="input">Inserimento Dati</TabsTrigger>
          <TabsTrigger value="results" disabled={!exchangeScore}>
            Risultati {exchangeScore && `(${exchangeScore})`}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informazioni di Base</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="course">Corso di Laurea MSc</Label>
                  <Select value={inputs.course} onValueChange={(value) => setInputs(prev => ({ ...prev, course: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona il tuo corso" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map(course => (
                        <SelectItem key={course} value={course}>{course}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bachelorGrade">Voto Laurea Triennale</Label>
                  <Input
                    id="bachelorGrade"
                    type="number"
                    min="66"
                    max="110"
                    value={inputs.bachelorGrade}
                    onChange={(e) => setInputs(prev => ({ ...prev, bachelorGrade: parseInt(e.target.value) }))}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="useEstimation"
                  checked={inputs.useEstimation}
                  onCheckedChange={(checked) => setInputs(prev => ({ ...prev, useEstimation: checked }))}
                />
                <Label htmlFor="useEstimation">Usa i valori stimati (raccomandato)</Label>
              </div>

              {!inputs.useEstimation && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                  <div className="space-y-2">
                    <Label htmlFor="manualWAMultiplier">Moltiplicatore WA</Label>
                    <Input
                      id="manualWAMultiplier"
                      type="number"
                      step="0.01"
                      value={inputs.manualWAMultiplier || ''}
                      onChange={(e) => setInputs(prev => ({ ...prev, manualWAMultiplier: parseFloat(e.target.value) }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manualNCMultiplier">Moltiplicatore NC</Label>
                    <Input
                      id="manualNCMultiplier"
                      type="number"
                      step="0.01"
                      value={inputs.manualNCMultiplier || ''}
                      onChange={(e) => setInputs(prev => ({ ...prev, manualNCMultiplier: parseFloat(e.target.value) }))}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {inputs.course && courseSubjects.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Voti degli Esami</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  {inputs.exams.map((exam, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{exam.subject}</p>
                        <p className="text-xs text-muted-foreground">{exam.cfu} CFU</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`grade-${index}`}>Voto</Label>
                        <Input
                          id={`grade-${index}`}
                          type="number"
                          min="18"
                          max="31"
                          value={exam.grade}
                          onChange={(e) => updateExamGrade(index, parseInt(e.target.value))}
                        />
                      </div>
                      <div className="text-center">
                        <Badge variant={exam.grade >= 27 ? "default" : exam.grade >= 24 ? "secondary" : "destructive"}>
                          {exam.grade >= 27 ? "Ottimo" : exam.grade >= 24 ? "Buono" : "Sufficiente"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />
                
                <Button onClick={calculateExchangeScore} className="w-full" size="lg">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calcola Exchange Score
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {exchangeScore && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Il Tuo Exchange Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">{exchangeScore}</div>
                    <p className="text-muted-foreground">Su 1000 punti possibili</p>
                  </div>
                </CardContent>
              </Card>

              {Object.entries(destinationsByContinent).map(([continent, destinations]) => (
                <Card key={continent}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      {continent}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {destinations.slice(0, 10).map((dest: any) => (
                        <div key={dest.ID} className="border rounded-lg p-4 space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold">{dest.University}</h3>
                              {dest.Rankings && (
                                <p className="text-sm text-muted-foreground">{dest.Rankings}</p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleFavorite(dest.ID)}
                            >
                              <Heart className={`h-4 w-4 ${favoriteDestinations.includes(dest.ID) ? 'fill-current text-red-500' : ''}`} />
                            </Button>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="font-medium">Posti Disponibili</p>
                              <p>{dest['SLOTS 2024/25'] || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="font-medium">Punteggio Minimo</p>
                              <p>{dest.minScore}</p>
                            </div>
                            <div>
                              <p className="font-medium">Delta</p>
                              <p className={dest.delta >= 0 ? 'text-green-600' : 'text-red-600'}>
                                {dest.delta > 0 ? '+' : ''}{dest.delta}
                              </p>
                            </div>
                            <div>
                              <p className="font-medium">Acceptance Rate</p>
                              <Badge variant={dest.acceptanceRate > 50 ? "default" : dest.acceptanceRate > 20 ? "secondary" : "destructive"}>
                                {Math.round(dest.acceptanceRate)}%
                              </Badge>
                            </div>
                          </div>

                          {(dest['ADDITIONAL ACADEMIC REQUIREMENTS'] || dest['ADDITIONAL LANGUAGE REQUIREMENT'] || dest.NOTES) && (
                            <div className="text-xs text-muted-foreground space-y-1">
                              {dest['ADDITIONAL ACADEMIC REQUIREMENTS'] && (
                                <div className="flex items-center gap-1">
                                  <AlertCircle className="h-3 w-3" />
                                  <span>Requisiti: {dest['ADDITIONAL ACADEMIC REQUIREMENTS']}</span>
                                </div>
                              )}
                              {dest['ADDITIONAL LANGUAGE REQUIREMENT'] && (
                                <div className="flex items-center gap-1">
                                  <AlertCircle className="h-3 w-3" />
                                  <span>Lingue: {dest['ADDITIONAL LANGUAGE REQUIREMENT']}</span>
                                </div>
                              )}
                              {dest.NOTES && (
                                <div className="flex items-center gap-1">
                                  <AlertCircle className="h-3 w-3" />
                                  <span>Note: {dest.NOTES}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExchangeCalculator;