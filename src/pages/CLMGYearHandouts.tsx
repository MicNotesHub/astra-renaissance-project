import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

interface CLMGHandout {
  id: string;
  name: string;
  course_year: number;
  url: string;
  created_at: string;
  semester: number | null;
  exam_type: string | null;
}

const CLMGYearHandouts = () => {
  const { year } = useParams();
  const { t } = useLanguage();
  const [handouts, setHandouts] = useState<CLMGHandout[]>([]);
  const [filteredHandouts, setFilteredHandouts] = useState<CLMGHandout[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [semesterFilter, setSemesterFilter] = useState<number | null>(null);
  const [examTypeFilter, setExamTypeFilter] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const yearLabels: { [key: string]: string } = {
    'primo-anno': t('clmg.firstYear'),
    'secondo-anno': t('clmg.secondYear'),
    'terzo-anno': t('clmg.thirdYear'),
    'quarto-anno': t('clmg.fourthYear'),
    'quinto-anno': t('clmg.fifthYear'),
  };

  const yearKeys: { [key: string]: number } = {
    'primo-anno': 1,
    'secondo-anno': 2,
    'terzo-anno': 3,
    'quarto-anno': 4,
    'quinto-anno': 5,
  };

  useEffect(() => {
    fetchHandouts();
  }, [year]);

  useEffect(() => {
    const filtered = handouts.filter(handout => {
      const matchesSearch = handout.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSemester = semesterFilter === null || handout.semester === semesterFilter;
      const matchesExamType = examTypeFilter === null || handout.exam_type === examTypeFilter;
      return matchesSearch && matchesSemester && matchesExamType;
    });
    setFilteredHandouts(filtered);
  }, [handouts, searchTerm, semesterFilter, examTypeFilter]);

  // Reset exam type when semester changes
  useEffect(() => {
    setExamTypeFilter(null);
  }, [semesterFilter]);

  const hasExamTypes = semesterFilter !== null && handouts.some(h => h.semester === semesterFilter && h.exam_type);

  const fetchHandouts = async () => {
    if (!year || !yearKeys[year]) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('clmg_handouts')
        .select('*')
        .eq('course_year', yearKeys[year])
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching CLMG handouts:', error);
        toast.error(t('clmg.errorFetching'));
        return;
      }

      setHandouts(data || []);
    } catch (error) {
      console.error('Error fetching CLMG handouts:', error);
      toast.error(t('clmg.errorFetching'));
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (url: string, name: string) => {
    // Open the file in a new tab for download
    window.open(url, '_blank');
    toast.success(t('clmg.downloadStarted'));
  };

  if (!year || !yearLabels[year]) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {t('common.error')}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {t('clmg.yearNotFound')}
            </p>
            <Link to="/dispense/clmg">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('clmg.backToCLMG')}
              </Button>
            </Link>
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
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Link to="/dispense/clmg" className="mr-6">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t('clmg.backToCLMG')}
                </Button>
              </Link>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {t('clmg.title')} - {yearLabels[year]}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {`${t('clmg.handoutsForText')} ${yearLabels[year]}`}
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder={t('clmg.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">{t('clmg.loading')}</p>
            </div>
          ) : filteredHandouts.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {searchTerm ? t('clmg.noSearchResults') : t('clmg.noHandouts')}
              </h3>
              <p className="text-muted-foreground">
                {searchTerm 
                  ? `${t('clmg.noSearchResultsText')} "${searchTerm}".`
                  : `${t('clmg.noHandoutsText')} ${yearLabels[year]}.`
                }
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHandouts.map((handout) => (
                <Card key={handout.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {handout.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-end">
                      <Button
                        size="sm"
                        onClick={() => handleDownload(handout.url, handout.name)}
                        className="gap-2"
                      >
                        <Download className="w-4 h-4" />
                        {t('clmg.download')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Results Count */}
          {!loading && filteredHandouts.length > 0 && (
            <div className="text-center mt-8">
              <p className="text-muted-foreground">
                {filteredHandouts.length === 1 
                  ? t('clmg.oneResult')
                  : `${filteredHandouts.length} ${t('clmg.multipleResultsText')}`
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CLMGYearHandouts;