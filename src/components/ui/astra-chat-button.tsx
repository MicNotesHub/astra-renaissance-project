import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AstraChatPanel } from './astra-chat-panel';

export function AstraChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.3 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200 md:w-auto md:px-4 md:py-3"
          aria-label={isOpen ? "Chiudi AstraGPT" : "Apri AstraGPT"}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <MessageCircle className="h-6 w-6 text-white" />
            )}
          </motion.div>
          
          {/* Label - hidden on mobile, shown on desktop */}
          <span className="hidden md:inline ml-2 text-white font-medium">
            Chiedi ad Astra
          </span>
          
          {/* Hover tooltip for mobile */}
          <div className="md:hidden absolute bottom-full right-0 mb-2 px-3 py-1 bg-black/80 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Chiedi ad Astra
          </div>
        </Button>
      </motion.div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <AstraChatPanel onClose={() => setIsOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}