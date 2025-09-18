import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get all PDFs that don't have content yet
    const { data: pdfs, error: fetchError } = await supabaseClient
      .from('pdf_files')
      .select('*')
      .is('content', null);

    if (fetchError) {
      console.error('Error fetching PDFs:', fetchError);
      return new Response(JSON.stringify({ error: 'Failed to fetch PDFs' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!pdfs || pdfs.length === 0) {
      return new Response(JSON.stringify({ message: 'No PDFs need content extraction' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const results = [];

    for (const pdf of pdfs) {
      try {
        console.log(`Extracting content from: ${pdf.name}`);
        
        // Fetch the PDF file
        const pdfResponse = await fetch(pdf.url);
        if (!pdfResponse.ok) {
          console.error(`Failed to fetch PDF: ${pdf.name}`);
          continue;
        }

        const pdfBuffer = await pdfResponse.arrayBuffer();
        
        // Convert to base64 for processing
        const base64Pdf = btoa(String.fromCharCode(...new Uint8Array(pdfBuffer)));
        
        // Use a simple text extraction approach
        // Note: This is a basic approach. For production, you might want to use a more sophisticated PDF parsing library
        let extractedText = '';
        
        // Try to extract text using a basic approach
        // This is a simplified extraction - in production you'd use a proper PDF parser
        try {
          const decoder = new TextDecoder();
          const text = decoder.decode(pdfBuffer);
          
          // Extract readable text content using regex
          const textMatches = text.match(/BT[\s\S]*?ET/g);
          if (textMatches) {
            extractedText = textMatches.join(' ')
              .replace(/BT|ET|Td|TJ|Tj|'|"|\\[nrt]/g, ' ')
              .replace(/\s+/g, ' ')
              .trim();
          }
          
          // If that doesn't work well, try another approach
          if (!extractedText || extractedText.length < 100) {
            // Extract text between parentheses and brackets which often contain text in PDFs
            const textContent = text.match(/\(([^)]+)\)/g) || [];
            const bracketsContent = text.match(/\[([^\]]+)\]/g) || [];
            
            extractedText = [...textContent, ...bracketsContent]
              .map(match => match.replace(/[()[\]]/g, ''))
              .join(' ')
              .replace(/\s+/g, ' ')
              .trim();
          }
        } catch (parseError) {
          console.error(`Error parsing PDF ${pdf.name}:`, parseError);
          extractedText = `PDF content available but could not be parsed automatically. File: ${pdf.name}`;
        }

        // If we still don't have meaningful content, provide a fallback
        if (!extractedText || extractedText.length < 50) {
          extractedText = `This PDF (${pdf.name}) contains information that is available for download but could not be automatically extracted for search. Please download the PDF directly for full content.`;
        }

        // Limit content size to prevent database issues
        if (extractedText.length > 50000) {
          extractedText = extractedText.substring(0, 50000) + '... [Content truncated for storage]';
        }

        // Update the PDF record with extracted content
        const { error: updateError } = await supabaseClient
          .from('pdf_files')
          .update({ content: extractedText })
          .eq('name', pdf.name);

        if (updateError) {
          console.error(`Error updating PDF ${pdf.name}:`, updateError);
        } else {
          console.log(`Successfully extracted content for: ${pdf.name}`);
          results.push({
            name: pdf.name,
            contentLength: extractedText.length,
            success: true
          });
        }

      } catch (error) {
        console.error(`Error processing PDF ${pdf.name}:`, error);
        results.push({
          name: pdf.name,
          success: false,
          error: error.message
        });
      }
    }

    return new Response(JSON.stringify({ 
      message: 'PDF content extraction completed',
      results
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in extract-pdf-content function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});