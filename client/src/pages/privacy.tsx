import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function Privacy() {
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
            <CardTitle className="text-3xl font-bold">Privacybeleid</CardTitle>
            <p className="text-blue-100">Laatst bijgewerkt: 26 december 2024</p>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            
            {/* Inleiding */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Inleiding</h2>
              <p className="text-gray-600 mb-4">
                Fiscavo B.V. ("wij", "ons", "onze") respecteert uw privacy en is toegewijd aan het beschermen van uw persoonlijke gegevens. 
                Dit privacybeleid informeert u over hoe wij uw persoonlijke gegevens verzamelen, gebruiken, opslaan en beschermen wanneer u 
                onze belastingbeheerdiensten gebruikt.
              </p>
              <p className="text-gray-600">
                Als Nederlandse onderneming houden wij ons volledig aan de Algemene Verordening Gegevensbescherming (AVG/GDPR) en 
                alle relevante Nederlandse privacywetgeving.
              </p>
            </section>

            {/* Gegevens die wij verzamelen */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Welke gegevens verzamelen wij?</h2>
              
              <h3 className="text-lg font-semibold text-gray-700 mb-3">2.1 Persoonlijke identificatiegegevens</h3>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>Naam en contactgegevens (e-mailadres, telefoonnummer)</li>
                <li>BSN (alleen indien noodzakelijk voor belastingaangiftes)</li>
                <li>Adresgegevens</li>
                <li>KvK-nummer (voor bedrijven)</li>
                <li>BTW-nummer (indien van toepassing)</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-700 mb-3">2.2 Financiële gegevens</h3>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>Banktransacties en rekeninginformatie</li>
                <li>Inkomsten- en uitgavengegevens</li>
                <li>BTW-gerelateerde informatie</li>
                <li>Belastingaangiftes en bijbehorende documenten</li>
                <li>Bonnetjes en facturen</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-700 mb-3">2.3 Technische gegevens</h3>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>IP-adres en locatiegegevens</li>
                <li>Browser- en apparaatinformatie</li>
                <li>Gebruiksgegevens van onze diensten</li>
                <li>Cookies en vergelijkbare technologieën</li>
              </ul>
            </section>

            {/* Waarom verzamelen wij gegevens */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Waarom verzamelen en gebruiken wij uw gegevens?</h2>
              
              <h3 className="text-lg font-semibold text-gray-700 mb-3">3.1 Dienstverlening</h3>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>Het opstellen en indienen van belastingaangiftes</li>
                <li>BTW-berekeningen en aangiftes</li>
                <li>Financiële administratie en boekhouding</li>
                <li>Belastingadvies en -planning</li>
                <li>Automatische categorisering van uitgaven</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-700 mb-3">3.2 Wettelijke verplichtingen</h3>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>Naleving van belastingwetgeving</li>
                <li>Anti-witwasregulering (Wwft)</li>
                <li>Archiveringsvereisten</li>
                <li>Rapportage aan toezichthouders</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-700 mb-3">3.3 Verbetering van diensten</h3>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>Analyse van gebruikspatronen</li>
                <li>Ontwikkeling van nieuwe functionaliteiten</li>
                <li>Kwaliteitsverbetering van AI-algoritmes</li>
                <li>Fraudepreventie en beveiliging</li>
              </ul>
            </section>

            {/* Rechtsgronden */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Rechtsgronden voor verwerking</h2>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800">Uitvoering van overeenkomst</h4>
                  <p className="text-blue-700 text-sm">Voor het verlenen van onze belastingdiensten</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800">Wettelijke verplichting</h4>
                  <p className="text-green-700 text-sm">Voor naleving van belasting- en financiële wetgeving</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800">Gerechtvaardigd belang</h4>
                  <p className="text-purple-700 text-sm">Voor dienstverlening, beveiliging en verbetering</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-800">Toestemming</h4>
                  <p className="text-orange-700 text-sm">Voor marketing en optionele diensten</p>
                </div>
              </div>
            </section>

            {/* Gegevensdeling */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Met wie delen wij uw gegevens?</h2>
              
              <h3 className="text-lg font-semibold text-gray-700 mb-3">5.1 Overheidsinstanties</h3>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>Belastingdienst (voor aangiftes en controles)</li>
                <li>Kamer van Koophandel</li>
                <li>Toezichthouders bij wettelijke verplichting</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-700 mb-3">5.2 Servicepartners</h3>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>IT-serviceaanbieders (cloudopslag, beveiliging)</li>
                <li>Bankintegratiepartners</li>
                <li>AI-technologieaanbieders (voor categorisering)</li>
                <li>Communicatieplatforms (e-mail, SMS)</li>
              </ul>

              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-semibold text-red-800">Geen commerciële verkoop</h4>
                <p className="text-red-700 text-sm">
                  Wij verkopen uw persoonlijke gegevens nooit aan derden voor commerciële doeleinden.
                </p>
              </div>
            </section>

            {/* Internationale overdrachten */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Internationale gegevensoverdrachten</h2>
              <p className="text-gray-600 mb-4">
                Uw gegevens worden primair verwerkt binnen de Europese Unie. In beperkte gevallen kunnen gegevens 
                worden overgedragen naar landen buiten de EU/EER, maar alleen:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>Naar landen met een adequaatheidsbesluut van de Europese Commissie</li>
                <li>Met passende waarborgen (zoals standaardcontractbepalingen)</li>
                <li>Met uw expliciete toestemming</li>
                <li>Wanneer noodzakelijk voor de uitvoering van onze diensten</li>
              </ul>
            </section>

            {/* Bewaartermijnen */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Hoe lang bewaren wij uw gegevens?</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Gegevenstype</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Bewaartermijn</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Reden</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Belastingaangiftes</td>
                      <td className="border border-gray-300 px-4 py-2">7 jaar</td>
                      <td className="border border-gray-300 px-4 py-2">Wettelijke verplichting</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Financiële administratie</td>
                      <td className="border border-gray-300 px-4 py-2">7 jaar</td>
                      <td className="border border-gray-300 px-4 py-2">Wettelijke verplichting</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Accountgegevens</td>
                      <td className="border border-gray-300 px-4 py-2">Tot opzegging + 1 jaar</td>
                      <td className="border border-gray-300 px-4 py-2">Dienstverlening</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Marketinggegevens</td>
                      <td className="border border-gray-300 px-4 py-2">Tot intrekking toestemming</td>
                      <td className="border border-gray-300 px-4 py-2">Toestemming</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Uw rechten */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Uw privacy-rechten</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Recht op inzage</h4>
                  <p className="text-blue-700 text-sm">Weten welke gegevens wij van u hebben</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Recht op rectificatie</h4>
                  <p className="text-green-700 text-sm">Onjuiste gegevens laten corrigeren</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Recht op wissing</h4>
                  <p className="text-purple-700 text-sm">Verwijdering van uw gegevens</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">Recht op beperking</h4>
                  <p className="text-orange-700 text-sm">Beperking van verwerking</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">Recht op overdraagbaarheid</h4>
                  <p className="text-red-700 text-sm">Uw gegevens in een leesbaar formaat</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">Recht van bezwaar</h4>
                  <p className="text-yellow-700 text-sm">Bezwaar tegen verwerking</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 text-sm">
                  <strong>Let op:</strong> Sommige rechten kunnen beperkt zijn door wettelijke verplichtingen. 
                  Bijvoorbeeld, belastinggegevens moeten 7 jaar bewaard blijven conform de wet.
                </p>
              </div>
            </section>

            {/* Beveiliging */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Beveiliging van uw gegevens</h2>
              <p className="text-gray-600 mb-4">
                Wij nemen de beveiliging van uw gegevens zeer serieus en hebben uitgebreide technische en 
                organisatorische maatregelen getroffen:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Technische maatregelen</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>SSL/TLS-versleuteling</li>
                    <li>End-to-end encryptie van gevoelige data</li>
                    <li>Regelmatige beveiligingsupdates</li>
                    <li>Toegangscontroles en authenticatie</li>
                    <li>Firewalls en intrusion detection</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Organisatorische maatregelen</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Privacy training voor medewerkers</li>
                    <li>Minimalisatie van gegevenstoegang</li>
                    <li>Reguliere privacy impact assessments</li>
                    <li>Incidentresponsplannen</li>
                    <li>Externe beveiligingsaudits</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Cookies en tracking</h2>
              <p className="text-gray-600 mb-4">
                Onze website gebruikt cookies voor functionaliteit, analyse en gebruikerservaring. 
                Voor gedetailleerde informatie over onze cookiegebruik, zie ons <Button variant="link" className="p-0 h-auto text-blue-600" onClick={() => setLocation("/cookies")}>Cookiebeleid</Button>.
              </p>
            </section>

            {/* Wijzigingen */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Wijzigingen in dit beleid</h2>
              <p className="text-gray-600 mb-4">
                Wij kunnen dit privacybeleid van tijd tot tijd bijwerken om wijzigingen in onze praktijken 
                of wettelijke vereisten te reflecteren. Wij zullen u op de hoogte stellen van belangrijke 
                wijzigingen via e-mail of een prominente melding op onze website.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Contact en klachten</h2>
              <p className="text-gray-600 mb-4">
                Voor vragen over dit privacybeleid of om uw rechten uit te oefenen, kunt u contact met ons opnemen:
              </p>
              <div className="space-y-2 text-gray-600">
                <p><strong>Email:</strong> <a href="mailto:privacy@fiscavo.com" className="text-blue-600 hover:underline">privacy@fiscavo.com</a></p>
                <p><strong>Telefoon:</strong> <a href="tel:+31883472829" className="text-blue-600 hover:underline">088-3472829</a></p>
                <p><strong>Adres:</strong> Fiscavo B.V., Amsterdam, Nederland</p>
                <p><strong>KvK-nummer:</strong> 85234567</p>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Klacht indienen bij de AP</h4>
                <p className="text-blue-700 text-sm">
                  Als u niet tevreden bent met hoe wij met uw privacy-klacht omgaan, kunt u een klacht indienen 
                  bij de Autoriteit Persoonsgegevens (AP): <a href="https://autoriteitpersoonsgegevens.nl" className="text-blue-600 hover:underline">autoriteitpersoonsgegevens.nl</a>
                </p>
              </div>
            </section>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}