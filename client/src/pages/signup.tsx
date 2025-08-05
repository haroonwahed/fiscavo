import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft, Shield, Users, Award } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Logo } from "@/components/ui/logo";

export default function SignupPage() {
  const { registerMutation, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  // Redirect if already authenticated
  if (isAuthenticated) {
    setLocation("/dashboard");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/">
              <Logo size="xl" variant="default" />
            </Link>
            <Link href="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Terug naar home
              </Button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Registration Form */}
            <div className="order-2 lg:order-1">
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Start je gratis account
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Binnen 2 minuten klaar om belasting te besparen
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Voornaam</Label>
                        <Input
                          id="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleInputChange("firstName")}
                          placeholder="Jan"
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Achternaam</Label>
                        <Input
                          id="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleInputChange("lastName")}
                          placeholder="Jansen"
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">E-mailadres</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange("email")}
                        placeholder="jan@voorbeeld.nl"
                        required
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="username">Gebruikersnaam</Label>
                      <Input
                        id="username"
                        type="text"
                        value={formData.username}
                        onChange={handleInputChange("username")}
                        placeholder="janjansen"
                        required
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="password">Wachtwoord</Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange("password")}
                        placeholder="Minimaal 8 karakters"
                        required
                        className="mt-1"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full btn-primary h-12 text-base font-semibold"
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? (
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      ) : null}
                      Account aanmaken
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                      Heb je al een account?{" "}
                      <Link href="/auth" className="text-blue-600 hover:text-blue-800 font-medium">
                        Log hier in
                      </Link>
                    </p>
                  </div>

                  {/* Privacy Reassurance */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 text-sm text-blue-800 mb-2">
                      <Shield className="w-4 h-4" />
                      <span className="font-medium">Je gegevens zijn 100% veilig</span>
                    </div>
                    <p className="text-xs text-blue-700 mb-3">
                      Bank-niveau beveiliging, Nederlandse hosting en volledig GDPR-compliant. 
                      <Link href="/privacy" className="underline hover:no-underline ml-1 font-medium">
                        Bekijk ons Privacybeleid →
                      </Link>
                    </p>
                    <div className="flex gap-2 text-xs">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">✓ SSL Encrypted</span>
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">✓ GDPR Ready</span>
                      <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">✓ Nederlandse Servers</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right side - Benefits */}
            <div className="order-1 lg:order-2">
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Word lid van 10.000+ ondernemers
                  </h1>
                  <p className="text-xl text-gray-600 mb-8">
                    Die gemiddeld €2.847 per jaar besparen op belastingen
                  </p>
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-white/60 rounded-lg border border-gray-100">
                    <Award className="w-8 h-8 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Gecertificeerd belastingadviseur</h3>
                      <p className="text-sm text-gray-600">Erkend door de Belastingdienst</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-white/60 rounded-lg border border-gray-100">
                    <Users className="w-8 h-8 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">10.000+ tevreden klanten</h3>
                      <p className="text-sm text-gray-600">Gemiddelde beoordeling: 4.8/5</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-white/60 rounded-lg border border-gray-100">
                    <Shield className="w-8 h-8 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">100% veilig & GDPR-compliant</h3>
                      <p className="text-sm text-gray-600">Bank-niveau beveiliging</p>
                    </div>
                  </div>
                </div>

                {/* What you get */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-4">Dit krijg je gratis:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      Automatische BTW-berekeningen
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      AI-powered uitgaven categorisering
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      Persoonlijk belastingadvies
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      Kilometerregistratie
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      Deadline tracking
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}