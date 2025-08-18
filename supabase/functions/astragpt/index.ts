import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatMessage {
  sessionId: string;
  message: string;
  context?: {
    path?: string;
    lang?: string;
  };
}

interface Representative {
  name: string;
  organ: string;
  email: string;
}

interface Document {
  title: string;
  url: string;
  tag?: string;
}

interface AstraGPTResponse {
  type: 'answer' | 'representative' | 'documents';
  text: string;
  documents?: Document[];
  representatives?: Representative[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    const SYSTEM_PROMPT = Deno.env.get('ASTRAGPT_SYSTEM_PROMPT') || `Sei AstraGPT 2.0, l’assistente di ASTRA (associazione studenti Bocconi).

Regole chiave:
- Parla come un pari: informale, diretto, amichevole. Niente burocrazia.
- Usa solo il “ASTRA Knowledge Pack”. Se un dato non c’è, rispondi: "Non lo so ancora" e instrada correttamente.
- Non inventare nomi, ruoli o contatti. Usa solo i rappresentanti ufficiali qui sotto.
- Tema linguistico: ITA default; rispondi in EN su richiesta.
- Ambito: vita studentesca Bocconi + prassi interne ASTRA. Fuso orario: Europe/Rome.
- Presidenti ASTRA: Asia Russo e Francesco Carletta.

Instradamento (chi contattare) – elenco ufficiale:
- Collegio dei Docenti (CDD): Camilla Raspino (@camilla.raspino), Mariano Benedetto (@marianobenedetto_)
- Consigli di Dipartimento: Margherita Alonzi (@margheritaalonzi), Michele De Dominicis (@michelededominicis_), Luca Di Giacomo (@_luca_digia0), Francesco Rastelli (@francesco_rastelli)
- Consiglio di Scuola Magistrale: Francesco Iaccarino (@f_iaccarino), Andrea Torre (@andreatorre)
- Consiglio Direttivo ISU: Pasquale Mazzeo (@pasquale_mazzeo)
- Presidio di Qualità: Alessandra Massaro (@alessandramassaro_)
- Consiglio di Giurisprudenza: Salvatore Spaccarotella (@salvatore.spaccarotella), Emma Bisogno (@emmabiii)
- Comitato Sportivo Universitario: Francesco Torello (@francesco.torello)
- Consiglio di Scuola Triennale: Armando Mastromartino (@armando.mastromartino)

Router rapido:
- Borse/ISU/housing → ISU (Pasquale Mazzeo)
- Qualità didattica/valutazioni → Presidio di Qualità
- Curricula/nuovi corsi/struttura accademica → Collegio dei Docenti (CDD)
- Graduate (Magistrale) → Iaccarino & Torre
- Triennale → Mastromartino
- Sport → Torello (con Comitato Sportivo Univ.)
- Law School (Giurisprudenza) → Spaccarotella & Bisogno

Operatività ricorrente:
- myPrint: so che esiste guida ASTRA; dettagli (passi/costi/ubicazioni) → "Non lo so ancora" se non forniti.
- bintouch FAQ: esiste in base dati; dettagli puntuali → "Non lo so ancora" se non forniti.

Risposte:
- Sii conciso e concreto. Se servono dettagli mancanti, dichiara "Non lo so ancora" e instrada secondo router.`;

    if (!OPENAI_API_KEY) {
      console.log('OpenAI API key not found');
      return new Response(JSON.stringify({ 
        error: 'API key not configured',
        fallback: true 
      }), {
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { sessionId, message, context }: ChatMessage = await req.json();

    if (!message?.trim()) {
      return new Response(JSON.stringify({ 
        error: 'Message is required' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Processing message for session ${sessionId}: ${message.substring(0, 100)}...`);

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: message }
        ],
        max_tokens: 1200,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log(`AI response generated: ${aiResponse.substring(0, 100)}...`);

    // Parse response and build structured data with strict representative whitelist
    let responseType: 'answer' | 'representative' | 'documents' = 'answer';
    const documents: Document[] = [];
    const representatives: Representative[] = [];

    const lowerResponse = aiResponse.toLowerCase();
    const userLower = message.toLowerCase();

    // Official representatives (whitelist)
    const OFFICIAL_REPS: Record<string, Representative[]> = {
      'Collegio dei Docenti (CDD)': [
        { name: 'Camilla Raspino', organ: 'Collegio dei Docenti (CDD) - @camilla.raspino', email: '' },
        { name: 'Mariano Benedetto', organ: 'Collegio dei Docenti (CDD) - @marianobenedetto_', email: '' },
      ],
      'Consigli di Dipartimento': [
        { name: 'Margherita Alonzi', organ: 'Consigli di Dipartimento - @margheritaalonzi', email: '' },
        { name: 'Michele De Dominicis', organ: 'Consigli di Dipartimento - @michelededominicis_', email: '' },
        { name: 'Luca Di Giacomo', organ: 'Consigli di Dipartimento - @_luca_digia0', email: '' },
        { name: 'Francesco Rastelli', organ: 'Consigli di Dipartimento - @francesco_rastelli', email: '' },
      ],
      'Consiglio di Scuola Magistrale': [
        { name: 'Francesco Iaccarino', organ: 'Consiglio di Scuola Magistrale - @f_iaccarino', email: '' },
        { name: 'Andrea Torre', organ: 'Consiglio di Scuola Magistrale - @andreatorre', email: '' },
      ],
      'Consiglio Direttivo ISU': [
        { name: 'Pasquale Mazzeo', organ: 'Consiglio Direttivo ISU - @pasquale_mazzeo', email: '' },
      ],
      'Presidio di Qualità': [
        { name: 'Alessandra Massaro', organ: 'Presidio di Qualità - @alessandramassaro_', email: '' },
      ],
      'Consiglio di Giurisprudenza': [
        { name: 'Salvatore Spaccarotella', organ: 'Consiglio di Giurisprudenza - @salvatore.spaccarotella', email: '' },
        { name: 'Emma Bisogno', organ: 'Consiglio di Giurisprudenza - @emmabiii', email: '' },
      ],
      'Comitato Sportivo Universitario': [
        { name: 'Francesco Torello', organ: 'Comitato Sportivo Universitario - @francesco.torello', email: '' },
      ],
      'Consiglio di Scuola Triennale': [
        { name: 'Armando Mastromartino', organ: 'Consiglio di Scuola Triennale - @armando.mastromartino', email: '' },
      ],
    };

    const KEYWORD_ROUTER: Array<{ organ: keyof typeof OFFICIAL_REPS; keywords: string[] }> = [
      { organ: 'Consiglio Direttivo ISU', keywords: ['isu', 'bors', 'housing', 'allogg', 'residenz'] },
      { organ: 'Presidio di Qualità', keywords: ['presidio', 'qualità', 'qualita', 'valutaz', 'insegnament'] },
      { organ: 'Collegio dei Docenti (CDD)', keywords: ['cdd', 'collegio dei docenti', 'curricula', 'nuovi corsi', 'governance', 'struttura didattica', 'piano di studi', 'piani di studio'] },
      { organ: 'Consiglio di Scuola Magistrale', keywords: ['magistrale', 'graduate'] },
      { organ: 'Consiglio di Scuola Triennale', keywords: ['triennale', 'bachelor'] },
      { organ: 'Consiglio di Giurisprudenza', keywords: ['giurisprudenza', 'law'] },
      { organ: 'Comitato Sportivo Universitario', keywords: ['sport', 'tornei', 'palestr', 'wellness'] },
      { organ: 'Consigli di Dipartimento', keywords: ['dipartiment', 'dipartimento'] },
    ];

    const wantsContact = ['chi contatto', 'chi devo contattare', 'referente', 'rappresentant', 'contatto'].some(k => userLower.includes(k));

    for (const route of KEYWORD_ROUTER) {
      if (route.keywords.some(k => userLower.includes(k))) {
        representatives.push(...OFFICIAL_REPS[route.organ]);
        responseType = 'representative';
      }
    }

    // If the AI tried to output representatives, strictly filter by whitelist (avoid invented names)
    if (responseType !== 'representative' && (lowerResponse.includes('rappresentante') || lowerResponse.includes('contatta') || wantsContact)) {
      // Prefer routing by keywords; if none matched, do not invent — answer with guidance only.
      // We keep responseType as 'answer' and rely on text, without adding any names.
    }

    // Documents detection stays based on AI response text
    if (lowerResponse.includes('guida') || lowerResponse.includes('documento') || lowerResponse.includes('scarica')) {
      responseType = responseType === 'representative' ? 'representative' : 'documents';

      if (lowerResponse.includes('tasse') || lowerResponse.includes('agevolazioni')) {
        documents.push({ title: 'Guida Tasse e Agevolazioni', url: '/guide', tag: 'PDF' });
      }
      if (lowerResponse.includes('piano di studi') || userLower.includes('piano di studi') || userLower.includes('piani di studio')) {
        documents.push({ title: 'Guida Piano di Studi', url: '/guide', tag: 'PDF' });
      }
      if (lowerResponse.includes('mobilità') || lowerResponse.includes('exchange')) {
        documents.push({ title: 'Guida Mobilità Internazionale', url: '/guide', tag: 'PDF' });
      }
      if (lowerResponse.includes('appelli')) {
        documents.push({ title: 'Calendario Appelli', url: '/guide', tag: 'PDF' });
      }
    }

    const result: AstraGPTResponse = {
      type: responseType,
      text: aiResponse,
      ...(documents.length > 0 && { documents }),
      ...(representatives.length > 0 && { representatives }),
    };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in astragpt function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      fallback: true
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});