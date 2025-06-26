import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, HelpCircle, MessageSquare, Mail, Phone, BookOpen, Clock, Zap } from "lucide-react";
import { useLocation } from "wouter";

export default function Support() {
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
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Support Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Wij staan klaar om je te helpen. Vind antwoorden, neem contact op met ons team, 
            of bekijk onze uitgebreide documentatie.
          </p>
        </div>

        {/* Quick Help Options */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="shadow-xl hover:shadow-2xl transition-shadow bg-gradient-to-br from-blue-600 to-blue-700 text-white cursor-pointer"
                onClick={() => document.querySelector('#faq-section')?.scrollIntoView({ behavior: 'smooth' })}>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <HelpCircle className="mr-3 h-8 w-8" />
                Veelgestelde Vragen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-100 mb-4">
                Bekijk onze uitgebreide FAQ voor directe antwoorden op de meest gestelde vragen.
              </p>
              <div className="flex items-center text-sm text-blue-200">
                <Clock className="mr-2 h-4 w-4" />
                Directe antwoorden
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl hover:shadow-2xl transition-shadow bg-gradient-to-br from-green-600 to-green-700 text-white cursor-pointer"
                onClick={() => setLocation("/chat")}>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <MessageSquare className="mr-3 h-8 w-8" />
                AI Chat Assistent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-100 mb-4">
                Chat direct met onze AI-assistent voor belastingvragen en platformhulp.
              </p>
              <div className="flex items-center text-sm text-green-200">
                <Zap className="mr-2 h-4 w-4" />
                24/7 beschikbaar
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl hover:shadow-2xl transition-shadow bg-gradient-to-br from-purple-600 to-purple-700 text-white">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <BookOpen className="mr-3 h-8 w-8" />
                Documentatie
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-100 mb-4">
                Uitgebreide handleidingen en tutorials voor alle Fiscavo functies.
              </p>
              <div className="flex items-center text-sm text-purple-200">
                <BookOpen className="mr-2 h-4 w-4" />
                Stap-voor-stap guides
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Options */}
        <Card className="shadow-xl mb-16">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardTitle className="text-3xl font-bold">Neem Contact Op</CardTitle>
            <p className="text-blue-100">Ons support team staat klaar om je te helpen</p>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Email Support */}
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900">Email Support</h3>
                    <p className="text-blue-700">Voor algemene vragen en ondersteuning</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-blue-700 mb-1">Algemene vragen:</p>
                    <a href="mailto:support@fiscavo.nl" className="text-blue-600 hover:text-blue-800 font-semibold">
                      support@fiscavo.nl
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-blue-700 mb-1">Technische ondersteuning:</p>
                    <a href="mailto:support@fiscavo.nl" className="text-blue-600 hover:text-blue-800 font-semibold">
                      support@fiscavo.nl
                    </a>
                  </div>
                  <div className="pt-2 border-t border-blue-200">
                    <p className="text-sm text-blue-600">
                      <Clock className="inline h-4 w-4 mr-1" />
                      Reactietijd: binnen 4 uur (werkdagen)
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone Support */}
              <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mr-4">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-900">Telefoon Support</h3>
                    <p className="text-green-700">Voor urgente vragen en persoonlijke hulp</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-green-700 mb-1">Algemene helpdesk:</p>
                    <a href="tel:+31208007456" className="text-green-600 hover:text-green-800 font-semibold text-lg">
                      020-800-7456
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-green-700 mb-1">Belastingexperts:</p>
                    <a href="tel:+31208007456" className="text-green-600 hover:text-green-800 font-semibold text-lg">
                      020-800-7456 (optie 2)
                    </a>
                  </div>
                  <div className="pt-2 border-t border-green-200">
                    <p className="text-sm text-green-600">
                      <Clock className="inline h-4 w-4 mr-1" />
                      Ma-Vr: 09:00-17:00 | Za: 10:00-15:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Topics */}
        <Card className="shadow-xl mb-16">
          <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
            <CardTitle className="text-3xl font-bold">Populaire Support Onderwerpen</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Aan de slag</h3>
                <ul className="space-y-2">
                  <li><Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800">Account aanmaken en eerste stappen</Button></li>
                  <li><Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800">Bankrekening koppelen</Button></li>
                  <li><Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800">Eerste BTW-aangifte instellen</Button></li>
                  <li><Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800">Transacties importeren</Button></li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">BTW & Belastingen</h3>
                <ul className="space-y-2">
                  <li><Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800">BTW-aangifte indienen</Button></li>
                  <li><Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800">Uitgaven categoriseren</Button></li>
                  <li><Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800">Kilometerregistratie</Button></li>
                  <li><Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800">Aftrekposten ontdekken</Button></li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Technische Hulp</h3>
                <ul className="space-y-2">
                  <li><Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800">Inlogproblemen oplossen</Button></li>
                  <li><Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800">Synchronisatie issues</Button></li>
                  <li><Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800">App niet toegankelijk</Button></li>
                  <li><Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800">Data export en backup</Button></li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Account & Facturering</h3>
                <ul className="space-y-2">
                  <li><Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800">Abonnement wijzigen</Button></li>
                  <li><Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800">Factuur downloaden</Button></li>
                  <li><Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800">Account verwijderen</Button></li>
                  <li><Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800">Privacy instellingen</Button></li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Support */}
        <Card className="shadow-xl bg-red-50 border-red-200">
          <CardHeader className="bg-red-600 text-white">
            <CardTitle className="text-2xl font-bold">🚨 Urgente Hulp Nodig?</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-red-900 mb-3">Kritieke Situaties</h3>
                <ul className="space-y-2 text-red-800">
                  <li>• BTW-deadline morgen en aangifte niet klaar</li>
                  <li>• Probleem met belastingdienst communicatie</li>
                  <li>• Verdachte activiteit op je account</li>
                  <li>• Data verlies of corruptie</li>
                </ul>
              </div>
              <div className="text-center">
                <p className="text-red-800 mb-4 font-semibold">Bel direct onze spoedhulp:</p>
                <a href="tel:+31208007456" className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold text-lg transition-colors">
                  020-800-7456
                </a>
                <p className="text-sm text-red-600 mt-2">24/7 beschikbaar voor kritieke issues</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}