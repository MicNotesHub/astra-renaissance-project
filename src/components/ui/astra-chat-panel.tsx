import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, ExternalLink, X, FileText, User, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAstraChat, type ChatMessage } from '@/hooks/useAstraChat';
import { toCdnUrl } from '@/lib/cdn';

interface AstraChatPanelProps {
  onClose: () => void;
}

const quickChips = [
  "Tasse e agevolazioni",
  "Piano di studi", 
  "Mobilità internazionale",
  "Appelli",
  "Contatta un rappresentante"
];

export function AstraChatPanel({ onClose }: AstraChatPanelProps) {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { messages, isLoading, fallbackMode, sendMessage } = useAstraChat({
    sessionId: `session-${Date.now()}`
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Focus input when panel opens
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    const message = inputValue;
    setInputValue('');
    await sendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickChip = (chip: string) => {
    setInputValue(chip);
    handleSendMessage();
  };

  const openGPTStore = () => {
    const storeUrl = process.env.ASTRAGPT_STORE_URL || 'https://chatgpt.com/g/g-astra-bocconi';
    window.open(storeUrl, '_blank', 'noopener,noreferrer');
  };

  const renderMessage = (message: ChatMessage) => {
    const isUser = message.role === 'user';
    
    return (
      <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div className={`max-w-[80%] ${isUser ? 'order-1' : 'order-2'}`}>
          <div
            className={`px-4 py-2 rounded-2xl ${
              isUser
                ? 'bg-primary text-white rounded-br-md'
                : 'bg-muted text-foreground rounded-bl-md'
            }`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
          </div>
          
          {/* Render structured data */}
          {!isUser && (
            <>
              {/* Documents */}
              {message.documents && message.documents.length > 0 && (
                <div className="mt-3 space-y-2">
                  {message.documents.map((doc, index) => (
                    <Card key={index} className="bg-background/50 hover:bg-background/80 transition-colors">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">{doc.title}</span>
                            {doc.tag && <Badge variant="secondary" className="text-xs">{doc.tag}</Badge>}
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => window.open(toCdnUrl(doc.url), '_blank')}
                            className="h-8 px-2"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
              
              {/* Representatives */}
              {message.representatives && message.representatives.length > 0 && (
                <div className="mt-3 space-y-2">
                  {message.representatives.map((rep, index) => (
                    <Card key={index} className="bg-background/50 hover:bg-background/80 transition-colors">
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-2">
                            <User className="h-4 w-4 text-primary mt-0.5" />
                            <div>
                              <div className="text-sm font-medium">{rep.name}</div>
                              <div className="text-xs text-muted-foreground">{rep.organ}</div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => window.location.href = `mailto:${rep.email}`}
                            className="h-8 px-2"
                          >
                            <Mail className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
          
          <div className="text-xs text-muted-foreground mt-1 px-1">
            {message.timestamp.toLocaleTimeString('it-IT', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ type: "spring", duration: 0.3 }}
      className="fixed bottom-24 right-6 z-40 w-[420px] max-w-[calc(100vw-2rem)] md:max-w-[420px] h-[600px] max-h-[calc(100vh-8rem)]"
    >
      <Card className="h-full flex flex-col shadow-2xl border-0 bg-background/95 backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <div>
            <h3 className="font-semibold text-lg">AstraGPT</h3>
            <p className="text-sm text-muted-foreground">Risposte rapide, guide e contatti</p>
          </div>
          <div className="flex items-center gap-2">
            {fallbackMode && (
              <Button
                size="sm"
                variant="ghost"
                onClick={openGPTStore}
                className="text-xs"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                ChatGPT
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <p className="text-muted-foreground mb-4">
                Ciao! Sono AstraGPT, il tuo assistente per la vita universitaria Bocconi.
              </p>
              <p className="text-sm text-muted-foreground">
                Prova una delle domande qui sotto o scrivimi qualcosa!
              </p>
            </motion.div>
          )}
          
          {messages.map(renderMessage)}
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-muted px-4 py-2 rounded-2xl rounded-bl-md">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Chips */}
        {messages.length === 0 && (
          <div className="px-4 pb-4">
            <div className="flex flex-wrap gap-2">
              {quickChips.map((chip) => (
                <Button
                  key={chip}
                  size="sm"
                  variant="outline"
                  onClick={() => handleQuickChip(chip)}
                  className="text-xs h-7 rounded-full"
                  disabled={isLoading}
                >
                  {chip}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Scrivi la tua domanda..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              size="sm"
              className="h-10 w-10 p-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          {fallbackMode && (
            <div className="mt-2 text-center">
              <Button
                size="sm"
                variant="ghost"
                onClick={openGPTStore}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Apri su ChatGPT
              </Button>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}