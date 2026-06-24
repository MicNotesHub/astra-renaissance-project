import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { GraduationCap, Calculator, Target, Info, Plus, Trash2, AlertTriangle, Scale } from "lucide-react";
import { motion } from "framer-motion";

type Category =
  | "compulsory_exam"
  | "elective"
  | "language"
  | "seminar"
  | "lab"
  | "internship"
  | "thesis"
  | "other";

type GradeType = "numeric" | "30L" | "pass_fail" | "empty" | "not_applicable";
type Status = "planned" | "completed" | "passed" | "failed" | "not_taken";

interface LawRow {
  id: string;
  code?: string;
  name: string;
  cfu: number;
  grade: number | "";
  gradeType: GradeType;
  category: Category;
  year: number | "";
  semester: 1 | 2 | "";
  includeInGpa: boolean;
  includeInGraduationCredits: boolean;
  status: Status;
  notes?: string;
}

const TOTAL_CFU_TARGET = 300;
const THESIS_DEFAULT_CFU = 12;

const categoryDefaults: Record<Category, { includeInGpa: boolean; gradeType: GradeType }> = {
  compulsory_exam: { includeInGpa: true, gradeType: "numeric" },
  elective: { includeInGpa: true, gradeType: "numeric" },
  language: { includeInGpa: true, gradeType: "numeric" },
  seminar: { includeInGpa: false, gradeType: "pass_fail" },
  lab: { includeInGpa: false, gradeType: "pass_fail" },
  internship: { includeInGpa: false, gradeType: "pass_fail" },
  thesis: { includeInGpa: false, gradeType: "not_applicable" },
  other: { includeInGpa: false, gradeType: "empty" },
};

const categoryLabels: Record<Category, string> = {
  compulsory_exam: "Compulsory Exam",
  elective: "Elective",
  language: "Language",
  seminar: "Seminar",
  lab: "Lab",
  internship: "Internship",
  thesis: "Thesis",
  other: "Other",
};

const uid = () => Math.random().toString(36).slice(2, 10);

const makeRow = (overrides: Partial<LawRow> = {}): LawRow => {
  const category = overrides.category ?? "compulsory_exam";
  const defaults = categoryDefaults[category];
  return {
    id: uid(),
    name: "",
    cfu: 6,
    grade: "",
    gradeType: defaults.gradeType,
    category,
    year: "",
    semester: "",
    includeInGpa: defaults.includeInGpa,
    includeInGraduationCredits: true,
    status: "planned",
    ...overrides,
  };
};

export function LawGraduationCalculator() {
  const [rows, setRows] = useState<LawRow[]>([
    makeRow({ name: "Diritto Privato I", cfu: 9, category: "compulsory_exam" }),
    makeRow({ name: "Diritto Costituzionale", cfu: 9, category: "compulsory_exam" }),
    makeRow({
      id: uid(),
      name: "Thesis",
      cfu: THESIS_DEFAULT_CFU,
      category: "thesis",
      gradeType: "not_applicable",
      grade: "",
      includeInGpa: false,
      includeInGraduationCredits: true,
      status: "planned",
      semester: "",
      year: "",
    }),
  ]);
  const [thesisPoints, setThesisPoints] = useState<number>(0);
  const [thesisMax, setThesisMax] = useState<number>(7);
  const [bonusPoints, setBonusPoints] = useState<number>(0);

  const update = (id: string, patch: Partial<LawRow>) => {
    setRows((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const next = { ...r, ...patch };
        // If category changes, reapply sensible defaults (without clobbering manual overrides already in patch)
        if (patch.category && patch.category !== r.category) {
          const d = categoryDefaults[patch.category];
          next.gradeType = patch.gradeType ?? d.gradeType;
          next.includeInGpa = patch.includeInGpa ?? d.includeInGpa;
          if (d.gradeType !== "numeric" && d.gradeType !== "30L") {
            next.grade = "";
          }
        }
        return next;
      })
    );
  };

  const addRow = (category: Category = "compulsory_exam") => {
    setRows((prev) => [...prev, makeRow({ category })]);
  };

  const removeRow = (id: string) => setRows((prev) => prev.filter((r) => r.id !== id));

  const results = useMemo(() => {
    const gpaRows = rows.filter((r) => {
      if (!r.includeInGpa) return false;
      if (r.status === "failed" || r.status === "not_taken") return false;
      if (r.gradeType !== "numeric" && r.gradeType !== "30L") return false;
      const g = Number(r.grade);
      return r.grade !== "" && g >= 18 && g <= 31;
    });

    const weightedSum = gpaRows.reduce((s, r) => {
      const raw = Number(r.grade);
      const g = r.gradeType === "30L" || raw === 31 ? 30 : Math.min(raw, 30);
      return s + g * r.cfu;
    }, 0);
    const gpaCfu = gpaRows.reduce((s, r) => s + r.cfu, 0);
    const gpa = gpaCfu > 0 ? weightedSum / gpaCfu : 0;

    const enteredCfu = rows.reduce((s, r) => {
      if (!r.includeInGraduationCredits) return s;
      const completed = r.status === "completed" || r.status === "passed";
      return completed ? s + r.cfu : s;
    }, 0);

    const baseScore110 = gpa > 0 ? (gpa / 30) * 110 : 0;
    const rawFinal = baseScore110 + thesisPoints + bonusPoints;
    const finalScore = Math.min(rawFinal, 110);
    const lodeEligible = rawFinal >= 110 && gpa >= 29;

    const warnings = rows
      .filter(
        (r) =>
          r.status === "failed" &&
          (r.category === "seminar" || r.category === "internship" || r.category === "lab")
      )
      .map((r) => r.name || categoryLabels[r.category]);

    return {
      gpa: Number(gpa.toFixed(2)),
      gpaCfu,
      baseScore110: Number(baseScore110.toFixed(2)),
      finalScore: Number(finalScore.toFixed(2)),
      rawFinal: Number(rawFinal.toFixed(2)),
      enteredCfu,
      lodeEligible,
      warnings,
    };
  }, [rows, thesisPoints, bonusPoints]);

  const hasGpa = results.gpaCfu > 0;
  const progressPct = Math.min(100, (results.enteredCfu / TOTAL_CFU_TARGET) * 100);

  const gradeColor = (g: number) => {
    if (g >= 105) return "text-green-600 dark:text-green-400";
    if (g >= 100) return "text-blue-600 dark:text-blue-400";
    if (g >= 95) return "text-yellow-600 dark:text-yellow-400";
    return "text-muted-foreground";
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              Bocconi Giurisprudenza Graduation Calculator
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Estimate your weighted GPA, base graduation score, and final Law degree grade.
              Integrated Master of Arts in Law — 5 years, {TOTAL_CFU_TARGET} CFU.
            </p>
          </CardHeader>
        </Card>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Weighted GPA</h3>
                <Tooltip>
                  <TooltipTrigger><Info className="h-3.5 w-3.5 text-muted-foreground" /></TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Sum(grade × CFU) / Sum(CFU) over graded rows included in GPA. 30L counts as 30.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="text-3xl font-bold text-primary">{hasGpa ? results.gpa : "--"}</div>
              <div className="text-xs text-muted-foreground">out of 30</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Base Score</h3>
              </div>
              <div className="text-3xl font-bold text-muted-foreground">
                {hasGpa ? results.baseScore110.toFixed(1) : "--"}
              </div>
              <div className="text-xs text-muted-foreground">out of 110</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Final Score</h3>
              </div>
              <div className={`text-3xl font-bold ${hasGpa ? gradeColor(results.finalScore) : "text-muted-foreground"}`}>
                {hasGpa ? results.finalScore.toFixed(1) : "--"}
              </div>
              <div className="text-xs text-muted-foreground">out of 110</div>
              {hasGpa && results.lodeEligible && (
                <Badge className="mt-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  110 e lode possible
                </Badge>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center justify-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Credits</h3>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {results.enteredCfu}<span className="text-sm text-muted-foreground"> / {TOTAL_CFU_TARGET}</span>
                </div>
                <div className="text-xs text-muted-foreground">CFU toward graduation</div>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all" style={{ width: `${progressPct}%` }} />
              </div>
              <div className="text-[11px] text-muted-foreground text-center">
                GPA denominator uses {results.gpaCfu} CFU only
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Warnings */}
        {results.warnings.length > 0 && (
          <Card className="border-yellow-500/50 bg-yellow-50/50 dark:bg-yellow-950/20">
            <CardContent className="p-4 flex gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium">Activities marked failed don't count toward graduation credits:</p>
                <ul className="list-disc pl-5 mt-1 text-muted-foreground">
                  {results.warnings.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
                <p className="mt-2 text-xs">This activity must be completed/passed to count toward graduation credits.</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Thesis & Bonus */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <GraduationCap className="h-5 w-5" />
                Thesis / Final Exam Points
                <Tooltip>
                  <TooltipTrigger><Info className="h-3.5 w-3.5 text-muted-foreground" /></TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Added after converting the weighted GPA to the 110 scale.</p>
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
                  max={thesisMax}
                  step={1}
                  className="flex-1"
                />
                <span className="text-xl font-bold text-primary w-10 text-center">{thesisPoints}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>0</span>
                <div className="flex items-center gap-2">
                  <Label className="text-xs">Max</Label>
                  <Input
                    type="number"
                    min={1}
                    max={20}
                    value={thesisMax}
                    onChange={(e) => {
                      const m = Math.max(1, Math.min(20, Number(e.target.value) || 7));
                      setThesisMax(m);
                      if (thesisPoints > m) setThesisPoints(m);
                    }}
                    className="h-7 w-16 text-xs"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Calculator className="h-5 w-5" />
                Bonus Points
                <Tooltip>
                  <TooltipTrigger><Info className="h-3.5 w-3.5 text-muted-foreground" /></TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Flexible bonus for exchange, internship rules or other official criteria.</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Input
                  type="number"
                  min={0}
                  step={0.5}
                  value={bonusPoints || ""}
                  onChange={(e) => setBonusPoints(e.target.value ? Number(e.target.value) : 0)}
                  placeholder="0"
                  className="w-24"
                />
                <span className="text-sm text-muted-foreground">points</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                final = base ({results.baseScore110.toFixed(2)}) + thesis ({thesisPoints}) + bonus ({bonusPoints}) = {results.rawFinal.toFixed(2)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Rows */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Study Plan</CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => addRow("compulsory_exam")}>
                <Plus className="h-4 w-4 mr-1" /> Add exam
              </Button>
              <Button size="sm" variant="outline" onClick={() => addRow("seminar")}>
                <Plus className="h-4 w-4 mr-1" /> Seminar
              </Button>
              <Button size="sm" variant="outline" onClick={() => addRow("internship")}>
                <Plus className="h-4 w-4 mr-1" /> Internship
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rows.map((r) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border rounded-lg p-4 bg-card space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <Input
                      value={r.name}
                      placeholder="Course name"
                      onChange={(e) => update(r.id, { name: e.target.value })}
                      className="font-medium"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeRow(r.id)}
                      className="h-8 w-8 flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs text-muted-foreground">Category</Label>
                      <Select value={r.category} onValueChange={(v) => update(r.id, { category: v as Category })}>
                        <SelectTrigger className="h-9 mt-1"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {(Object.keys(categoryLabels) as Category[]).map((c) => (
                            <SelectItem key={c} value={c}>{categoryLabels[c]}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">CFU</Label>
                      <Input
                        type="number"
                        min={0}
                        step={1}
                        value={r.cfu}
                        onChange={(e) => update(r.id, { cfu: Number(e.target.value) || 0 })}
                        className="h-9 mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Year</Label>
                      <Select
                        value={r.year ? String(r.year) : ""}
                        onValueChange={(v) => update(r.id, { year: v ? (Number(v) as LawRow["year"]) : "" })}
                      >
                        <SelectTrigger className="h-9 mt-1"><SelectValue placeholder="—" /></SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((y) => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Status</Label>
                      <Select value={r.status} onValueChange={(v) => update(r.id, { status: v as Status })}>
                        <SelectTrigger className="h-9 mt-1"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="planned">Planned</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="passed">Passed</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                          <SelectItem value="not_taken">Not taken</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {(r.gradeType === "numeric" || r.gradeType === "30L") && (
                    <div>
                      <Label className="text-xs text-muted-foreground">Grade</Label>
                      <Select
                        value={r.grade?.toString() || ""}
                        onValueChange={(v) => {
                          if (v === "31") update(r.id, { grade: 31, gradeType: "30L" });
                          else update(r.id, { grade: v ? Number(v) : "", gradeType: "numeric" });
                        }}
                      >
                        <SelectTrigger className="mt-1 h-9"><SelectValue placeholder="Select grade" /></SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 14 }, (_, i) => i + 18).map((g) => (
                            <SelectItem key={g} value={String(g)}>{g === 31 ? "30L" : g}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {r.gradeType === "pass_fail" && (
                    <div className="text-center p-2 bg-muted rounded-md text-xs text-muted-foreground">
                      Pass / Fail — set status to mark completion
                    </div>
                  )}

                  {r.gradeType === "not_applicable" && (
                    <div className="text-center p-2 bg-muted rounded-md text-xs text-muted-foreground">
                      No exam grade — affects graduation via thesis points
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs pt-1 border-t">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={r.includeInGpa}
                        onCheckedChange={(c) => update(r.id, { includeInGpa: Boolean(c) })}
                      />
                      <span>Include in GPA</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={r.includeInGraduationCredits}
                        onCheckedChange={(c) => update(r.id, { includeInGraduationCredits: Boolean(c) })}
                      />
                      <span>Count CFU</span>
                    </label>
                  </div>
                </motion.div>
              ))}
            </div>

            {rows.length === 0 && (
              <div className="text-center text-sm text-muted-foreground py-8">
                No rows yet — add an exam to get started.
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center text-xs text-muted-foreground bg-muted/50 rounded-lg p-4">
          <p>
            Unofficial estimator. Final graduation rules, thesis points cap and bonus criteria for the Corso di Laurea
            Magistrale in Giurisprudenza may change by academic year — always check the official Bocconi regulations.
          </p>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default LawGraduationCalculator;
