import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

const YEAR_FOLDERS: Record<string, string> = {
  "First Year": "1. FIRST YEAR",
  "Second Year": "2. SECOND YEAR",
  "Third Year": "3. THIRD YEAR",
};
const COURSES = ["CLEAM", "BIEM", "BIEF", "CLEACC", "BEMACC", "BEMACS", "BAI", "BIG", "BGL", "BESS"];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const form = await req.formData();
    const expected = Deno.env.get("DISPENSE_ADMIN_PASSWORD");
    if (!expected || form.get("password") !== expected) return json({ error: "Password errata" }, 401);
    if (form.get("action") === "verify") return json({ ok: true });

    const file = form.get("file");
    const program = String(form.get("program") || "triennale");
    const year = String(form.get("year") || "");
    const courses = String(form.get("courses") || "").split(",").map((c) => c.trim()).filter((c) => COURSES.includes(c));
    const displayName = String(form.get("filename") || "").trim();
    const semesterRaw = String(form.get("semester") || "");
    const examRaw = String(form.get("exam_type") || "");
    const trackRaw = String(form.get("track") || "");

    if (!(file instanceof File)) return json({ error: "Nessun file" }, 400);
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) return json({ error: "Solo PDF" }, 400);
    if (!displayName) return json({ error: "Nome mancante" }, 400);

    const semester = semesterRaw === "1" || semesterRaw === "2" ? Number(semesterRaw) : null;
    const exam_type = examRaw === "parziale" || examRaw === "generale" ? examRaw : null;
    const track = trackRaw === "fin" || trackRaw === "econ" ? trackRaw : null;

    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const safe = file.name.replace(/[^\w.\- ()]/g, "_");

    if (program === "clmg") {
      const courseYear = Number(year);
      if (!Number.isInteger(courseYear) || courseYear < 1 || courseYear > 5) return json({ error: "Anno CLMG non valido" }, 400);
      const path = `dispense clmg/${Date.now()}-${safe}`;
      const { error: upErr } = await supabase.storage
        .from("dispense-uploads")
        .upload(path, file, { contentType: "application/pdf", upsert: false });
      if (upErr) return json({ error: `Upload fallito: ${upErr.message}` }, 500);
      const { data: pub } = supabase.storage.from("dispense-uploads").getPublicUrl(path);
      const { error: insErr } = await supabase.from("clmg_handouts").insert({
        name: displayName, course_year: courseYear, url: pub.publicUrl, semester, exam_type,
      });
      if (insErr) {
        await supabase.storage.from("dispense-uploads").remove([path]);
        return json({ error: `Salvataggio fallito: ${insErr.message}` }, 500);
      }
      return json({ ok: true, url: pub.publicUrl, inserted: 1 });
    }

    if (!YEAR_FOLDERS[year]) return json({ error: "Anno non valido" }, 400);
    if (!courses.length) return json({ error: "Seleziona almeno un corso" }, 400);
    const path = `${YEAR_FOLDERS[year]}/${courses[0]}/${Date.now()}-${safe}`;
    const { error: upErr } = await supabase.storage
      .from("dispense-uploads")
      .upload(path, file, { contentType: "application/pdf", upsert: false });
    if (upErr) return json({ error: `Upload fallito: ${upErr.message}` }, 500);

    const { data: pub } = supabase.storage.from("dispense-uploads").getPublicUrl(path);
    const rows = courses.map((subject) => ({
      year, subject, filename: displayName, file_url: pub.publicUrl, semester, exam_type,
      track: subject === "BIEF" ? track : null,
    }));
    const { error: insErr } = await supabase.from("handouts").insert(rows);
    if (insErr) {
      await supabase.storage.from("dispense-uploads").remove([path]);
      return json({ error: `Salvataggio fallito: ${insErr.message}` }, 500);
    }
    return json({ ok: true, url: pub.publicUrl, inserted: rows.length });
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "Errore" }, 500);
  }
});
