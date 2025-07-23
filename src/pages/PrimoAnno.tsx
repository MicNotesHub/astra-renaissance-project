import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, ArrowLeft, FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface HandoutFile {
  id: string;
  title: string;
  course_name: string;
  academic_year: string;
  file_url: string | null;
  upload_date: string;
  resource_type: string;
}

interface SubjectFiles {
  [course: string]: HandoutFile[];
}

const PrimoAnno = () => {
  const [files, setFiles] = useState<SubjectFiles>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchHandouts();
  }, []);

  const fetchHandouts = async () => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('is_public', true)
        .order('course_name', { ascending: true });

      if (error) {
        console.error('Error fetching handouts:', error);
        toast({
          title: "Errore",
          description: "Impossibile caricare le dispense",
          variant: "destructive"
        });
        return;
      }

      // Group files by course
      const groupedFiles: SubjectFiles = {};
      
      if (data) {
        data.forEach((resource) => {
          const course = resource.course_name || 'Generale';
          
          if (!groupedFiles[course]) {
            groupedFiles[course] = [];
          }
          
          groupedFiles[course].push(resource);
        });
      }

      setFiles(groupedFiles);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Errore",
        description: "Errore nel caricamento delle dispense",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileClick = async (fileUrl: string | null) => {
    if (!fileUrl) {
      toast({
        title: "Errore",
        description: "URL del file non disponibile",
        variant: "destructive"
      });
      return;
    }

    try {
      // Check if it's a storage bucket URL
      if (fileUrl.includes('handouts-bucket')) {
        const fileName = fileUrl.split('/').pop() || '';
        const { data, error } = await supabase.storage
          .from('handouts-bucket')
          .createSignedUrl(fileName, 315360000); // 10 years in seconds

        if (error) {
          console.error('Error creating signed URL:', error);
          // Fallback to direct URL if signed URL fails
          window.open(fileUrl, '_blank');
          return;
        }

        if (data?.signedUrl) {
          window.open(data.signedUrl, '_blank');
        } else {
          // Fallback to direct URL
          window.open(fileUrl, '_blank');
        }
      } else {
        // Direct URL
        window.open(fileUrl, '_blank');
      }
    } catch (error) {
      console.error('Error:', error);
      // Final fallback to direct URL
      window.open(fileUrl, '_blank');
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('it-IT');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-lg">Caricamento dispense...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <Link to="/dispense" className="mr-6">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Torna alle Dispense
                </Button>
              </Link>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Dispense Primo Anno
            </h1>
            <p className="text-lg text-muted-foreground">
              Materiali di studio per i corsi del primo anno accademico
            </p>
          </div>

          {/* Courses Grid */}
          {Object.keys(files).length === 0 ? (
            <div className="text-center py-12">
              <FolderOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Nessuna dispensa trovata</h3>
              <p className="text-muted-foreground">
                Le dispense per il primo anno non sono ancora disponibili.
              </p>
            </div>
          ) : (
            <div className="grid gap-8">
              {Object.entries(files).map(([course, courseFiles]) => (
                <Card key={course} className="shadow-lg">
                  <CardHeader className="bg-primary/5">
                    <CardTitle className="flex items-center gap-3">
                      <FolderOpen className="w-6 h-6 text-primary" />
                      {course}
                      <span className="text-sm font-normal text-muted-foreground">
                        ({courseFiles.length} file{courseFiles.length !== 1 ? 's' : ''})
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid gap-3">
                      {courseFiles.map((file) => (
                        <div
                          key={file.id}
                          onClick={() => handleFileClick(file.file_url)}
                          className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-primary" />
                            <div>
                              <h4 className="font-medium group-hover:text-primary transition-colors">
                                {file.title}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {file.resource_type} • Anno: {file.academic_year} • Caricato: {formatDate(file.upload_date)}
                              </p>
                            </div>
                          </div>
                          <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrimoAnno;