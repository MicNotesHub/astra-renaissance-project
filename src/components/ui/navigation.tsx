import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";

const navItems = [
  { name: "ELEZIONI 2025", href: "#elezioni" },
  { name: "RAPPRESENTANTI", href: "#team" },
  { name: "DISPENSE", href: "/dispense" },
  { name: "EXCHANGE", href: "#astra-polare" },
  { name: "RUBRICA", href: "#marketplace" },
  { name: "GUIDE", href: "/guide" },
  { name: "ABOUT", href: "#about" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Check if we're on a page with white background
  const isOnWhitePage = window.location.pathname.includes('/dispense');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-smooth",
      isScrolled || isOnWhitePage
        ? "glass-card shadow-lg" 
        : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="cursor-pointer">
              <img 
                src="/lovable-uploads/79a8e832-7749-4713-905f-e6adaa18938c.png" 
                alt="ASTRA Bocconi" 
                className="h-8 w-auto hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                item.href.startsWith('/') ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "text-sm font-medium transition-smooth",
                      isOnWhitePage ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"
                    )}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-smooth",
                      isOnWhitePage ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"
                    )}
                  >
                    {item.name}
                  </a>
                )
              ))}
              <Button 
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-full text-sm"
              >
                Contattaci
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 glass-card mt-2 rounded-lg">
              {navItems.map((item) => (
                item.href.startsWith('/') ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "block px-3 py-2 rounded-md text-sm font-medium transition-smooth",
                      item.name === "Contattaci"
                        ? "text-primary hover:bg-primary/10"
                        : "text-foreground/80 hover:text-foreground hover:bg-muted"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "block px-3 py-2 rounded-md text-sm font-medium transition-smooth",
                      item.name === "Contattaci"
                        ? "text-primary hover:bg-primary/10"
                        : "text-foreground/80 hover:text-foreground hover:bg-muted"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}