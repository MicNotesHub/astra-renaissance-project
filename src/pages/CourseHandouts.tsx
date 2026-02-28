import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FileText, Download, ArrowLeft, Search } from "lucide-react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface HandoutFile {
  id: number;
  subject: string;
  filename: string;
  year: string;
  file_url: string;
  uploaded_at: string;
}

const CourseHandouts = () => {
  const { courseName } = useParams<{ courseName: string }>();
  const location = useLocation();
  const [files, setFiles] = useState<HandoutFile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const filteredFiles = files.filter(f =>
    f.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const { toast } = useToast();

  const decodedCourseName = courseName ? decodeURIComponent(courseName) : '';
  
  // Determine the year and back link based on the current path
  const isSecondYear = location.pathname.includes('/secondo-anno');
  const isThirdYear = location.pathname.includes('/terzo-anno');
  
  let yearFilter = 'First Year';
  let backLink = '/dispense/primo-anno';
  let backText = 'Torna al Primo Anno';
  
  if (isSecondYear) {
    yearFilter = 'Second Year';
    backLink = '/dispense/secondo-anno';
    backText = 'Torna al Secondo Anno';
  } else if (isThirdYear) {
    yearFilter = 'Third Year';
    backLink = '/dispense/terzo-anno';
    backText = 'Torna al Terzo Anno';
  }

  useEffect(() => {
    if (decodedCourseName) {
      fetchCourseHandouts();
    }
  }, [decodedCourseName, yearFilter]);

  const fetchCourseHandouts = async () => {
    try {
      const { data, error } = await supabase
        .from('handouts' as any)
        .select('*')
        .eq('subject', decodedCourseName)
        .eq('year', yearFilter)
        .order('uploaded_at', { ascending: false });

      if (error) {
        console.error('Error fetching handouts:', error);
        toast({
          title: "Errore",
          description: "Impossibile caricare le dispense",
          variant: "destructive"
        });
        return;
      }

      setFiles((data as any[]) || []);
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
              <Link to={backLink} className="mr-6">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {backText}
                </Button>
              </Link>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {decodedCourseName}
            </h1>
            <p className="text-lg text-muted-foreground">
              Dispense disponibili per questo corso
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cerca dispense..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Handouts List */}
          {filteredFiles.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Nessuna dispensa trovata</h3>
              <p className="text-muted-foreground">
                {searchTerm ? `Nessun risultato per "${searchTerm}".` : 'Le dispense per questo corso non sono ancora disponibili.'}
              </p>
            </div>
          ) : (
            <Card className="shadow-lg">
              <CardHeader className="bg-primary/5">
                <CardTitle className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-primary" />
                  Dispense del Corso
                  <span className="text-sm font-normal text-muted-foreground">
                    ({filteredFiles.length} file{filteredFiles.length !== 1 ? 's' : ''})
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-3">
                  {filteredFiles.map((file) => (
                    <div
                      key={file.id}
                      onClick={() => handleFileClick(file.file_url)}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <div>
                          <h4 className="font-medium group-hover:text-primary transition-colors">
                            {file.filename}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            PDF • Anno: {file.year} • Caricato: {formatDate(file.uploaded_at)}
                          </p>
                        </div>
                      </div>
                      <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseHandouts;