import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Target, Shield, Award, CheckCircle, Heart, Lightbulb, TrendingUp } from "lucide-react";
import { useLocation } from "wouter";

export default function About() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Terug naar home
          </Button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Over Fiscavo</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Wij maken belastingbeheer simpel, veilig en accuraat voor Nederlandse ondernemers. 
            Ontdek hoe onze missie, visie en waarden ons dagelijks motiveren om de beste 
            belastingoplossing te bieden.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="shadow-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white">
            <CardHeader>
              <CardTitle className="text-3xl font-bold flex items-center">
                <Target className="mr-3 h-8 w-8" />
                Onze Missie
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg">
              <p className="leading-relaxed">
                Nederlandse ondernemers ontlasten van complexe belastingadministratie door 
                intelligente automatisering en persoonlijk advies. Wij geloven dat elke 
                ondernemer meer tijd moet hebben voor waar ze goed in zijn: hun bedrijf runnen.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-xl bg-gradient-to-br from-green-600 to-green-700 text-white">
            <CardHeader>
              <CardTitle className="text-3xl font-bold flex items-center">
                <Lightbulb className="mr-3 h-8 w-8" />
                Onze Visie
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg">
              <p className="leading-relaxed">
                De toonaangevende belastingplatform worden voor Nederlandse ondernemers, 
                waar technologie en menselijke expertise samenkomen om financiële compliance 
                moeiteloos en betrouwbaar te maken.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Story */}
        <Card className="shadow-xl mb-16">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardTitle className="text-3xl font-bold flex items-center">
              <Users className="mr-3 h-8 w-8" />
              Ons Verhaal
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Fiscavo werd opgericht in 2024 door een team van ervaren belastingadviseurs en 
                technologie-experts die dagelijks zagen hoe ondernemers worstelden met complexe 
                belastingregels en tijdrovende administratie.
              </p>
              <p>
                Als ZZP'ers en kleine ondernemers zelf, begrepen we de uitdagingen: 
                onbegrijpelijke formulieren, angst voor fouten, en kostbare adviseurs die vaak 
                onbereikbaar waren wanneer je ze nodig had.
              </p>
              <p>
                Daarom hebben we Fiscavo ontwikkeld - een platform dat de expertise van 
                topbelastingadviseurs combineert met de kracht van AI en automatisering. 
                Het resultaat? Een oplossing die 24/7 beschikbaar is, fouten voorkomt, 
                en tijd bespaart.
              </p>
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                <p className="font-semibold text-blue-900 mb-2">Vandaag de dag helpen wij:</p>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <p className="text-3xl font-bold text-blue-600">12.000+</p>
                    <p className="text-blue-800">Ondernemers</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <p className="text-3xl font-bold text-green-600">€2.8M+</p>
                    <p className="text-green-800">Bespaard aan kosten</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <p className="text-3xl font-bold text-purple-600">99.8%</p>
                    <p className="text-purple-800">Nauwkeurigheid</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Our Values */}
        <Card className="shadow-xl mb-16">
          <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
            <CardTitle className="text-3xl font-bold flex items-center">
              <Heart className="mr-3 h-8 w-8" />
              Onze Waarden
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Veiligheid & Privacy</h3>
                <p className="text-gray-600">
                  Uw financiële gegevens zijn heilig. We gebruiken bankwaardige beveiliging 
                  en delen nooit uw informatie met derden.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Betrouwbaarheid</h3>
                <p className="text-gray-600">
                  Elke berekening wordt gecontroleerd door belastingexperts. 
                  We staan achter de nauwkeurigheid van onze adviezen.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Continue Innovatie</h3>
                <p className="text-gray-600">
                  We investeren continu in nieuwe technologieën om uw 
                  belastingbeheer nog makkelijker te maken.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team & Expertise */}
        <Card className="shadow-xl mb-16">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <CardTitle className="text-3xl font-bold flex items-center">
              <Award className="mr-3 h-8 w-8" />
              Ons Team & Expertise
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Belastingexperts</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                    <span>15+ jaar ervaring in Nederlandse belastingwetgeving</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                    <span>Geregistreerd bij Nederlandse Beroepsorganisatie van Accountants (NBA)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                    <span>Specialisten in ZZP, BV en ondernemerschapsbelasting</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                    <span>Continue bijscholing op nieuwe wetgeving</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Tech Team</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-1" />
                    <span>AI/ML experts van top tech bedrijven</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-1" />
                    <span>Cybersecurity specialisten voor maximale veiligheid</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-1" />
                    <span>Full-stack developers met fintech ervaring</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-1" />
                    <span>UX/UI designers gefocust op gebruiksvriendelijkheid</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why Choose Us */}
        <Card className="shadow-xl mb-16">
          <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
            <CardTitle className="text-3xl font-bold">Waarom Fiscavo?</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                <p className="text-blue-800 font-semibold">Beschikbaar</p>
                <p className="text-gray-600 text-sm mt-2">AI-assistent altijd klaar om te helpen</p>
              </div>
              
              <div className="text-center p-6 bg-green-50 rounded-xl">
                <div className="text-3xl font-bold text-green-600 mb-2">99.8%</div>
                <p className="text-green-800 font-semibold">Nauwkeurig</p>
                <p className="text-gray-600 text-sm mt-2">Validated door belastingexperts</p>
              </div>
              
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <div className="text-3xl font-bold text-purple-600 mb-2">15u</div>
                <p className="text-purple-800 font-semibold">Tijd bespaard</p>
                <p className="text-gray-600 text-sm mt-2">Per maand gemiddeld per gebruiker</p>
              </div>
              
              <div className="text-center p-6 bg-orange-50 rounded-xl">
                <div className="text-3xl font-bold text-orange-600 mb-2">€2000+</div>
                <p className="text-orange-800 font-semibold">Kostenbesparing</p>
                <p className="text-gray-600 text-sm mt-2">Jaarlijks vs traditionele adviseur</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <Card className="shadow-xl text-center">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Klaar om te beginnen?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Sluit je aan bij duizenden Nederlandse ondernemers die al profiteren van 
              slim belastingbeheer met Fiscavo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8 py-4 text-lg"
                onClick={() => setLocation("/api/login")}
              >
                Start gratis proefperiode
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={() => window.location.href = "mailto:info@fiscavo.com"}
              >
                Neem contact op
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}