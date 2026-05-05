import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, Calculator, Target, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Subject {
  id: number;
  subject: string;
  cfu: number;
}

interface ExamGrade {
  id: number;
  subject: string;
  cfu: number;
  grade: number | '';
  completed: boolean;
  isSeminar: boolean;
  hasInternshipOption: boolean;
  internshipChoice: 'internship' | 'elective' | '';
}

export function GraduationGradeCalculator() {
  const [courses, setCourses] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [examGrades, setExamGrades] = useState<ExamGrade[]>([]);
  const [bonus, setBonus] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [customTarget, setCustomTarget] = useState<string>("");
  const { toast } = useToast();

  // Fetch available courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data, error } = await supabase
          .from('course_subjects')
          .select('course')
          .order('course');

        if (error) throw error;

        // Get unique courses
        const uniqueCourses = [...new Set(data?.map(item => item.course) || [])];
        setCourses(uniqueCourses);
      } catch (error) {
        toast({
          title: "Errore",
          description: "Impossibile caricare i corsi di laurea",
          variant: "destructive",
        });
      }
    };

    fetchCourses();
  }, [toast]);

  // Fetch subjects for selected course
  useEffect(() => {
    if (!selectedCourse) return;

    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('course_subjects')
          .select('id, subject, cfu')
          .eq('course', selectedCourse)
          .order('subject');

        if (error) throw error;

        // Filter out thesis from subjects (automatically counted)
        const fetchedSubjects: Subject[] = data?.filter(item => {
          const subjectName = item.subject?.toLowerCase() || '';
          return !subjectName.includes('tesi') && 
                 !subjectName.includes('final paper') && 
                 !subjectName.includes('thesis') &&
                 !subjectName.includes('elaborato finale');
        }).map(item => ({
          id: item.id,
          subject: item.subject || '',
          cfu: item.cfu || 0
        })) || [];
        
        setSubjects(fetchedSubjects);
        
        // Initialize exam grades - auto-detect seminars by subject name
        const initialGrades: ExamGrade[] = fetchedSubjects.map(subject => ({
          id: subject.id,
          subject: subject.subject,
          cfu: subject.cfu,
          grade: '',
          completed: false,
          isSeminar: subject.subject.toLowerCase().includes('seminar') ||
            (selectedCourse === 'BIG' && (
              subject.subject === 'Marketing Research Skills for Public Policy' ||
              subject.subject === 'Negotiation Skills'
            ))
        }));
        
        setExamGrades(initialGrades);
      } catch (error) {
        toast({
          title: "Errore",
          description: "Impossibile caricare gli esami per questo corso",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [selectedCourse, toast]);


  const updateExamGrade = (id: number, field: keyof ExamGrade, value: any) => {
    setExamGrades(prev => prev.map(exam => 
      exam.id === id ? { ...exam, [field]: value } : exam
    ));
  };

  const calculateResults = () => {
    // Include only completed exams (seminars with no grade OR exams with grades)
    const completedExams = examGrades.filter(exam => 
      exam.completed && (exam.isSeminar || (exam.grade !== '' && Number(exam.grade) >= 18))
    );
    
    if (completedExams.length === 0) {
      const totalCfu = examGrades.reduce((sum, exam) => sum + exam.cfu, 0) + 3; // Add 3 CFU for thesis
      return {
        gpa: 0,
        graduationGrade: 0,
        graduationGradeWithBonus: 0,
        totalCfu,
        completedCfu: 3 // Thesis is always considered completed (3 CFU)
      };
    }

    // Calculate GPA only from non-seminar exams with valid grades (≥18)
    // Following official Bocconi rules: "media aritmetica ponderata rispetto ai crediti"
    const gradedExams = completedExams.filter(exam => 
      !exam.isSeminar && exam.grade !== '' && Number(exam.grade) >= 18
    );
    
    let gpa = 0;
    if (gradedExams.length > 0) {
      const totalWeightedGrades = gradedExams.reduce((sum, exam) => {
        // Convert 30L to 31 for calculation as per official rules
        const gradeValue = Number(exam.grade) === 31 ? 31 : Number(exam.grade);
        return sum + (gradeValue * exam.cfu);
      }, 0);
      const gradedCfu = gradedExams.reduce((sum, exam) => sum + exam.cfu, 0);
      gpa = gradedCfu > 0 ? totalWeightedGrades / gradedCfu : 0;
    }

    const completedCfu = completedExams.reduce((sum, exam) => sum + exam.cfu, 0) + 3; // Add 3 CFU for thesis
    const totalCfu = examGrades.reduce((sum, exam) => sum + exam.cfu, 0) + 3; // Add 3 CFU for thesis
    
    // Convert to 110 scale as per official formula: "convertita in centodecimi"
    const graduationGrade = gpa > 0 ? (gpa * 110) / 30 : 0;
    const rawGraduationGradeWithBonus = graduationGrade + bonus;
    const graduationGradeWithBonus = rawGraduationGradeWithBonus >= 110.5 ? 111 : Math.min(110, rawGraduationGradeWithBonus);

    return {
      gpa: Number(gpa.toFixed(2)),
      graduationGrade: Number(graduationGrade.toFixed(1)),
      graduationGradeWithBonus: Number(graduationGradeWithBonus.toFixed(1)),
      totalCfu,
      completedCfu
    };
  };

  const results = calculateResults();

  const getGradeColor = (grade: number) => {
    if (grade >= 105) return "text-green-600 dark:text-green-400";
    if (grade >= 100) return "text-blue-600 dark:text-blue-400";
    if (grade >= 95) return "text-yellow-600 dark:text-yellow-400";
    return "text-gray-600 dark:text-gray-400";
  };

  const getGradeLabel = (grade: number) => {
    if (grade >= 105) return "Eccellente";
    if (grade >= 100) return "Ottimo";
    if (grade >= 95) return "Buono";
    if (grade >= 90) return "Discreto";
    return "Sufficiente";
  };

  const scrollToExams = () => {
    const examsSection = document.getElementById('exams-section');
    if (examsSection) {
      examsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getTargetStatus = (currentGrade: number, targetGrade: number) => {
    const diff = targetGrade - currentGrade;
    if (diff <= 0) return { status: 'reached', color: 'text-green-600', text: 'Raggiunto!' };
    return { status: 'needs', color: 'text-orange-600', text: `+${diff.toFixed(1)}` };
  };

  return (
    <div className="space-y-6">
      {/* Course Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Seleziona Corso di Laurea
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Scegli il tuo corso di laurea" />
            </SelectTrigger>
            <SelectContent>
              {courses.map(course => (
                <SelectItem key={course} value={course}>
                  {course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Main Results Panel */}
      {selectedCourse && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Summary Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* GPA Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <Calculator className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">GPA</h3>
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-primary">
                      {results.completedCfu > 0 ? results.gpa : '--'}
                    </div>
                    <div className="text-sm text-muted-foreground">su 30</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Graduation Grade Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Voto di Laurea</h3>
                  </div>
                  <div className="space-y-1">
                    <div className={`text-3xl font-bold ${getGradeColor(results.graduationGradeWithBonus)}`}>
                      {results.completedCfu > 0 ? (results.graduationGradeWithBonus >= 111 ? '110L' : results.graduationGradeWithBonus) : '--'}
                    </div>
                    <div className="text-sm text-muted-foreground">su 110</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Progressi</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Esami inseriti:</span>
                      <div className="font-medium">{examGrades.filter(e => e.completed).length}</div>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Crediti totali:</span>
                      <div className="font-medium">{results.completedCfu}/{results.totalCfu}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Button */}
          {results.completedCfu === 0 ? (
            <div className="text-center bg-primary/10 rounded-lg p-4">
              <p className="text-primary font-medium">Inserisci i tuoi voti per vedere il calcolo</p>
            </div>
          ) : (
            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={scrollToExams}
              >
                Inserisci voti <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}

        </motion.div>
      )}

      {/* Bonus Selection */}
      {selectedCourse && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Bonus Aggiuntivi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Label>Seleziona bonus applicabile:</Label>
              <Select value={bonus.toString()} onValueChange={(value) => setBonus(Number(value))}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Nessun bonus</SelectItem>
                  <SelectItem value="1">+1 punto (tesi sufficiente o tirocinio/exchange)</SelectItem>
                  <SelectItem value="2">+2 punti (tesi buona)</SelectItem>
                  <SelectItem value="3">+3 punti (tesi buona + tirocinio/exchange)</SelectItem>
                  <SelectItem value="4">+4 punti (tesi ottima)</SelectItem>
                  <SelectItem value="5">+5 punti (tesi ottima + tirocinio/exchange)</SelectItem>
                </SelectContent>
              </Select>
              <div className="text-xs text-muted-foreground mt-2">
                <p><strong>Tesi:</strong> 1-4 punti (sufficiente: 1, buona: 2, ottima: 4)</p>
                <p><strong>Tirocinio/Exchange:</strong> +1 punto aggiuntivo (non cumulabili tra loro)</p>
                <p><strong>Nota:</strong> La tesi (3 CFU) è inclusa automaticamente nel calcolo</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Exams Table */}
      {selectedCourse && !loading && (
        <Card id="exams-section">
          <CardHeader>
            <CardTitle>Esami - {selectedCourse}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {examGrades.map((exam) => (
                <motion.div
                  key={exam.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border rounded-lg p-4 bg-card hover:shadow-md transition-shadow"
                >
                  <div className="space-y-3">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-sm leading-tight">{exam.subject}</div>
                          <Badge variant="secondary" className="mt-1">{exam.cfu} CFU</Badge>
                        </div>
                        <Checkbox
                          checked={exam.completed}
                          onCheckedChange={(checked) => {
                            updateExamGrade(exam.id, 'completed', checked);
                            if (!checked) {
                              updateExamGrade(exam.id, 'grade', '');
                            }
                          }}
                        />
                      </div>
                      
                      {exam.completed && !exam.isSeminar && (
                        <div>
                          <Label className="text-xs text-muted-foreground">Voto</Label>
                          <Select
                            value={exam.grade?.toString() || ""}
                            onValueChange={(value) => updateExamGrade(exam.id, 'grade', value ? Number(value) : '')}
                          >
                            <SelectTrigger className="mt-1">
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
                      
                      {exam.completed && exam.isSeminar && (
                        <div className="text-center p-2 bg-muted rounded-md">
                          <span className="text-xs text-muted-foreground">Seminario - Nessun voto richiesto</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Caricamento esami...</p>
        </div>
      )}
    </div>
  );
}