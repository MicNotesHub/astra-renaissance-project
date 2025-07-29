import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const EventiSection = () => {
  const [eventi, setEventi] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventi = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("start_date", { ascending: true });

      console.log("EVENTI:", data);

      if (!error) setEventi(data || []);
      setLoading(false);
    };

    fetchEventi();
  }, []);

  return (
    <section id="eventi" className="p-10">
      <h2 className="text-2xl font-bold mb-6">🔍 Debug: Lista Eventi</h2>

      {loading && <p>Caricamento...</p>}

      {!loading && eventi.length === 0 && (
        <p className="text-red-500">Nessun evento trovato</p>
      )}

      {!loading && eventi.length > 0 && (
        <ul className="space-y-4">
          {eventi.map((evento) => (
            <li key={evento.id} className="p-4 border rounded-md bg-white shadow-sm">
              <strong>{evento.title}</strong><br />
              📍 {evento.location}<br />
              📅 {new Date(evento.start_date).toLocaleString("it-IT")}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
