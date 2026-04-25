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
    name: "Inox casserole",
    price: "10€",
    originalPrice: "45€",
    image: "/lovable-uploads/inox-casserole.jpeg",
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 hero-text relative inline-block">
  🛍️ {t('marketplace.title')}
  <sup className="absolute -top-1 -right-3 text-sm" style={{ color: "#082cb4" }}>©</sup>
</h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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
          return <Card key={index} className="text-center p-6 hover:shadow-glow transition-all duration-300 rounded-2xl" style={{
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
              <Card className="glass-card premium-shadow hover:shadow-glow transition-all duration-300 group overflow-hidden cursor-pointer" onClick={() => window.open(product.url, '_blank')}>
                <div className="relative">
                  <a href="https://uni-market.it" target="_blank" rel="noopener noreferrer">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
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
          <Card className="glass-card premium-shadow overflow-hidden">
            <div className="bg-gradient-hero p-8 md:p-12 text-white text-center">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                  {t('marketplace.cta.title')}
                </h3>
                
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 flex items-center gap-2 mb-8 mx-auto px-[32px] py-[23px] text-center text-2xl rounded-3xl" onClick={() => window.open('https://uni-market.it', '_blank')}>
                  {t('marketplace.cta.button')}
                  <ArrowRight className="h-6 w-6" />
                </Button>
                
                <p className="text-lg opacity-90 mb-6">
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