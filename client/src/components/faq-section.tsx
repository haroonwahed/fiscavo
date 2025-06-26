import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, Filter, MessageCircle, HelpCircle, BookOpen, Users, ArrowRight, Zap } from "lucide-react";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  businessType: string;
  tags: string[] | null;
}

export function FaqSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const { data: faqData = [], isLoading } = useQuery<FaqItem[]>({
    queryKey: ['/api/faq'],
  });

  const categories = [
    { value: 'btw', label: 'BTW & Aangifte', icon: BookOpen },
    { value: 'zakelijk', label: 'Zakelijke Uitgaven', icon: MessageCircle },
    { value: 'platform', label: 'Platform Gebruik', icon: Users },
  ];

  // Filter FAQs based on search term and category
  const filteredFAQs = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <section id="faq-section" className="section-padding bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container-premium">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Veelgestelde vragen
            </h2>
          </div>
          <Card className="card-premium border-0 bg-white/50 backdrop-blur-sm max-w-4xl mx-auto">
            <div className="p-12 animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
              <div className="h-6 bg-gray-100 rounded w-full"></div>
              <div className="h-6 bg-gray-100 rounded w-5/6"></div>
            </div>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="faq-section" className="section-padding bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container-premium">
        <div className="text-center mb-20">
          <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-200">
            <HelpCircle className="mr-2 h-4 w-4" />
            Veelgestelde vragen
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Alles wat je moet weten<br />
            <span className="text-gradient">over Fiscavo</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Krijg antwoorden op de meest gestelde vragen over belastingbeheer voor Nederlandse ondernemers
          </p>
        </div>

        {/* Premium Search and Filter */}
        <div className="mb-12 space-y-6">
          <Card className="card-premium border-0 bg-white/50 backdrop-blur-sm">
            <div className="p-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Zoek in veelgestelde vragen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-4 w-full border-0 bg-white/80 rounded-xl focus:ring-2 focus:ring-blue-500 text-lg"
                />
              </div>
            </div>
          </Card>
          
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="lg"
              onClick={() => setSelectedCategory('all')}
              className={selectedCategory === 'all' 
                ? 'btn-primary' 
                : 'btn-outline border-blue-200 hover:bg-blue-50'
              }
            >
              Alle vragen ({faqData?.length || 0})
            </Button>
            
            {categories.map((category) => {
              const count = faqData?.filter(item => item.category === category.value).length || 0;
              return (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? 'default' : 'outline'}
                  size="lg"
                  onClick={() => setSelectedCategory(category.value)}
                  className={selectedCategory === category.value 
                    ? 'btn-primary' 
                    : 'btn-outline border-blue-200 hover:bg-blue-50'
                  }
                >
                  <category.icon className="mr-2 h-4 w-4" />
                  {category.label} ({count})
                </Button>
              );
            })}
          </div>
        </div>

        {/* Premium FAQ Accordion */}
        {filteredFAQs.length > 0 ? (
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFAQs.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  value={item.id.toString()}
                  className="border-0 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600 px-8 py-6 hover:no-underline group-hover:bg-blue-50/50 transition-colors duration-200">
                    <div className="flex items-start space-x-4 w-full">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                      </div>
                      <span className="flex-1 text-lg leading-relaxed">{item.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 px-8 pb-8 leading-relaxed text-base">
                    <div className="pl-12 space-y-4">
                      <div className="prose prose-blue max-w-none">
                        {item.answer}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ) : (
          <Card className="card-premium text-center bg-white/80 backdrop-blur-sm border-0 max-w-2xl mx-auto">
            <div className="p-12">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Geen resultaten gevonden</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Probeer een andere zoekterm of selecteer een andere categorie.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="btn-primary"
              >
                Reset zoekfilters
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}

        {/* Premium Contact Support */}
        <div className="mt-20">
          <Card className="card-elevated bg-gradient-premium border-0 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                <MessageCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Heb je nog vragen?
              </h3>
              <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Ons team van belastingexperts staat klaar om je te helpen met al je vragen over Nederlandse belastingen.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  className="btn-primary px-8 py-4 text-lg"
                  onClick={() => window.location.href = '/chat'}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Start chat
                  <Zap className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline"
                  className="btn-outline border-blue-200 hover:bg-blue-50 px-8 py-4 text-lg"
                  onClick={() => window.location.href = 'mailto:support@fiscavo.nl'}
                >
                  Email ons
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
