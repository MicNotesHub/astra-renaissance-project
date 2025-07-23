import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen, ArrowLeft } from "lucide-react";
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
              Corsi Primo Anno
            </h1>
            <p className="text-lg text-muted-foreground">
              Seleziona un corso per accedere alle dispense
            </p>
          </div>

          {/* Courses Grid */}
          {Object.keys(files).length === 0 ? (
            <div className="text-center py-12">
              <FolderOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Nessun corso trovato</h3>
              <p className="text-muted-foreground">
                I corsi per il primo anno non sono ancora disponibili.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(files).map(([course, courseFiles]) => (
                <Link key={course} to={`/dispense/primo-anno/${encodeURIComponent(course)}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <FolderOpen className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {course}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {courseFiles.length} dispense disponibili
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrimoAnno;