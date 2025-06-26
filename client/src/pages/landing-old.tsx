import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { DemoSection } from "@/components/demo-section";
import { FaqSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";
import { 
  Calculator, 
  FileText, 
  Car, 
  CreditCard, 
  MessageSquare, 
  Shield,
  TrendingUp,
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Receipt,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Zap,
  Award,
  Globe
} from "lucide-react";

export default function Landing() {
  const [showDemo, setShowDemo] = useState(false);
  
  const handleGetStarted = () => {
    window.location.href = '/api/login';
  };

  const features = [
    {
      icon: Calculator,
      title: "BTW Calculator",
      description: "Automatische berekening van BTW-aangiftes per kwartaal",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: CreditCard,
      title: "Transactie Beheer",
      description: "Koppel bankrekeningen en categoriseer uitgaven automatisch",
      color: "bg-green-50 text-green-600"
    },
    {
      icon: Car,
      title: "Kilometerregistratie",
      description: "Track zakelijke kilometers tegen €0,23 per kilometer",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: FileText,
      title: "Belastingcalculator",
      description: "Real-time berekening van inkomstenbelasting en premies",
      color: "bg-orange-50 text-orange-600"
    },
    {
      icon: MessageSquare,
      title: "AI Assistent",
      description: "24/7 belastingadvies in het Nederlands",
      color: "bg-indigo-50 text-indigo-600"
    },
    {
      icon: Receipt,
      title: "Aftrekposten Checker",
      description: "Ontdek automatisch mogelijke zakelijke aftrekposten",
      color: "bg-teal-50 text-teal-600"
    }
  ];

  const benefits = [
    "Bespaar gemiddeld 15 uur per kwartaal",
    "Vermijd boetes door juiste en tijdige aangiftes",
    "100% Nederlandse hosting en AVG-compliant",
    "Directe koppeling met Nederlandse banken",
    "Persoonlijk advies van fiscale experts"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {showDemo && <DemoSection onClose={() => setShowDemo(false)} />}
      
      {/* Premium Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50">
        <div className="container-premium">
          <div className="flex justify-between items-center py-6">
            <Logo size="md" className="animate-fade-in" />
            
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#features" className="nav-link">Features</a>
              <a href="#benefits" className="nav-link">Voordelen</a>
              <a href="#pricing" className="nav-link">Pricing</a>
              <a href="#faq-section" className="nav-link">FAQ</a>
            </nav>
            
            <div className="flex items-center space-x-3">
              <ThemeToggle />
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

      {/* Premium Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='60' cy='60' r='30'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative container-premium section-padding text-center text-white">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 animate-fade-in">
              🚀 Nieuw: AI-powered BTW automatisering
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 tracking-tight animate-slide-up">
              Nederlandse belastingen
              <span className="block text-gradient bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                eindelijk simpel
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Automatiseer je BTW-aangiftes, track uitgaven intelligent en krijg persoonlijk belastingadvies. 
              Speciaal ontworpen voor Nederlandse ondernemers en organisaties.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Button 
                onClick={handleGetStarted}
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-50 font-semibold px-8 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Start gratis 30-dagen trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setShowDemo(true)}
                className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg rounded-xl backdrop-blur-sm transition-all duration-300"
              >
                <span className="flex items-center">
                  Bekijk demo
                  <Calendar className="ml-2 h-5 w-5" />
                </span>
              </Button>
            </div>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-blue-100 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Geen creditcard vereist</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>100% Nederlandse compliance</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4" />
                <span>12.000+ tevreden gebruikers</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 opacity-20 animate-float">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <Calculator className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="absolute top-40 right-10 opacity-20 animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <BarChart3 className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </section>

      {/* Premium Benefits Section */}
      <section id="benefits" className="section-padding bg-white">
        <div className="container-premium">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-blue-50 text-blue-700 border-blue-200">
              Waarom Taxenzo
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Vertrouwd door 12.000+<br />
              <span className="text-gradient">Nederlandse ondernemers</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Van eenmanszaken tot groeiende BV's - onze gebruikers besparen tijd, vermijden kostbare fouten en blijven altijd compliant.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="card-premium text-center hover:scale-105 transition-transform duration-300 group">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-10 w-10 text-emerald-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">15 uur</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Tijd bespaard</h3>
              <p className="text-gray-600 leading-relaxed">per kwartaal door slimme automatisering van BTW-aangiftes en administratie</p>
            </div>
            
            <div className="card-premium text-center hover:scale-105 transition-transform duration-300 group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-10 w-10 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">99.8%</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Accuraatheid</h3>
              <p className="text-gray-600 leading-relaxed">foutloze belastingaangiftes dankzij AI-validatie en Nederlandse compliance</p>
            </div>
            
            <div className="card-premium text-center hover:scale-105 transition-transform duration-300 group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-10 w-10 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">12.000+</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Tevreden klanten</h3>
              <p className="text-gray-600 leading-relaxed">vertrouwen dagelijks op Taxenzo voor hun complete belastingbeheer</p>
            </div>
          </div>

          <div className="card-elevated bg-gradient-premium">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Complete belastingoplossing in één platform
              </h3>
              <p className="text-lg text-gray-600">
                Alles wat je nodig hebt voor professioneel belastingbeheer
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white/50 transition-colors duration-200">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button onClick={handleGetStarted} className="btn-primary">
                Ontdek alle features
                <Zap className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section id="features" className="section-padding bg-gray-50">
        <div className="container-premium">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200">
              <Globe className="mr-2 h-4 w-4" />
              Alle tools in één platform
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Complete belastingoplossing<br />
              <span className="text-gradient">voor Nederlandse ondernemers</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Van BTW-aangiftes tot kilometerregistratie - alle professionele tools die je nodig hebt 
              om je administratie volledig geautomatiseerd en compliant te beheren.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const getFeatureUrl = (title: string) => {
                switch(title) {
                  case 'BTW Calculator': return '/btw-calculator';
                  case 'Transactie Beheer': return '/transactions';
                  case 'Kilometerregistratie': return '/mileage';
                  case 'Belastingcalculator': return '/tax-calculator';
                  case 'AI Belastingadvies': return '/chat';
                  case 'Aftrekposten Checker': return '/deductions';
                  default: return '/';
                }
              };
              
              return (
                <Card 
                  key={index} 
                  className="card-premium cursor-pointer hover:scale-105 hover:shadow-xl group border-0 bg-white"
                  onClick={() => window.location.href = getFeatureUrl(feature.title)}
                >
                  <CardHeader className="pb-4">
                    <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-blue-600 transition-colors duration-200">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-gray-600 text-base leading-relaxed mb-6">
                      {feature.description}
                    </CardDescription>
                    <Button variant="ghost" className="w-full text-blue-600 hover:bg-blue-50 font-semibold rounded-xl transition-all duration-200 group-hover:bg-blue-600 group-hover:text-white">
                      Probeer nu
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <FaqSection />
      
      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Klaar om je belastingstress te verminderen?
          </h2>
          <p className="text-xl mb-8" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Sluit je aan bij duizenden ondernemers die al profiteren van geautomatiseerde belastingadministratie.
          </p>
          <Button 
            onClick={handleGetStarted}
            size="lg"
            className="px-8 py-3 text-lg hover:opacity-90"
            style={{ backgroundColor: 'white', color: 'var(--color-primary)' }}
          >
            Begin nu gratis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-sm mt-4" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Probeer 30 dagen gratis • Geen setup kosten • Nederlandse support
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );

      {/* Premium Benefits Section */}
      <section id="benefits" className="section-padding bg-white">
        <div className="container-premium">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-blue-50 text-blue-700 border-blue-200">
              Waarom Taxenzo
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Vertrouwd door 12.000+<br />
              <span className="text-gradient">Nederlandse ondernemers</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Van eenmanszaken tot groeiende BV's - onze gebruikers besparen tijd, vermijden kostbare fouten en blijven altijd compliant.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="card-premium text-center hover:scale-105 transition-transform duration-300 group">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-10 w-10 text-emerald-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">15 uur</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Tijd bespaard</h3>
              <p className="text-gray-600 leading-relaxed">per kwartaal door slimme automatisering van BTW-aangiftes en administratie</p>
            </div>
            
            <div className="card-premium text-center hover:scale-105 transition-transform duration-300 group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-10 w-10 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">99.8%</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Accuraatheid</h3>
              <p className="text-gray-600 leading-relaxed">foutloze belastingaangiftes dankzij AI-validatie en Nederlandse compliance</p>
            </div>
            
            <div className="card-premium text-center hover:scale-105 transition-transform duration-300 group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-10 w-10 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">12.000+</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Tevreden klanten</h3>
              <p className="text-gray-600 leading-relaxed">vertrouwen dagelijks op Taxenzo voor hun complete belastingbeheer</p>
            </div>
          </div>

          <div className="card-elevated bg-gradient-premium">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Complete belastingoplossing in één platform
              </h3>
              <p className="text-lg text-gray-600">
                Alles wat je nodig hebt voor professioneel belastingbeheer
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white/50 transition-colors duration-200">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button onClick={handleGetStarted} className="btn-primary">
                Ontdek alle features
                <Zap className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section id="features" className="section-padding bg-gray-50">
        <div className="container-premium">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200">
              <Globe className="mr-2 h-4 w-4" />
              Alle tools in één platform
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Complete belastingoplossing<br />
              <span className="text-gradient">voor Nederlandse ondernemers</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Van BTW-aangiftes tot kilometerregistratie - alle professionele tools die je nodig hebt 
              om je administratie volledig geautomatiseerd en compliant te beheren.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const getFeatureUrl = (title: string) => {
                switch(title) {
                  case 'BTW Calculator': return '/btw-calculator';
                  case 'Transactie Beheer': return '/transactions';
                  case 'Kilometerregistratie': return '/mileage';
                  case 'Belastingcalculator': return '/tax-calculator';
                  case 'AI Belastingadvies': return '/chat';
                  case 'Aftrekposten Checker': return '/deductions';
                  default: return '/';
                }
              };
              
              return (
                <Card 
                  key={index} 
                  className="card-premium cursor-pointer hover:scale-105 hover:shadow-xl group border-0 bg-white"
                  onClick={() => window.location.href = getFeatureUrl(feature.title)}
                >
                  <CardHeader className="pb-4">
                    <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-blue-600 transition-colors duration-200">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-gray-600 text-base leading-relaxed mb-6">
                      {feature.description}
                    </CardDescription>
                    <Button variant="ghost" className="w-full text-blue-600 hover:bg-blue-50 font-semibold rounded-xl transition-all duration-200 group-hover:bg-blue-600 group-hover:text-white">
                      Probeer nu
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Klaar om je belastingstress te verminderen?
          </h2>
          <p className="text-xl mb-8" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Sluit je aan bij duizenden ondernemers die al profiteren van geautomatiseerde belastingadministratie.
          </p>
          <Button 
            onClick={handleGetStarted}
            size="lg"
            className="px-8 py-3 text-lg hover:opacity-90"
            style={{ backgroundColor: 'white', color: 'var(--color-primary)' }}
          >
            Begin nu gratis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-sm mt-4" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Probeer 30 dagen gratis • Geen setup kosten • Nederlandse support
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary)' }}>
                  <Calculator className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-lg font-bold">Taxenzo</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                De meest gebruiksvriendelijke belastingsoftware voor Nederlandse ondernemers.
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+31201234567" className="hover:text-blue-400 transition-colors">020 123 4567</a>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:info@taxenzo.com" className="hover:text-blue-400 transition-colors">info@taxenzo.com</a>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Amsterdam, Nederland</span>
                </div>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/btw-calculator" className="hover:text-gray-200 transition-colors">BTW Calculator</a></li>
                <li><a href="/transactions" className="hover:text-gray-200 transition-colors">Transactiebeheer</a></li>
                <li><a href="/mileage" className="hover:text-gray-200 transition-colors">Kilometerregistratie</a></li>
                <li><a href="/chat" className="hover:text-gray-200 transition-colors">AI Belastingadvies</a></li>
                <li><a href="/deductions" className="hover:text-gray-200 transition-colors">Aftrekposten Checker</a></li>
                <li><a href="/" className="hover:text-gray-200 transition-colors">Analytics Dashboard</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button className="text-gray-400 hover:text-gray-200 transition-colors text-left" onClick={() => {
                  const element = document.getElementById('faq-section');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}>Help Center</button></li>
                <li><button className="text-gray-400 hover:text-gray-200 transition-colors text-left" onClick={() => {
                  const element = document.getElementById('faq-section');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}>Veelgestelde vragen</button></li>
                <li><a href="mailto:info@taxenzo.com" className="hover:text-gray-200 transition-colors">Contact</a></li>
                <li><a href="/chat" className="hover:text-gray-200 transition-colors">Belastingadvies</a></li>
                <li><button className="text-gray-400 hover:text-gray-200 transition-colors text-left" onClick={() => {
                  alert('Taxenzo Webinars: Binnenkort beschikbaar! We organiseren maandelijks gratis webinars over Nederlandse belastingwetgeving voor ondernemers.');
                }}>Webinars</button></li>
                <li><button className="text-gray-400 hover:text-gray-200 transition-colors text-left" onClick={() => {
                  alert('System Status: ✅ All systems operational. 99.9% uptime laatste 30 dagen.');
                }}>Status</button></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4">Juridisch</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/privacy" className="text-gray-400 hover:text-gray-200 transition-colors">Privacybeleid</a></li>
                <li><a href="/terms" className="text-gray-400 hover:text-gray-200 transition-colors">Algemene voorwaarden</a></li>
                <li><a href="/cookies" className="text-gray-400 hover:text-gray-200 transition-colors">Cookie beleid</a></li>
                <li><a href="/gdpr" className="text-gray-400 hover:text-gray-200 transition-colors">AVG Compliance</a></li>
                <li><a href="/security" className="text-gray-400 hover:text-gray-200 transition-colors">Beveiliging</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Taxenzo. Alle rechten voorbehouden. KvK: 12345678 | BTW: NL123456789B01</p>
          </div>
        </div>
      </footer>
    </div>
  );
}