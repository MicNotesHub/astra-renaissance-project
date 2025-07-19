import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, TrendingUp, Target } from "lucide-react";
import { motion } from "framer-motion";

interface Exam {
  id: string;
  name: string;
  grade: number | '';
  credits: number | '';
}

export function GPACalculator() {
  const [exams, setExams] = useState<Exam[]>([
    { id: '1', name: 'Matematica Generale', grade: '', credits: '' }
  ]);

  const addExam = () => {
    setExams([...exams, { 
      id: Date.now().toString(), 
      name: '', 
      grade: '', 
      credits: '' 
    }]);
  };

  const removeExam = (id: string) => {
    setExams(exams.filter(exam => exam.id !== id));
  };

  const updateExam = (id: string, field: keyof Exam, value: string | number) => {
    setExams(exams.map(exam => 
      exam.id === id ? { ...exam, [field]: value } : exam
    ));
  };

  const calculateGPA = () => {
    const validExams = exams.filter(exam => 
      exam.grade !== '' && exam.credits !== '' && 
      exam.grade > 0 && exam.credits > 0
    );

    if (validExams.length === 0) return { gpa: 0, totalCredits: 0, weightedSum: 0 };

    const totalCredits = validExams.reduce((sum, exam) => sum + Number(exam.credits), 0);
    const weightedSum = validExams.reduce((sum, exam) => 
      sum + (Number(exam.grade) * Number(exam.credits)), 0
    );
    
    const gpa = weightedSum / totalCredits;
    
    return { gpa, totalCredits, weightedSum };
  };

  const { gpa, totalCredits } = calculateGPA();

  const getGPAColor = (gpa: number) => {
    if (gpa >= 28) return "text-green-600";
    if (gpa >= 25) return "text-yellow-600";
    return "text-red-600";
  };

  const getGPALabel = (gpa: number) => {
    if (gpa >= 29) return "Eccellente";
    if (gpa >= 27) return "Ottimo";
    if (gpa >= 25) return "Buono";
    if (gpa >= 23) return "Discreto";
    return "Sufficiente";
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Calcolatore GPA</h1>
        <p className="text-muted-foreground">Calcola la tua media ponderata e monitora i tuoi progressi</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                I tuoi esami
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {exams.map((exam, index) => (
                <motion.div
                  key={exam.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="grid grid-cols-12 gap-3 items-center p-3 border rounded-lg"
                >
                  <div className="col-span-5">
                    <Label className="sr-only">Nome esame</Label>
                    <Input
                      placeholder="Nome esame"
                      value={exam.name}
                      onChange={(e) => updateExam(exam.id, 'name', e.target.value)}
                    />
                  </div>
                  <div className="col-span-3">
                    <Label className="sr-only">Voto</Label>
                    <Input
                      type="number"
                      placeholder="Voto"
                      min="18"
                      max="30"
                      value={exam.grade}
                      onChange={(e) => updateExam(exam.id, 'grade', e.target.value ? Number(e.target.value) : '')}
                    />
                  </div>
                  <div className="col-span-3">
                    <Label className="sr-only">Crediti</Label>
                    <Input
                      type="number"
                      placeholder="Crediti"
                      min="1"
                      max="15"
                      value={exam.credits}
                      onChange={(e) => updateExam(exam.id, 'credits', e.target.value ? Number(e.target.value) : '')}
                    />
                  </div>
                  <div className="col-span-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExam(exam.id)}
                      disabled={exams.length === 1}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
              
              <Button onClick={addExam} variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Aggiungi Esame
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">La tua media</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className={`text-4xl font-bold ${getGPAColor(gpa)}`}>
                    {gpa > 0 ? gpa.toFixed(2) : '--'}
                  </div>
                  <Badge variant="secondary" className="mt-2">
                    {gpa > 0 ? getGPALabel(gpa) : 'Inserisci voti'}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Crediti totali:</span>
                    <span className="font-medium">{totalCredits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Esami inseriti:</span>
                    <span className="font-medium">
                      {exams.filter(e => e.grade !== '' && e.credits !== '').length}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="h-5 w-5" />
                Obiettivi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                {[
                  { target: 27, label: "Per la lode" },
                  { target: 25, label: "Per borsa studio" },
                  { target: 24, label: "Per exchange" }
                ].map((goal) => {
                  const diff = goal.target - gpa;
                  const isAchieved = gpa >= goal.target;
                  
                  return (
                    <div key={goal.target} className="flex justify-between items-center text-sm">
                      <span>{goal.label}</span>
                      <Badge variant={isAchieved ? "default" : "outline"}>
                        {isAchieved ? "✓ Raggiunto" : `+${diff.toFixed(1)}`}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}