import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PdfThumbnail } from "@/components/ui/pdf-thumbnail";
import { FileText, Download, ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toCdnUrl } from "@/lib/cdn";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface MagistraliHandout {
  id: string;
  program: string;
  name: string;
  url: string;
  semester: number | null;
  exam_type: string | null;
}

const MagistraliHandouts = () => {
  const [handouts, setHandouts] = useState<MagistraliHandout[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [programFilter, setProgramFilter] = useState<string>("all");
  const { t } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    fetchHandouts();
  }, []);

  const fetchHandouts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('magistrali_handouts' as any)
      .select('*')
      .order('program', { ascending: true })
      .order('name', { ascending: true });

    if (error) {
      console.error(error);
      toast({ title: t('common.error'), description: t('courseHandouts.errorLoading'), variant: "destructive" });
    } else {
      setHandouts((data as any[]) || []);
    }
    setLoading(false);
  };

  const programs = useMemo(() => {
    const set = new Set(handouts.map(h => h.program).filter(Boolean));
    return Array.from(set).sort();
  }, [handouts]);

  const filtered = handouts.filter(h => {
    const matchesSearch = h.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram = programFilter === "all" || h.program === programFilter;
    return matchesSearch && matchesProgram;
  });

  const handleClick = (url: string) => {
    if (!url) return;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link to="/dispense" className="mb-6 inline-block">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('common.backToDispense')}
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              {t('magistrali.title')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('magistrali.subtitle')}
            </p>
          </div>

          <div className="relative mb-6 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('courseHandouts.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {programs.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-medium text-muted-foreground mb-2">{t('magistrali.filterProgram')}</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={programFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setProgramFilter("all")}
                >
                  {t('courseHandouts.all')}
                </Button>
                {programs.map(p => (
                  <Button
                    key={p}
                    variant={programFilter === p ? "default" : "outline"}
                    size="sm"
                    onClick={() => setProgramFilter(p)}
                  >
                    {p}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {loading ? (
            <p className="text-center py-12">{t('courseHandouts.loading')}</p>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">{t('courseHandouts.noResults')}</h3>
              <p className="text-muted-foreground">{t('magistrali.empty')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map(file => (
                <Card
                  key={file.id}
                  onClick={() => handleClick(file.url)}
                  className="cursor-pointer hover:shadow-xl hover:scale-[1.03] transition-all duration-300 group overflow-hidden"
                >
                  <div className="aspect-[3/4] overflow-hidden border-b">
                    <PdfThumbnail fileUrl={file.url} className="w-full h-full" />
                  </div>
                  <CardContent className="p-3">
                    <p className="text-xs text-muted-foreground mb-1">{file.program}</p>
                    <h4 className="text-sm font-medium leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      {file.name}
                    </h4>
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                      <Download className="w-3 h-3" />
                      <span>{t('handouts.download')}</span>
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

export default MagistraliHandouts;
