import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";
const heroImage = "/lovable-uploads/4d017d22-3cc7-43d7-b5ea-9a4e70e08369.png";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-white/5 rounded-full animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-3/4 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: "4s" }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Astra Logo */}
          <motion.div 
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <img 
                src="/lovable-uploads/79a8e832-7749-4713-905f-e6adaa18938c.png" 
                alt="ASTRA Bocconi" 
                className="h-20 w-auto filter brightness-0 invert"
              />
            </motion.div>
          </motion.div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            <span className="block text-3xl md:text-5xl font-light mb-2 text-white/90">Per Aspera, ad</span>
            <span className="block text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              ASTRA
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            La rappresentanza studentesca che mette al centro l'innovazione, la community e il futuro degli studenti Bocconi.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-teal-500 hover:bg-teal-600 text-white font-medium px-8 py-3 text-base rounded-md transition-smooth shadow-lg"
            >
              Chi Siamo
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-900 transition-smooth font-medium px-8 py-3 text-base rounded-md"
            >
              Contattaci
            </Button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in" style={{ animationDelay: "1s" }}>
          <div className="flex flex-col items-center text-white/70">
            <span className="text-sm mb-2">Scopri di più</span>
            <div className="w-px h-8 bg-white/50 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}