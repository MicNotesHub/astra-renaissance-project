import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'it' ? 'en' : 'it');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 bg-white text-primary hover:bg-primary hover:text-white transition-all duration-200 border border-white/20"
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">{language.toUpperCase()}</span>
    </Button>
  );
};