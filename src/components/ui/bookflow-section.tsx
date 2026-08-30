import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Timer, School } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import bookflowLogo from "@/assets/bookflow-logo.png.asset.json";

const BOOKFLOW_URL = "https://bookflow.it";

export const BookFlowSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: BookOpen,
      title: t("bookflow.features.books"),
      description: t("bookflow.features.books.description"),
    },
    {
      icon: School,
      title: t("bookflow.features.schools"),
      description: t("bookflow.features.schools.description"),
    },
    {
      icon: Timer,
      title: t("bookflow.features.fast"),
      description: t("bookflow.features.fast.description"),
    },
  ];

  return (
    <section
      id="bookflow"
      className="py-14 bg-gradient-to-b from-white via-secondary to-white"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <img
            src={bookflowLogo.url}
            alt="BookFlow logo"
            loading="lazy"
            className="h-12 md:h-16 w-auto mx-auto mb-6"
          />
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("bookflow.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl border border-border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-premium"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 text-primary-light" />
                </div>
                <h3 className="font-semibold mb-1.5">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={() => window.open(BOOKFLOW_URL, "_blank")}
            className="group rounded-full px-8 py-6 text-lg bg-primary-light hover:bg-primary text-primary-foreground shadow-premium"
          >
            {t("bookflow.cta.button")}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
