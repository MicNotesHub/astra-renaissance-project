import { Button } from "@/components/ui/button";
import { Mail, Instagram, Linkedin, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "mailto:info@astrabocconi.com", label: "Email" }
  ];

  const quickLinks = [
    { name: t('nav.about'), href: "#about" },
    { name: t('nav.representatives'), href: "#rappresentanti" },
    { name: t('nav.handouts'), href: "#dispense" },
    { name: t('nav.exchange'), href: "#exchange" },
    { name: t('nav.guides'), href: "#guide" }
  ];
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <img 
                src="/lovable-uploads/b01b09dd-7caf-43e1-9dc2-a6d5e15349fd.png" 
                alt="ASTRA Bocconi Icon" 
                className="h-12 w-12 mr-4 brightness-0 invert"
              />
              <span className="text-2xl font-bold">ASTRA Bocconi</span>
            </div>
            
            <p className="text-white/80 text-lg leading-relaxed mb-6 max-w-md">
              {t('footer.brand.description')}
            </p>
            
            <div className="flex items-center text-white/80 mb-4">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{t('footer.location')}</span>
            </div>
            
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 hover:text-white p-2"
                  asChild
                >
                  <a href={social.href} aria-label={social.label}>
                    <social.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-white/80 hover:text-white transition-smooth"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('footer.contact')}</h3>
            <div className="space-y-4">
              <div>
                <p className="text-white/80 mb-2">{t('footer.email')}</p>
                <a 
                  href="mailto:info@astrabocconi.com"
                  className="text-white hover:text-white/80 transition-smooth"
                >
                  info@astrabocconi.com
                </a>
              </div>
              
              <div>
                <p className="text-white/80 mb-2">{t('footer.emergencies')}</p>
                <p className="text-white">{t('footer.emergencyText')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            {t('footer.rights')}
          </p>
          
          <div className="flex space-x-6 text-sm text-white/60">
            <a href="#" className="hover:text-white transition-smooth">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-white transition-smooth">{t('footer.terms')}</a>
            <a href="#" className="hover:text-white transition-smooth">{t('footer.cookies')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}