import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface HandoutFile {
  id: number;
  subject: string;
  filename: string;
  file_url: string;
  uploaded_at: string;
}

interface SubjectFiles {
  [subject: string]: HandoutFile[];
}

export const TerzoAnno = () => {
  const [files, setFiles] = useState<SubjectFiles>({});
  const [loading, setLoading] = useState(true);

  const fetchHandouts = async () => {
    try {
      const { data, error } = await supabase
        .from('handouts')
        .select('*')
        .eq('year', 'Third Year')
        .order('subject', { ascending: true });

      if (error) {
        console.error('Error fetching handouts:', error);
        toast.error('Errore nel caricamento delle dispense');
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
      toast.success('Dispense caricate con successo');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Errore nel caricamento delle dispense');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHandouts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Caricamento...</p>
          </div>
        </div>
      </div>
    );
  }

  const subjects = Object.keys(files);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/dispense">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Torna alle Dispense
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Terzo Anno</h1>
          <p className="text-lg text-gray-600">
            Trova tutte le dispense e i materiali di studio per il terzo anno
          </p>
        </div>

        {subjects.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Nessuna dispensa trovata
              </h3>
              <p className="text-gray-600">
                Non ci sono ancora dispense disponibili per il terzo anno.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <Link 
                key={subject}
                to={`/dispense/terzo-anno/${encodeURIComponent(subject)}`}
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    <CardTitle className="group-hover:text-blue-600 transition-colors">
                      {subject}
                    </CardTitle>
                    <CardDescription>
                      {files[subject].length} file{files[subject].length !== 1 ? '' : ''} disponibili
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Materiali di studio
                      </span>
                      <FileText className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};