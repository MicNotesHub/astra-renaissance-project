import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FileText, Download, ArrowLeft, Search } from "lucide-react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface HandoutFile {
  id: number;
  subject: string;
  filename: string;
  year: string;
  file_url: string;
  uploaded_at: string;
  semester: number | null;
}

const CourseHandouts = () => {
  const { courseName } = useParams<{ courseName: string }>();
  const location = useLocation();
  const [files, setFiles] = useState<HandoutFile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [semesterFilter, setSemesterFilter] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  const filteredFiles = files.filter(f => {
    const matchesSearch = f.filename.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSemester = semesterFilter === null || (f as any).semester === semesterFilter;
    return matchesSearch && matchesSemester;
  });
  const { toast } = useToast();

  const decodedCourseName = courseName ? decodeURIComponent(courseName) : '';
  
  const isSecondYear = location.pathname.includes('/secondo-anno');
  const isThirdYear = location.pathname.includes('/terzo-anno');
  
  let yearFilter = 'First Year';
  let backLink = '/dispense/primo-anno';
  let backTextKey = 'courseHandouts.backFirstYear';
  
  if (isSecondYear) {
    yearFilter = 'Second Year';
    backLink = '/dispense/secondo-anno';
    backTextKey = 'courseHandouts.backSecondYear';
  } else if (isThirdYear) {
    yearFilter = 'Third Year';
    backLink = '/dispense/terzo-anno';
    backTextKey = 'courseHandouts.backThirdYear';
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
          title: t('common.error'),
          description: t('courseHandouts.errorLoading'),
          variant: "destructive"
        });
        return;
      }

      setFiles((data as any[]) || []);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: t('common.error'),
        description: t('courseHandouts.errorGeneric'),
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileClick = async (fileUrl: string | null) => {
    if (!fileUrl) {
      toast({
        title: t('common.error'),
        description: t('courseHandouts.fileUnavailable'),
        variant: "destructive"
      });
      return;
    }

    try {
      if (fileUrl.includes('handouts-bucket')) {
        const fileName = fileUrl.split('/').pop() || '';
        const { data, error } = await supabase.storage
          .from('handouts-bucket')
          .createSignedUrl(fileName, 315360000);

        if (error) {
          console.error('Error creating signed URL:', error);
          window.open(fileUrl, '_blank');
          return;
        }

        if (data?.signedUrl) {
          window.open(data.signedUrl, '_blank');
        } else {
          window.open(fileUrl, '_blank');
        }
      } else {
        window.open(fileUrl, '_blank');
      }
    } catch (error) {
      console.error('Error:', error);
      window.open(fileUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-lg">{t('courseHandouts.loading')}</p>
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
                  {t(backTextKey)}
                </Button>
              </Link>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {decodedCourseName}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('courseHandouts.availableHandouts')}
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('courseHandouts.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Semester Filter */}
          {!(isThirdYear && decodedCourseName.toUpperCase().includes('BIEF')) && 
           !decodedCourseName.toUpperCase().includes('ELECTIVE') && (
            <div className="flex gap-2 mb-6">
              {[
                { label: t('courseHandouts.all'), value: null },
                { label: t('courseHandouts.semester1'), value: 1 },
                { label: t('courseHandouts.semester2'), value: 2 },
              ].map((opt) => (
                <Button
                  key={opt.label}
                  variant={semesterFilter === opt.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSemesterFilter(opt.value)}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          )}
          {filteredFiles.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">{t('courseHandouts.noResults')}</h3>
              <p className="text-muted-foreground">
                {searchTerm ? `${t('courseHandouts.noResultsSearch')} "${searchTerm}".` : t('courseHandouts.noResultsEmpty')}
              </p>
            </div>
          ) : (
            <Card className="shadow-lg">
              <CardHeader className="bg-primary/5">
                <CardTitle className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-primary" />
                  {t('courseHandouts.courseHandouts')}
                  <span className="text-sm font-normal text-muted-foreground">
                    ({filteredFiles.length} {t('yearPage.files')}{filteredFiles.length !== 1 ? 's' : ''})
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
                            PDF • {t('courseHandouts.year')}: {file.year}
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