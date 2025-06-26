import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function Terms() {
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
            <CardTitle className="text-3xl font-bold">Algemene Voorwaarden</CardTitle>
            <p className="text-blue-100">Laatst bijgewerkt: 26 december 2024</p>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            
            {/* Definities */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Definities</h2>
              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700"><strong>Fiscavo:</strong> Fiscavo B.V., gevestigd te Amsterdam, KvK-nummer 85234567</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700"><strong>Gebruiker/Klant:</strong> De natuurlijke of rechtspersoon die gebruik maakt van onze diensten</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700"><strong>Diensten:</strong> Alle door Fiscavo aangeboden belastingbeheer-, adviserings- en softwareoplossingen</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700"><strong>Platform:</strong> De online software, website en applicaties van Fiscavo</p>
                </div>
              </div>
            </section>

            {/* Toepasselijkheid */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Toepasselijkheid</h2>
              <p className="text-gray-600 mb-4">
                Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, overeenkomsten en dienstverlening van Fiscavo B.V. 
                Door gebruik te maken van onze diensten accepteert u deze voorwaarden volledig.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Afwijkende bedingen van de klant worden uitdrukkelijk van de hand gewezen</li>
                <li>Wijzigingen zijn alleen geldig indien schriftelijk overeengekomen</li>
                <li>Bij tegenstrijdigheid prevaleren deze voorwaarden boven eventuele andere bedingen</li>
              </ul>
            </section>

            {/* Dienstverlening */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Dienstverlening</h2>
              
              <h3 className="text-lg font-semibold text-gray-700 mb-3">3.1 Belastingdiensten</h3>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>Opstellen en indienen van belastingaangiftes (IB, VPB, BTW)</li>
                <li>Financiële administratie en boekhouding</li>
                <li>Belastingadvies en -planning</li>
                <li>Compliance monitoring en deadline management</li>
                <li>AI-gestuurde uitgavencategorisatie en analyses</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-700 mb-3">3.2 Software en Platform</h3>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>Toegang tot ons online belastingmanagementplatform</li>
                <li>Integratie met Nederlandse banken en financiële instellingen</li>
                <li>Automatische gegevenssynchronisatie en backup</li>
                <li>Mobile applicaties en API-toegang</li>
                <li>24/7 technische ondersteuning tijdens werkdagen</li>
              </ul>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-800">Belangrijke opmerking</h4>
                <p className="text-yellow-700 text-sm">
                  Fiscavo verleent technische ondersteuning en softwareoplossingen. Voor complexe belastingadvies 
                  werken wij samen met geregistreerde belastingadviseurs.
                </p>
              </div>
            </section>

            {/* Abonnementen en Tarieven */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Abonnementen en Tarieven</h2>
              
              <h3 className="text-lg font-semibold text-gray-700 mb-3">4.1 Abonnementsoorten</h3>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800">Basis (€19/maand)</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• BTW-aangiftes</li>
                    <li>• Basis transactiebeheer</li>
                    <li>• E-mailondersteuning</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800">Professioneel (€49/maand)</h4>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• Alles van Basis</li>
                    <li>• IB-aangiftes</li>
                    <li>• AI-categorisatie</li>
                    <li>• Bankintegraties</li>
                    <li>• Telefonische support</li>
                  </ul>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800">Enterprise (€99/maand)</h4>
                  <ul className="text-purple-700 text-sm space-y-1">
                    <li>• Alles van Professioneel</li>
                    <li>• VPB-aangiftes</li>
                    <li>• Persoonlijk belastingadvies</li>
                    <li>• API-toegang</li>
                    <li>• 24/7 priority support</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-700 mb-3">4.2 Betalingsvoorwaarden</h3>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>Maandelijkse abonnementen worden vooraf gefactureerd</li>
                <li>Betaling binnen 14 dagen na factuurdatum</li>
                <li>Bij niet-betaling kan toegang worden opgeschort</li>
                <li>Prijswijzigingen met 30 dagen opzegtermijn</li>
                <li>Alle prijzen zijn exclusief BTW (21%)</li>
              </ul>
            </section>

            {/* Verplichtingen klant */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Verplichtingen van de klant</h2>
              
              <h3 className="text-lg font-semibold text-gray-700 mb-3">5.1 Informatieverstrekking</h3>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>Tijdige en volledige verstrekking van benodigde gegevens</li>
                <li>Juistheid en volledigheid van aangeleverde informatie</li>
                <li>Onmiddellijke melding van wijzigingen in situatie</li>
                <li>Bewaring van originele bescheiden conform wet</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-700 mb-3">5.2 Gebruik van het platform</h3>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>Verantwoordelijk gebruik conform Nederlandse wetgeving</li>
                <li>Geen oneigenlijk gebruik of pogingen tot hacking</li>
                <li>Bescherming van inloggegevens en wachtwoorden</li>
                <li>Onmiddellijke melding van beveiligingsincidenten</li>
              </ul>

              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-semibold text-red-800">Verboden activiteiten</h4>
                <p className="text-red-700 text-sm">
                  Het is verboden om het platform te gebruiken voor illegale activiteiten, 
                  witwassen, belastingontduiking of andere strafbare feiten.
                </p>
              </div>
            </section>

            {/* Aansprakelijkheid */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Aansprakelijkheid</h2>
              
              <h3 className="text-lg font-semibold text-gray-700 mb-3">6.1 Aansprakelijkheid Fiscavo</h3>
              <p className="text-gray-600 mb-4">
                Fiscavo is aansprakelijk voor schade die het gevolg is van een toerekenbare tekortkoming 
                in de nakoming van de overeenkomst of van een onrechtmatige daad.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-700 mb-3">6.2 Beperkingen</h3>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>Aansprakelijkheid is beperkt tot het gefactureerde bedrag over de laatste 12 maanden</li>
                <li>Geen aansprakelijkheid voor indirecte schade of gevolgschade</li>
                <li>Geen aansprakelijkheid voor schade door onjuiste informatieverstrekking klant</li>
                <li>Geen aansprakelijkheid voor schade door force majeure</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-700 mb-3">6.3 Verzekering</h3>
              <p className="text-gray-600 mb-4">
                Fiscavo heeft een beroepsaansprakelijkheidsverzekering afgesloten met een dekkingssom 
                van €1.000.000 per gebeurtenis.
              </p>
            </section>

            {/* Intellectueel eigendom */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Intellectueel eigendom</h2>
              <p className="text-gray-600 mb-4">
                Alle intellectuele eigendomsrechten op de software, documentatie en methodieken 
                berusten bij Fiscavo of haar licentiegevers.
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>Klant verkrijgt uitsluitend gebruiksrecht, geen eigendomsrecht</li>
                <li>Reverse engineering of kopiëren is niet toegestaan</li>
                <li>Klantgegevens blijven eigendom van de klant</li>
                <li>Fiscavo mag anonieme data gebruiken voor productverbetering</li>
              </ul>
            </section>

            {/* Opzegging */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Opzegging en beëindiging</h2>
              
              <h3 className="text-lg font-semibold text-gray-700 mb-3">8.1 Opzegging door klant</h3>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>Maandelijks opzegbaar met ingang van de eerstvolgende maand</li>
                <li>Opzegging schriftelijk of via platform</li>
                <li>Geen restitutie van vooruitbetaalde bedragen</li>
                <li>Gegevens blijven 30 dagen beschikbaar na opzegging</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-700 mb-3">8.2 Opzegging door Fiscavo</h3>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>Bij wanbetaling na 30 dagen</li>
                <li>Bij schending van deze voorwaarden</li>
                <li>Bij verdenkingen van illegale activiteiten</li>
                <li>Met opzegtermijn van 30 dagen zonder opgave van redenen</li>
              </ul>
            </section>

            {/* Klachten */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Klachtenregeling</h2>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Stap 1: Directe melding</h4>
                  <p className="text-blue-700 text-sm">
                    Klachten eerst melden via support@fiscavo.nl of 088-3472829. 
                    Wij streven naar oplossing binnen 5 werkdagen.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Stap 2: Escalatie</h4>
                  <p className="text-green-700 text-sm">
                    Bij onvrede kunt u de klacht doorsturen naar onze directie via 
                    klachten@fiscavo.com.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Stap 3: Externe bemiddeling</h4>
                  <p className="text-purple-700 text-sm">
                    Als laatste stap kunt u zich wenden tot de geschillencommissie 
                    van de beroepsorganisatie.
                  </p>
                </div>
              </div>
            </section>

            {/* Overmacht */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Overmacht</h2>
              <p className="text-gray-600 mb-4">
                Fiscavo is niet aansprakelijk voor tekortkomingen in de uitvoering van de overeenkomst 
                die het gevolg zijn van overmacht, waaronder:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>Natuurrampen, oorlog, terrorisme</li>
                <li>Overheidsmaatregelen, wet- en regelgeving</li>
                <li>Storingen in internet, telecommunicatie of elektriciteit</li>
                <li>Cyberaanvallen en beveiligingsincidenten</li>
                <li>Pandemieën en andere gezondheidscrises</li>
              </ul>
            </section>

            {/* Toepasselijk recht */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Toepasselijk recht en geschillen</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Toepasselijk recht:</strong> Op deze voorwaarden en alle overeenkomsten 
                    is uitsluitend Nederlands recht van toepassing.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Geschillen:</strong> Alle geschillen worden voorgelegd aan de 
                    bevoegde rechter in Amsterdam, tenzij de wet dwingend anders bepaalt.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Mediation:</strong> Partijen zullen eerst trachten geschillen op te lossen 
                    via mediation voordat zij zich tot de rechter wenden.
                  </p>
                </div>
              </div>
            </section>

            {/* Wijzigingen */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Wijzigingen</h2>
              <p className="text-gray-600 mb-4">
                Fiscavo behoudt zich het recht voor deze algemene voorwaarden te wijzigen. 
                Wijzigingen worden van kracht 30 dagen na aankondiging via e-mail of het platform.
              </p>
              <p className="text-gray-600">
                Indien u niet akkoord gaat met de wijzigingen, kunt u de overeenkomst opzeggen 
                tot de datum waarop de wijzigingen van kracht worden.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. Contactgegevens</h2>
              <p className="text-gray-600 mb-4">
                Voor vragen over deze voorwaarden kunt u contact met ons opnemen:
              </p>
              <div className="space-y-2 text-gray-600">
                <p><strong>Email:</strong> <a href="mailto:support@fiscavo.nl" className="text-blue-600 hover:underline">support@fiscavo.nl</a></p>
                <p><strong>Telefoon:</strong> <a href="tel:+31883472829" className="text-blue-600 hover:underline">088-3472829</a></p>
                <p><strong>KvK-nummer:</strong> 85234567</p>
                <p><strong>BTW-nummer:</strong> NL863456789B01</p>
                <p><strong>Adres:</strong> Fiscavo B.V., Amsterdam, Nederland</p>
              </div>
            </section>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}