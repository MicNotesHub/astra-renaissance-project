import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const FN_URL = "https://jsuzhbspinevkzmhibop.supabase.co/functions/v1/dispense-admin";
const ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzdXpoYnNwaW5ldmt6bWhpYm9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NzUwODksImV4cCI6MjA2ODM1MTA4OX0.uyD-7O2usT7wHJBG7yf2_QgxdEREnR7ZH8Nz2_ZVBd4";
const COURSES = ["CLEAM", "BIEM", "BIEF", "CLEACC", "BEMACC", "BEMACS", "BAI", "BIG", "BGL", "BESS"];

const call = async (fd: FormData) => {
  const res = await fetch(FN_URL, { method: "POST", body: fd, headers: { apikey: ANON, Authorization: `Bearer ${ANON}` } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Errore");
  return data;
};

const selectCls = "w-full h-10 rounded-md border border-input bg-background px-3 text-sm";

const DispenseAdmin = () => {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [year, setYear] = useState("First Year");
  const [courses, setCourses] = useState<string[]>([]);
  const [semester, setSemester] = useState("");
  const [examType, setExamType] = useState("");
  const [track, setTrack] = useState("");

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setMsg(null);
    const fd = new FormData(); fd.append("password", password); fd.append("action", "verify");
    try { await call(fd); setAuthed(true); } catch (err) { setMsg({ ok: false, text: (err as Error).message }); }
    setBusy(false);
  };

  const upload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return setMsg({ ok: false, text: "Seleziona un PDF" });
    setBusy(true); setMsg(null);
    const fd = new FormData();
    fd.append("password", password); fd.append("file", file);
    fd.append("filename", name || file.name.replace(/\.pdf$/i, ""));
    fd.append("year", year); fd.append("courses", courses.join(","));
    fd.append("semester", semester); fd.append("exam_type", examType); fd.append("track", track);
    try {
      const r = await call(fd);
      setMsg({ ok: true, text: `Caricato per ${r.inserted} corso/i ✓` });
      setFile(null); setName("");
      (document.getElementById("pdf-input") as HTMLInputElement).value = "";
    } catch (err) { setMsg({ ok: false, text: (err as Error).message }); }
    setBusy(false);
  };

  const toggle = (c: string) => setCourses((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Helmet><meta name="robots" content="noindex, nofollow" /><title>Admin</title></Helmet>
      <Card className="w-full max-w-lg">
        <CardContent className="p-6 space-y-4">
          <h1 className="text-2xl font-bold">Carica dispensa</h1>
          {!authed ? (
            <form onSubmit={login} className="space-y-3">
              <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button type="submit" disabled={busy || !password} className="w-full">Entra</Button>
            </form>
          ) : (
            <form onSubmit={upload} className="space-y-4">
              <div><label className="text-sm font-medium">PDF</label>
                <Input id="pdf-input" type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] ?? null)} /></div>
              <div><label className="text-sm font-medium">Nome visualizzato</label>
                <Input value={name} placeholder={file?.name.replace(/\.pdf$/i, "") || "es. Management - 1st partial"} onChange={(e) => setName(e.target.value)} /></div>
              <div><label className="text-sm font-medium">Anno</label>
                <select className={selectCls} value={year} onChange={(e) => setYear(e.target.value)}>
                  <option value="First Year">Primo anno</option><option value="Second Year">Secondo anno</option><option value="Third Year">Terzo anno</option>
                </select></div>
              <div><label className="text-sm font-medium">Corsi (anche più di uno)</label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {COURSES.map((c) => (
                    <label key={c} className="flex items-center gap-2 text-sm"><Checkbox checked={courses.includes(c)} onCheckedChange={() => toggle(c)} />{c}</label>
                  ))}
                </div></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-sm font-medium">Semestre</label>
                  <select className={selectCls} value={semester} onChange={(e) => setSemester(e.target.value)}>
                    <option value="">—</option><option value="1">1</option><option value="2">2</option>
                  </select></div>
                <div><label className="text-sm font-medium">Tipo esame</label>
                  <select className={selectCls} value={examType} onChange={(e) => setExamType(e.target.value)}>
                    <option value="">—</option><option value="parziale">Parziale</option><option value="generale">Generale</option>
                  </select></div>
              </div>
              {courses.includes("BIEF") && (
                <div><label className="text-sm font-medium">Track BIEF</label>
                  <select className={selectCls} value={track} onChange={(e) => setTrack(e.target.value)}>
                    <option value="">Nessuno (entrambi)</option><option value="fin">Fin</option><option value="econ">Econ</option>
                  </select></div>
              )}
              <Button type="submit" disabled={busy || !file || !courses.length} className="w-full">{busy ? "Caricamento..." : "Carica"}</Button>
            </form>
          )}
          {msg && <p className={msg.ok ? "text-sm text-primary" : "text-sm text-destructive"}>{msg.text}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default DispenseAdmin;
