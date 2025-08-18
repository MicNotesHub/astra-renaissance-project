import { useState, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'answer' | 'representative' | 'documents';
  documents?: Array<{ title: string; url: string; tag?: string }>;
  representatives?: Array<{ name: string; organ: string; email: string }>;
}

export interface UseAstraChatOptions {
  sessionId?: string;
}

export function useAstraChat(options: UseAstraChatOptions = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fallbackMode, setFallbackMode] = useState(false);
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const sessionId = options.sessionId || 'default-session';

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    // Add user message immediately
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    // Cancel any previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    try {
      const response = await supabase.functions.invoke('astragpt', {
        body: {
          sessionId,
          message: content.trim(),
          context: {
            path: window.location.pathname,
            lang: 'it'
          }
        }
      });

      if (abortControllerRef.current.signal.aborted) {
        return;
      }

      if (response.error) {
        console.error('Supabase function error:', response.error);
        throw new Error(response.error.message || 'Failed to get response from AstraGPT');
      }

      const data = response.data;

      // Check if we should fall back to GPT Store
      if (data?.fallback || data?.error) {
        console.log('Falling back to GPT Store mode');
        setFallbackMode(true);
        throw new Error(data?.error || 'Service temporarily unavailable');
      }

      // Add assistant message
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.text,
        timestamp: new Date(),
        type: data.type,
        documents: data.documents,
        representatives: data.representatives,
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (err) {
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

      console.error('Chat error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);

      // Add error message to chat
      const errorChatMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Mi dispiace, si è verificato un errore. Prova a usare il pulsante "Apri su ChatGPT" per continuare la conversazione.',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorChatMessage]);
      setFallbackMode(true);
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [sessionId, isLoading]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
    setFallbackMode(false);
  }, []);

  const cancelRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
    }
  }, []);

  return {
    messages,
    isLoading,
    error,
    fallbackMode,
    sendMessage,
    clearMessages,
    cancelRequest,
  };
}