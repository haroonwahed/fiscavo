import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  details?: string;
  tip?: string;
  category?: string;
  timestamp: Date;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const sendMessageMutation = useMutation({
    mutationFn: async ({ question, businessType, sector }: {
      question: string;
      businessType?: string;
      sector?: string;
    }) => {
      const response = await apiRequest('POST', '/api/tax-advice', {
        question,
        businessType,
        sector
      });
      return response.json();
    },
    onSuccess: (data, variables) => {
      // Add user message
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        type: 'user',
        content: variables.question,
        timestamp: new Date()
      };

      // Add bot response
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        type: 'bot',
        content: data.answer,
        details: data.details,
        tip: data.tip,
        category: data.category,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage, botMessage]);
    }
  });

  const sendMessage = (question: string, businessType?: string, sector?: string) => {
    sendMessageMutation.mutate({ question, businessType, sector });
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return {
    messages,
    sendMessage,
    clearMessages,
    isLoading: sendMessageMutation.isPending,
    error: sendMessageMutation.error
  };
}
