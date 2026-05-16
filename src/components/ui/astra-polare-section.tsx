import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Heart, Share2, MessageCircle, TrendingUp, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toCdnUrl } from "@/lib/cdn";
import { toast } from "sonner";
import astraLogo from "@/assets/astra-logo.png";
import { useLanguage } from "@/contexts/LanguageContext";

interface MediaContent {
  id: string;
  title: string;
  description: string | null;
  platform: 'TikTok' | 'Instagram';
  thumbnail_url: string;
  media_link: string;
  content_type: 'video' | 'carousel';
  duration: string | null;
  slides: number | null;
  views: string;
  likes: number;
  created_at: string;
}

export const AstraPolareSection = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(t('astrapolare.recent'));
  const [mediaContent, setMediaContent] = useState<MediaContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hardcoded trending data (static for now, can be made dynamic later)
  const trending = [
    { title: "Guida alle Tesi", views: "3.4K", growth: "+45%" },
    { title: "Vita in Campus", views: "2.8K", growth: "+32%" },
    { title: "Career Tips", views: "2.1K", growth: "+28%" }
  ];

  const tabs = [
    { id: "recenti", label: t('astrapolare.recent') },
    { id: "popolari", label: t('astrapolare.popular') },
    { id: "trending", label: t('astrapolare.trending') }
  ];

  // Fetch media content from Supabase
  const fetchMediaContent = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('astra_polare_media_content')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setMediaContent((data || []) as MediaContent[]);
    } catch (err) {
      console.error('Error fetching media content:', err);
      setError(t('astrapolare.error'));
      toast.error(t('astrapolare.error'));
    } finally {
      setLoading(false);
    }
  };

  // Setup realtime subscription
  useEffect(() => {
    // Initial fetch
    fetchMediaContent();

    // Setup realtime subscription
    const channel = supabase
      .channel('astra-polare-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'astra_polare_media_content'
        },
        (payload) => {
          console.log('Realtime change detected:', payload);
          
          if (payload.eventType === 'INSERT') {
            setMediaContent(prev => [payload.new as MediaContent, ...prev]);
            toast.success('Nuovo contenuto aggiunto!');
          } else if (payload.eventType === 'UPDATE') {
            setMediaContent(prev => 
              prev.map(item => 
                item.id === payload.new.id ? payload.new as MediaContent : item
              )
            );
            toast.info('Contenuto aggiornato');
          } else if (payload.eventType === 'DELETE') {
            setMediaContent(prev => 
              prev.filter(item => item.id !== payload.old.id)
            );
            toast.info('Contenuto rimosso');
          }
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Sort content based on active tab
  const getSortedContent = () => {
    if (activeTab === "recenti") {
      return [...mediaContent].sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (activeTab === "popolari") {
      return [...mediaContent].sort((a, b) => {
        // Parse view count (e.g., "1.2K" -> 1200)
        const parseViews = (views: string) => {
          const num = parseFloat(views);
          if (views.includes('K')) return num * 1000;
          if (views.includes('M')) return num * 1000000;
          return num;
        };
        return parseViews(b.views) - parseViews(a.views);
      });
    }
    return mediaContent;
  };

  const handlePlayClick = (mediaLink: string) => {
    window.open(mediaLink, '_blank', 'noopener,noreferrer');
  };

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
            📰 {t('astrapolare.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('astrapolare.subtitle')}
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

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">{t('astrapolare.loading')}</span>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={fetchMediaContent} variant="outline">
              {t('astrapolare.retry')}
            </Button>
          </div>
        )}

        {/* Content Grid */}
        {!loading && !error && activeTab !== "trending" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {getSortedContent().map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="glass-card premium-shadow hover:shadow-glow transition-all duration-300 group overflow-hidden">
                  <div className="relative">
                    <img 
                      src={item.thumbnail_url || astraLogo} 
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
                        {item.content_type === "video" ? (
                          <Badge className="text-xs">{item.duration}</Badge>
                        ) : (
                          <Badge className="text-xs">{item.slides} {t('astrapolare.slides')}</Badge>
                        )}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button 
                          size="sm" 
                          className="rounded-full w-12 h-12 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handlePlayClick(item.media_link)}
                        >
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
                          <span>{item.views} {t('astrapolare.views')}</span>
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
        )}

        {/* Empty State */}
        {!loading && !error && activeTab !== "trending" && mediaContent.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t('astrapolare.noContent')}</p>
          </div>
        )}

        {/* Trending Section */}
        {activeTab === "trending" && !loading && !error && (
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
                      <p className="text-sm text-muted-foreground">{item.views} {t('astrapolare.visualizations')}</p>
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
              <h3 className="text-2xl font-bold mb-4">{t('astrapolare.followSocial')}</h3>
              <p className="text-muted-foreground mb-6">
                {t('astrapolare.followDescription')}
              </p>
              <div className="flex justify-center gap-4">
                <Button 
                  className="flex items-center gap-2"
                  onClick={() => window.open('https://www.tiktok.com/@astrabocconi?_t=ZN-8yM6RRp0ryg&_r=1', '_blank', 'noopener,noreferrer')}
                >
                  {t('astrapolare.tiktok')}
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => window.open('https://www.instagram.com/astrabocconi?igsh=YmU0anJ6MXNqNHk2', '_blank', 'noopener,noreferrer')}
                >
                  {t('astrapolare.instagram')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};