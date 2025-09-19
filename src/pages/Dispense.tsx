import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Dispense = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Link to="/" className="mr-6">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t('common.backToHome')}
                </Button>
              </Link>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {t('dispense.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('dispense.subtitle')}
            </p>
          </div>

          {/* Year Selection Cards and CLMG */}
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* First Year Card */}
            <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{t('dispense.firstYear')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('dispense.firstYearDesc')}
                </p>
                <Link to="/dispense/primo-anno">
                  <Button className="w-full">
                    {t('dispense.accessHandouts')}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Second Year Card */}
            <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{t('dispense.secondYear')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('dispense.secondYearDesc')}
                </p>
                <Link to="/dispense/secondo-anno">
                  <Button className="w-full">
                    {t('dispense.accessHandouts')}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Third Year Card */}
            <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{t('dispense.thirdYear')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('dispense.thirdYearDesc')}
                </p>
                <Link to="/dispense/terzo-anno">
                  <Button className="w-full">
                    {t('dispense.accessHandouts')}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* CLMG Card */}
            <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{t('dispense.clmg')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('dispense.clmgDesc')}
                </p>
                <Link to="/dispense/clmg">
                  <Button className="w-full" variant="outline">
                    {t('dispense.accessHandouts')}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dispense;