import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  businessType: string;
  tags: string[] | null;
}

export function FaqSection() {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  
  const { data: faqItems = [], isLoading } = useQuery<FaqItem[]>({
    queryKey: ['/api/faq'],
  });

  const toggleExpanded = (id: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const handleAskQuestion = () => {
    const chatSection = document.querySelector('[data-chat-section]');
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <section className="mt-12" id="faq-section">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Veelgestelde vragen</h3>
        <Card>
          <div className="p-6 animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-100 rounded w-full"></div>
            <div className="h-4 bg-gray-100 rounded w-5/6"></div>
          </div>
        </Card>
      </section>
    );
  }

  return (
    <section className="mt-12" id="faq-section">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Veelgestelde vragen</h3>
      <Card>
        {faqItems.map((item, index) => (
          <div key={item.id} className={`border-b border-gray-200 ${index === faqItems.length - 1 ? 'border-b-0' : ''}`}>
            <Button
              variant="ghost"
              className="w-full text-left p-6 hover:bg-gray-50 h-auto justify-between"
              onClick={() => toggleExpanded(item.id)}
            >
              <h4 className="font-medium text-gray-900 text-left">{item.question}</h4>
              {expandedItems.has(item.id) ? (
                <ChevronUp className="text-gray-400 flex-shrink-0 ml-2" size={20} />
              ) : (
                <ChevronDown className="text-gray-400 flex-shrink-0 ml-2" size={20} />
              )}
            </Button>
            
            {expandedItems.has(item.id) && (
              <div className="px-6 pb-6">
                <div className="text-gray-600 text-sm">
                  <p>{item.answer}</p>
                  {item.answer.includes('•') && (
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      {item.answer
                        .split('•')
                        .slice(1)
                        .map((point, idx) => (
                          <li key={idx}>{point.trim()}</li>
                        ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        
        <div className="p-6 bg-gray-50">
          <p className="text-sm text-gray-600 mb-3">Kan je vraag niet vinden?</p>
          <Button
            variant="ghost"
            className="text-primary font-medium hover:text-blue-600 p-0"
            onClick={handleAskQuestion}
          >
            Stel je vraag aan de assistent →
          </Button>
        </div>
      </Card>
    </section>
  );
}
