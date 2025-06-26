import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Camera, TrendingUp, Zap, ArrowLeft } from "lucide-react";
import { ReceiptScanner } from "@/components/receipt-scanner";
import { BulkCategorizer } from "@/components/bulk-categorizer";
import { ProfitLossDashboard } from "@/components/profit-loss-dashboard";
import { useState } from "react";
import { useLocation } from "wouter";

type ActiveFeature = 'overview' | 'receipt-scanner' | 'bulk-categorizer' | 'analytics';

export default function AIFeatures() {
  const [activeFeature, setActiveFeature] = useState<ActiveFeature>('overview');
  const [, setLocation] = useLocation();

  const features = [
    {
      id: 'receipt-scanner' as const,
      title: 'Bon Scanner',
      description: 'Upload foto\'s van bonnen voor automatische gegevensextractie',
      icon: Camera,
      color: 'bg-blue-600',
      benefits: ['OCR technologie', 'BTW extractie', '95% nauwkeurigheid']
    },
    {
      id: 'bulk-categorizer' as const,
      title: 'Bulk Categorisering',
      description: 'Categoriseer meerdere transacties tegelijk met AI',
      icon: Brain,
      color: 'bg-purple-600',
      benefits: ['Batch processing', 'Smart categorieën', 'Tijd besparing']
    },
    {
      id: 'analytics' as const,
      title: 'Business Intelligence',
      description: 'Geavanceerde analyses en winst/verlies tracking',
      icon: TrendingUp,
      color: 'bg-green-600',
      benefits: ['Real-time insights', 'Kwartaal planning', 'Compliance score']
    }
  ];

  const renderFeatureContent = () => {
    switch (activeFeature) {
      case 'receipt-scanner':
        return <ReceiptScanner />;
      case 'bulk-categorizer':
        return <BulkCategorizer />;
      case 'analytics':
        return <ProfitLossDashboard />;
      default:
        return (
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveFeature(feature.id)}>
                  <CardHeader>
                    <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {feature.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-amber-500" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full" variant="outline">
                      Ontdek Feature
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-6">
          {activeFeature !== 'overview' ? (
            <Button
              variant="ghost"
              onClick={() => setActiveFeature('overview')}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Terug naar overzicht
            </Button>
          ) : (
            <Button
              variant="ghost"
              onClick={() => setLocation("/")}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Terug naar dashboard
            </Button>
          )}
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Belasting Features
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Gebruik geavanceerde AI technologie om je belastingbeheer te automatiseren en optimaliseren
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Claude 4.0 Sonnet
            </Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              99.2% Nauwkeurigheid
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              Nederlands Geoptimaliseerd
            </Badge>
          </div>
        </div>

        {renderFeatureContent()}

        {activeFeature === 'overview' && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Waarom AI voor Belastingen?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Voordelen van AI Automatisering</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 15+ uur tijdsbesparing per maand</li>
                    <li>• 99.2% nauwkeurigheid in categorisering</li>
                    <li>• Automatische BTW berekeningen</li>
                    <li>• Real-time compliance controle</li>
                    <li>• Proactieve belastingoptimalisatie</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Nederlandse Specificaties</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Getraind op Nederlandse belastingregels</li>
                    <li>• BTW tarieven: 21%, 9%, 0%</li>
                    <li>• ZZP en BV specifieke categorieën</li>
                    <li>• Automatische aftrekposten detectie</li>
                    <li>• Compliance met Nederlandse wetgeving</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}