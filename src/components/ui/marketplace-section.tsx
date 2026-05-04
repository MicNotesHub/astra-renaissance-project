import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Star, Truck, Shield, ArrowRight, Gift, Handshake } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
export const MarketplaceSection = () => {
  const { t } = useLanguage();
  const products = [{
    name: "LGTV Smart 1080P",
    price: "120€",
    originalPrice: "150€",
    image: "/lovable-uploads/lgtv-smart-1080p.jpg",
    rating: 4.8,
    reviews: 24,
    badge: "Offerta",
    url: "https://uni-market.it"
  }, {
    name: "Jacquemus Grand Bambino Black",
    price: "400€",
    originalPrice: "500€",
    image: "/lovable-uploads/jacquemus-grand-bambino-black.jpg",
    rating: 4.6,
    reviews: 18,
    badge: "Nuovo",
    url: "https://uni-market.it"
  }, {
    name: "Adidas football",
    price: "30€",
    originalPrice: "50€",
    image: "/lovable-uploads/adidas-football.jpg",
    rating: 4.9,
    reviews: 31,
    badge: "Offerta",
    url: "https://uni-market.it"
  }];
  const features = [{
    icon: Handshake,
    title: t('marketplace.features.exchange'),
    description: t('marketplace.features.exchange.description')
  }, {
    icon: Shield,
    title: t('marketplace.features.community'),
    description: t('marketplace.features.community.description')
  }, {
    icon: Gift,
    title: t('marketplace.features.commission'),
    description: t('marketplace.features.commission.description')
  }];
  return <section id="marketplace" className="pt-8 pb-8 marketplace-animated-bg">
      <div className="container mx-auto px-4">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8
      }} className="text-center mb-10 mt-0">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white flex flex-col md:flex-row items-center justify-center gap-3 drop-shadow-lg text-center">
  <ShoppingBag className="h-9 w-9 md:h-10 md:w-10 text-white shrink-0" strokeWidth={2.25} />
  <span className="relative inline-block">
    {t('marketplace.title')}
    <sup className="absolute -top-1 -right-3 text-sm text-white/90">©</sup>
  </span>
</h2>

          <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow">
            {t('marketplace.subtitle')}
          </p>
        </motion.div>

        {/* Features */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6,
        delay: 0.2
      }} className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return <Card key={index} className="text-center p-6 hover:shadow-glow hover:scale-105 transition-all duration-300 rounded-2xl cursor-default" style={{
            backgroundColor: '#DCEBFA'
          }}>
                <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">

                  <IconComponent className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>;
        })}
        </motion.div>

        {/* Products Showcase */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {products.map((product, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: index * 0.1
        }}>
              <Card className="border-0 premium-shadow hover:shadow-glow hover:scale-105 transition-all duration-300 group overflow-hidden cursor-pointer bg-white" onClick={() => window.open(product.url, '_blank')}>
                <div className="relative">
                  <a href="https://uni-market.it" target="_blank" rel="noopener noreferrer">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" style={product.name === "Jacquemus Grand Bambino Black" ? { objectPosition: "center 35%" } : undefined} />
                  </a>
                  <div className="absolute top-3 left-3">
                    <Badge className="text-xs">
                      {product.badge}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors">
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" className="rounded-full" onClick={(e) => { e.stopPropagation(); window.open(product.url, '_blank'); }}>
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        {t('marketplace.add')}
                      </Button>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({product.reviews} recensioni)</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">{product.price}</span>
                      <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>)}
        </div>

        {/* CTA Section */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8,
        delay: 0.4
      }}>
          <Card className="border-0 premium-shadow overflow-hidden">
            <div className="relative p-8 md:p-12 text-white text-center overflow-hidden" style={{
              background: 'linear-gradient(180deg, #0b1d4d 0%, #11337a 35%, #1e40af 70%, #2563eb 100%)'
            }}>
              {/* Animated shine overlay */}
              <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay" style={{
                background: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.5), transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.35), transparent 45%)'
              }} />
              <div className="relative max-w-3xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-md">
                  {t('marketplace.cta.title')}
                </h3>
                
                <Button
                  size="lg"
                  onClick={() => window.open('https://uni-market.it', '_blank')}
                  className="group relative overflow-hidden bg-white/15 hover:bg-white/25 text-white border border-white/40 backdrop-blur-xl flex items-center gap-2 mb-8 mx-auto px-[32px] py-[23px] text-center text-2xl rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.35)] transition-all duration-300 hover:scale-105"
                >
                  {/* Liquid glass shine sweep */}
                  <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                  <span className="relative z-10 font-semibold">{t('marketplace.cta.button')}</span>
                  <ArrowRight className="relative z-10 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <p className="text-lg opacity-95 mb-6 drop-shadow">
                  {t('marketplace.cta.description')}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <div className="flex items-center gap-4 text-sm opacity-80">
                    
                    
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>;
};