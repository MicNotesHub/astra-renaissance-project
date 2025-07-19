import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Heart, Share2, MessageCircle, TrendingUp } from "lucide-react";
import { useState } from "react";

export const AstraPolareSection = () => {
  const [activeTab, setActiveTab] = useState("recenti");

  const mediaContent = [
    {
      type: "video",
      title: "Come Sopravvivere agli Esami 📚",
      description: "Tips and tricks per affrontare la sessione",
      thumbnail: "/lovable-uploads/79a8e832-7749-4713-905f-e6adaa18938c.png",
      duration: "2:34",
      views: "1.2K",
      likes: 89,
      platform: "TikTok"
    },
    {
      type: "carousel",
      title: "Exchange Stories 🌍",
      description: "Esperienze di studenti Bocconi all'estero",
      thumbnail: "/lovable-uploads/b01b09dd-7caf-43e1-9dc2-a6d5e15349fd.png",
      slides: 8,
      views: "856",
      likes: 67,
      platform: "Instagram"
    },
    {
      type: "video",
      title: "Networking Events Recap ✨",
      description: "Highlights dell'ultimo evento ASTRA",
      thumbnail: "/lovable-uploads/79a8e832-7749-4713-905f-e6adaa18938c.png",
      duration: "1:45",
      views: "2.1K",
      likes: 134,
      platform: "Instagram"
    }
  ];

  const trending = [
    { title: "Guida alle Tesi", views: "3.4K", growth: "+45%" },
    { title: "Vita in Campus", views: "2.8K", growth: "+32%" },
    { title: "Career Tips", views: "2.1K", growth: "+28%" }
  ];

  const tabs = [
    { id: "recenti", label: "Più Recenti" },
    { id: "popolari", label: "Più Visti" },
    { id: "trending", label: "Trending" }
  ];

  return (
    <section id="astra-polare" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 hero-text">
            📰 Astra Polare
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Il nostro magazine digitale. Contenuti, storie e media che raccontano la vita universitaria dal punto di vista degli studenti.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="glass-card p-1 rounded-lg inline-flex">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
                className="rounded-md"
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Content Grid */}
        {activeTab !== "trending" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {mediaContent.map((item, index) => (
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
                      src={item.thumbnail} 
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors">
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="text-xs">
                          {item.platform}
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3">
                        {item.type === "video" ? (
                          <Badge className="text-xs">{item.duration}</Badge>
                        ) : (
                          <Badge className="text-xs">{item.slides} slides</Badge>
                        )}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button size="sm" className="rounded-full w-12 h-12 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {item.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <span>{item.views} views</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Trending Section */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto mb-12"
          >
            {trending.map((item, index) => (
              <Card key={index} className="glass-card mb-4 hover:shadow-glow transition-all duration-300">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-primary">#{index + 1}</div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.views} visualizzazioni</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium">{item.growth}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}

        {/* Social Media Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <Card className="glass-card premium-shadow max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Seguici sui Social</h3>
              <p className="text-muted-foreground mb-6">
                Non perdere i nostri contenuti! Seguici su TikTok e Instagram per restare aggiornato.
              </p>
              <div className="flex justify-center gap-4">
                <Button className="flex items-center gap-2">
                  📱 TikTok
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  📸 Instagram
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};