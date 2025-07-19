import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Clock, Target, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface Course {
  code: string;
  name: string;
  credits: number;
  semester: number;
  year: number;
  prerequisites: string[];
  difficulty: 'Facile' | 'Medio' | 'Difficile';
  mandatory: boolean;
}

const sampleCourses: Course[] = [
  { code: "20001", name: "Matematica Generale", credits: 12, semester: 1, year: 1, prerequisites: [], difficulty: "Medio", mandatory: true },
  { code: "20002", name: "Economia Aziendale", credits: 12, semester: 1, year: 1, prerequisites: [], difficulty: "Facile", mandatory: true },
  { code: "20003", name: "Diritto Privato", credits: 9, semester: 2, year: 1, prerequisites: [], difficulty: "Medio", mandatory: true },
  { code: "20004", name: "Statistica", credits: 9, semester: 2, year: 1, prerequisites: ["20001"], difficulty: "Difficile", mandatory: true },
  { code: "20005", name: "Microeconomia", credits: 12, semester: 1, year: 2, prerequisites: ["20001"], difficulty: "Difficile", mandatory: true },
  { code: "20006", name: "Macroeconomia", credits: 12, semester: 2, year: 2, prerequisites: ["20005"], difficulty: "Difficile", mandatory: true },
  { code: "20007", name: "Finanza Aziendale", credits: 9, semester: 1, year: 2, prerequisites: ["20002"], difficulty: "Medio", mandatory: true },
  { code: "20008", name: "Marketing", credits: 6, semester: 2, year: 2, prerequisites: ["20002"], difficulty: "Facile", mandatory: false },
  { code: "20009", name: "Analisi Finanziaria", credits: 6, semester: 1, year: 3, prerequisites: ["20007"], difficulty: "Difficile", mandatory: false },
  { code: "20010", name: "Strategic Management", credits: 9, semester: 2, year: 3, prerequisites: ["20002"], difficulty: "Medio", mandatory: false }
];

export function StudyPlanCalculator() {
  const [selectedDegree, setSelectedDegree] = useState("BIEM");
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);

  const toggleCourseSelection = (courseCode: string) => {
    setSelectedCourses(prev => 
      prev.includes(courseCode) 
        ? prev.filter(code => code !== courseCode)
        : [...prev, courseCode]
    );
  };

  const toggleCourseCompletion = (courseCode: string) => {
    setCompletedCourses(prev => 
      prev.includes(courseCode) 
        ? prev.filter(code => code !== courseCode)
        : [...prev, courseCode]
    );
  };

  const getSelectedCoursesData = () => {
    return sampleCourses.filter(course => selectedCourses.includes(course.code));
  };

  const calculateStats = () => {
    const selected = getSelectedCoursesData();
    const completed = sampleCourses.filter(course => completedCourses.includes(course.code));
    
    const totalCredits = selected.reduce((sum, course) => sum + course.credits, 0);
    const completedCredits = completed.reduce((sum, course) => sum + course.credits, 0);
    
    const workloadByDifficulty = selected.reduce((acc, course) => {
      acc[course.difficulty] = (acc[course.difficulty] || 0) + course.credits;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalCredits,
      completedCredits,
      remainingCredits: 180 - completedCredits,
      selectedCredits: totalCredits,
      workloadByDifficulty,
      coursesCount: selected.length,
      completedCount: completed.length
    };
  };

  const stats = calculateStats();

  const canTakeCourse = (course: Course) => {
    return course.prerequisites.every(prereq => 
      completedCourses.includes(prereq)
    );
  };

  const getCoursesByYear = (year: number) => {
    return sampleCourses.filter(course => course.year === year);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Facile': return 'bg-green-500';
      case 'Medio': return 'bg-yellow-500';
      case 'Difficile': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Piano di Studi Interattivo</h1>
        <p className="text-muted-foreground">Pianifica il tuo percorso accademico e ottimizza il carico di lavoro</p>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Configurazione</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Corso di Laurea</label>
                <Select value={selectedDegree} onValueChange={setSelectedDegree}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BIEM">BIEM</SelectItem>
                    <SelectItem value="BESS">BESS</SelectItem>
                    <SelectItem value="CLEAM">CLEAM</SelectItem>
                    <SelectItem value="BAFIN">BAFIN</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Statistiche Piano</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Crediti completati:</span>
                    <Badge variant="default">{stats.completedCredits}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Crediti selezionati:</span>
                    <Badge variant="outline">{stats.selectedCredits}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Crediti rimanenti:</span>
                    <Badge variant="secondary">{stats.remainingCredits}</Badge>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progresso laurea</span>
                    <span>{Math.round((stats.completedCredits / 180) * 100)}%</span>
                  </div>
                  <Progress value={(stats.completedCredits / 180) * 100} className="h-2" />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Carico per difficoltà</h4>
                {Object.entries(stats.workloadByDifficulty).map(([difficulty, credits]) => (
                  <div key={difficulty} className="flex items-center gap-2 text-sm">
                    <div className={`w-3 h-3 rounded-full ${getDifficultyColor(difficulty)}`}></div>
                    <span>{difficulty}:</span>
                    <span className="font-medium">{credits} CFU</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Planning */}
        <div className="lg:col-span-3 space-y-6">
          {[1, 2, 3].map(year => (
            <Card key={year}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  {year}° Anno
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {[1, 2].map(semester => (
                    <div key={semester} className="space-y-3">
                      <h4 className="font-medium text-sm bg-muted p-2 rounded">
                        {semester}° Semestre
                      </h4>
                      <div className="space-y-2">
                        {getCoursesByYear(year)
                          .filter(course => course.semester === semester)
                          .map(course => {
                            const isSelected = selectedCourses.includes(course.code);
                            const isCompleted = completedCourses.includes(course.code);
                            const canTake = canTakeCourse(course);
                            
                            return (
                              <div
                                key={course.code}
                                className={`p-3 border rounded-lg transition-all cursor-pointer ${
                                  isCompleted ? 'bg-green-50 border-green-200' :
                                  isSelected ? 'bg-primary/10 border-primary' :
                                  !canTake ? 'bg-gray-50 border-gray-200 opacity-50' :
                                  'hover:bg-gray-50'
                                }`}
                                onClick={() => {
                                  if (canTake) {
                                    if (isCompleted) {
                                      toggleCourseCompletion(course.code);
                                    } else {
                                      toggleCourseSelection(course.code);
                                    }
                                  }
                                }}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="font-medium text-sm">{course.name}</div>
                                    <div className="text-xs text-muted-foreground">
                                      {course.code} • {course.credits} CFU
                                    </div>
                                    {course.prerequisites.length > 0 && (
                                      <div className="text-xs text-muted-foreground mt-1">
                                        Prerequisiti: {course.prerequisites.join(', ')}
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex flex-col items-end gap-1">
                                    <div className={`w-2 h-2 rounded-full ${getDifficultyColor(course.difficulty)}`}></div>
                                    {course.mandatory && (
                                      <Badge variant="outline" className="text-xs">Obbligatorio</Badge>
                                    )}
                                    {isCompleted && (
                                      <Badge variant="default" className="text-xs">Completato</Badge>
                                    )}
                                    {isSelected && !isCompleted && (
                                      <Badge variant="secondary" className="text-xs">Selezionato</Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={() => setCompletedCourses([...completedCourses, ...selectedCourses])}
              className="flex-1"
              disabled={selectedCourses.length === 0}
            >
              <Target className="h-4 w-4 mr-2" />
              Marca come Completati
            </Button>
            <Button
              variant="outline"
              onClick={() => setSelectedCourses([])}
              className="flex-1"
            >
              Cancella Selezione
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}