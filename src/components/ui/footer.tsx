import { Button } from "@/components/ui/button";
import { Mail, Instagram, Linkedin, MapPin, Video } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PrivacyPolicyDialog } from "@/components/ui/privacy-policy-dialog";

export function Footer() {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/astrabocconi", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/astra-bocconi/posts/?feedView=all", label: "LinkedIn" },
    { icon: Video, href: "https://www.tiktok.com/@astrabocconi?_t=ZN-8zVJzQLRlME&_r=1", label: "TikTok" }
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Contattaci - Left */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-yellow-400">{t('footer.contact')}</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-1 text-white/80" />
                <div>
                  <p className="text-white/80 text-sm">{t('footer.address')}</p>
                  <p className="text-white">{t('footer.addressValue')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 mt-1 text-white/80" />
                <div>
                  <p className="text-white/80 text-sm">{t('footer.email')}</p>
                  <a 
                    href="mailto:info@astrabocconi.com"
                    className="text-white hover:text-white/80 transition-smooth"
                  >
                    info@astrabocconi.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Socials + Legal - Right */}
          <div className="md:text-right">
            <h3 className="text-xl font-semibold mb-6 text-yellow-400">{t('footer.social')}</h3>
            <div className="flex space-x-4 md:justify-end mb-8">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 hover:text-white p-2"
                  asChild
                >
                  <a href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
                    <social.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>

            <h3 className="text-xl font-semibold mb-6 text-yellow-400">{t('footer.legal')}</h3>
            <PrivacyPolicyDialog>
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white"
              >
                {t('footer.privacy')}
              </Button>
            </PrivacyPolicyDialog>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col items-center">
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center">
              <img 
                src="/astra-logo-blue.png" 
                alt="ASTRA Bocconi Logo" 
                className="h-8 w-8 mr-3"
              />
              <p className="text-white/60 text-sm">
                {t('footer.copyright')}
              </p>
            </div>
            <a 
              href="https://michelematozza.com" 
              target="_blank" 
              rel="noopener"
              className="text-white/20 text-[10px] hover:text-white/30 transition-colors"
            >
              {t('footer.developedBy')}
            </a>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-1 text-white/80" />
                <div>
                  <p className="text-white/80 text-sm">Indirizzo:</p>
                  <p className="text-white">Via Sarfatti 25, Milano (MI)</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 mt-1 text-white/80" />
                <div>
                  <p className="text-white/80 text-sm">Email:</p>
                  <a 
                    href="mailto:info@astrabocconi.com"
                    className="text-white hover:text-white/80 transition-smooth"
                  >
                    info@astrabocconi.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Socials + Legal - Right */}
          <div className="md:text-right">
            <h3 className="text-xl font-semibold mb-6 text-yellow-400">Social</h3>
            <div className="flex space-x-4 md:justify-end mb-8">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 hover:text-white p-2"
                  asChild
                >
                  <a href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
                    <social.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>

            <h3 className="text-xl font-semibold mb-6 text-yellow-400">Legal</h3>
            <PrivacyPolicyDialog>
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white"
              >
                Privacy Policy
              </Button>
            </PrivacyPolicyDialog>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col items-center">
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center">
              <img 
                src="/astra-logo-blue.png" 
                alt="ASTRA Bocconi Logo" 
                className="h-8 w-8 mr-3"
              />
              <p className="text-white/60 text-sm">
                Copyright © 2026 Astra Bocconi
              </p>
            </div>
            <a 
              href="https://michelematozza.com" 
              target="_blank" 
              rel="noopener"
              className="text-white/20 text-[10px] hover:text-white/30 transition-colors"
            >
              developed by Michele F. Matozza
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
