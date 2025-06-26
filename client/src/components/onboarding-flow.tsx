import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, ArrowLeft, X, Calculator, FileText, Car, MessageSquare, Receipt, TrendingUp } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: string;
  benefits: string[];
  timeToComplete: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    title: "Welkom bij Fiscatax",
    description: "De slimste manier om je Nederlandse belastingen te beheren. Bespaar tijd en geld met onze geautomatiseerde tools.",
    icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
    action: "Start je reis",
    benefits: ["Gemiddeld 15 uur bespaard per kwartaal", "99.8% nauwkeurigheid", "Volledige Nederlandse compliance"],
    timeToComplete: "2 minuten"
  },
  {
    id: 2,
    title: "BTW Aangifte Generator",
    description: "Automatisch BTW-aangiftes genereren met real-time berekeningen en kwartaaloverzichten.",
    icon: <Calculator className="h-8 w-8 text-blue-600" />,
    action: "Probeer BTW calculator",
    benefits: ["Automatische 21% BTW berekening", "Kwartaal tracking", "Direct indienen mogelijk"],
    timeToComplete: "30 seconden"
  },
  {
    id: 3,
    title: "Transactie Beheer",
    description: "Koppel je bankrekeningen en categoriseer automatisch zakelijke uitgaven.",
    icon: <FileText className="h-8 w-8 text-blue-600" />,
    action: "Bekijk transacties",
    benefits: ["Automatische categorisering", "Real-time synchronisatie", "Aftrekposten identificatie"],
    timeToComplete: "1 minuut"
  },
  {
    id: 4,
    title: "Kilometerregistratie",
    description: "Registreer zakelijke kilometers tegen €0.23 per km volgens officiële tarieven.",
    icon: <Car className="h-8 w-8 text-blue-600" />,
    action: "Start kilometertracking",
    benefits: ["€0.23 per km aftrek", "GPS integratie", "Automatische berekeningen"],
    timeToComplete: "30 seconden"
  },
  {
    id: 5,
    title: "AI Belasting Assistent",
    description: "Krijg directe antwoorden op al je belastingvragen van onze Nederlandse AI expert.",
    icon: <MessageSquare className="h-8 w-8 text-blue-600" />,
    action: "Chat met AI",
    benefits: ["24/7 beschikbaar", "Nederlandse belastingwetgeving", "Persoonlijk advies"],
    timeToComplete: "Direct beschikbaar"
  },
  {
    id: 6,
    title: "Je Dashboard is Klaar!",
    description: "Al je belastingtools zijn nu geconfigureerd. Begin met het beheren van je belastingen!",
    icon: <CheckCircle className="h-8 w-8 text-green-600" />,
    action: "Ga naar dashboard",
    benefits: ["Volledige toegang", "Persoonlijke inzichten", "Maandelijkse besparingen tracking"],
    timeToComplete: "Voltooid"
  }
];

interface OnboardingFlowProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function OnboardingFlow({ onComplete, onSkip }: OnboardingFlowProps) {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const currentStepData = onboardingSteps[currentStep];
  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;

  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const handleAction = () => {
    // Mark current step as completed
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    
    // Simulate feature interaction
    setTimeout(() => {
      handleNext();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Welkom, {(user as any)?.firstName || 'gebruiker'}!
              </h2>
              <p className="text-gray-600">Leer Fiscatax kennen in 2 minuten</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onSkip}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Stap {currentStep + 1} van {onboardingSteps.length}</span>
              <span>{Math.round(progress)}% voltooid</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <div className="flex">
          {/* Step Navigation */}
          <div className="w-1/3 p-6 bg-gray-50 border-r border-gray-200">
            <div className="space-y-3">
              {onboardingSteps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(index)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    index === currentStep
                      ? 'bg-blue-600 text-white'
                      : completedSteps.includes(index)
                      ? 'bg-green-100 text-green-800'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {completedSteps.includes(index) ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      step.icon
                    )}
                    <div>
                      <div className="font-medium text-sm">{step.title}</div>
                      <div className="text-xs opacity-75">{step.timeToComplete}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            <Card className="border-0 shadow-none">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  {currentStepData.icon}
                </div>
                <CardTitle className="text-2xl text-gray-900">
                  {currentStepData.title}
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  {currentStepData.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Benefits */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Voordelen:</h4>
                  <div className="grid gap-2">
                    {currentStepData.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Time Badge */}
                <div className="flex justify-center">
                  <Badge variant="secondary" className="px-4 py-2">
                    ⏱️ {currentStepData.timeToComplete}
                  </Badge>
                </div>

                {/* Action Button */}
                <div className="text-center">
                  <Button 
                    onClick={handleAction}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                    disabled={completedSteps.includes(currentStep)}
                  >
                    {completedSteps.includes(currentStep) ? (
                      <>
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Voltooid
                      </>
                    ) : (
                      <>
                        {currentStepData.action}
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="p-6 border-t border-gray-200 flex justify-between">
          <Button 
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Vorige
          </Button>
          
          <div className="flex space-x-3">
            <Button variant="ghost" onClick={onSkip}>
              Overslaan
            </Button>
            <Button 
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {currentStep === onboardingSteps.length - 1 ? 'Voltooien' : 'Volgende'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}