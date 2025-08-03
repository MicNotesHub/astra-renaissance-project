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
import { Calculator, MapPin, Trophy, Heart, GraduationCap, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface CourseUG {
  id: number;
  course: string;
  subject: string;
  cfu: number;
}

interface MultiplierUG {
  id: number;
  course: string;
  multiplier: number;
}

interface DestinationUG {
  id: number;
  uni_name: string;
  continent: string;
  min_score: number;
  max_score: number;
  sel_details: string;
}

interface ExamGradeUG {
  subject: string;
  grade: number;
  cfu: number;
  isSeminar: boolean;
}

interface CalculatorInputsUG {
  course: string;
  exams: ExamGradeUG[];
}

const ExchangeCalculatorUG = () => {
  const { toast } = useToast();
  const [courses, setCourses] = useState<string[]>([]);
  const [courseSubjects, setCourseSubjects] = useState<CourseUG[]>([]);
  const [multipliers, setMultipliers] = useState<MultiplierUG[]>([]);
  const [destinations, setDestinations] = useState<DestinationUG[]>([]);
  const [inputs, setInputs] = useState<CalculatorInputsUG>({
    course: '',
    exams: []
  });
  const [exchangeScore, setExchangeScore] = useState<number | null>(null);
  const [totalCFU, setTotalCFU] = useState<number>(0);
  const [gpa, setGPA] = useState<number>(0);
  const [favoriteDestinations, setFavoriteDestinations] = useState<number[]>([]);
  const [selectedContinent, setSelectedContinent] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const minimumCFURequired = 35.400; // CFU minimi richiesti per UG

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (inputs.course) {
      fetchCourseSubjects(inputs.course);
    }
  }, [inputs.course]);

  useEffect(() => {
    calculateScores();
  }, [inputs.exams]);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      
      // Fetch unique courses from course-multiplier_UG table
      const { data: coursesData, error: coursesError } = await supabase
        .from('course-multiplier_UG' as any)
        .select('course')
        .order('course');
      
      if (coursesError) throw coursesError;
      
      const uniqueCourses = [...new Set(coursesData?.map((item: any) => item.course) || [])];
      setCourses(uniqueCourses);

      // Fetch multipliers
      const { data: multipliersData, error: multipliersError } = await supabase
        .from('course-multiplier_UG' as any)
        .select('*')
        .order('course');
      
      if (multipliersError) throw multipliersError;
      setMultipliers(multipliersData as any || []);

      // Fetch destinations
      const { data: destinationsData, error: destinationsError } = await supabase
        .from('UG_exchange_destinations' as any)
        .select('*')
        .order('uni_name');
      
      if (destinationsError) throw destinationsError;
      setDestinations(destinationsData as any || []);

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
        .from('course_subjects_UG' as any)
        .select('*')
        .eq('course', courseName)
        .order('subject');
      
      if (error) throw error;
      setCourseSubjects(data as any || []);
      
      // Initialize exams array with course subjects
      const initialExams = (data || []).map((subject: any) => ({
        subject: subject.subject,
        grade: 0,
        cfu: subject.cfu,
        isSeminar: false
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

  const calculateScores = () => {
    if (inputs.exams.length === 0) {
      setTotalCFU(0);
      setGPA(0);
      setExchangeScore(null);
      return;
    }

    // Calculate total CFU for passed exams (grade > 0)
    const passedExams = inputs.exams.filter(exam => exam.grade > 0);
    const calculatedTotalCFU = passedExams.reduce((sum, exam) => sum + exam.cfu, 0);
    setTotalCFU(calculatedTotalCFU);

    // Calculate GPA (weighted average)
    if (passedExams.length > 0) {
      const totalCredits = passedExams.reduce((sum, exam) => sum + exam.cfu, 0);
      const weightedSum = passedExams.reduce((sum, exam) => sum + (exam.grade * exam.cfu), 0);
      const calculatedGPA = totalCredits > 0 ? weightedSum / totalCredits : 0;
      setGPA(calculatedGPA);

      // Calculate Exchange Score if course is selected
      if (inputs.course) {
        const courseMultiplier = multipliers.find(m => m.course === inputs.course);
        const multiplier = courseMultiplier?.multiplier || 1;
        
        // Exchange Score = GPA * Multiplier + (Total CFU – Minimum CFU Required)
        const score = (calculatedGPA * multiplier) + (calculatedTotalCFU - minimumCFURequired);
        setExchangeScore(Math.max(0, Math.round(score * 100) / 100)); // Round to 2 decimal places
      }
    } else {
      setGPA(0);
      setExchangeScore(null);
    }
  };

  const updateExamGrade = (index: number, grade: number) => {
    const updatedExams = [...inputs.exams];
    updatedExams[index].grade = grade;
    setInputs(prev => ({ ...prev, exams: updatedExams }));
  };

  const updateExamSeminar = (index: number, isSeminar: boolean) => {
    const updatedExams = [...inputs.exams];
    updatedExams[index].isSeminar = isSeminar;
    setInputs(prev => ({ ...prev, exams: updatedExams }));
  };

  const getDestinationsByContinent = () => {
    if (!exchangeScore) return {};
    
    const grouped = destinations.reduce((acc, dest) => {
      const continent = dest.continent || 'Other';
      if (!acc[continent]) acc[continent] = [];
      
      const isEligible = exchangeScore >= (dest.min_score || 0);
      const delta = exchangeScore - (dest.min_score || 0);
      
      acc[continent].push({
        ...dest,
        isEligible,
        delta
      });
      
      return acc;
    }, {} as Record<string, any[]>);

    // Sort destinations within each continent by delta (ascending)
    Object.keys(grouped).forEach(continent => {
      grouped[continent].sort((a, b) => a.delta - b.delta); // Lower delta first (ascending)
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
  const continents = Object.keys(destinationsByContinent);
  const filteredDestinations = selectedContinent 
    ? { [selectedContinent]: destinationsByContinent[selectedContinent] }
    : destinationsByContinent;

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-3">
          <GraduationCap className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Exchange Calculator UG</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Calcola il tuo Exchange Score per l'Undergraduate e scopri le destinazioni disponibili per il tuo semestre all'estero
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
          {/* Score Summary Card */}
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Riepilogo Punteggi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">CFU Totali</p>
                  <p className="text-2xl font-bold">{totalCFU}</p>
                  <p className="text-xs text-muted-foreground">/ {minimumCFURequired} richiesti</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">GPA</p>
                  <p className="text-2xl font-bold">{gpa.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">/ 31</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Exchange Score</p>
                  <p className="text-2xl font-bold text-primary">{exchangeScore || 0}</p>
                  <p className="text-xs text-muted-foreground">aggiornato in tempo reale</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Corso di Laurea</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="course">Corso di Laurea UG</Label>
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
            </CardContent>
          </Card>

          {inputs.course && courseSubjects.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Voti degli Esami</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Inserisci i voti su 31. Lascia 0 per gli esami non ancora sostenuti.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  {inputs.exams.map((exam, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-4 border rounded-lg bg-card">
                      <div>
                        <p className="font-medium text-sm">{exam.subject}</p>
                        <p className="text-xs text-muted-foreground">{exam.cfu} CFU</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`grade-${index}`}>Voto</Label>
                        <Input
                          id={`grade-${index}`}
                          type="number"
                          min="0"
                          max="31"
                          value={exam.grade}
                          onChange={(e) => updateExamGrade(index, parseInt(e.target.value) || 0)}
                          className="text-center"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`seminar-${index}`}
                          checked={exam.isSeminar}
                          onCheckedChange={(checked) => updateExamSeminar(index, checked)}
                        />
                        <Label htmlFor={`seminar-${index}`} className="text-sm">Seminario</Label>
                      </div>

                      <div className="text-center">
                        {exam.grade === 0 ? (
                          <Badge variant="outline">Non sostenuto</Badge>
                        ) : exam.isSeminar ? (
                          <Badge variant="secondary">Seminario</Badge>
                        ) : (
                          <Badge variant={exam.grade >= 27 ? "default" : exam.grade >= 24 ? "secondary" : "destructive"}>
                            {exam.grade >= 27 ? "Ottimo" : exam.grade >= 24 ? "Buono" : "Sufficiente"}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {exchangeScore !== null && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Il Tuo Exchange Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold text-primary mb-2">{exchangeScore}</div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">GPA</p>
                        <p className="font-semibold">{gpa.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">CFU Totali</p>
                        <p className="font-semibold">{totalCFU}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Multiplier</p>
                        <p className="font-semibold">{multipliers.find(m => m.course === inputs.course)?.multiplier || 1}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Destinazioni Exchange
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="continent">Filtra per Continente</Label>
                    <Select value={selectedContinent} onValueChange={setSelectedContinent}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tutti i continenti" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Tutti i continenti</SelectItem>
                        {continents.map(continent => (
                          <SelectItem key={continent} value={continent}>{continent}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-6">
                    {Object.entries(filteredDestinations).map(([continent, dests]) => (
                      <div key={continent} className="space-y-3">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          {continent}
                        </h3>
                        <div className="grid gap-3">
                          {dests.map((dest: any) => (
                            <Card key={dest.id} className={`relative ${dest.isEligible ? 'border-green-200 bg-green-50/50' : 'border-red-200 bg-red-50/50'}`}>
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <h4 className="font-semibold">{dest.uni_name}</h4>
                                      <Badge variant={dest.isEligible ? "default" : "destructive"}>
                                        {dest.isEligible ? "Eligible" : "Non Eligible"}
                                      </Badge>
                                    </div>
                                    
                                    <div className="text-sm text-muted-foreground space-y-1">
                                      <p><strong>Punteggio richiesto:</strong> {dest.min_score || 'N/A'} - {dest.max_score || 'N/A'}</p>
                                      {dest.sel_details && (
                                        <p><strong>Dettagli:</strong> {dest.sel_details}</p>
                                      )}
                                      {dest.isEligible && (
                                        <p className="text-green-600">
                                          <strong>Surplus:</strong> +{dest.delta.toFixed(2)} punti
                                        </p>
                                      )}
                                      {!dest.isEligible && dest.delta < 0 && (
                                        <p className="text-red-600">
                                          <strong>Mancano:</strong> {Math.abs(dest.delta).toFixed(2)} punti
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleFavorite(dest.id)}
                                    className="ml-4"
                                  >
                                    <Heart className={`h-4 w-4 ${favoriteDestinations.includes(dest.id) ? 'fill-red-500 text-red-500' : ''}`} />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExchangeCalculatorUG;