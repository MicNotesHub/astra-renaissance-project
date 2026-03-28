import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { GraduationCap, Calculator, Target, Plus, Trash2, Info, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

interface Exam {
  id: string;
  name: string;
  grade: number | '';
  credits: number | '';
  isSeminar: boolean;
}

export function MscGraduationCalculator() {
  const [exams, setExams] = useState<Exam[]>([
    { id: '1', name: '', grade: '', credits: '', isSeminar: false },
  ]);
  const [thesisPoints, setThesisPoints] = useState<number>(0);
  const [bonusPoints, setBonusPoints] = useState<number>(0);

  const addExam = () => {
    setExams([...exams, {
      id: Date.now().toString(),
      name: '',
      grade: '',
      credits: '',
      isSeminar: false,
    }]);
  };

  const removeExam = (id: string) => {
    if (exams.length > 1) {
      setExams(exams.filter(e => e.id !== id));
    }
  };

  const updateExam = (id: string, field: keyof Exam, value: string | number | boolean) => {
    setExams(exams.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const calculateResults = () => {
    const validExams = exams.filter(e =>
      e.credits !== '' && Number(e.credits) > 0 &&
      (e.isSeminar || (e.grade !== '' && Number(e.grade) >= 18))
    );

    const totalCredits = exams.reduce((sum, e) => sum + (e.credits !== '' ? Number(e.credits) : 0), 0);
    const completedCredits = validExams.reduce((sum, e) => sum + Number(e.credits), 0);

    const gradedExams = validExams.filter(e => !e.isSeminar && e.grade !== '' && Number(e.grade) >= 18);

    let gpa = 0;
    if (gradedExams.length > 0) {
      const gradedCredits = gradedExams.reduce((sum, e) => sum + Number(e.credits), 0);
      const weightedSum = gradedExams.reduce((sum, e) => {
        const gradeValue = Number(e.grade) === 31 ? 31 : Number(e.grade);
        return sum + (gradeValue * Number(e.credits));
      }, 0);
      gpa = gradedCredits > 0 ? weightedSum / gradedCredits : 0;
    }

    const baseScore = gpa > 0 ? (gpa * 110) / 30 : 0;
    const rawFinal = baseScore + thesisPoints + bonusPoints;
    const finalScore = rawFinal >= 110.5 ? 111 : Math.min(110, rawFinal);

    return {
      gpa: Number(gpa.toFixed(2)),
      baseScore: Number(baseScore.toFixed(1)),
      finalScore: Number(finalScore.toFixed(1)),
      totalCredits,
      completedCredits,
      completedExams: validExams.length,
    };
  };

  const results = calculateResults();
  const hasData = results.completedExams > 0;

  const getGradeColor = (grade: number) => {
    if (grade >= 105) return "text-green-600 dark:text-green-400";
    if (grade >= 100) return "text-blue-600 dark:text-blue-400";
    if (grade >= 95) return "text-yellow-600 dark:text-yellow-400";
    return "text-muted-foreground";
  };

  const scrollToExams = () => {
    const el = document.getElementById('msc-exams-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* GPA Card */}
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">GPA</h3>
                  <Tooltip>
                    <TooltipTrigger><Info className="h-3.5 w-3.5 text-muted-foreground" /></TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Media ponderata dei voti per i crediti di ciascun esame. "30 e lode" viene convertito a 31 per il calcolo.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-primary">
                    {hasData ? results.gpa : '--'}
                  </div>
                  <div className="text-sm text-muted-foreground">su 30</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Base Score Card */}
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Punteggio Base</h3>
                  <Tooltip>
                    <TooltipTrigger><Info className="h-3.5 w-3.5 text-muted-foreground" /></TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Conversione della media in centodecimi: (GPA / 30) × 110</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-muted-foreground">
                    {hasData ? results.baseScore : '--'}
                  </div>
                  <div className="text-sm text-muted-foreground">su 110</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Final Score Card */}
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Voto di Laurea</h3>
                  <Tooltip>
                    <TooltipTrigger><Info className="h-3.5 w-3.5 text-muted-foreground" /></TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Punteggio base + punti tesi + bonus. Se ≥ 110.5 → 110 e Lode.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="space-y-1">
                  <div className={`text-3xl font-bold ${hasData ? getGradeColor(results.finalScore) : 'text-muted-foreground'}`}>
                    {hasData ? (results.finalScore >= 111 ? '110L' : results.finalScore) : '--'}
                  </div>
                  <div className="text-sm text-muted-foreground">su 110</div>
                  {hasData && results.finalScore >= 111 && (
                    <Badge className="mt-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Eligible for 110 e Lode ✨
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Info */}
        <div className="flex items-center justify-between bg-muted/50 rounded-lg p-4">
          <div className="flex gap-6 text-sm">
            <div>
              <span className="text-muted-foreground">Esami inseriti: </span>
              <span className="font-medium">{results.completedExams}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Crediti: </span>
              <span className="font-medium">{results.completedCredits}/{results.totalCredits || 0}</span>
            </div>
          </div>
          {!hasData && (
            <Button variant="outline" size="sm" onClick={scrollToExams}>
              Inserisci voti <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>

        {/* Thesis & Bonus Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Thesis Points */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <GraduationCap className="h-5 w-5" />
                Punti Tesi
                <Tooltip>
                  <TooltipTrigger><Info className="h-3.5 w-3.5 text-muted-foreground" /></TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Punti assegnati dalla commissione per la tesi di laurea magistrale (0-7 punti).</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-4">
                <Slider
                  value={[thesisPoints]}
                  onValueChange={([v]) => setThesisPoints(v)}
                  min={0}
                  max={7}
                  step={1}
                  className="flex-1"
                />
                <span className="text-xl font-bold text-primary w-8 text-center">{thesisPoints}</span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>7</span>
              </div>
            </CardContent>
          </Card>

          {/* Bonus Points */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Calculator className="h-5 w-5" />
                Bonus Aggiuntivi
                <Tooltip>
                  <TooltipTrigger><Info className="h-3.5 w-3.5 text-muted-foreground" /></TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Bonus per exchange, tirocinio o attività extracurriculari (varia per programma, tipicamente 0-3).</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-4">
                <Slider
                  value={[bonusPoints]}
                  onValueChange={([v]) => setBonusPoints(v)}
                  min={0}
                  max={3}
                  step={1}
                  className="flex-1"
                />
                <span className="text-xl font-bold text-primary w-8 text-center">{bonusPoints}</span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>3</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Exams Input */}
        <Card id="msc-exams-section">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              I tuoi Esami
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exams.map((exam, index) => (
                <motion.div
                  key={exam.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border rounded-lg p-4 bg-card hover:shadow-md transition-shadow"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 mr-2">
                        <Input
                          placeholder="Nome esame"
                          value={exam.name}
                          onChange={(e) => updateExam(exam.id, 'name', e.target.value)}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExam(exam.id)}
                        disabled={exams.length === 1}
                        className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs text-muted-foreground">CFU</Label>
                        <Input
                          type="number"
                          placeholder="Crediti"
                          min="1"
                          max="20"
                          value={exam.credits}
                          onChange={(e) => updateExam(exam.id, 'credits', e.target.value ? Number(e.target.value) : '')}
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Voto</Label>
                        <Select
                          value={exam.grade?.toString() || ""}
                          onValueChange={(value) => {
                            if (value === "no-grade") {
                              updateExam(exam.id, 'grade', '');
                            } else {
                              updateExam(exam.id, 'grade', Number(value));
                            }
                          }}
                          disabled={exam.isSeminar}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={exam.isSeminar ? "Seminario" : "Voto"} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="no-grade">Nessun voto</SelectItem>
                            {Array.from({ length: 14 }, (_, i) => i + 18).map((grade) => (
                              <SelectItem key={grade} value={grade.toString()}>
                                {grade === 31 ? "30L" : grade.toString()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={exam.isSeminar}
                        onCheckedChange={(checked) => {
                          updateExam(exam.id, 'isSeminar', checked);
                          if (checked) updateExam(exam.id, 'grade', '');
                        }}
                      />
                      <Label className="text-xs text-muted-foreground">Seminario (no voto)</Label>
                    </div>

                    {exam.isSeminar && (
                      <div className="text-center p-2 bg-muted rounded-md">
                        <span className="text-xs text-muted-foreground">Seminario - Nessun voto richiesto</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <Button onClick={addExam} variant="outline" className="w-full mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Aggiungi Esame
            </Button>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <div className="text-center text-xs text-muted-foreground bg-muted/50 rounded-lg p-4">
          <p>⚠️ Questo è uno strumento di stima. Il voto finale di laurea è determinato dalla commissione di Bocconi.</p>
          <p className="mt-1">"30 e lode" viene trattato come 31 nel calcolo della media. Voti inferiori a 18 non sono ammessi.</p>
        </div>
      </div>
    </TooltipProvider>
  );
}
