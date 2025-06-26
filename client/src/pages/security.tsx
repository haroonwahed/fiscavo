import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, ArrowLeft, Lock, Server, Eye, AlertTriangle, CheckCircle } from "lucide-react";

export default function Security() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Beveiliging</h1>
          <p className="text-lg text-gray-600">
            Hoe Fiscavo uw financiële gegevens beschermt met enterprise-grade beveiliging
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Beveiligingsoverzicht
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-900">99.9%</div>
                  <div className="text-sm text-green-700">Uptime laatste jaar</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-900">256-bit</div>
                  <div className="text-sm text-blue-700">SSL Encryptie</div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                  <Server className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-900">NL</div>
                  <div className="text-sm text-purple-700">Nederlandse servers</div>
                </div>
              </div>
              <p className="text-gray-600">
                Fiscavo gebruikt enterprise-grade beveiligingsstandaarden om uw financiële gegevens te beschermen. 
                Onze systemen voldoen aan de strengste Nederlandse en Europese beveiligingseisen voor financiële dienstverlening.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-green-600" />
                Data Encryptie & Transport
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Lock className="h-4 w-4 text-green-600" />
                    Encryptie in Transit
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• TLS 1.3 voor alle verbindingen</li>
                    <li>• Perfect Forward Secrecy</li>
                    <li>• Certificate pinning</li>
                    <li>• Automatische HTTPS redirect</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Server className="h-4 w-4 text-blue-600" />
                    Encryptie at Rest
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• AES-256 database encryptie</li>
                    <li>• Geëncrypteerde backups</li>
                    <li>• Hardware Security Modules</li>
                    <li>• Key rotation elke 90 dagen</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-800 mb-1">End-to-End Beveiliging</h4>
                    <p className="text-green-700 text-sm">
                      Alle gegevens zijn versleuteld vanaf het moment dat ze uw browser verlaten 
                      tot ze veilig zijn opgeslagen in onze Nederlandse datacenters.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Authenticatie & Toegangsbeveiliging</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Multi-Factor Authenticatie</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Replit OAuth integration
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      SMS verificatie beschikbaar
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Authenticator app support
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Hardware security keys
                    </li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Sessie Beveiliging</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Automatische uitlog na inactiviteit
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Sessie invalidatie bij verdachte activiteit
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      IP-adres monitoring
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Device fingerprinting
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Infrastructure & Compliance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 text-center">
                  <Badge className="mb-2 bg-blue-100 text-blue-800">ISO 27001</Badge>
                  <h4 className="font-semibold text-sm">Information Security</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Gecertificeerd informatiebeveiliging managementsysteem
                  </p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <Badge className="mb-2 bg-green-100 text-green-800">SOC 2 Type II</Badge>
                  <h4 className="font-semibold text-sm">Service Organization</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Jaarlijkse audits van beveiliging en beschikbaarheid
                  </p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <Badge className="mb-2 bg-purple-100 text-purple-800">AVG Compliant</Badge>
                  <h4 className="font-semibold text-sm">Privacy Regulation</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Volledig conform Nederlandse privacywetgeving
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Nederlandse Datalocatie</h4>
                <p className="text-blue-800 text-sm">
                  Alle gegevens worden opgeslagen in state-of-the-art datacenters in Nederland. 
                  Dit garandeert naleving van Nederlandse wetgeving en minimale latency voor optimale prestaties.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-purple-600" />
                Monitoring & Incident Response
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">24/7 Security Operations Center</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Real-time threat detection</li>
                    <li>• Automated intrusion prevention</li>
                    <li>• DDoS protection</li>
                    <li>• Vulnerability scanning</li>
                    <li>• Log analysis en correlation</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Incident Response Team</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Getrainde security specialisten</li>
                    <li>• &lt; 15 minuten response tijd</li>
                    <li>• Automatische escalatie procedures</li>
                    <li>• Forensische analyse capabilities</li>
                    <li>• Klant communicatie binnen 1 uur</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-1">Incident Transparantie</h4>
                    <p className="text-amber-700 text-sm">
                      In het onwaarschijnlijke geval van een beveiligingsincident worden alle 
                      betrokken klanten binnen 72 uur geïnformeerd conform AVG-richtlijnen.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regular Security Audits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3 font-semibold">Audit Type</th>
                      <th className="text-left py-2 px-3 font-semibold">Frequentie</th>
                      <th className="text-left py-2 px-3 font-semibold">Laatste Audit</th>
                      <th className="text-left py-2 px-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <tr className="border-b">
                      <td className="py-2 px-3">Penetration Testing</td>
                      <td className="py-2 px-3">Elk kwartaal</td>
                      <td className="py-2 px-3">December 2024</td>
                      <td className="py-2 px-3"><Badge className="bg-green-100 text-green-800">Passed</Badge></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3">Code Security Review</td>
                      <td className="py-2 px-3">Elke release</td>
                      <td className="py-2 px-3">December 2024</td>
                      <td className="py-2 px-3"><Badge className="bg-green-100 text-green-800">Passed</Badge></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3">Infrastructure Audit</td>
                      <td className="py-2 px-3">Maandelijks</td>
                      <td className="py-2 px-3">December 2024</td>
                      <td className="py-2 px-3"><Badge className="bg-green-100 text-green-800">Passed</Badge></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3">Compliance Review</td>
                      <td className="py-2 px-3">Jaarlijks</td>
                      <td className="py-2 px-3">November 2024</td>
                      <td className="py-2 px-3"><Badge className="bg-green-100 text-green-800">Certified</Badge></td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Business Continuity Test</td>
                      <td className="py-2 px-3">Halfjaarlijks</td>
                      <td className="py-2 px-3">Oktober 2024</td>
                      <td className="py-2 px-3"><Badge className="bg-green-100 text-green-800">Passed</Badge></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Best Practices voor Gebruikers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Aanbevolen:</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Gebruik een uniek, sterk wachtwoord</li>
                    <li>• Schakel two-factor authenticatie in</li>
                    <li>• Log altijd uit op gedeelde computers</li>
                    <li>• Controleer regelmatig uw account activiteit</li>
                    <li>• Gebruik altijd de officiële Fiscavo URL</li>
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-900 mb-2">Vermijd:</h4>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Delen van inloggegevens</li>
                    <li>• Toegang via openbare WiFi</li>
                    <li>• Klikken op verdachte links in emails</li>
                    <li>• Opslaan van wachtwoorden in browser</li>
                    <li>• Toegang vanaf onbeveiligde apparaten</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-3">Rapporteer een Beveiligingsprobleem</h4>
                <p className="text-blue-800 text-sm mb-4">
                  Hebt u een beveiligingsprobleem ontdekt? Neem onmiddellijk contact met ons op via:
                </p>
                <div className="space-y-2 text-blue-800 text-sm">
                  <p><strong>Security Email:</strong> <a href="mailto:security@fiscavo.com" className="text-blue-600 hover:underline">security@fiscavo.com</a></p>
                  <p><strong>24/7 Security Hotline:</strong> <a href="tel:+31883472829" className="text-blue-600 hover:underline">088-3472829 (optie 1)</a></p>
                  <p><strong>Response tijd:</strong> &lt; 2 uur voor kritieke issues</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}