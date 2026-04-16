import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PdfThumbnail } from "@/components/ui/pdf-thumbnail";
import { FileText, Download, ArrowLeft, Search, ExternalLink } from "lucide-react";
import { Link, useParams } from "react-router-dom";
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
  exam_type: string | null;
}

const slugToYear: Record<string, string> = {
  "primo-anno": "First Year",
  "secondo-anno": "Second Year",
  "terzo-anno": "Third Year",
};

const CourseHandouts = () => {
  const { courseName, year: yearSlug } = useParams<{ courseName: string; year: string }>();
  const [files, setFiles] = useState<HandoutFile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [semesterFilter, setSemesterFilter] = useState<number | null>(null);
  const [examTypeFilter, setExamTypeFilter] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { t, language } = useLanguage();
  const { toast } = useToast();

  const decodedCourseName = courseName ? decodeURIComponent(courseName) : '';
  const yearFilter = yearSlug ? slugToYear[yearSlug] || "First Year" : "First Year";

  const yearDisplayMap: Record<string, string> = {
    "First Year": language === 'it' ? "Primo Anno" : "First Year",
    "Second Year": language === 'it' ? "Secondo Anno" : "Second Year",
    "Third Year": language === 'it' ? "Terzo Anno" : "Third Year",
  };

  const filteredFiles = files.filter(f => {
    const matchesSearch = f.filename.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSemester = semesterFilter === null || f.semester === semesterFilter;
    const matchesExamType = examTypeFilter === null || f.exam_type === examTypeFilter;
    return matchesSearch && matchesSemester && matchesExamType;
  });

  useEffect(() => {
    if (decodedCourseName) {
      fetchCourseHandouts();
    }
  }, [decodedCourseName, yearFilter]);

  // Reset exam type when semester changes
  useEffect(() => {
    setExamTypeFilter(null);
  }, [semesterFilter]);

  const fetchCourseHandouts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('handouts' as any)
        .select('*')
        .eq('subject', decodedCourseName)
        .eq('year', yearFilter)
        .order('uploaded_at', { ascending: false });

      if (error) {
        console.error('Error fetching handouts:', error);
        toast({ title: t('common.error'), description: t('courseHandouts.errorLoading'), variant: "destructive" });
        return;
      }

      setFiles((data as any[]) || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileClick = async (fileUrl: string | null) => {
    if (!fileUrl) {
      toast({ title: t('common.error'), description: t('courseHandouts.fileUnavailable'), variant: "destructive" });
      return;
    }
    try {
      if (fileUrl.includes('handouts-bucket')) {
        const fileName = fileUrl.split('/').pop() || '';
        const { data, error } = await supabase.storage.from('handouts-bucket').createSignedUrl(fileName, 315360000);
        if (!error && data?.signedUrl) {
          window.open(data.signedUrl, '_blank');
          return;
        }
      }
      window.open(fileUrl, '_blank');
    } catch {
      window.open(fileUrl, '_blank');
    }
  };

  // Check if exam type options exist for current semester filter
  const hasExamTypes = semesterFilter !== null && files.some(f => f.semester === semesterFilter && f.exam_type);

  const backLink = `/dispense/${encodeURIComponent(decodedCourseName)}`;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
        <Navigation />
        <div className="pt-24 pb-16 text-center">
          <p className="text-lg">{t('courseHandouts.loading')}</p>
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
            <Link to={backLink} className="mb-6 inline-block">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('courseHandouts.backToCourse')}
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              {decodedCourseName} — {yearDisplayMap[yearFilter]}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('courseHandouts.availableHandouts')}
            </p>
          </div>

          {/* Search */}
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
          <div className="mb-4">
            <p className="text-sm font-medium text-muted-foreground mb-2">{t('courseHandouts.filterSemester')}</p>
            <div className="flex gap-2">
              {[
                { label: t('courseHandouts.all'), value: null },
                { label: t('courseHandouts.semester1'), value: 1 },
                { label: t('courseHandouts.semester2'), value: 2 },
              ].map((opt) => (
                <Button
                  key={String(opt.value)}
                  variant={semesterFilter === opt.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSemesterFilter(opt.value)}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Exam Type Filter - shows only when a semester is selected and exam types exist */}
          {hasExamTypes && (
            <div className="mb-6">
              <p className="text-sm font-medium text-muted-foreground mb-2">{t('courseHandouts.filterExamType')}</p>
              <div className="flex gap-2">
                {[
                  { label: t('courseHandouts.all'), value: null },
                  { label: t('courseHandouts.parziale'), value: "parziale" },
                  { label: t('courseHandouts.generale'), value: "generale" },
                ].map((opt) => (
                  <Button
                    key={String(opt.value)}
                    variant={examTypeFilter === opt.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setExamTypeFilter(opt.value)}
                  >
                    {opt.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Files */}
          {filteredFiles.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">{t('courseHandouts.noResults')}</h3>
              <p className="text-muted-foreground">
                {searchTerm ? `${t('courseHandouts.noResultsSearch')} "${searchTerm}".` : t('courseHandouts.noResultsEmpty')}
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                {filteredFiles.length} {t('yearPage.files')}{filteredFiles.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredFiles.map((file) => (
                  <Card
                    key={file.id}
                    onClick={() => handleFileClick(file.file_url)}
                    className="cursor-pointer hover:shadow-xl hover:scale-[1.03] transition-all duration-300 group overflow-hidden"
                  >
                    <div className="aspect-[3/4] overflow-hidden border-b">
                      <div className="w-full h-full group-hover:scale-110 transition-transform duration-500 ease-out">
                        <PdfThumbnail
                          fileUrl={file.file_url}
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <h4 className="text-sm font-medium leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {file.filename}
                      </h4>
                      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                        <Download className="w-3 h-3" />
                        <span>{t('handouts.download')}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseHandouts;
