import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DemoSection } from "@/components/demo-section";
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
  MapPin
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary)' }}>
                <Calculator className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold" style={{ color: 'var(--color-text-main)' }}>Fiscatax</h1>
                <p className="text-xs font-medium" style={{ color: 'var(--color-primary)' }}>Simpel | Veilig | Accuraat</p>
              </div>
            </div>
            <Button onClick={handleGetStarted} style={{ backgroundColor: 'var(--color-primary)', color: 'white' }} className="hover:opacity-90">
              Inloggen
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-white" style={{ background: `linear-gradient(to right, var(--color-primary), var(--color-primary-dark))` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Nederlandse belastingen<br />
              <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>eindelijk simpel</span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Fiscatax helpt ZZP'ers en BV-eigenaren met automatische BTW-aangiftes, 
              slimme uitgavenregistratie en persoonlijk belastingadvies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleGetStarted}
                size="lg"
                className="px-8 py-3 text-lg hover:opacity-90"
                style={{ backgroundColor: 'white', color: 'var(--color-primary)' }}
              >
                Start gratis proefperiode
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setShowDemo(true)}
                className="px-8 py-3 text-lg transition-colors"
                style={{ 
                  borderColor: 'white', 
                  color: 'white',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = 'var(--color-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'white';
                }}
              >
                Bekijk demo
              </Button>
            </div>
            <p className="text-sm mt-4" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Geen creditcard vereist • 30 dagen gratis • Cancel elk moment
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Waarom kiezen 12.000+ ondernemers voor Fiscatax?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Van eenmanszaken tot groeiende BV's - onze gebruikers besparen tijd en vermijden kostbare fouten.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">15 uur bespaard</h3>
              <p className="text-gray-600">per kwartaal door automatisering</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">99.8% accuraat</h3>
              <p className="text-gray-600">belastingaangiftes zonder fouten</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">12.000+ users</h3>
              <p className="text-gray-600">vertrouwen op onze service</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Wat krijg je met Fiscatax?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features-section" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-800 mb-4">Alle tools in één platform</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Complete belastingoplossing voor ondernemers
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Van BTW-aangiftes tot kilometerregistratie - alles wat je nodig hebt om je administratie 
              professioneel en efficiënt te beheren.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {feature.description}
                    </CardDescription>
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
                <h3 className="text-lg font-bold">Fiscatax</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                De meest gebruiksvriendelijke belastingsoftware voor Nederlandse ondernemers.
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>020 123 4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>support@fiscatax.nl</span>
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
                <li>BTW Calculator</li>
                <li>Transactiebeheer</li>
                <li>Kilometerregistratie</li>
                <li>AI Belastingadvies</li>
                <li>Aftrekposten Checker</li>
                <li>Rapportages</li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Help Center</li>
                <li>Veelgestelde vragen</li>
                <li>Contact</li>
                <li>Belastingadvies</li>
                <li>Webinars</li>
                <li>Status</li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4">Juridisch</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Privacybeleid</li>
                <li>Algemene voorwaarden</li>
                <li>Cookie beleid</li>
                <li>AVG Compliance</li>
                <li>Beveiliging</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Fiscatax. Alle rechten voorbehouden. KvK: 12345678 | BTW: NL123456789B01</p>
          </div>
        </div>
      </footer>

      {/* Demo Modal/Section */}
      {showDemo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="min-h-screen">
            <div className="sticky top-0 bg-white border-b z-10 px-4 py-3">
              <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h2 className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>
                  Fiscatax Demo
                </h2>
                <Button
                  variant="outline"
                  onClick={() => setShowDemo(false)}
                  className="ml-4"
                >
                  Sluiten
                </Button>
              </div>
            </div>
            <DemoSection onClose={() => setShowDemo(false)} />
          </div>
        </div>
      )}
    </div>
  );
}