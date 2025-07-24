import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Navigation } from '@/components/ui/navigation';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface HandoutFile {
  id: number;
  subject: string;
  filename: string;
  year: string;
  file_url: string;
  uploaded_at: string;
}

interface SubjectFiles {
  [subject: string]: HandoutFile[];
}

export const SecondoAnno: React.FC = () => {
  const [files, setFiles] = useState<SubjectFiles>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchHandouts = async () => {
    try {
      const { data, error } = await supabase
        .from('handouts')
        .select('*')
        .eq('year', 'Second Year')
        .order('subject', { ascending: true })
        .order('filename', { ascending: true });

      if (error) {
        console.error('Error fetching handouts:', error);
        toast({
          title: "Errore",
          description: "Impossibile caricare le dispense",
          variant: "destructive",
        });
        return;
      }

      // Group files by subject
      const groupedFiles: SubjectFiles = {};
      data?.forEach((file) => {
        if (!groupedFiles[file.subject]) {
          groupedFiles[file.subject] = [];
        }
        groupedFiles[file.subject].push(file);
      });

      setFiles(groupedFiles);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore imprevisto",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHandouts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Caricamento...</p>
          </div>
        </div>
      </div>
    );
  }

  const subjects = Object.keys(files);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/dispense"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            onClick={() => {
              console.log('Back button clicked - navigating to /dispense');
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            Torna alle Dispense
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Secondo Anno</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Accedi alle dispense e materiali didattici per i corsi del secondo anno
          </p>
        </div>

        {subjects.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Nessun corso trovato</h3>
            <p className="text-muted-foreground">
              Non sono ancora disponibili dispense per il secondo anno.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <Link
                key={subject}
                to={`/dispense/secondo-anno/${encodeURIComponent(subject)}`}
                className="group block"
              >
                <div className="bg-card border rounded-lg p-6 h-full transition-all duration-200 hover:shadow-lg hover:border-primary/50 group-hover:scale-[1.02]">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                      {files[subject].length} file{files[subject].length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {subject}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground">
                    Visualizza le dispense disponibili per questo corso
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};