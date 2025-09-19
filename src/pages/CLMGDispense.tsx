import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const CLMGDispense = () => {
  const { t } = useLanguage();

  const years = [
    { key: 'primo_anno', label: t('clmg.firstYear'), route: '/dispense/clmg/primo-anno' },
    { key: 'secondo_anno', label: t('clmg.secondYear'), route: '/dispense/clmg/secondo-anno' },
    { key: 'terzo_anno', label: t('clmg.thirdYear'), route: '/dispense/clmg/terzo-anno' },
    { key: 'quarto_anno', label: t('clmg.fourthYear'), route: '/dispense/clmg/quarto-anno' },
    { key: 'quinto_anno', label: t('clmg.fifthYear'), route: '/dispense/clmg/quinto-anno' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Link to="/dispense" className="mr-6">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t('common.backToDispense')}
                </Button>
              </Link>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {t('clmg.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('clmg.subtitle')}
            </p>
          </div>

          {/* Year Selection Cards */}
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {years.map((year, index) => (
              <Card key={year.key} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{year.label}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('clmg.materialsForYear')}
                  </p>
                  <Link to={year.route}>
                    <Button className="w-full" size="sm">
                      {t('clmg.accessHandouts')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CLMGDispense;