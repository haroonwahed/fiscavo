import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cookie, ArrowLeft, Settings, Eye, BarChart3, Shield } from "lucide-react";

export default function Cookies() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            className="mb-4"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Terug
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Cookie Beleid</h1>
          <p className="text-lg text-gray-600">
            Laatst bijgewerkt: 26 december 2024
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cookie className="h-5 w-5 text-blue-600" />
                Wat zijn cookies?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Cookies zijn kleine tekstbestanden die worden opgeslagen op uw apparaat wanneer u onze website bezoekt. 
                Ze helpen ons om de functionaliteit van de website te verbeteren en u een betere gebruikerservaring te bieden.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Welke cookies gebruiken wij?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Settings className="h-5 w-5 text-green-600" />
                    <Badge className="bg-green-100 text-green-800">Noodzakelijke Cookies</Badge>
                  </div>
                  <p className="text-sm text-green-700 mb-3">
                    Deze cookies zijn essentieel voor het functioneren van de website.
                  </p>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Sessie-authenticatie</li>
                    <li>• Beveiligingstokens</li>
                    <li>• Winkelwagen inhoud</li>
                    <li>• Taalvoorkeuren</li>
                  </ul>
                  <p className="text-xs text-green-600 mt-2 font-medium">
                    ✓ Altijd actief - Geen toestemming vereist
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Eye className="h-5 w-5 text-blue-600" />
                    <Badge className="bg-blue-100 text-blue-800">Functionele Cookies</Badge>
                  </div>
                  <p className="text-sm text-blue-700 mb-3">
                    Verbeteren de functionaliteit en personalisatie.
                  </p>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Dashboard voorkeuren</li>
                    <li>• Opgeslagen filters</li>
                    <li>• UI customisatie</li>
                    <li>• Onboarding voortgang</li>
                  </ul>
                  <p className="text-xs text-blue-600 mt-2 font-medium">
                    ⚙️ Optioneel - Toestemming vereist
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    <Badge className="bg-purple-100 text-purple-800">Analytics Cookies</Badge>
                  </div>
                  <p className="text-sm text-purple-700 mb-3">
                    Helpen ons begrijpen hoe de website wordt gebruikt.
                  </p>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Pagina bezoeken</li>
                    <li>• Gebruikersstatistieken</li>
                    <li>• Prestatie monitoring</li>
                    <li>• Error tracking</li>
                  </ul>
                  <p className="text-xs text-purple-600 mt-2 font-medium">
                    📊 Optioneel - Toestemming vereist
                  </p>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-5 w-5 text-orange-600" />
                    <Badge className="bg-orange-100 text-orange-800">Marketing Cookies</Badge>
                  </div>
                  <p className="text-sm text-orange-700 mb-3">
                    Voor gepersonaliseerde marketing en advertenties.
                  </p>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Advertentie targeting</li>
                    <li>• Social media integratie</li>
                    <li>• Campagne tracking</li>
                    <li>• Remarketing</li>
                  </ul>
                  <p className="text-xs text-orange-600 mt-2 font-medium">
                    🎯 Uitgeschakeld - Wij gebruiken geen marketing cookies
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Specifieke Cookies in Fiscavo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3 font-semibold">Cookie Naam</th>
                      <th className="text-left py-2 px-3 font-semibold">Doel</th>
                      <th className="text-left py-2 px-3 font-semibold">Vervaldatum</th>
                      <th className="text-left py-2 px-3 font-semibold">Type</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <tr className="border-b">
                      <td className="py-2 px-3 font-mono text-xs">fiscavo_session</td>
                      <td className="py-2 px-3">Gebruiker authenticatie</td>
                      <td className="py-2 px-3">7 dagen</td>
                      <td className="py-2 px-3"><Badge variant="secondary" className="bg-green-100 text-green-800">Noodzakelijk</Badge></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-mono text-xs">csrf_token</td>
                      <td className="py-2 px-3">Beveiliging tegen CSRF aanvallen</td>
                      <td className="py-2 px-3">Sessie</td>
                      <td className="py-2 px-3"><Badge variant="secondary" className="bg-green-100 text-green-800">Noodzakelijk</Badge></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-mono text-xs">dashboard_prefs</td>
                      <td className="py-2 px-3">Dashboard layout voorkeuren</td>
                      <td className="py-2 px-3">30 dagen</td>
                      <td className="py-2 px-3"><Badge className="bg-blue-100 text-blue-800">Functioneel</Badge></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-mono text-xs">onboarding_step</td>
                      <td className="py-2 px-3">Onboarding voortgang opslaan</td>
                      <td className="py-2 px-3">30 dagen</td>
                      <td className="py-2 px-3"><Badge className="bg-blue-100 text-blue-800">Functioneel</Badge></td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-mono text-xs">analytics_id</td>
                      <td className="py-2 px-3">Anonieme gebruiksstatistieken</td>
                      <td className="py-2 px-3">1 jaar</td>
                      <td className="py-2 px-3"><Badge className="bg-purple-100 text-purple-800">Analytics</Badge></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Uw Cookie Keuzes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Cookies beheren</h4>
                <p className="text-blue-800 text-sm mb-3">
                  U heeft volledige controle over welke cookies wij mogen gebruiken:
                </p>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• In uw account instellingen kunt u cookie voorkeuren wijzigen</li>
                  <li>• Via uw browser instellingen kunt u cookies blokkeren of verwijderen</li>
                  <li>• Noodzakelijke cookies kunnen niet worden uitgeschakeld</li>
                  <li>• Het uitschakelen van functionele cookies kan de gebruikerservaring beperken</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Browser Instellingen</h4>
                <p className="text-gray-600 text-sm mb-2">
                  Instructies voor het beheren van cookies in populaire browsers:
                </p>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• <strong>Chrome:</strong> Instellingen → Privacy en beveiliging → Cookies</li>
                  <li>• <strong>Firefox:</strong> Voorkeuren → Privacy & Beveiliging → Cookies</li>
                  <li>• <strong>Safari:</strong> Voorkeuren → Privacy → Cookies</li>
                  <li>• <strong>Edge:</strong> Instellingen → Cookies en sitegegevens</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Fiscavo integreert met de volgende externe services die mogelijk hun eigen cookies plaatsen:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-3">
                    <h4 className="font-semibold text-sm mb-1">Replit Authentication</h4>
                    <p className="text-xs text-gray-600">Voor veilige inlogfunctionaliteit</p>
                    <a href="https://replit.com/privacy" className="text-xs text-blue-600 hover:underline">Privacy beleid</a>
                  </div>
                  <div className="border rounded-lg p-3">
                    <h4 className="font-semibold text-sm mb-1">PostgreSQL Database</h4>
                    <p className="text-xs text-gray-600">Veilige gegevensopslag in Nederland</p>
                    <span className="text-xs text-green-600">Geen tracking cookies</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Voor vragen over ons cookie beleid kunt u contact met ons opnemen:
              </p>
              <div className="space-y-2 text-gray-600">
                <p><strong>Email:</strong> <a href="mailto:privacy@taxenzo.com" className="text-blue-600 hover:underline">privacy@taxenzo.com</a></p>
                <p><strong>Telefoon:</strong> <a href="tel:+31883472829" className="text-blue-600 hover:underline">088-3472829</a></p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}