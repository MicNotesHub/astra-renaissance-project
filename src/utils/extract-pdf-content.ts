import { supabase } from "@/integrations/supabase/client";

export async function extractPdfContent() {
  try {
    console.log('Calling extract-pdf-content function...');
    const { data, error } = await supabase.functions.invoke('extract-pdf-content');
    
    if (error) {
      console.error('Error calling extract-pdf-content:', error);
      throw error;
    }
    
    console.log('PDF extraction results:', data);
    return data;
  } catch (error) {
    console.error('Failed to extract PDF content:', error);
    throw error;
  }
}

// Auto-run the extraction
extractPdfContent().then(result => {
  console.log('PDF content extraction completed:', result);
}).catch(error => {
  console.error('PDF extraction failed:', error);
});