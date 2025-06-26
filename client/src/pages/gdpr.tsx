import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, ArrowLeft, FileText, Download, Trash2, Edit, Eye, ArrowRightLeft } from "lucide-react";

export default function GDPR() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">AVG Compliance</h1>
          <p className="text-lg text-gray-600">
            Hoe Taxenzo voldoet aan de Algemene Verordening Gegevensbescherming
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                AVG Compliance Overzicht
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-green-100 text-green-800">✓ Volledig Compliant</Badge>
                </div>
                <p className="text-green-800 text-sm">
                  Taxenzo voldoet volledig aan de AVG-wetgeving en respecteert alle rechten van betrokkenen. 
                  Onze systemen zijn ontworpen met privacy-by-design principes.
                </p>
              </div>
              <p className="text-gray-600">
                De Algemene Verordening Gegevensbescherming (AVG) geeft u controle over uw persoonlijke gegevens. 
                Hier vindt u informatie over hoe Taxenzo deze rechten respecteert en faciliteert.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Uw Rechten onder de AVG</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Eye className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold">Recht op Inzage</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    U heeft het recht om te weten welke persoonlijke gegevens wij van u verwerken.
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Overzicht van alle opgeslagen gegevens</li>
                    <li>• Doel van de gegevensverwerking</li>
                    <li>• Met wie gegevens worden gedeeld</li>
                    <li>• Bewaartermijnen</li>
                  </ul>
                  <Button variant="outline" size="sm" className="mt-3 w-full">
                    Vraag Gegevensoverzicht Aan
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Edit className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold">Recht op Rectificatie</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    U kunt onjuiste of onvolledige gegevens laten corrigeren.
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Contactgegevens bijwerken</li>
                    <li>• Bedrijfsgegevens corrigeren</li>
                    <li>• Bankgegevens aanpassen</li>
                    <li>• Onvolledige informatie aanvullen</li>
                  </ul>
                  <Button variant="outline" size="sm" className="mt-3 w-full">
                    Wijzig Mijn Gegevens
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Trash2 className="h-5 w-5 text-red-600" />
                    <h4 className="font-semibold">Recht op Vergetelheid</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    U kunt verzoeken om verwijdering van uw persoonlijke gegevens.
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Account en alle gegevens verwijderen</li>
                    <li>• Transactiehistorie wissen</li>
                    <li>• Communicatie verwijderen</li>
                    <li>• Backup bestanden laten wissen</li>
                  </ul>
                  <Button variant="outline" size="sm" className="mt-3 w-full text-red-600 border-red-200">
                    Vraag Verwijdering Aan
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Download className="h-5 w-5 text-purple-600" />
                    <h4 className="font-semibold">Recht op Overdraagbaarheid</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    U kunt uw gegevens in een gestructureerd formaat opvragen.
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Export in JSON/CSV formaat</li>
                    <li>• Alle transactiegegevens</li>
                    <li>• BTW-aangiftes en rapporten</li>
                    <li>• Klaar voor import bij andere services</li>
                  </ul>
                  <Button variant="outline" size="sm" className="mt-3 w-full">
                    Download Mijn Gegevens
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gegevensverwerking bij Fiscavo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3 font-semibold">Gegevenstype</th>
                      <th className="text-left py-2 px-3 font-semibold">Doel</th>
                      <th className="text-left py-2 px-3 font-semibold">Rechtsgrond</th>
                      <th className="text-left py-2 px-3 font-semibold">Bewaartermijn</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <tr className="border-b">
                      <td className="py-2 px-3">Contactgegevens</td>
                      <td className="py-2 px-3">Account beheer</td>
                      <td className="py-2 px-3">Contractuele verplichting</td>
                      <td className="py-2 px-3">Zolang account actief is</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3">Bedrijfsgegevens</td>
                      <td className="py-2 px-3">BTW-berekeningen</td>
                      <td className="py-2 px-3">Contractuele verplichting</td>
                      <td className="py-2 px-3">7 jaar (fiscale bewaarplicht)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3">Transactiegegevens</td>
                      <td className="py-2 px-3">Belastingaangiftes</td>
                      <td className="py-2 px-3">Wettelijke verplichting</td>
                      <td className="py-2 px-3">7 jaar (fiscale bewaarplicht)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3">Gebruiksgegevens</td>
                      <td className="py-2 px-3">Service verbetering</td>
                      <td className="py-2 px-3">Gerechtvaardigd belang</td>
                      <td className="py-2 px-3">2 jaar</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Communicatie</td>
                      <td className="py-2 px-3">Klantenservice</td>
                      <td className="py-2 px-3">Gerechtvaardigd belang</td>
                      <td className="py-2 px-3">3 jaar</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technische Beveiligingsmaatregelen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-blue-900 mb-1">Encryptie</h4>
                  <p className="text-xs text-blue-700">256-bit SSL/TLS voor alle datatransmissie</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-green-900 mb-1">Data Locatie</h4>
                  <p className="text-xs text-green-700">Alle gegevens opgeslagen in Nederlandse datacenters</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                  <ArrowRightLeft className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-purple-900 mb-1">Toegangscontrole</h4>
                  <p className="text-xs text-purple-700">Strenge toegangsbeperking op need-to-know basis</p>
                </div>
              </div>
              
              <div className="bg-gray-50 border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Aanvullende Beveiligingsmaatregelen:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Regelmatige beveiligingsaudits door externe partijen</li>
                  <li>• Automatische backup en disaster recovery procedures</li>
                  <li>• Two-factor authenticatie voor alle accounts</li>
                  <li>• Real-time monitoring van verdachte activiteiten</li>
                  <li>• Data minimalisatie - alleen noodzakelijke gegevens</li>
                  <li>• Pseudonimisering van analytics data</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Processing Impact Assessment (DPIA)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Voor onze belastingbeheersoftware hebben wij een uitgebreide DPIA uitgevoerd 
                  om privacy-risico's te identificeren en te mitigeren:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-3">
                    <h4 className="font-semibold text-sm mb-2 text-green-800">Risicobeperking</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Minimale gegevensverzameling</li>
                      <li>• Automatische verwijdering na bewaartermijn</li>
                      <li>• Geen internationale doorgifte</li>
                      <li>• Transparante verwerkingsdoeleinden</li>
                    </ul>
                  </div>
                  <div className="border rounded-lg p-3">
                    <h4 className="font-semibold text-sm mb-2 text-blue-800">Beschermende Maatregelen</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Privacy-by-design architectuur</li>
                      <li>• Regelmatige privacy training voor medewerkers</li>
                      <li>• Incident response procedures</li>
                      <li>• Jaarlijkse DPIA reviews</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Functionaris Gegevensbescherming</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-3">Data Protection Officer (DPO)</h4>
                <p className="text-blue-800 text-sm mb-4">
                  Voor alle vragen over gegevensbescherming, privacy-rechten of klachten 
                  kunt u direct contact opnemen met onze DPO:
                </p>
                <div className="space-y-2 text-blue-800 text-sm">
                  <p><strong>Email:</strong> <a href="mailto:dpo@taxenzo.com" className="text-blue-600 hover:underline">dpo@taxenzo.com</a></p>
                  <p><strong>Telefoon:</strong> <a href="tel:+31883472829" className="text-blue-600 hover:underline">088-3472829 (optie 3)</a></p>
                  <p><strong>Post:</strong> Taxenzo B.V., t.a.v. DPO, Amsterdam, Nederland</p>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Klacht indienen bij Autoriteit Persoonsgegevens</h4>
                <p className="text-gray-600 text-sm">
                  Bent u niet tevreden over hoe wij met uw privacy omgaan? U heeft het recht om een klacht 
                  in te dienen bij de Autoriteit Persoonsgegevens via: 
                  <a href="https://autoriteitpersoonsgegevens.nl" className="text-blue-600 hover:underline ml-1">
                    autoriteitpersoonsgegevens.nl
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}