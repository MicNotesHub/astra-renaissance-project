import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Navigation } from '@/components/ui/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const yearOptions = [
  { key: "First Year", slug: "primo-anno", labelIt: "Primo Anno", labelEn: "First Year" },
  { key: "Second Year", slug: "secondo-anno", labelIt: "Secondo Anno", labelEn: "Second Year" },
  { key: "Third Year", slug: "terzo-anno", labelIt: "Terzo Anno", labelEn: "Third Year" },
];

const CourseYears: React.FC = () => {
  const { courseName } = useParams<{ courseName: string }>();
  const { t, language } = useLanguage();
  const decodedCourse = courseName ? decodeURIComponent(courseName) : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/dispense" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              {t('common.backToDispense')}
            </Link>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">{decodedCourse}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('dispense.selectYear')}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {yearOptions.map((year) => (
              <Link key={year.slug} to={`/dispense/${encodeURIComponent(decodedCourse)}/${year.slug}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-8 text-center">
                    <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <BookOpen className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {language === 'it' ? year.labelIt : year.labelEn}
                    </h3>
                    <Button variant="outline" size="sm" className="mt-2">
                      {t('dispense.accessHandouts')}
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseYears;
