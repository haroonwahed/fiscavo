import { useState } from "react";
import { ArrowRight, CheckCircle, MessageCircle, Zap, Shield, Clock, Users, TrendingUp, Globe, Calculator, FileText, Car, Brain, Euro } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { DemoSection } from "@/components/demo-section";
import { FaqSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";

export default function Landing() {
  const [showDemo, setShowDemo] = useState(false);

  const handleGetStarted = () => {
    window.location.href = '/auth';
  };

  const features = [
    {
      title: "BTW Calculator",
      description: "Automatische BTW-berekeningen en aangiftes met Nederlandse regelgeving",
      icon: Calculator,
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Transactie Beheer", 
      description: "Slimme categorisering en import van banktransacties",
      icon: FileText,
      color: "bg-green-50 text-green-600"
    },
    {
      title: "Kilometerregistratie",
      description: "GPS-gebaseerde tracking voor zakelijke ritten tegen €0.23/km",
      icon: Car,
      color: "bg-purple-50 text-purple-600"
    },
    {
      title: "AI Belastingadvies",
      description: "24/7 beschikbare AI-assistent voor Nederlandse belastingvragen",
      icon: Brain,
      color: "bg-orange-50 text-orange-600"
    },
    {
      title: "Aftrekposten Checker",
      description: "Ontdek gemiste aftrekposten en maximaliseer je rendement",
      icon: Euro,
      color: "bg-red-50 text-red-600"
    },
    {
      title: "Rapportage Dashboard",
      description: "Real-time inzichten in je financiële prestaties en compliance",
      icon: TrendingUp,
      color: "bg-indigo-50 text-indigo-600"
    }
  ];

  const benefits = [
    "Bespaar gemiddeld 15 uur per maand op administratie",
    "99.8% nauwkeurigheid met AI-ondersteuning", 
    "100% Nederlandse hosting en AVG-compliant",
    "Directe koppeling met Nederlandse banken",
    "Persoonlijk advies van fiscale experts"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {showDemo && <DemoSection onClose={() => setShowDemo(false)} />}
      
      {/* Premium Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-700 sticky top-0 z-50">
        <div className="container-premium">
          <div className="flex justify-between items-center py-6">
            <Logo size="md" className="animate-fade-in" />
            
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#features" className="nav-link">Features</a>
              <a href="#benefits" className="nav-link">Voordelen</a>
              <a href="#pricing" className="nav-link">Tarieven</a>
              <a href="#faq-section" className="nav-link">FAQ</a>
            </nav>
            
            <div className="flex items-center space-x-3">
              <Button variant="ghost" onClick={handleGetStarted} className="btn-ghost">
                Inloggen
              </Button>
              <Button onClick={handleGetStarted} className="btn-primary">
                Start gratis trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="section-padding pt-24 pb-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-blue-900/20 dark:via-gray-900 dark:to-indigo-900/20 relative overflow-hidden">
        <div className="container-premium relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <Badge className="mb-8 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-200 animate-fade-in">
              <Globe className="mr-2 h-4 w-4" />
              Trusted by 12,000+ Nederlandse ondernemers
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight tracking-tight animate-slide-up">
              Slimme belastingen voor<br />
              <span className="text-gradient bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                moderne ondernemers
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in">
              Automatiseer je belastingadministratie met AI-powered tools. Bespaar tijd, blijf compliant en maximaliseer je aftrekposten met de meest geavanceerde belastingplatform van Nederland.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-scale-in">
              <Button 
                onClick={handleGetStarted}
                size="lg"
                className="btn-primary px-10 py-4 text-lg"
              >
                Start 30 dagen gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={() => setShowDemo(true)}
                variant="outline"
                size="lg"
                className="btn-secondary px-10 py-4 text-lg"
              >
                Bekijk demo
                <Zap className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">15 uur</div>
                <p className="text-gray-600 dark:text-gray-300">Tijdsbesparing per maand</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">99.8%</div>
                <p className="text-gray-600 dark:text-gray-300">Nauwkeurigheid garantie</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">12,000+</div>
                <p className="text-gray-600 dark:text-gray-300">Tevreden gebruikers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section id="features" className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-premium">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-200">
              <Globe className="mr-2 h-4 w-4" />
              Alle tools in één platform
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              Complete belastingoplossing<br />
              <span className="text-gradient bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">voor Nederlandse ondernemers</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Van BTW-aangiftes tot kilometerregistratie - alle professionele tools die je nodig hebt 
              om je administratie volledig geautomatiseerd en compliant te beheren.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="feature-card group">
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="section-padding bg-white dark:bg-gray-800">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8">
                Waarom kiezen voor Fiscavo?
              </h2>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-lg text-gray-700 dark:text-gray-300">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="card-elevated bg-gradient-premium text-white">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">Join 12,000+ ondernemers</h3>
                <p className="text-blue-100 text-center mb-6">
                  Meer dan 12,000 Nederlandse ondernemers vertrouwen al op Fiscavo voor hun belastingadministratie.
                </p>
                <Button 
                  onClick={handleGetStarted}
                  className="w-full bg-white text-blue-600 hover:bg-gray-50"
                >
                  Word lid van de community
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container-premium">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Transparante Tarieven
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Kies het plan dat bij jouw onderneming past. Alle plannen bevatten Nederlandse support en 30 dagen geld-terug-garantie.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
            {/* Starter Plan */}
            <div className="pricing-card">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Starter</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Perfect voor ZZP'ers</p>
                <div className="text-4xl font-bold text-gray-900 dark:text-white">
                  €19
                  <span className="text-lg font-normal text-gray-500">/maand</span>
                </div>
              </div>
              
              <ul className="check-list space-y-3 mb-8">
                <li>Tot 50 transacties per maand</li>
                <li>Basis BTW berekeningen</li>
                <li>Kilometerregistratie</li>
                <li>Email support</li>
                <li>Mobiele app</li>
              </ul>
              
              <Button 
                onClick={handleGetStarted}
                className="w-full btn-secondary"
              >
                Begin met Starter
              </Button>
            </div>

            {/* Professional Plan - Featured */}
            <div className="pricing-card featured">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white px-4 py-1">
                  Meest Populair
                </Badge>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Professional</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Voor groeiende bedrijven</p>
                <div className="text-4xl font-bold text-blue-600">
                  €49
                  <span className="text-lg font-normal text-gray-500">/maand</span>
                </div>
              </div>
              
              <ul className="check-list space-y-3 mb-8">
                <li>Onbeperkte transacties</li>
                <li>AI-powered categorisering</li>
                <li>Geavanceerde rapportages</li>
                <li>Bankintegraties</li>
                <li>Prioriteit support</li>
                <li>Export naar accountant</li>
                <li>Automatische BTW aangifte</li>
              </ul>
              
              <Button 
                onClick={handleGetStarted}
                className="w-full btn-primary"
              >
                Begin met Professional
              </Button>
            </div>

            {/* Enterprise Plan */}
            <div className="pricing-card">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Enterprise</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Voor grote organisaties</p>
                <div className="text-4xl font-bold text-gray-900 dark:text-white">
                  €99
                  <span className="text-lg font-normal text-gray-500">/maand</span>
                </div>
              </div>
              
              <ul className="check-list space-y-3 mb-8">
                <li>Alles van Professional</li>
                <li>Multi-user toegang</li>
                <li>Custom integraties</li>
                <li>Dedicated accountmanager</li>
                <li>Advanced compliance tools</li>
                <li>API toegang</li>
                <li>SLA garantie</li>
              </ul>
              
              <Button 
                onClick={handleGetStarted}
                className="w-full btn-secondary"
              >
                Begin met Enterprise
              </Button>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Alle plannen bevatten een 30-dagen gratis proefperiode
            </p>
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Geen setup kosten
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Annuleer wanneer je wilt
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Nederlandse ondersteuning
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Standalone FAQ Section */}
      <FaqSection />
      
      {/* Support Section - Blue Tile Design */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container-premium">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h2 className="text-3xl font-bold mb-4">Heb je nog vragen?</h2>
                <p className="text-blue-100 text-lg mb-8">
                  Ons team van belastingexperts staat klaar om je te helpen met al je Nederlandse belastingvragen.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Button 
                  onClick={() => window.location.href = '/chat'}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm py-4 text-lg"
                >
                  Start chat ⚡
                </Button>
                <Button 
                  onClick={() => window.location.href = 'mailto:support@fiscavo.nl'}
                  className="bg-white text-blue-600 hover:bg-gray-50 py-4 text-lg"
                >
                  Email ons →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}