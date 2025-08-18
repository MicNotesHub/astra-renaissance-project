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
    const SYSTEM_PROMPT = Deno.env.get('ASTRAGPT_SYSTEM_PROMPT') || `Sei AstraGPT, l'assistente virtuale di ASTRA Bocconi per gli studenti universitari.

CONTESTO:
- ASTRA è la lista di rappresentanza degli studenti dell'Università Bocconi
- Aiuti studenti con: procedure universitarie, scadenze, piani di studio, mobilità internazionale, tasse, agevolazioni, appelli
- Fornisci sempre risposte chiare, dirette e utili
- Se una domanda richiede assistenza personale, suggerisci il rappresentante appropriato

RAPPRESENTANTI:
- Alessandro Martini (Responsabile Didattica, Senato Accademico): alessandro.martini@astrabocconi.it
- Sofia Rossi (Responsabile Welfare): sofia.rossi@astrabocconi.it  
- Marco Bianchi (Responsabile Mobilità): marco.bianchi@astrabocconi.it
- Laura Verdi (Consiglio della Scuola): laura.verdi@astrabocconi.it

STILE:
- Tono amichevole ma professionale
- Risposte concise (max 200 parole)
- Includi link alle guide quando disponibili
- Suggerisci rappresentanti quando necessario`;

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

    // Parse response to determine type and extract structured data
    let responseType: 'answer' | 'representative' | 'documents' = 'answer';
    const documents: Document[] = [];
    const representatives: Representative[] = [];

    // Simple keyword detection for response type
    const lowerResponse = aiResponse.toLowerCase();
    
    if (lowerResponse.includes('contatta') || lowerResponse.includes('rappresentante') || lowerResponse.includes('@astrabocconi')) {
      responseType = 'representative';
      
      // Extract representative info from the response
      if (lowerResponse.includes('alessandro.martini')) {
        representatives.push({
          name: 'Alessandro Martini',
          organ: 'Responsabile Didattica, Senato Accademico',
          email: 'alessandro.martini@astrabocconi.it'
        });
      }
      if (lowerResponse.includes('sofia.rossi')) {
        representatives.push({
          name: 'Sofia Rossi',
          organ: 'Responsabile Welfare',
          email: 'sofia.rossi@astrabocconi.it'
        });
      }
      if (lowerResponse.includes('marco.bianchi')) {
        representatives.push({
          name: 'Marco Bianchi',
          organ: 'Responsabile Mobilità',
          email: 'marco.bianchi@astrabocconi.it'
        });
      }
      if (lowerResponse.includes('laura.verdi')) {
        representatives.push({
          name: 'Laura Verdi',
          organ: 'Consiglio della Scuola',
          email: 'laura.verdi@astrabocconi.it'
        });
      }
    }

    if (lowerResponse.includes('guida') || lowerResponse.includes('documento') || lowerResponse.includes('scarica')) {
      responseType = 'documents';
      
      // Add relevant documents based on context
      if (lowerResponse.includes('tasse') || lowerResponse.includes('agevolazioni')) {
        documents.push({
          title: 'Guida Tasse e Agevolazioni',
          url: '/guide',
          tag: 'PDF'
        });
      }
      if (lowerResponse.includes('piano di studi')) {
        documents.push({
          title: 'Guida Piano di Studi',
          url: '/guide',
          tag: 'PDF'
        });
      }
      if (lowerResponse.includes('mobilità') || lowerResponse.includes('exchange')) {
        documents.push({
          title: 'Guida Mobilità Internazionale',
          url: '/guide',
          tag: 'PDF'
        });
      }
      if (lowerResponse.includes('appelli')) {
        documents.push({
          title: 'Calendario Appelli',
          url: '/guide',
          tag: 'PDF'
        });
      }
    }

    const result: AstraGPTResponse = {
      type: responseType,
      text: aiResponse,
      ...(documents.length > 0 && { documents }),
      ...(representatives.length > 0 && { representatives })
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