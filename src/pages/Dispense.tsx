import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import bemaccCover from "@/assets/course-covers/bemacc-new.jpg";
import cleaccCover from "@/assets/course-covers/cleacc.jpg";
import biemCover from "@/assets/course-covers/biem.jpg";
import bemacsCover from "@/assets/course-covers/bemacs.jpg";
import biefCover from "@/assets/course-covers/bief.jpg";
import cleamCover from "@/assets/course-covers/cleam.jpg";
import clmgCover from "@/assets/course-covers/clmg.jpg";
import bglCover from "@/assets/course-covers/bgl.jpg";
import baiCover from "@/assets/course-covers/bai.jpg";

interface CourseInfo {
  key: string;
  cover?: string;
}

const courses: CourseInfo[] = [
  { key: "BIEM", cover: biemCover },
  { key: "CLEAM", cover: cleamCover },
  { key: "BIEF", cover: biefCover },
  { key: "BAI", cover: baiCover },
  { key: "BEMACC", cover: bemaccCover },
  { key: "BEMACS", cover: bemacsCover },
  { key: "BGL", cover: bglCover },
  { key: "BIG" },
  { key: "CLEACC", cover: cleaccCover },
  { key: "CLMG", cover: clmgCover },
];

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

          {/* Course Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {courses.map((course) => (
              <Link key={course.key} to={`/dispense/${encodeURIComponent(course.key)}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.03] overflow-hidden h-full border-0">
                  {course.cover ? (
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={course.cover}
                        alt={course.key}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <h3 className="text-2xl font-bold text-white drop-shadow-lg mb-4">
                          {course.key}
                        </h3>
                        <span className="text-white/80 text-sm border border-white/30 rounded-md px-4 py-2">
                          {t('dispense.accessHandouts')}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                    <CardContent className="p-8 text-center">
                      <div className="w-24 h-24 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <FileText className="w-12 h-12 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">{course.key}</h3>
                    </CardContent>
                    <CardContent className="px-8 pb-8 pt-0 text-center">
                      <Button variant="outline" className="w-full">
                        {t('dispense.accessHandouts')}
                      </Button>
                    </CardContent>
                    </>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dispense;
