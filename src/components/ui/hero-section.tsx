import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function HeroSection() {
  const { t } = useLanguage();

  // Using a working video URL for university/campus background
  const videoUrl = "https://videos.pexels.com/video-files/3616966/3616966-hd_1920_1080_30fps.mp4";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <video 
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay 
        loop 
        muted 
        playsInline
        preload="auto"
        onError={(e) => {
          console.error('Video failed to load:', e);
          // Hide video on error and show fallback
          e.currentTarget.style.display = 'none';
        }}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Fallback background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{
          backgroundImage: `url(/lovable-uploads/4d017d22-3cc7-43d7-b5ea-9a4e70e08369.png)`
        }}
      ></div>
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

      </div>
    </section>
  );
}