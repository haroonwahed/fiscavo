import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Lock, Server, Eye, AlertTriangle, CheckCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function Security() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
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

        <Card className="shadow-xl">
          <CardHeader className="bg-blue-600 text-white">
            <CardTitle className="text-3xl font-bold flex items-center">
              <Shield className="mr-3 h-8 w-8" />
              Beveiligingsbeleid
            </CardTitle>
            <p className="text-blue-100">Hoe wij uw gegevens en onze systemen beschermen</p>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            
            {/* Introductie */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Onze beveiligingsaanpak</h2>
              <p className="text-gray-600 mb-4">
                Bij Fiscavo nemen wij de beveiliging van uw gegevens en onze systemen uiterst serieus. 
                Als belastingbeheerdienst verwerken wij gevoelige financiële en persoonlijke informatie, 
                waardoor hoogwaardige beveiliging essentieel is.
              </p>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-green-800">ISO 27001 gecertificeerd</span>
                </div>
                <p className="text-green-700 text-sm mt-2">
                  Onze beveiligingsprocessen voldoen aan internationale standaarden voor informatiebeveiliging.
                </p>
              </div>
            </section>

            {/* Gegevensbeveiliging */}
            <section>
              <div className="flex items-start space-x-4 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <Lock className="h-8 w-8 text-blue-600 mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">Gegevensbeveiliging</h3>
                  
                  <h4 className="font-semibold text-blue-700 mb-2">Encryptie</h4>
                  <ul className="list-disc list-inside text-blue-600 text-sm space-y-1 mb-4">
                    <li><strong>In transit:</strong> TLS 1.3 encryptie voor alle gegevensoverdracht</li>
                    <li><strong>At rest:</strong> AES-256 encryptie voor opgeslagen gegevens</li>
                    <li><strong>Database:</strong> Transparent Data Encryption (TDE)</li>
                    <li><strong>Backups:</strong> End-to-end encrypted backup storage</li>
                  </ul>

                  <h4 className="font-semibold text-blue-700 mb-2">Toegangscontrole</h4>
                  <ul className="list-disc list-inside text-blue-600 text-sm space-y-1 mb-4">
                    <li>Multi-factor authenticatie (MFA) verplicht</li>
                    <li>Role-based access control (RBAC)</li>
                    <li>Principe van minimale toegang</li>
                    <li>Regelmatige toegangsreviews</li>
                  </ul>

                  <div className="p-3 bg-blue-100 rounded border border-blue-300">
                    <p className="text-blue-800 text-sm">
                      <strong>Zero-knowledge principe:</strong> Wij kunnen uw gegevens niet lezen zonder uw expliciete toestemming.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Infrastructuurbeveiliging */}
            <section>
              <div className="flex items-start space-x-4 p-6 bg-purple-50 border border-purple-200 rounded-lg">
                <Server className="h-8 w-8 text-purple-600 mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-purple-800 mb-3">Infrastructuurbeveiliging</h3>
                  
                  <h4 className="font-semibold text-purple-700 mb-2">Cloud Security</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-purple-100 rounded">
                      <h5 className="font-semibold text-purple-800 text-sm">Hosting</h5>
                      <p className="text-purple-700 text-xs">EU-gebaseerde datacenters met SOC 2 Type II certificering</p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded">
                      <h5 className="font-semibold text-purple-800 text-sm">Netwerk</h5>
                      <p className="text-purple-700 text-xs">Private Virtual Clouds (VPC) met network segmentatie</p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded">
                      <h5 className="font-semibold text-purple-800 text-sm">Firewalls</h5>
                      <p className="text-purple-700 text-xs">Web Application Firewalls (WAF) en DDoS-bescherming</p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded">
                      <h5 className="font-semibold text-purple-800 text-sm">Monitoring</h5>
                      <p className="text-purple-700 text-xs">24/7 Security Operations Center (SOC) monitoring</p>
                    </div>
                  </div>

                  <h4 className="font-semibold text-purple-700 mb-2">Application Security</h4>
                  <ul className="list-disc list-inside text-purple-600 text-sm space-y-1">
                    <li>Secure Development Lifecycle (SDLC)</li>
                    <li>Geautomatiseerde vulnerability scanning</li>
                    <li>Regular penetration testing door externe partijen</li>
                    <li>Code review en static analysis</li>
                    <li>Container security en image scanning</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Compliance & Standaarden */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Compliance & Standaarden</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700">Certificeringen</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-semibold text-green-800">ISO 27001:2013</p>
                        <p className="text-green-600 text-xs">Information Security Management</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-semibold text-green-800">SOC 2 Type II</p>
                        <p className="text-green-600 text-xs">Service Organization Control</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-semibold text-green-800">NEN 7510</p>
                        <p className="text-green-600 text-xs">Nederlandse norm voor informatiebeveiliging</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700">Wettelijke naleving</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-semibold text-blue-800">AVG/GDPR</p>
                        <p className="text-blue-600 text-xs">Algemene Verordening Gegevensbescherming</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-semibold text-blue-800">Wwft</p>
                        <p className="text-blue-600 text-xs">Wet ter voorkoming van witwassen en financieren van terrorisme</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-semibold text-blue-800">NIS2 Richtlijn</p>
                        <p className="text-blue-600 text-xs">Netwerk- en informatiebeveiliging</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Incident Response */}
            <section>
              <div className="flex items-start space-x-4 p-6 bg-red-50 border border-red-200 rounded-lg">
                <AlertTriangle className="h-8 w-8 text-red-600 mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-red-800 mb-3">Incident Response</h3>
                  <p className="text-red-700 mb-4">
                    Wij hebben een uitgebreid incident response plan om snel en effectief te reageren op beveiligingsincidenten.
                  </p>
                  
                  <h4 className="font-semibold text-red-700 mb-2">Response tijden</h4>
                  <div className="grid md:grid-cols-3 gap-3 mb-4">
                    <div className="p-3 bg-red-100 rounded text-center">
                      <p className="font-semibold text-red-800">Kritiek</p>
                      <p className="text-red-600 text-sm">&lt; 15 minuten</p>
                    </div>
                    <div className="p-3 bg-red-100 rounded text-center">
                      <p className="font-semibold text-red-800">Hoog</p>
                      <p className="text-red-600 text-sm">&lt; 2 uur</p>
                    </div>
                    <div className="p-3 bg-red-100 rounded text-center">
                      <p className="font-semibold text-red-800">Medium</p>
                      <p className="text-red-600 text-sm">&lt; 24 uur</p>
                    </div>
                  </div>

                  <h4 className="font-semibold text-red-700 mb-2">Incident proces</h4>
                  <ol className="list-decimal list-inside text-red-600 text-sm space-y-1">
                    <li>Detectie en triaging</li>
                    <li>Containment en damage control</li>
                    <li>Forensisch onderzoek</li>
                    <li>Herstel en lessons learned</li>
                    <li>Rapportage aan autoriteiten (indien vereist)</li>
                    <li>Communicatie naar klanten (indien relevant)</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* Privacy by Design */}
            <section>
              <div className="flex items-start space-x-4 p-6 bg-green-50 border border-green-200 rounded-lg">
                <Eye className="h-8 w-8 text-green-600 mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">Privacy by Design</h3>
                  <p className="text-green-700 mb-4">
                    Privacy en beveiliging zijn geïntegreerd in elke fase van onze productontwikkeling.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-green-700 mb-2">Ontwerpprincipes</h4>
                      <ul className="list-disc list-inside text-green-600 text-sm space-y-1">
                        <li>Dataminimalisatie</li>
                        <li>Pseudonimisering waar mogelijk</li>
                        <li>Doelbinding en transparantie</li>
                        <li>Gebruikerscontrole</li>
                        <li>Security by default</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-700 mb-2">Technische maatregelen</h4>
                      <ul className="list-disc list-inside text-green-600 text-sm space-y-1">
                        <li>Data Loss Prevention (DLP)</li>
                        <li>Geautomatiseerde data classificatie</li>
                        <li>Retention policy automation</li>
                        <li>Privacy impact assessments</li>
                        <li>Consent management platform</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Third Party Security */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Derde partijen en leveranciers</h2>
              <p className="text-gray-600 mb-4">
                Alle externe partijen die toegang hebben tot onze systemen of gegevens worden zorgvuldig gescreend 
                en moeten voldoen aan onze beveiligingsstandaarden.
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Due diligence proces</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Security assessment van alle nieuwe leveranciers</li>
                    <li>Contractuele beveiligingseisen en audit rechten</li>
                    <li>Regelmatige security reviews en penetration tests</li>
                    <li>Incident notification verplichtingen</li>
                    <li>Data processing agreements (DPA's) conform AVG</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Approved leveranciers</h4>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="text-center p-2 bg-white rounded border">
                      <p className="font-semibold text-gray-700 text-sm">Replit</p>
                      <p className="text-gray-500 text-xs">Cloud Infrastructure</p>
                    </div>
                    <div className="text-center p-2 bg-white rounded border">
                      <p className="font-semibold text-gray-700 text-sm">Anthropic</p>
                      <p className="text-gray-500 text-xs">AI Services</p>
                    </div>
                    <div className="text-center p-2 bg-white rounded border">
                      <p className="font-semibold text-gray-700 text-sm">SendGrid</p>
                      <p className="text-gray-500 text-xs">Email Services</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Security Awareness */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Security Awareness</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3">Voor onze medewerkers</h4>
                  <ul className="list-disc list-inside text-blue-700 text-sm space-y-1">
                    <li>Maandelijkse security awareness training</li>
                    <li>Phishing simulaties en tests</li>
                    <li>Security incident reporting procedures</li>
                    <li>Clean desk en clear screen beleid</li>
                    <li>Secure remote working guidelines</li>
                  </ul>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-3">Voor onze klanten</h4>
                  <ul className="list-disc list-inside text-orange-700 text-sm space-y-1">
                    <li>Security best practices in onze documentatie</li>
                    <li>Waarschuwingen voor phishing en fraude</li>
                    <li>Veilige wachtwoord richtlijnen</li>
                    <li>MFA setup assistentie</li>
                    <li>Security notifications en alerts</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Continuous Improvement */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Continue verbetering</h2>
              <p className="text-gray-600 mb-4">
                Beveiliging is een continu proces. Wij investeren voortdurend in het verbeteren van onze beveiligingsposture.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Reguliere activiteiten</h4>
                  <ul className="list-disc list-inside text-purple-700 text-sm space-y-1">
                    <li>Kwartaalse vulnerability assessments</li>
                    <li>Jaarlijkse penetration testing</li>
                    <li>Maandelijkse security reviews</li>
                    <li>Threat intelligence monitoring</li>
                    <li>Security metrics en KPI tracking</li>
                  </ul>
                </div>

                <div className="p-4 bg-indigo-50 rounded-lg">
                  <h4 className="font-semibold text-indigo-800 mb-2">Investeringen 2024</h4>
                  <ul className="list-disc list-inside text-indigo-700 text-sm space-y-1">
                    <li>Zero Trust Architecture implementatie</li>
                    <li>AI-powered threat detection</li>
                    <li>Extended Detection and Response (XDR)</li>
                    <li>Cloud Security Posture Management</li>
                    <li>Advanced endpoint protection</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Security Contact */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Security Contact</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">🚨 Beveiligingsincident melden</h4>
                  <p className="text-red-700 text-sm mb-4">
                    Hebt u een beveiligingsprobleem ontdekt? Neem onmiddellijk contact met ons op via:
                  </p>
                  <div className="space-y-2 text-red-700 text-sm">
                    <p><strong>Security Email:</strong> <a href="mailto:security@fiscavo.com" className="text-red-600 hover:underline">security@fiscavo.com</a></p>
                    <p><strong>24/7 Security Hotline:</strong> <a href="tel:+31883472829" className="text-red-600 hover:underline">088-3472829 (optie 1)</a></p>
                    <p><strong>Response tijd:</strong> &lt; 2 uur voor kritieke issues</p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Responsible Disclosure</h4>
                  <p className="text-blue-700 text-sm mb-2">
                    Wij moedigen responsible disclosure aan van beveiligingskwetsbaarheden:
                  </p>
                  <ul className="list-disc list-inside text-blue-700 text-sm space-y-1">
                    <li>Meld kwetsbaarheden via security@fiscavo.com</li>
                    <li>Geef ons 90 dagen om het probleem op te lossen</li>
                    <li>Wij erkennen uw bijdrage in onze hall of fame</li>
                    <li>Bug bounty programma beschikbaar voor kritieke vondsten</li>
                  </ul>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Algemene security vragen</h4>
                  <p className="text-green-700 text-sm">
                    Voor algemene vragen over onze beveiligingsmaatregelen kunt u contact opnemen via 
                    <a href="mailto:info@fiscavo.com" className="text-green-600 hover:underline ml-1">info@fiscavo.com</a> 
                    of <a href="tel:+31883472829" className="text-green-600 hover:underline">088-3472829</a>.
                  </p>
                </div>
              </div>
            </section>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}