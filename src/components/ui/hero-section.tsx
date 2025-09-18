import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

export function HeroSection() {
  const { t } = useLanguage();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchBackgroundVideo = async () => {
      const { data } = await supabase
        .from('images')
        .select('url')
        .eq('image-name', 'hero-background-video')
        .single();
      
      if (data) {
        setVideoUrl(data.url);
      }
    };
    
    fetchBackgroundVideo();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background video */}
      {videoUrl && (
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-white/5 rounded-full animate-float" style={{
        animationDelay: "2s"
      }}></div>
        <div className="absolute top-1/2 left-3/4 w-16 h-16 bg-white/10 rounded-full animate-float" style={{
        animationDelay: "4s"
      }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{
        opacity: 0,
        y: 50
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }}>
          {/* Astra Logo */}
          <motion.div className="flex justify-center mb-8" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3,
          duration: 0.8
        }}>
            <motion.div animate={{
            y: [0, -8, 0]
          }} transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}>
              <img src="/lovable-uploads/79a8e832-7749-4713-905f-e6adaa18938c.png" alt="ASTRA Bocconi" className="h-20 w-auto filter brightness-0 invert" />
            </motion.div>
          </motion.div>

          {/* Main heading */}
          

          {/* Subtitle */}
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-thin md:text-base">
            {t('hero.subtitle')}
          </p>

        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in" style={{
        animationDelay: "1s"
      }}>
          <div className="flex flex-col items-center text-white/70">
            
            <div className="w-px h-8 bg-white/50 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}