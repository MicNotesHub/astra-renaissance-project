import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Star, Truck, Shield, ArrowRight, Gift } from "lucide-react";

export const MarketplaceSection = () => {
  const products = [
    {
      name: "Felpa ASTRA",
      price: "35€",
      originalPrice: "45€",
      image: "/lovable-uploads/79a8e832-7749-4713-905f-e6adaa18938c.png",
      rating: 4.8,
      reviews: 24,
      badge: "Bestseller"
    },
    {
      name: "Tazza Bocconi",
      price: "12€", 
      originalPrice: "15€",
      image: "/lovable-uploads/b01b09dd-7caf-43e1-9dc2-a6d5e15349fd.png",
      rating: 4.6,
      reviews: 18,
      badge: "Nuovo"
    },
    {
      name: "Zaino Università",
      price: "89€",
      originalPrice: "120€", 
      image: "/lovable-uploads/79a8e832-7749-4713-905f-e6adaa18938c.png",
      rating: 4.9,
      reviews: 31,
      badge: "Offerta"
    }
  ];

  const features = [
    {
      icon: Truck,
      title: "Spedizione Gratuita",
      description: "Per ordini sopra i 50€"
    },
    {
      icon: Shield,
      title: "Garanzia Qualità",
      description: "Prodotti verificati"
    },
    {
      icon: Gift,
      title: "Sconti Studenti",
      description: "Prezzi speciali per la community"
    }
  ];

  return (
    <section id="marketplace" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
<h2 className="text-4xl md:text-5xl font-bold mb-6 hero-text">
  🛍️ ASTRA x{" "}
  <span className="relative inline-block">
    UniMarket
    <sup className="absolute -top-1 -right-3 text-[10px]">©</sup>
  </span>
</h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Il marketplace ufficiale per studenti Bocconi. Merchandising esclusivo e prodotti essenziali per la vita universitaria.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="glass-card text-center p-6 hover:shadow-glow transition-all duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            );
          })}
        </motion.div>

        {/* Products Showcase */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="glass-card premium-shadow hover:shadow-glow transition-all duration-300 group overflow-hidden">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="text-xs">
                      {product.badge}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors">
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" className="rounded-full">
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Aggiungi
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
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="glass-card premium-shadow overflow-hidden">
            <div className="bg-gradient-hero p-8 md:p-12 text-white text-center">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                  Scopri il Marketplace Completo
                </h3>
                
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 flex items-center gap-2 text-lg px-8 py-4 mb-8 mx-auto"
                >
                  Visita UniMarket
                  <ArrowRight className="h-6 w-6" />
                </Button>
                
                <p className="text-lg opacity-90 mb-6">
                  Oltre 200 prodotti esclusivi per studenti. Libri usati, merchandising ufficiale, gadget tech e molto altro.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <div className="flex items-center gap-4 text-sm opacity-80">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-white" />
                      <span>4.8/5 rating</span>
                    </div>
                    <div>1000+ studenti soddisfatti</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};