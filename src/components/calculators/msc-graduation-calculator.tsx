import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { GraduationCap, Calculator, Target, Info, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

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
}

const TRACK_COURSES: Record<string, { tracks: string[]; subjectTrackMap: Record<string, string> }> = {
  'DSBA': {
    tracks: ['Business Analytics', 'Data Science'],
    subjectTrackMap: {
      'Innovation and Marketing Analytics': 'Business Analytics',
      'Simulation and Modeling': 'Business Analytics',
      'Finance with Big Data': 'Business Analytics',
      'Deep Learning for Computer Vision': 'Business Analytics',
      'Optimization': 'Data Science',
      'Computer Science (algorithms)': 'Data Science',
      'Stochastic Processes': 'Data Science',
      'Machine Learning II': 'Data Science',
    }
  }
};

// Thesis CFU per course (default 18 if not listed)
const THESIS_CFU_MAP: Record<string, number> = {
  'DAAIHS': 14,
};
const getThesisCfu = (course: string) => THESIS_CFU_MAP[course] ?? 18;

export function MscGraduationCalculator() {
  const [courses, setCourses] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedTrack, setSelectedTrack] = useState<string>("");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [examGrades, setExamGrades] = useState<ExamGrade[]>([]);
  const [thesisPoints, setThesisPoints] = useState<number>(0);
  const [bonusPoints, setBonusPoints] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data, error } = await supabase
          .from('cours-subject_MS_exchange')
          .select('course')
          .order('course');

        if (error) throw error;

        const uniqueCourses = [...new Set(data?.map(item => item.course) || [])];
        setCourses(uniqueCourses);
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not load courses",
          variant: "destructive",
        });
      }
    };

    fetchCourses();
  }, [toast]);

  useEffect(() => {
    setSelectedTrack("");
  }, [selectedCourse]);

  useEffect(() => {
    if (!selectedCourse) return;
    const trackConfig = TRACK_COURSES[selectedCourse];
    if (trackConfig && !selectedTrack) return;

    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('cours-subject_MS_exchange')
          .select('id, subject, cfu')
          .eq('course', selectedCourse)
          .order('subject');

        if (error) throw error;

        const trackConfig = TRACK_COURSES[selectedCourse];

        const fetchedSubjects: Subject[] = data?.filter(item => {
          const subjectName = item.subject?.toLowerCase() || '';
          if (subjectName.includes('tesi') || subjectName.includes('final paper') ||
              subjectName.includes('thesis') || subjectName.includes('elaborato finale')) {
            return false;
          }
          if (trackConfig && selectedTrack) {
            const subjectTrack = trackConfig.subjectTrackMap[item.subject || ''];
            if (subjectTrack && subjectTrack !== selectedTrack) {
              return false;
            }
          }
          return true;
        }).map(item => ({
          id: item.id,
          subject: item.subject || '',
          cfu: item.cfu || 0
        })) || [];

        setSubjects(fetchedSubjects);

        const isPassFail = (name: string) => {
          const lower = name.toLowerCase();
          return lower.includes('seminar') || lower.includes('internship') ||
                 lower.includes('tirocinio') || lower.includes('stage') ||
                 lower.includes('lab') || lower.includes('foreign language') ||
                 lower.includes('lingua') || lower.includes('privacy');
        };

        const initialGrades: ExamGrade[] = fetchedSubjects.map(subject => ({
          id: subject.id,
          subject: subject.subject,
          cfu: subject.cfu,
          grade: '',
          completed: false,
          isSeminar: isPassFail(subject.subject)
        }));

        setExamGrades(initialGrades);
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not load exams",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [selectedCourse, selectedTrack, toast]);

  const updateExamGrade = (id: number, field: keyof ExamGrade, value: any) => {
    setExamGrades(prev => prev.map(exam =>
      exam.id === id ? { ...exam, [field]: value } : exam
    ));
  };

  const calculateResults = () => {
    const completedExams = examGrades.filter(exam =>
      exam.completed && (exam.isSeminar || (exam.grade !== '' && Number(exam.grade) >= 18))
    );

    const thesisCfu = getThesisCfu(selectedCourse);
    const examCfu = examGrades.reduce((sum, exam) => sum + exam.cfu, 0);
    const totalCfu = examCfu + thesisCfu;

    if (completedExams.length === 0) {
      return { gpa: 0, baseScore: 0, finalScore: 0, rawFinalScore: 0, totalCfu, completedCfu: thesisCfu };
    }

    const gradedExams = completedExams.filter(exam =>
      !exam.isSeminar && exam.grade !== '' && Number(exam.grade) >= 18
    );

    let gpa = 0;
    if (gradedExams.length > 0) {
      const totalWeightedGrades = gradedExams.reduce((sum, exam) => {
        const gradeValue = Math.min(Number(exam.grade), 30);
        return sum + (gradeValue * exam.cfu);
      }, 0);
      const gradedCfu = gradedExams.reduce((sum, exam) => sum + exam.cfu, 0);
      gpa = gradedCfu > 0 ? totalWeightedGrades / gradedCfu : 0;
    }

    const completedCfu = completedExams.reduce((sum, exam) => sum + exam.cfu, 0) + getThesisCfu(selectedCourse);

    const baseScore = gpa > 0 ? (gpa / 30) * 110 : 0;
    const rawFinalScore = baseScore + thesisPoints + bonusPoints;
    const finalScore = Math.min(rawFinalScore, 110);

    return {
      gpa: Number(gpa.toFixed(2)),
      baseScore: Number(baseScore.toFixed(1)),
      finalScore: Number(finalScore.toFixed(1)),
      rawFinalScore: Number(rawFinalScore.toFixed(1)),
      totalCfu,
      completedCfu
    };
  };

  const results = calculateResults();
  const hasData = examGrades.some(e => e.completed);

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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              {t('msc_calc.select_course')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('msc_calc.select_course_placeholder')} />
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

        {selectedCourse && TRACK_COURSES[selectedCourse] && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Target className="h-5 w-5" />
                {t('msc_calc.select_track')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedTrack} onValueChange={setSelectedTrack}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('msc_calc.select_track_placeholder')} />
                </SelectTrigger>
                <SelectContent>
                  {TRACK_COURSES[selectedCourse].tracks.map(track => (
                    <SelectItem key={track} value={track}>
                      {track}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        )}

        {selectedCourse && (!TRACK_COURSES[selectedCourse] || selectedTrack) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center space-y-3">
                    <div className="flex items-center justify-center gap-2">
                      <Calculator className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">GPA</h3>
                      <Tooltip>
                        <TooltipTrigger><Info className="h-3.5 w-3.5 text-muted-foreground" /></TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>{t('msc_calc.gpa_tooltip')}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="space-y-1">
                      <div className="text-3xl font-bold text-primary">
                        {hasData ? results.gpa : '--'}
                      </div>
                      <div className="text-sm text-muted-foreground">{t('msc_calc.out_of_30')}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center space-y-3">
                    <div className="flex items-center justify-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">{t('msc_calc.base_score')}</h3>
                      <Tooltip>
                        <TooltipTrigger><Info className="h-3.5 w-3.5 text-muted-foreground" /></TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>{t('msc_calc.base_score_tooltip')}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="space-y-1">
                      <div className="text-3xl font-bold text-muted-foreground">
                        {hasData ? results.baseScore : '--'}
                      </div>
                      <div className="text-sm text-muted-foreground">{t('msc_calc.out_of_110')}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center space-y-3">
                    <div className="flex items-center justify-center gap-2">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">{t('msc_calc.graduation_grade')}</h3>
                      <Tooltip>
                        <TooltipTrigger><Info className="h-3.5 w-3.5 text-muted-foreground" /></TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>{t('msc_calc.graduation_tooltip')}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="space-y-1">
                      <div className={`text-3xl font-bold ${hasData ? getGradeColor(results.finalScore) : 'text-muted-foreground'}`}>
                        {hasData ? results.finalScore : '--'}
                      </div>
                      <div className="text-sm text-muted-foreground">{t('msc_calc.out_of_110')}</div>
                      {hasData && results.rawFinalScore >= 110 && (
                        <Badge className="mt-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          {t('msc_calc.lode_badge')}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex items-center justify-between bg-primary/10 rounded-lg p-4">
              <div className="flex gap-6 text-sm">
                <div>
                  <span className="text-muted-foreground">{t('msc_calc.exams_entered')}: </span>
                  <span className="font-medium">{examGrades.filter(e => e.completed).length}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">{t('msc_calc.credits')}: </span>
                  <span className="font-medium">{results.completedCfu}/{results.totalCfu}</span>
                </div>
              </div>
              {!hasData && (
                <Button variant="outline" size="sm" onClick={scrollToExams}>
                  {t('msc_calc.enter_grades')} <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <GraduationCap className="h-5 w-5" />
                    {t('msc_calc.thesis_points')}
                    <Tooltip>
                      <TooltipTrigger><Info className="h-3.5 w-3.5 text-muted-foreground" /></TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>{t('msc_calc.thesis_tooltip')}</p>
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
                      max={8}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-xl font-bold text-primary w-8 text-center">{thesisPoints}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0</span>
                    <span>8</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Calculator className="h-5 w-5" />
                    {t('msc_calc.bonus_points')}
                    <Tooltip>
                      <TooltipTrigger><Info className="h-3.5 w-3.5 text-muted-foreground" /></TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>{t('msc_calc.bonus_tooltip')}</p>
                      </TooltipContent>
                    </Tooltip>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Input
                      type="number"
                      min={0}
                      step={0.5}
                      value={bonusPoints || ''}
                      onChange={(e) => setBonusPoints(e.target.value ? Number(e.target.value) : 0)}
                      placeholder="0"
                      className="w-24"
                    />
                    <span className="text-sm text-muted-foreground">{t('msc_calc.points')}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {selectedCourse && (!TRACK_COURSES[selectedCourse] || selectedTrack) && !loading && (
          <Card id="msc-exams-section">
            <CardHeader>
              <CardTitle>{t('msc_calc.exams_title')} - {selectedCourse}</CardTitle>
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
                          <Label className="text-xs text-muted-foreground">{t('msc_calc.grade')}</Label>
                          <Select
                            value={exam.grade?.toString() || ""}
                            onValueChange={(value) => updateExamGrade(exam.id, 'grade', value ? Number(value) : '')}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder={t('msc_calc.select_grade')} />
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
                          <span className="text-xs text-muted-foreground">{t('msc_calc.pass_fail')}</span>
                        </div>
                      )}
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
            <p className="mt-2 text-muted-foreground">{t('msc_calc.loading')}</p>
          </div>
        )}

        {selectedCourse && (
          <div className="text-center text-xs text-muted-foreground bg-muted/50 rounded-lg p-4">
            <p>{t('msc_calc.disclaimer')}</p>
            <p className="mt-1">{t('msc_calc.disclaimer2')}</p>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
