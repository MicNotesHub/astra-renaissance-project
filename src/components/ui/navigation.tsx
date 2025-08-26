import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ExternalLink, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useLanguage } from "@/contexts/LanguageContext";
export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOverWhiteSection, setIsOverWhiteSection] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const { language } = useLanguage();
  
  const navItems = [{
    name: t('nav.representatives'),
    href: "#team",
    isExternal: false
  }, {
    name: t('nav.handouts'),
    href: "/dispense",
    isExternal: false
  }, {
    name: t('nav.guides'),
    href: "/guide",
    isExternal: false
  }];

  // Always check if on pages with white backgrounds
  const isOnWhitePage = location.pathname.includes('/dispense') || location.pathname.includes('/guide');
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // On home page, detect if navigation is over white sections
      if (location.pathname === '/') {
        const scrollY = window.scrollY;
        // Detect when navigation overlaps with white sections (approximate values)
        // You may need to adjust these values based on your actual section heights
        const isOverWhite = scrollY > 600; // Adjust this threshold as needed
        setIsOverWhiteSection(isOverWhite);
      } else {
        setIsOverWhiteSection(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    // Call once to set initial state
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  const handleContactClick = () => {
    window.location.href = "mailto:info@astrabocconi.it";
  };
  const isActive = (href: string) => {
    if (href.startsWith('/')) {
      return location.pathname === href;
    }
    return false;
  };
  return <motion.nav initial={{
    y: -100
  }} animate={{
    y: 0
  }} transition={{
    type: "spring",
    stiffness: 300,
    damping: 30
  }} className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/10 shadow-sm" : "bg-transparent")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div className="flex items-center" whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }}>
            <Link to="/" className="flex items-center gap-3 group">
              <img src="/lovable-uploads/79a8e832-7749-4713-905f-e6adaa18938c.png" alt="ASTRA Bocconi" className="h-8 w-auto transition-all duration-200 group-hover:brightness-110" />
              <div className="hidden sm:block">
                <span className={cn("font-bold text-lg transition-colors duration-200", isOnWhitePage || isOverWhiteSection ? "text-primary" : "text-white")}></span>
                
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item, index) => <motion.div key={item.name} initial={{
              opacity: 0,
              y: -10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: index * 0.1
            }}>
                  {item.href.startsWith('/') ? <Link to={item.href} className={cn("relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group", isActive(item.href) ? (isOnWhitePage || isOverWhiteSection) ? "text-primary bg-primary/10" : "text-white bg-white/20" : (isOnWhitePage || isOverWhiteSection) ? "text-primary/80 hover:text-primary hover:bg-primary/10" : "text-white/80 hover:text-white hover:bg-white/10")}>
                      {item.name}
                      {isActive(item.href) && <motion.div layoutId="activeTab" className="absolute inset-0 bg-primary/10 rounded-lg" initial={false} transition={{
                  type: "spring",
                  bounce: 0.2,
                  duration: 0.6
                }} />}
                    </Link> : <a href={item.href} className={cn("px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200", (isOnWhitePage || isOverWhiteSection) ? "text-primary/80 hover:text-primary hover:bg-primary/10" : "text-white/80 hover:text-white hover:bg-white/10")}>
                      {item.name}
                    </a>}
                </motion.div>)}
              
              <motion.div initial={{
              opacity: 0,
              scale: 0.8
            }} animate={{
              opacity: 1,
              scale: 1
            }} transition={{
              delay: 0.6
            }}>
                <LanguageToggle />
              </motion.div>
              
              <motion.div initial={{
              opacity: 0,
              scale: 0.8
            }} animate={{
              opacity: 1,
              scale: 1
            }} transition={{
              delay: 0.7
            }}>
                <Button size="sm" onClick={handleContactClick} className="ml-4 bg-primary hover:bg-primary/90 text-white font-medium px-4 py-2 rounded-full text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg">
                  <Mail className="h-4 w-4 mr-2" />
                  {t('hero.contact')}
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={cn("relative p-2 rounded-lg transition-all duration-200", (isOnWhitePage || isOverWhiteSection) ? "text-primary hover:bg-primary/10" : "text-white hover:bg-white/10")} aria-label={isMobileMenuOpen ? "Chiudi menu" : "Apri menu"}>
              <motion.div animate={{
              rotate: isMobileMenuOpen ? 180 : 0
            }} transition={{
              duration: 0.2
            }}>
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && <motion.div initial={{
          opacity: 0,
          height: 0
        }} animate={{
          opacity: 1,
          height: "auto"
        }} exit={{
          opacity: 0,
          height: 0
        }} transition={{
          duration: 0.2
        }} className="lg:hidden overflow-hidden">
              <motion.div initial={{
            y: -10
          }} animate={{
            y: 0
          }} exit={{
            y: -10
          }} className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-xl mt-2 rounded-xl border border-border/10 shadow-lg">
                {navItems.map((item, index) => <motion.div key={item.name} initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: index * 0.05
            }}>
                    {item.href.startsWith('/') ? <Link to={item.href} className={cn("flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200", isActive(item.href) ? "text-primary bg-primary/10 border-l-2 border-primary" : "text-foreground/80 hover:text-foreground hover:bg-muted/50")} onClick={() => setIsMobileMenuOpen(false)}>
                        {item.name}
                        {item.isExternal && <ExternalLink className="h-3 w-3 ml-1" />}
                      </Link> : <a href={item.href} className="flex items-center px-3 py-3 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-all duration-200" onClick={() => setIsMobileMenuOpen(false)}>
                        {item.name}
                        {item.isExternal && <ExternalLink className="h-3 w-3 ml-1" />}
                      </a>}
                  </motion.div>)}
                
                <motion.div initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: navItems.length * 0.05
            }} className="pt-2 mt-2 border-t border-border/20 space-y-2">
                  <div className="flex justify-center">
                    <LanguageToggle />
                  </div>
                  <Button onClick={handleContactClick} className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg text-sm transition-all duration-200">
                    <Mail className="h-4 w-4 mr-2" />
                    {t('hero.contact')}
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>}
        </AnimatePresence>
      </div>
    </motion.nav>;
}