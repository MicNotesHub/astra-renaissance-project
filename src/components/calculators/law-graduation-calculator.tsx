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
import { GraduationCap, Calculator, Target, Info, AlertTriangle, Scale } from "lucide-react";
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
  const [rows, setRows] = useState<LawRow[]>(() => {
    const r = (
      name: string,
      cfu: number,
      category: Category,
      year: LawRow["year"],
      semester: LawRow["semester"]
    ) => makeRow({ name, cfu, category, year, semester });
    return [
      // ===== 1° anno =====
      r("Metodi quantitativi (preparatory)", 0, "other", 1, 1),
      r("Istituzioni di diritto privato - Modulo 1", 8, "compulsory_exam", 1, 1),
      r("Diritto romano - Modulo 1", 8, "compulsory_exam", 1, 1),
      r("Filosofia del diritto", 8, "compulsory_exam", 1, 1),
      r("Critical thinking", 1, "compulsory_exam", 1, 1),
      r("Inglese (I lingua) - precorso", 0, "language", 1, 1),
      r("Quantitative methods", 6, "compulsory_exam", 1, 2),
      r("Diritto costituzionale italiano ed europeo", 10, "compulsory_exam", 1, 2),
      r("Principi di economia (Economia / Scienza delle finanze)", 6, "elective", 1, 2),
      r("Istituzioni di diritto privato - Modulo 2", 6, "compulsory_exam", 1, 2),
      r("Inglese (I lingua) - didattica ed esame", 4, "language", 1, 2),

      // ===== 2° anno =====
      r("Economia aziendale e bilancio - Modulo 1", 6, "compulsory_exam", 2, 1),
      r("Diritto comparato (Comparative private law / Diritto comparato pubblico)", 9, "elective", 2, 1),
      r("Legal argumentation and economic analysis of law", 8, "compulsory_exam", 2, 1),
      r("History of law - Module 1 (Introduction to European Legal History)", 6, "compulsory_exam", 2, 1),
      r("Legal English", 3, "language", 2, 1),
      r("Management and Accounting - Module 2 (Accounting and Financial Statement Analysis)", 6, "compulsory_exam", 2, 2),
      r("Storia del diritto - Modulo 2", 8, "compulsory_exam", 2, 2),
      r("Diritto commerciale", 10, "compulsory_exam", 2, 2),
      r("Roman law - Module 2 (Roman Foundations of European Law)", 6, "compulsory_exam", 2, 2),
      r("Informatica per giurisprudenza", 3, "compulsory_exam", 2, 2),

      // ===== 3° anno =====
      r("Diritto penale", 10, "compulsory_exam", 3, 1),
      r("Diritto processuale civile - Modulo 1", 8, "compulsory_exam", 3, 1),
      r("EU law", 9, "compulsory_exam", 3, 1),
      r("Diritto contabile e fiscale - Modulo 1", 5, "compulsory_exam", 3, 1),
      r("Seconda lingua straniera - precorso", 0, "language", 3, 1),
      r("Diritto processuale civile - Modulo 2", 6, "compulsory_exam", 3, 2),
      r("Diritto contabile e fiscale - Modulo 2", 7, "compulsory_exam", 3, 2),
      r("Diritto processuale penale", 8, "compulsory_exam", 3, 2),
      r("Diritto del lavoro", 6, "compulsory_exam", 3, 2),
      r("Seconda lingua straniera - didattica ed esame", 4, "language", 3, 2),

      // ===== 4° anno =====
      r("Diritto amministrativo (Diritto amministrativo / Diritto amministrativo italiano ed europeo)", 10, "elective", 4, 1),
      r("Diritto costituzionale - corso progredito (Giustizia costituzionale / Diritto pubblico dell'economia / Transnational constitutional law and government policies)", 8, "elective", 4, 1),
      r("Diritto commerciale - corso progredito (Casi e questioni di diritto societario / Operazioni straordinarie / Antitrust law)", 6, "elective", 4, 1),
      r("Diritto processuale penale - corso progredito (Diritto dell'esecuzione penale / Processo penale agli enti / Procedura penale europea)", 6, "elective", 4, 1),
      r("International law", 9, "compulsory_exam", 4, 2),
      r("Diritto civile (Contratti e obbligazioni / European and International contracts)", 8, "elective", 4, 2),
      r("Diritto penale - corso progredito (Parte speciale del codice penale / Focus su criminalità economica / Paths of internationalization)", 6, "elective", 4, 2),
      r("Diritto del lavoro - corso progredito (Casi di diritto del lavoro / Istituzioni del mercato del lavoro / European social law)", 6, "elective", 4, 2),

      // ===== 5° anno =====
      r("Diritto civile - corso progredito (Diritto Bancario / Diritto Finanziario / Diritto Assicurativo)", 8, "elective", 5, 1),
      r("Diritto amministrativo - corso progredito (Diritto processuale amministrativo / Environmental law / Global Administrative Law)", 8, "elective", 5, 1),
      r("Computing, AI and the Law", 4, "compulsory_exam", 5, 1),
      r("Opzionale n° 1-2", 12, "elective", 5, 1),
      r("Stage / opzionale n° 3", 6, "internship", 5, 2),
      r("Seminari / Moot / Cliniche legali / opzionale n° 4", 6, "seminar", 5, 2),
      makeRow({
        name: "Tesi",
        cfu: THESIS_DEFAULT_CFU,
        category: "thesis",
        gradeType: "not_applicable",
        grade: "",
        includeInGpa: false,
        includeInGraduationCredits: true,
        year: 5,
        semester: 2,
      }),
    ];
  });
  const [thesisPoints, setThesisPoints] = useState<number>(0);
  const [thesisMax, setThesisMax] = useState<number>(6);
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
      const g = r.gradeType === "30L" || raw === 31 ? 31 : raw;
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
              GPA & Graduation Score (CLMG / Giurisprudenza)
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
          <CardHeader>
            <CardTitle>Study Plan</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              Curriculum fissato (nome, CFU e anno non modificabili). Inserisci il voto e usa la spunta per includere/escludere l'esame dal calcolo della media.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {[1, 2, 3, 4, 5].map((year) => {
              const yearRows = rows.filter((r) => r.year === year);
              if (yearRows.length === 0) return null;
              return (
                <div key={year} className="space-y-2">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    {year}° anno
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {yearRows.map((r) => {
                      const isGraded = r.gradeType === "numeric" || r.gradeType === "30L";
                      return (
                        <motion.div
                          key={r.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="border rounded-lg p-3 bg-card space-y-2"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium leading-snug">{r.name}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {r.cfu} CFU · {categoryLabels[r.category]}
                              </p>
                            </div>
                          </div>

                          {isGraded && (
                            <div>
                              <Label className="text-xs text-muted-foreground">Voto</Label>
                              <Select
                                value={r.grade?.toString() || ""}
                                onValueChange={(v) => {
                                  if (v === "none") update(r.id, { grade: "", gradeType: "numeric" });
                                  else if (v === "31") update(r.id, { grade: 31, gradeType: "30L" });
                                  else update(r.id, { grade: Number(v), gradeType: "numeric" });
                                }}
                              >
                                <SelectTrigger className="mt-1 h-9"><SelectValue placeholder="—" /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="none">—</SelectItem>
                                  {Array.from({ length: 14 }, (_, i) => i + 18).map((g) => (
                                    <SelectItem key={g} value={String(g)}>{g === 31 ? "30L" : g}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          )}

                          {r.gradeType === "pass_fail" && (
                            <div className="text-center p-2 bg-muted rounded-md text-xs text-muted-foreground">
                              Pass / Fail — non concorre alla media
                            </div>
                          )}

                          {r.gradeType === "not_applicable" && (
                            <div className="text-center p-2 bg-muted rounded-md text-xs text-muted-foreground">
                              Tesi — punti aggiunti separatamente
                            </div>
                          )}

                          {isGraded && (
                            <label className="flex items-center gap-2 cursor-pointer text-xs pt-1 border-t">
                              <Checkbox
                                checked={r.includeInGpa}
                                onCheckedChange={(c) => update(r.id, { includeInGpa: Boolean(c) })}
                                className="mt-1.5"
                              />
                              <span className="mt-1.5">Includi nella media</span>
                            </label>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
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
