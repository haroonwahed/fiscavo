import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Loader2, User, Bot, Lightbulb, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  details?: string;
  tip?: string;
  category?: string;
}

export function ChatAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'user',
      content: 'Mag ik mijn laptop zakelijk aftrekken als ik hem ook privé gebruik?'
    },
    {
      id: '2',
      type: 'bot',
      content: '✅ Ja, je mag je laptop gedeeltelijk aftrekken!',
      details: 'Bij gemengd gebruik (zakelijk + privé) mag je het zakelijke percentage aftrekken. Voor ZZP\'ers is dit vaak: 100% zakelijk gebruik → 100% aftrekbaar, 50% zakelijk gebruik → 50% aftrekbaar, Minimaal 10% zakelijk voor aftrek.',
      tip: 'Houd een logboek bij van je zakelijke gebruik om het percentage te onderbouwen bij de Belastingdienst.',
      category: 'aftrekposten'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const { toast } = useToast();

  const sendMessageMutation = useMutation({
    mutationFn: async (question: string) => {
      const response = await apiRequest('POST', '/api/tax-advice', {
        question,
        businessType: 'zzp', // Could be dynamic based on user profile
        sector: 'IT'
      });
      return response.json();
    },
    onSuccess: (data) => {
      const botMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'bot',
        content: data.answer,
        details: data.details,
        tip: data.tip,
        category: data.category
      };
      setMessages(prev => [...prev, botMessage]);
    },
    onError: () => {
      toast({
        title: "Fout",
        description: "Er ging iets mis bij het verwerken van je vraag.",
        variant: "destructive",
      });
    }
  });

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue
    };

    setMessages(prev => [...prev, userMessage]);
    sendMessageMutation.mutate(inputValue);
    setInputValue('');
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <Bot className="text-primary mr-2" size={24} />
        Stel je vraag
      </h3>
      
      {/* Chat Messages */}
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className="flex items-start space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              message.type === 'user' ? 'bg-gray-200' : 'bg-primary'
            }`}>
              {message.type === 'user' ? (
                <User className="text-gray-600" size={16} />
              ) : (
                <Bot className="text-white" size={16} />
              )}
            </div>
            <div className="flex-1">
              <div className={`rounded-lg p-3 ${
                message.type === 'user' 
                  ? 'bg-gray-100' 
                  : 'bg-blue-50 border border-blue-200'
              }`}>
                <p className="text-gray-900 font-medium mb-2">{message.content}</p>
                
                {message.details && (
                  <p className="text-gray-700 mb-3">{message.details}</p>
                )}
                
                {message.tip && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm text-yellow-800 flex items-start">
                      <Lightbulb className="mr-1 mt-0.5 flex-shrink-0" size={14} />
                      <span><strong>Tip:</strong> {message.tip}</span>
                    </p>
                  </div>
                )}
                
                {message.category && (
                  <Badge variant="secondary" className="mt-2">
                    {message.category}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {sendMessageMutation.isPending && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Bot className="text-white" size={16} />
            </div>
            <div className="flex-1">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Loader2 className="animate-spin" size={16} />
                  <span className="text-gray-600">Aan het nadenken...</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex space-x-3">
          <Input
            type="text"
            placeholder="Typ je vraag hier... bijv. 'Mag ik mijn telefoonkosten aftrekken?'"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={sendMessageMutation.isPending || !inputValue.trim()}
          >
            <Send size={16} />
          </Button>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickQuestion('Wat zijn belangrijke aftrekposten?')}
          >
            Wat zijn belangrijke aftrekposten?
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickQuestion('BTW aangifte deadlines')}
          >
            BTW aangifte deadlines
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickQuestion('Jaarrekening BV')}
          >
            Jaarrekening BV
          </Button>
        </div>
      </div>
    </Card>
  );
}
