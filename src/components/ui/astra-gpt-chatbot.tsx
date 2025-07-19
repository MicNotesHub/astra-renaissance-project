import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, X, Bot, User, FileText, Users, Calendar } from "lucide-react";

export const AstraGPTChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Ciao! Sono Astra GPT 🤖 Il tuo assistente virtuale per tutto ciò che riguarda l'università Bocconi. Come posso aiutarti oggi?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const quickActions = [
    { icon: FileText, label: "Dispense", action: "Mostrami le dispense di matematica" },
    { icon: Users, label: "Contatti", action: "Come posso contattare i rappresentanti?" },
    { icon: Calendar, label: "Eventi", action: "Quali eventi ci sono questa settimana?" }
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      role: "user" as const,
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        role: "bot" as const,
        content: generateBotResponse(inputValue),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputValue("");
  };

  const handleQuickAction = (action: string) => {
    setInputValue(action);
    handleSendMessage();
  };

  const generateBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes("dispense") || lowerInput.includes("materiale")) {
      return "Perfetto! Puoi trovare tutte le dispense nella sezione dedicata. Abbiamo materiale per Matematica, Economia, Diritto e molto altro. Vuoi che ti mostri le dispense di una materia specifica? 📚";
    }
    
    if (lowerInput.includes("rappresentanti") || lowerInput.includes("contatt") || lowerInput.includes("team")) {
      return "Puoi contattare i rappresentanti in diversi modi: tramite email, LinkedIn o UniLink. Nella sezione Team trovi tutti i contatti. Per questioni urgenti, scrivi al nostro Presidente Marco Andreoli! 👥";
    }
    
    if (lowerInput.includes("eventi") || lowerInput.includes("calendar") || lowerInput.includes("conferenze")) {
      return "Questa settimana abbiamo eventi interessanti! Controlla la sezione Eventi per tutti i dettagli e per registrarti. Organizziamo regolarmente career talks, workshop e networking! 📅";
    }
    
    if (lowerInput.includes("calcolator") || lowerInput.includes("gpa") || lowerInput.includes("piano")) {
      return "Abbiamo diversi calcolatori utili: GPA Calculator, Piano di Studi, Exchange Planner e altro! Li trovi nella sezione Calcolatori. Quale ti interessa di più? 🧮";
    }
    
    if (lowerInput.includes("exchange") || lowerInput.includes("erasmus") || lowerInput.includes("estero")) {
      return "Per tutto quello che riguarda i programmi di scambio, contatta Luca Bianchi, il nostro Responsabile Exchange! Può aiutarti con domande, documenti e consigli. 🌍";
    }
    
    if (lowerInput.includes("astra polare") || lowerInput.includes("media") || lowerInput.includes("video")) {
      return "Astra Polare è la nostra rubrica con contenuti video e social! Trovi interviste, recap eventi e molto altro. Seguici sui social per non perdere nulla! 📺";
    }
    
    if (lowerInput.includes("marketplace") || lowerInput.includes("unimarket") || lowerInput.includes("prodotti")) {
      return "Il Marketplace Astra x UniMarket offre prodotti esclusivi per gli studenti Bocconi! Felpe, zaini, gadgets e molto altro. Dai un'occhiata! 🛍️";
    }
    
    if (lowerInput.includes("welfare") || lowerInput.includes("benessere") || lowerInput.includes("supporto")) {
      return "Per questioni di welfare e benessere studentesco, contatta Chiara Conti! Si occupa di servizi di supporto e iniziative per migliorare la qualità della vita universitaria. 💚";
    }
    
    if (lowerInput.includes("didattica") || lowerInput.includes("esami") || lowerInput.includes("orari")) {
      return "Per questioni didattiche, orari e rapporti con i docenti, il riferimento è Alessandro Martini, Responsabile Didattica del Senato Accademico! 📖";
    }
    
    return "Interessante! Per questioni specifiche, ti consiglio di contattare direttamente i nostri rappresentanti nella sezione Team. Oppure esplora le diverse sezioni del sito per trovare quello che cerchi. Posso aiutarti con altro? 🎯";
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          data-chat-trigger
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary-light relative overflow-hidden group"
        >
          <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
          
          {/* Pulse animation */}
          <div className="absolute inset-0 rounded-full bg-primary opacity-30 animate-ping"></div>
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 w-80 h-96"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <Card className="glass-card premium-shadow h-full flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">Astra GPT</CardTitle>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-muted-foreground">Online</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-3 space-y-3">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.role === 'bot' && (
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="h-3 w-3 text-white" />
                        </div>
                      )}
                      
                      <div className={`max-w-[80%] p-2 rounded-lg text-sm ${
                        message.role === 'user' 
                          ? 'bg-primary text-white' 
                          : 'bg-muted'
                      }`}>
                        {message.content}
                      </div>
                      
                      {message.role === 'user' && (
                        <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="h-3 w-3" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">Azioni rapide:</div>
                  <div className="flex gap-1 flex-wrap">
                    {quickActions.map((action, index) => {
                      const IconComponent = action.icon;
                      return (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs h-8 flex items-center gap-1"
                          onClick={() => handleQuickAction(action.action)}
                        >
                          <IconComponent className="h-3 w-3" />
                          {action.label}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* Input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Scrivi qui..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="text-sm"
                  />
                  <Button size="sm" onClick={handleSendMessage} className="px-3">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};