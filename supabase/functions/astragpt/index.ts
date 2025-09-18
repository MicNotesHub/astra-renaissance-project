import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.52.0';

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
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');
    
    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
    
    const SYSTEM_PROMPT = Deno.env.get('ASTRAGPT_SYSTEM_PROMPT') || `Sei AstraGPT 2.0, l'assistente di ASTRA (associazione studenti Bocconi).

Regole chiave:
- Parla come un pari: informale, diretto, amichevole. Niente burocrazia.
- Usa solo il "ASTRA Knowledge Pack". Se un dato non c'è, rispondi: "Non lo so ancora" e instrada correttamente.
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

    // Search for relevant content in the database
    const searchResults = await searchContent(supabase, message);
    const contextualInfo = searchResults.length > 0 ? 
      `\n\nINFORMAZIONI DAL DATABASE ASTRA:\n${searchResults.map(r => `- ${r.type}: ${r.title} - ${r.content}`).join('\n')}` 
      : '';

    // Enhanced system prompt with contextual information
    const enhancedPrompt = SYSTEM_PROMPT + contextualInfo + `
    
IMPORTANTE: Se nella domanda dell'utente ci sono riferimenti a dispense, guide, eventi o contenuti specifici, cerca sempre di utilizzare le informazioni dal database ASTRA qui sopra per fornire risposte accurate e aggiornate.`;

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
          { role: 'system', content: enhancedPrompt },
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

    // Enhanced documents detection with database search results
    if (lowerResponse.includes('guida') || lowerResponse.includes('documento') || lowerResponse.includes('scarica') || searchResults.length > 0) {
      responseType = responseType === 'representative' ? 'representative' : 'documents';

      // Add documents from search results
      searchResults.forEach(result => {
        if (result.type === 'handout' && result.url) {
          documents.push({
            title: result.title,
            url: result.url,
            tag: 'PDF'
          });
        }
      });

      // Add default documents based on keywords
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

// Function to search for relevant content in the database
async function searchContent(supabase: any, query: string): Promise<Array<{type: string, title: string, content: string, url?: string}>> {
  const results: Array<{type: string, title: string, content: string, url?: string}> = [];
  const lowerQuery = query.toLowerCase();
  
  try {
    // Search in handouts/dispense
    const { data: handouts } = await supabase
      .from('handouts')
      .select('*')
      .or(`filename.ilike.%${query}%,subject.ilike.%${query}%,year.ilike.%${query}%`)
      .limit(5);
    
    if (handouts) {
      handouts.forEach((handout: any) => {
        results.push({
          type: 'handout',
          title: handout.filename,
          content: `Dispensa per ${handout.subject} - ${handout.year}`,
          url: handout.file_url
        });
      });
    }

    // Search in events
    const { data: events } = await supabase
      .from('events')
      .select('*')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%,event_type.ilike.%${query}%`)
      .gte('start_date', new Date().toISOString())
      .limit(3);
    
    if (events) {
      events.forEach((event: any) => {
        results.push({
          type: 'event',
          title: event.title,
          content: `${event.description} - ${new Date(event.start_date).toLocaleDateString('it-IT')} - ${event.location || 'Online'}`
        });
      });
    }

    // Search in media content
    const { data: media } = await supabase
      .from('astra_polare_media_content')
      .select('*')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .limit(3);
    
    if (media) {
      media.forEach((item: any) => {
        results.push({
          type: 'media',
          title: item.title,
          content: `${item.description} - ${item.platform} - ${item.views} visualizzazioni`
        });
      });
    }

    // Search in PDF files - search both name and content
    const { data: pdfFiles } = await supabase
      .from('pdf_files')
      .select('*')
      .or(`name.ilike.%${query}%,content.ilike.%${query}%`)
      .limit(5);
    
    if (pdfFiles) {
      pdfFiles.forEach((pdf: any) => {
        // Extract relevant snippet from content if available
        let contentPreview = `PDF Document: ${pdf.name}`;
        if (pdf.content && pdf.content.length > 0) {
          const lowerContent = pdf.content.toLowerCase();
          const lowerQuery = query.toLowerCase();
          const index = lowerContent.indexOf(lowerQuery);
          
          if (index !== -1) {
            // Extract context around the found term
            const start = Math.max(0, index - 100);
            const end = Math.min(pdf.content.length, index + 200);
            let snippet = pdf.content.substring(start, end);
            
            // Clean up the snippet
            if (start > 0) snippet = '...' + snippet;
            if (end < pdf.content.length) snippet = snippet + '...';
            
            contentPreview = `${pdf.name}: ${snippet}`;
          }
        }
        
        results.push({
          type: 'pdf',
          title: pdf.name,
          content: contentPreview,
          url: pdf.url
        });
      });
    }

    // Additional keyword-based searches
    if (lowerQuery.includes('primo anno') || lowerQuery.includes('first year')) {
      const { data: firstYear } = await supabase
        .from('handouts')
        .select('*')
        .eq('year', 'First Year')
        .limit(3);
      
      if (firstYear) {
        firstYear.forEach((handout: any) => {
          results.push({
            type: 'handout',
            title: handout.filename,
            content: `Dispensa ${handout.subject} - Primo Anno`,
            url: handout.file_url
          });
        });
      }
    }

    if (lowerQuery.includes('secondo anno') || lowerQuery.includes('second year')) {
      const { data: secondYear } = await supabase
        .from('handouts')
        .select('*')
        .eq('year', 'Second Year')
        .limit(3);
      
      if (secondYear) {
        secondYear.forEach((handout: any) => {
          results.push({
            type: 'handout',
            title: handout.filename,
            content: `Dispensa ${handout.subject} - Secondo Anno`,
            url: handout.file_url
          });
        });
      }
    }

    if (lowerQuery.includes('terzo anno') || lowerQuery.includes('third year')) {
      const { data: thirdYear } = await supabase
        .from('handouts')
        .select('*')
        .eq('year', 'Third Year')
        .limit(3);
      
      if (thirdYear) {
        thirdYear.forEach((handout: any) => {
          results.push({
            type: 'handout',
            title: handout.filename,
            content: `Dispensa ${handout.subject} - Terzo Anno`,
            url: handout.file_url
          });
        });
      }
    }

    console.log(`Found ${results.length} relevant results for query: ${query}`);
    return results;
    
  } catch (error) {
    console.error('Error searching content:', error);
    return [];
  }
}
