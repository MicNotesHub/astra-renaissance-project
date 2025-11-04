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
import { Calculator, MapPin, Trophy, Heart, AlertCircle, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { ExchangeDestinationCard } from "@/components/ui/exchange-destination-card";

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

interface NCMax {
  id: number;
  course: string;
  NC_MAX: number;
}

interface Destination {
  ID: number;
  University: string;
  Continent: string;
  'SLOTS 2024/25': number;
  'Highest Score': string;
  'Lowest Score': string;
  'ADDITIONAL ACADEMIC REQUIREMENTS': string;
  'ADDITIONAL LANGUAGE REQUIREMENT': string;
  NOTES: string;
}

interface ExamGrade {
  subject: string;
  grade: number;
  cfu: number;
  isSeminar: boolean;
}

interface CalculatorInputs {
  course: string;
  bachelorGrade: number;
  exams: ExamGrade[];
  useEstimatedValues: boolean;
  waMultiplier?: number;
  cfuMultiplier?: number;
}

const ExchangeCalculator = () => {
  const { toast } = useToast();
  const [courses, setCourses] = useState<string[]>([]);
  const [courseSubjects, setCourseSubjects] = useState<Course[]>([]);
  const [multipliers, setMultipliers] = useState<Multiplier[]>([]);
  const [ncMaxData, setNCMaxData] = useState<NCMax[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [inputs, setInputs] = useState<CalculatorInputs>({
    course: '',
    bachelorGrade: 110,
    exams: [],
    useEstimatedValues: true
  });
  const [exchangeScore, setExchangeScore] = useState<number | null>(null);
  const [favoriteDestinations, setFavoriteDestinations] = useState<number[]>([]);
  const [selectedContinent, setSelectedContinent] = useState<string>('');
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

      // Fetch multipliers
      const { data: multipliersData, error: multipliersError } = await supabase
        .from('course multipliers estimation' as any)
        .select('*')
        .order('course');
      
      if (multipliersError) throw multipliersError;
      setMultipliers(multipliersData as any || []);

      // Fetch NC_max data
      const { data: ncMaxData, error: ncMaxError } = await supabase
        .from('NC_max' as any)
        .select('*')
        .order('course');
      
      if (ncMaxError) throw ncMaxError;
      setNCMaxData(ncMaxData as any || []);

      // Fetch destinations
      const { data: destinationsData, error: destinationsError } = await supabase
        .from('dest_exc_msc' as any)
        .select('*')
        .order('University');
      
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
        .from('cours-subject_MS_exchange')
        .select('*')
        .eq('course', courseName)
        .order('subject');
      
      if (error) throw error;
      setCourseSubjects(data || []);
      
      // Initialize exams array with course subjects
      const initialExams = (data || []).map(subject => ({
        subject: subject.subject,
        grade: 0, // Start with 0 to calculate NC Achieved correctly
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

  const calculateExchangeScore = () => {
    if (!inputs.course || inputs.exams.length === 0) {
      toast({
        title: "Dati mancanti",
        description: "Seleziona un corso e inserisci i voti degli esami",
        variant: "destructive"
      });
      return;
    }

    // Validate manual multipliers if not using estimated values
    if (!inputs.useEstimatedValues && (!inputs.waMultiplier || !inputs.cfuMultiplier)) {
      toast({
        title: "Dati mancanti",
        description: "Inserisci i moltiplicatori WA e CFU",
        variant: "destructive"
      });
      return;
    }

    try {
      // Include seminars and regular passed exams  
      // Include seminars and regular exams with grades ≥18
      const passedExams = inputs.exams.filter(exam => 
        exam.isSeminar || exam.grade >= 18
      );
      
      // Calculate student's WA (Weighted Average) - only for non-seminar exams with grade ≥18
      const nonSeminarExams = passedExams.filter(exam => 
        !exam.isSeminar && exam.grade >= 18
      );
      const totalCredits = nonSeminarExams.reduce((sum, exam) => sum + exam.cfu, 0);
      const weightedSum = nonSeminarExams.reduce((sum, exam) => {
        // Convert 30L to 31 for calculation
        const gradeValue = exam.grade === 31 ? 31 : exam.grade;
        return sum + (gradeValue * exam.cfu);
      }, 0);
      const studentWA = totalCredits > 0 ? weightedSum / totalCredits : 0;

      // Calculate NC Achieved (sum of CFU with grade >= 18 OR seminars)
      const ncAchieved = passedExams.reduce((sum, exam) => sum + exam.cfu, 0);

      // Get Max NC for the course
      const maxNCData = ncMaxData.find(nc => nc.course === inputs.course);
      const maxNC = maxNCData?.NC_MAX || courseSubjects.reduce((sum, subject) => sum + subject.cfu, 0);

      // Get multipliers
      let waMultiplier, cfuMultiplier;
      
      if (inputs.useEstimatedValues) {
        const courseMultiplier = multipliers.find(m => m.course === inputs.course);
        waMultiplier = courseMultiplier?.['GPA mult.'] || 1;
        cfuMultiplier = courseMultiplier?.['NC mult'] || 1;
      } else {
        waMultiplier = inputs.waMultiplier || 1;
        cfuMultiplier = inputs.cfuMultiplier || 1;
      }

      // Apply the formula based on whether using estimated values or not
      let score;
      if (inputs.useEstimatedValues) {
        // Formula with estimated values
        score = (
          ((studentWA * waMultiplier) / 31) * 0.5 +
          ((ncAchieved * cfuMultiplier) / maxNC) * 0.2 +
          (inputs.bachelorGrade / 111) * 0.3
        ) * 1000;
      } else {
        // Formula without estimated values
        score = (
          ((studentWA * waMultiplier) / 31) * 0.5 +
          ((ncAchieved * cfuMultiplier) / maxNC) * 0.2 +
          (inputs.bachelorGrade / 111) * 0.3
        ) * 1000;
      }
      
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

  const updateExamGrade = (index: number, field: keyof ExamGrade, value: any) => {
    const updatedExams = [...inputs.exams];
    updatedExams[index] = { ...updatedExams[index], [field]: value };
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
      
      acc[continent].push({
        ...dest,
        minScore,
        maxScore,
        delta
      });
      
      return acc;
    }, {} as Record<string, any[]>);

    // Sort destinations within each continent by delta descending (highest delta first)
    Object.keys(grouped).forEach(continent => {
      grouped[continent].sort((a, b) => b.delta - a.delta);
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
                  id="useEstimatedValues"
                  checked={inputs.useEstimatedValues}
                  onCheckedChange={(checked) => setInputs(prev => ({ ...prev, useEstimatedValues: checked }))}
                />
                <Label htmlFor="useEstimatedValues">Usa valori stimati (raccomandato)</Label>
              </div>

              {!inputs.useEstimatedValues && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                  <div className="space-y-2">
                    <Label htmlFor="waMultiplier">WA Multiplier</Label>
                    <Input
                      id="waMultiplier"
                      type="number"
                      step="0.01"
                      placeholder="es. 1.0"
                      value={inputs.waMultiplier || ''}
                      onChange={(e) => setInputs(prev => ({ ...prev, waMultiplier: parseFloat(e.target.value) }))}
                    />
                    <p className="text-xs text-muted-foreground">{'>'} 1 = corso difficile, {'<'} 1 = corso facile</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cfuMultiplier">CFU Multiplier</Label>
                    <Input
                      id="cfuMultiplier"
                      type="number"
                      step="0.01"
                      placeholder="es. 1.0"
                      value={inputs.cfuMultiplier || ''}
                      onChange={(e) => setInputs(prev => ({ ...prev, cfuMultiplier: parseFloat(e.target.value) }))}
                    />
                    <p className="text-xs text-muted-foreground">{'>'} 1 = corso difficile, {'<'} 1 = corso facile</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {inputs.course && courseSubjects.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Voti degli Esami</CardTitle>
                <p className="text-sm text-muted-foreground">Inserisci i voti da 18 a 31 per gli esami superati</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  {inputs.exams.map((exam, index) => (
                    <div key={`exam-${index}-${exam.subject}`} className="space-y-3 p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{exam.subject}</p>
                          <p className="text-xs text-muted-foreground">{exam.cfu} CFU</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`seminar-${index}`}
                            checked={exam.isSeminar}
                            onCheckedChange={(checked) => {
                              const updatedExams = [...inputs.exams];
                              updatedExams[index] = { 
                                ...updatedExams[index], 
                                isSeminar: checked,
                                grade: checked ? 0 : updatedExams[index].grade
                              };
                              setInputs(prev => ({ ...prev, exams: updatedExams }));
                            }}
                          />
                          <Label htmlFor={`seminar-${index}`} className="text-sm text-muted-foreground cursor-pointer">Seminario</Label>
                        </div>
                      </div>
                      
                      {!exam.isSeminar && (
                        <div className="space-y-2">
                          <Label htmlFor={`grade-${index}`}>Voto</Label>
                          <Select
                            value={exam.grade > 0 ? exam.grade.toString() : ""}
                            onValueChange={(value) => updateExamGrade(index, 'grade', parseInt(value) || 0)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleziona voto" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 14 }, (_, i) => i + 18).map((grade) => (
                                <SelectItem key={grade} value={grade.toString()}>
                                  {grade === 31 ? "30L" : grade.toString()}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      
                      <div className="text-center">
                        {exam.isSeminar ? (
                          <Badge variant="secondary">Seminario completato</Badge>
                        ) : exam.grade === 0 ? (
                          <Badge variant="outline">Non sostenuto</Badge>
                        ) : exam.grade < 18 ? (
                          <Badge variant="destructive">Non superato</Badge>
                        ) : (
                          <Badge variant={exam.grade >= 27 ? "default" : exam.grade >= 24 ? "secondary" : "outline"}>
                            {exam.grade >= 27 ? "Ottimo" : exam.grade >= 24 ? "Buono" : "Sufficiente"}
                          </Badge>
                        )}
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

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Destinazioni Exchange
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="continent">Seleziona Continente</Label>
                    <Select value={selectedContinent} onValueChange={setSelectedContinent}>
                      <SelectTrigger>
                        <SelectValue placeholder="Scegli un continente" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(destinationsByContinent).map(continent => (
                          <SelectItem key={continent} value={continent}>{continent}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                   {Object.entries(destinationsByContinent).map(([continent, dests]) => (
                     <div key={continent} className="space-y-3 mb-6">
                       <h3 className="text-lg font-semibold flex items-center gap-2">
                         <Users className="h-4 w-4" />
                         {continent}
                       </h3>
                       <div className="grid gap-3">
                         {dests.map((dest: any) => (
                           <ExchangeDestinationCard
                             key={dest.ID}
                             destination={dest}
                             isFavorite={favoriteDestinations.includes(dest.ID)}
                             onToggleFavorite={toggleFavorite}
                             variant="msc"
                           />
                         ))}
                       </div>
                     </div>
                   ))}
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExchangeCalculator;