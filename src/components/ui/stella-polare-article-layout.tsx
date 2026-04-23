import { ReactNode, useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface Props {
  eyebrow: string;
  title: string;
  author?: string;
  children: ReactNode;
}

export function StellaPolareArticleLayout({ eyebrow, title, author, children }: Props) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link to="/stella-polare">
            <Button variant="ghost" className="gap-2 mb-6">
              <ArrowLeft className="w-4 h-4" />
              Stella Polare
            </Button>
          </Link>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-card border border-border rounded-2xl shadow-lg p-8 md:p-14"
          >
            <header className="mb-10">
              <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-3">
                {eyebrow}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                {title}
              </h1>
            </header>

            <div className="space-y-5 text-foreground/90 leading-relaxed [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-foreground [&>h2]:mt-8 [&>h2]:mb-2">
              {children}
            </div>

            {author && (
              <footer className="mt-10 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground italic">— {author}</p>
              </footer>
            )}
          </motion.article>
        </div>
      </section>

      <Footer />
    </div>
  );
}
