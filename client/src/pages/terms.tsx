import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, ArrowLeft, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export default function Terms() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Algemene Voorwaarden</h1>
          <p className="text-lg text-gray-600">
            Laatst bijgewerkt: 26 december 2024
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Toepasselijkheid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Deze algemene voorwaarden zijn van toepassing op alle diensten geleverd door Fiscavo B.V. 
                Door gebruik te maken van onze software gaat u akkoord met deze voorwaarden.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dienstverlening</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Fiscavo biedt:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Geautomatiseerde BTW-berekeningen en aangiftes</li>
                  <li>Transactiebeheer en uitgavenregistratie</li>
                  <li>Kilometerregistratie voor zakelijke reizen</li>
                  <li>AI-powered belastingadvies</li>
                  <li>Real-time belastingcalculaties</li>
                  <li>Compliance monitoring en deadlines</li>
                </ul>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-1">Belangrijke opmerking</h4>
                    <p className="text-amber-700 text-sm">
                      Onze software is een hulpmiddel en vervangt geen professioneel belastingadvies. 
                      Voor complexe situaties raden wij aan om een erkende boekhouder te raadplegen.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Abonnement en Betaling</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Gratis Plan</Badge>
                  </div>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Tot 10 transacties per maand</li>
                    <li>• Basis BTW-berekeningen</li>
                    <li>• Community support</li>
                    <li>• Beperkte AI-adviezen</li>
                  </ul>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <Badge className="bg-blue-100 text-blue-800">Pro Plan - €29/maand</Badge>
                  </div>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Onbeperkte transacties</li>
                    <li>• Volledige BTW-automatisering</li>
                    <li>• Priority support</li>
                    <li>• Unlimited AI-advies</li>
                  </ul>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Betalingsvoorwaarden:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Maandelijkse abonnementen worden automatisch verlengd</li>
                  <li>Betaling vooraf via iDEAL, creditcard of SEPA</li>
                  <li>30 dagen geld-terug-garantie voor nieuwe gebruikers</li>
                  <li>Opzegging mogelijk tot 24 uur voor verlenging</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Aansprakelijkheid</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-800 mb-2">Beperkte aansprakelijkheid</h4>
                    <div className="text-red-700 text-sm space-y-2">
                      <p>Fiscavo is niet aansprakelijk voor:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Fouten in belastingaangiftes door onjuiste invoer</li>
                        <li>Vertraagde indiening door technische problemen</li>
                        <li>Boetes of naheffingen van de Belastingdienst</li>
                        <li>Indirecte schade of winstderving</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                Onze maximale aansprakelijkheid is beperkt tot het bedrag dat u heeft betaald 
                voor de diensten in de 12 maanden voorafgaand aan het incident.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gebruiksvoorwaarden</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Toegestaan gebruik:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Legitieme bedrijfsadministratie en belastingbeheer</li>
                    <li>Het delen van toegang binnen uw organisatie</li>
                    <li>Export van uw eigen gegevens</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Verboden gebruik:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Misbruik van de service voor illegale activiteiten</li>
                    <li>Reverse engineering van onze software</li>
                    <li>Het doorverkopen van toegang aan derden</li>
                    <li>Overmatig gebruik dat de service verstoort</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Wijzigingen en Opzegging</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Wijzigingen in voorwaarden:</h4>
                <p className="text-gray-600">
                  Wij behouden ons het recht voor om deze voorwaarden te wijzigen. 
                  Belangrijke wijzigingen worden 30 dagen van tevoren aangekondigd via email.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Opzegging:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>U kunt uw account op elk moment opzeggen in uw accountinstellingen</li>
                  <li>Bij opzegging blijft toegang behouden tot einde van de betaalde periode</li>
                  <li>Uw gegevens worden 90 dagen na opzegging bewaard voor export</li>
                  <li>Wij kunnen accounts opzeggen bij schending van deze voorwaarden</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Toepasselijk Recht</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Op deze voorwaarden is Nederlands recht van toepassing. Geschillen worden voorgelegd 
                aan de bevoegde rechter in Amsterdam. Voor consumenten geldt de wettelijke bescherming 
                van het land waar zij woonachtig zijn.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Voor vragen over deze voorwaarden kunt u contact met ons opnemen:
              </p>
              <div className="space-y-2 text-gray-600">
                <p><strong>Email:</strong> <a href="mailto:info@fiscavo.com" className="text-blue-600 hover:underline">info@fiscavo.com</a></p>
                <p><strong>Telefoon:</strong> <a href="tel:+31883472829" className="text-blue-600 hover:underline">088-3472829</a></p>
                <p><strong>KvK-nummer:</strong> 85234567</p>
                <p><strong>BTW-nummer:</strong> NL863456789B01</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}