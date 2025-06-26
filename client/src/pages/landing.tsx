import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../App";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calculator, 
  Shield, 
  Clock, 
  CheckCircle, 
  Star,
  FileText,
  CreditCard,
  MessageSquare,
  BarChart3,
  Users,
  Lock,
  Award
} from "lucide-react";

export default function Landing() {
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuthenticated } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      setIsAuthenticated(true);
    }, 1000);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false);
      setIsAuthenticated(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-fiscatax-primary rounded-lg flex items-center justify-center">
                <Calculator className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-fiscatax-text">Fiscatax</h1>
                <p className="text-xs text-fiscatax-primary font-medium">Simpel | Veilig | Accuraat</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                Over ons
              </Button>
              <Button variant="ghost" size="sm">
                Prijzen
              </Button>
              <Button variant="ghost" size="sm">
                Contact
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="gradient-fiscatax text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Belastingen <span className="text-blue-200">simpel</span> geregeld
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                De slimste belastingassistent voor Nederlandse ondernemers. 
                Automatiseer je BTW, beheers je administratie en krijg expert advies.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-blue-200" />
                  <span>Automatische BTW berekening</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-blue-200" />
                  <span>AI-powered belastingadvies</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-blue-200" />
                  <span>100% Nederlandse wetgeving</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-8">
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-blue-100">4.9/5 - Meer dan 10.000 tevreden ondernemers</span>
              </div>
            </div>

            {/* Login/Signup Card */}
            <div className="flex justify-center lg:justify-end">
              <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                  <CardTitle className="text-fiscatax-text">Welkom bij Fiscatax</CardTitle>
                  <CardDescription>Start vandaag nog met slimme belastingen</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="login" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login">Inloggen</TabsTrigger>
                      <TabsTrigger value="signup">Account aanmaken</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="login" className="space-y-4">
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">E-mailadres</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="naam@bedrijf.nl"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Wachtwoord</Label>
                          <Input
                            id="password"
                            type="password"
                            required
                          />
                        </div>
                        <Button 
                          type="submit" 
                          className="w-full bg-fiscatax-primary hover:bg-blue-600"
                          disabled={isLoading}
                        >
                          {isLoading ? "Bezig met inloggen..." : "Inloggen"}
                        </Button>
                        <p className="text-center text-sm text-gray-600">
                          <a href="#" className="text-fiscatax-primary hover:underline">
                            Wachtwoord vergeten?
                          </a>
                        </p>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="signup" className="space-y-4">
                      <form onSubmit={handleSignup} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">Voornaam</Label>
                            <Input
                              id="firstName"
                              placeholder="Jan"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Achternaam</Label>
                            <Input
                              id="lastName"
                              placeholder="Ondernemer"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signupEmail">E-mailadres</Label>
                          <Input
                            id="signupEmail"
                            type="email"
                            placeholder="naam@bedrijf.nl"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signupPassword">Wachtwoord</Label>
                          <Input
                            id="signupPassword"
                            type="password"
                            required
                          />
                        </div>
                        <Button 
                          type="submit" 
                          className="w-full bg-emerald-600 hover:bg-emerald-700"
                          disabled={isLoading}
                        >
                          {isLoading ? "Account wordt aangemaakt..." : "Gratis account aanmaken"}
                        </Button>
                        <p className="text-xs text-center text-gray-500">
                          Door een account aan te maken ga je akkoord met onze{" "}
                          <a href="#" className="text-emerald-600 hover:underline">
                            Algemene Voorwaarden
                          </a>{" "}
                          en{" "}
                          <a href="#" className="text-emerald-600 hover:underline">
                            Privacyverklaring
                          </a>
                        </p>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Alles wat je nodig hebt voor je belastingen
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Van automatische BTW aangifte tot AI-gestuurde belastingoptimalisatie. 
              Fiscatax maakt belastingen simpel, veilig en accuraat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">BTW Aangifte</h3>
              <p className="text-gray-600">Automatische berekening en indienen van je BTW aangifte</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Transactiebeheer</h3>
              <p className="text-gray-600">Koppel je bankrekening en categoriseer automatisch</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Assistent</h3>
              <p className="text-gray-600">24/7 belastingadvies van onze slimme assistent</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Rapportages</h3>
              <p className="text-gray-600">Inzicht in je financiële prestaties en belastingdruk</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Waarom kiezen ondernemers voor Fiscatax?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">100% Veilig</h3>
              <p className="text-gray-600">
                Bank-niveau beveiliging en GDPR compliant. Je gegevens zijn bij ons veilig.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Advies</h3>
              <p className="text-gray-600">
                Geregistreerd bij de NOB. Alle adviezen conform Nederlandse wetgeving.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">10.000+ Ondernemers</h3>
              <p className="text-gray-600">
                Meer dan 10.000 ondernemers vertrouwen op Fiscatax voor hun belastingen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Klaar om je belastingen te vereenvoudigen?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Start vandaag nog gratis en ervaar zelf waarom ondernemers kiezen voor Fiscatax
          </p>
          <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8">
            Gratis account aanmaken
          </Button>
          <p className="text-emerald-200 mt-4">Geen creditcard vereist • 30 dagen gratis proberen</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center">
                  <Calculator className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Fiscatax</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Simpel | Veilig | Accuraat belastingadvies voor Nederlandse ondernemers
              </p>
              <div className="text-xs text-gray-500">
                <p>BTW nr: NL123456789B01</p>
                <p>KvK nr: 12345678</p>
              </div>
            </div>

            {/* Services */}
            <div className="col-span-1">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Diensten</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-emerald-600">BTW Aangifte</a></li>
                <li><a href="#" className="hover:text-emerald-600">Inkomstenbelasting</a></li>
                <li><a href="#" className="hover:text-emerald-600">Boekhouden</a></li>
                <li><a href="#" className="hover:text-emerald-600">Belastingadvies</a></li>
                <li><a href="#" className="hover:text-emerald-600">Administratie</a></li>
              </ul>
            </div>

            {/* Support */}
            <div className="col-span-1">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Ondersteuning</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-emerald-600">Help centrum</a></li>
                <li><a href="#" className="hover:text-emerald-600">Contact</a></li>
                <li><a href="#" className="hover:text-emerald-600">FAQ</a></li>
                <li><a href="#" className="hover:text-emerald-600">Live chat</a></li>
                <li><a href="#" className="hover:text-emerald-600">Telefoon support</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="col-span-1">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Juridisch</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-emerald-600">Privacyverklaring</a></li>
                <li><a href="#" className="hover:text-emerald-600">Algemene voorwaarden</a></li>
                <li><a href="#" className="hover:text-emerald-600">Cookie beleid</a></li>
                <li><a href="#" className="hover:text-emerald-600">Disclaimer</a></li>
                <li><a href="#" className="hover:text-emerald-600">Klachtenregeling</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-200 mt-8 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-500 mb-4 md:mb-0">
                © 2024 Fiscatax B.V. Alle rechten voorbehouden. 
                Geregistreerd bij de Nederlandse Orde van Belastingadviseurs (NOB).
              </div>
              <div className="flex space-x-6 text-sm text-gray-500">
                <span>🔒 SSL Beveiligd</span>
                <span>🇳🇱 Nederlandse wet</span>
                <span>✅ GDPR Compliant</span>
              </div>
            </div>
            
            {/* Compliance Notice */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
              <p className="mb-1">
                <strong>Belangrijke informatie:</strong> Fiscatax is een geregistreerd belastingadviesbureau. 
                Alle adviezen worden gegeven conform de Nederlandse belastingwetgeving en onder toezicht van gekwalificeerde belastingadviseurs.
              </p>
              <p>
                Voor vragen over privacy en gegevensbescherming kunt u contact opnemen via privacy@fiscatax.nl
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}