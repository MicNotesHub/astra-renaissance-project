import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Calculator, MapPin, TrendingUp, Users } from "lucide-react";
import { ExchangeDestinationCard } from "@/components/ui/exchange-destination-card";

interface StudyPlanCourse {
  id: number;
  course: string;
  cfu: number;
}

interface ExchangeDestination {
  id: number;
  uni: string;
  country: string;
  state: string;
  codice: number;
  highest: number;
  lowest: number;
}

interface ExamGrade {
  course: string;
  cfu: number;
  grade: number;
}

export default function ExchangeCalculatorCLMG() {
  const [studyPlan, setStudyPlan] = useState<StudyPlanCourse[]>([]);
  const [destinations, setDestinations] = useState<ExchangeDestination[]>([]);
  const [examGrades, setExamGrades] = useState<ExamGrade[]>([]);
  const [selectedContinent, setSelectedContinent] = useState<string>("");
  const [isFourthYear, setIsFourthYear] = useState<boolean>(false);
  const [exchangeScore, setExchangeScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch study plan using PostgREST query
      const studyPlanResponse = await fetch(
        `https://jsuzhbspinevkzmhibop.supabase.co/rest/v1/CLMG_studyplan?order=course`,
        {
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzdXpoYnNwaW5ldmt6bWhpYm9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NzUwODksImV4cCI6MjA2ODM1MTA4OX0.uyD-7O2usT7wHJBG7yf2_QgxdEREnR7ZH8Nz2_ZVBd4',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzdXpoYnNwaW5ldmt6bWhpYm9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NzUwODksImV4cCI6MjA2ODM1MTA4OX0.uyD-7O2usT7wHJBG7yf2_QgxdEREnR7ZH8Nz2_ZVBd4',
            'Content-Type': 'application/json'
          }
        }
      );

      if (!studyPlanResponse.ok) {
        toast({
          title: "Errore",
          description: "Impossibile caricare il piano di studi",
          variant: "destructive",
        });
        return;
      }

      // Fetch destinations using PostgREST query
      const destinationsResponse = await fetch(
        `https://jsuzhbspinevkzmhibop.supabase.co/rest/v1/CLMG_destinations_exchange?order=uni`,
        {
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzdXpoYnNwaW5ldmt6bWhpYm9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NzUwODksImV4cCI6MjA2ODM1MTA4OX0.uyD-7O2usT7wHJBG7yf2_QgxdEREnR7ZH8Nz2_ZVBd4',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzdXpoYnNwaW5ldmt6bWhpYm9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NzUwODksImV4cCI6MjA2ODM1MTA4OX0.uyD-7O2usT7wHJBG7yf2_QgxdEREnR7ZH8Nz2_ZVBd4',
            'Content-Type': 'application/json'
          }
        }
      );

      if (!destinationsResponse.ok) {
        toast({
          title: "Errore",
          description: "Impossibile caricare le destinazioni",
          variant: "destructive",
        });
        return;
      }

      const studyPlanData = await studyPlanResponse.json() as StudyPlanCourse[];
      const destinationsData = await destinationsResponse.json() as ExchangeDestination[];

      const studyPlan = studyPlanData as StudyPlanCourse[];
      const destinations = destinationsData as ExchangeDestination[];
      
      setStudyPlan(studyPlan || []);
      setDestinations(destinations || []);
      
      // Initialize exam grades
      const initialGrades = (studyPlan || []).map(course => ({
        course: course.course,
        cfu: course.cfu,
        grade: 0
      }));
      setExamGrades(initialGrades);

    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Errore",
        description: "Errore nel caricamento dei dati",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateExamGrade = (course: string, grade: number) => {
    setExamGrades(prev => 
      prev.map(exam => 
        exam.course === course ? { ...exam, grade } : exam
      )
    );
  };

  const calculateExchangeScore = () => {
    const validGrades = examGrades.filter(exam => exam.grade > 0);
    
    if (validGrades.length === 0) {
      setExchangeScore(0);
      return;
    }

    const totalWeightedGrades = validGrades.reduce((sum, exam) => sum + (exam.grade * exam.cfu), 0);
    const totalCFU = validGrades.reduce((sum, exam) => sum + exam.cfu, 0);
    
    let weightedAverage = totalWeightedGrades / totalCFU;
    
    // Add 0.1 if fourth year student
    if (isFourthYear) {
      weightedAverage += 0.1;
    }
    
    setExchangeScore(weightedAverage);
  };

  useEffect(() => {
    calculateExchangeScore();
  }, [examGrades, isFourthYear]);

  const getDestinationsByContinent = () => {
    if (!selectedContinent) return [];
    
    return destinations
      .filter(dest => dest.country === selectedContinent)
      .map(dest => ({
        ...dest,
        delta: exchangeScore - dest.lowest
      }))
      .sort((a, b) => b.delta - a.delta); // Sort by delta descending (best matches first)
  };

  const getUniqueCountries = () => {
    const countries = destinations.map(dest => dest.country).filter(Boolean);
    return [...new Set(countries)].sort();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Caricamento dati...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Calculator className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Exchange Calculator CLMG</h1>
        </div>
        <p className="text-muted-foreground">
          Calcola il tuo punteggio Exchange per il corso di Giurisprudenza
        </p>
      </div>

      <Tabs defaultValue="input" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="input">Inserimento Dati</TabsTrigger>
          <TabsTrigger value="results">Risultati</TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Configurazione
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="fourth-year"
                  checked={isFourthYear}
                  onCheckedChange={setIsFourthYear}
                />
                <Label htmlFor="fourth-year">
                  Sono uno studente del 4° anno (+0.1 al punteggio)
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inserisci i tuoi voti</CardTitle>
              <CardDescription>
                Inserisci i voti degli esami sostenuti. I CFU sono già precompilati.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {examGrades.map((exam, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <Label className="font-medium">{exam.course}</Label>
                      <p className="text-sm text-muted-foreground">{exam.cfu} CFU</p>
                    </div>
                    <div className="w-24">
                      <Input
                        type="number"
                        min="18"
                        max="30"
                        placeholder="Voto"
                        value={exam.grade || ""}
                        onChange={(e) => updateExamGrade(exam.course, parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Il tuo Exchange Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-6 bg-muted rounded-lg">
                <div className="text-4xl font-bold text-primary mb-2">
                  {exchangeScore.toFixed(2)}
                </div>
                <p className="text-muted-foreground">
                  Media pesata{isFourthYear ? " (+0.1 per 4° anno)" : ""}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Destinazioni Exchange
              </CardTitle>
              <CardDescription>
                Seleziona un continente per vedere le destinazioni disponibili
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={selectedContinent} onValueChange={setSelectedContinent}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona un continente" />
                </SelectTrigger>
                <SelectContent>
                  {getUniqueCountries().map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedContinent && (
                <div className="space-y-4">
                  <Separator />
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Destinazioni in {selectedContinent}
                  </h3>
                  
                  {getDestinationsByContinent().length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      Nessuna destinazione trovata per questo continente.
                    </p>
                  ) : (
                    <div className="grid gap-4">
                      {getDestinationsByContinent().map((destination) => (
                        <ExchangeDestinationCard
                          key={destination.id}
                          destination={destination}
                          variant="clmg"
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}