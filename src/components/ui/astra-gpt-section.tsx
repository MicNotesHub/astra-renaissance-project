import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Sparkles, ExternalLink, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export function AstraGPTSection() {
  return (
    <section id="astragpt" className="py-32 bg-gradient-hero relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full"
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-3/4 right-1/4 w-24 h-24 bg-white/5 rounded-full"
          animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute top-1/2 left-3/4 w-16 h-16 bg-white/10 rounded-full"
          animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/6 w-20 h-20 bg-white/8 rounded-full"
          animate={{ y: [0, 12, 0], x: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div 
              className="flex items-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Bot className="h-12 w-12 text-white mr-4" />
                </motion.div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-2 -right-2"
                >
                  <Sparkles className="h-6 w-6 text-yellow-300" />
                </motion.div>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-white">
                ASTRA GPT
              </h2>
            </motion.div>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Prova il nuovo <span className="font-bold text-yellow-300">ASTRA GPT</span>, 
              una risorsa importante per qualsiasi informazione riguardante l'Università Bocconi ed ASTRA!
            </motion.p>
            
            <div className="space-y-4 mb-10">
              {[
                "Informazioni su corsi e programmi",
                "Servizi e supporto studentesco", 
                "Eventi e iniziative ASTRA",
                "Procedure universitarie"
              ].map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center text-white/80"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10 }}
                >
                  <MessageSquare className="h-5 w-5 mr-3 text-yellow-300" />
                  {feature}
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              viewport={{ once: true }}
            >
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 transition-all duration-300 font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl hover:scale-105 group"
                onClick={() => window.open('https://chatgpt.com/g/g-QAGU04uut-astra-gpt', '_blank')}
              >
                Inizia a chattare
                <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Right side - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass-card premium-shadow border-white/20 backdrop-blur-lg overflow-hidden group hover:shadow-glow transition-all duration-500">
                <CardContent className="p-0">
                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 p-8">
                    {/* Chat interface mockup */}
                    <div className="space-y-4">
                      <motion.div 
                        className="flex items-center mb-6"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center mr-3">
                          <Bot className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-white font-semibold">ASTRA GPT</span>
                        <motion.div 
                          className="ml-auto w-2 h-2 bg-green-400 rounded-full"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>
                    
                    {/* Mock chat messages */}
                    <div className="space-y-3">
                      <motion.div 
                        className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white/90 text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1 }}
                        viewport={{ once: true }}
                      >
                        Ciao! Come posso aiutarti con le informazioni su Bocconi?
                      </motion.div>
                      <motion.div 
                        className="bg-primary/20 backdrop-blur-sm rounded-lg p-3 text-white/90 text-sm ml-8"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1.3 }}
                        viewport={{ once: true }}
                      >
                        Quali sono gli orari della biblioteca?
                      </motion.div>
                      <motion.div 
                        className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white/90 text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1.6 }}
                        viewport={{ once: true }}
                      >
                        La biblioteca è aperta dal lunedì al venerdì dalle 8:00 alle 24:00...
                      </motion.div>
                    </div>
                    
                    {/* Typing indicator */}
                    <motion.div 
                      className="flex items-center text-white/60"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.9 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex space-x-1 mr-2">
                        <motion.div 
                          className="w-1 h-1 bg-white/60 rounded-full"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div 
                          className="w-1 h-1 bg-white/60 rounded-full"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                        />
                        <motion.div 
                          className="w-1 h-1 bg-white/60 rounded-full"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        />
                      </div>
                      ASTRA GPT sta scrivendo...
                    </motion.div>
                   </div>
                   
                   {/* Floating sparkles */}
                   <motion.div 
                     className="absolute top-4 right-4"
                     animate={{ rotate: 360 }}
                     transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                   >
                     <Sparkles className="h-4 w-4 text-yellow-300" />
                   </motion.div>
                   <motion.div 
                     className="absolute bottom-6 left-6"
                     animate={{ scale: [1, 1.2, 1] }}
                     transition={{ duration: 3, repeat: Infinity }}
                   >
                     <Sparkles className="h-3 w-3 text-blue-300" />
                   </motion.div>
                 </div>
               </CardContent>
             </Card>
             </motion.div>
           </motion.div>
         </div>
       </div>
     </section>
   );
 }