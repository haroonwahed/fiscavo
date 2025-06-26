import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Eye, Edit, Trash2, Download, UserX, AlertCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function GDPR() {
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
              AVG/GDPR Rechten
            </CardTitle>
            <p className="text-blue-100">Uw rechten onder de Algemene Verordening Gegevensbescherming</p>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            
            {/* Introductie */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Uw privacyrechten</h2>
              <p className="text-gray-600 mb-4">
                Als gebruiker van Fiscavo heeft u verschillende rechten onder de Algemene Verordening Gegevensbescherming (AVG/GDPR). 
                Deze pagina legt uit welke rechten u heeft en hoe u deze kunt uitoefenen.
              </p>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Belangrijk:</strong> Al uw verzoeken worden binnen 30 dagen behandeld en zijn kosteloos, 
                  tenzij het verzoek kennelijk ongegrond of buitensporig is.
                </p>
              </div>
            </section>

            {/* Recht op inzage */}
            <section>
              <div className="flex items-start space-x-4 p-6 bg-green-50 border border-green-200 rounded-lg">
                <Eye className="h-8 w-8 text-green-600 mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">1. Recht op inzage (Art. 15 AVG)</h3>
                  <p className="text-green-700 mb-4">
                    U heeft het recht om te weten welke persoonlijke gegevens wij van u verwerken en hoe wij dit doen.
                  </p>
                  
                  <h4 className="font-semibold text-green-800 mb-2">Wat krijgt u bij een inzageverzoek?</h4>
                  <ul className="list-disc list-inside text-green-700 text-sm space-y-1 mb-4">
                    <li>Overzicht van alle persoonlijke gegevens die wij van u hebben</li>
                    <li>Verwerkingsdoeleinden en rechtsgronden</li>
                    <li>Categorieën van ontvangers van uw gegevens</li>
                    <li>Bewaartermijnen of criteria daarvoor</li>
                    <li>Informatie over uw andere AVG-rechten</li>
                    <li>Bron van de gegevens (indien niet bij u verkregen)</li>
                  </ul>

                  <div className="p-3 bg-green-100 rounded border border-green-300">
                    <p className="text-green-800 text-sm">
                      <strong>Hoe aan te vragen:</strong> Stuur een e-mail naar privacy@fiscavo.com met uw volledige naam, 
                      e-mailadres en een kopie van een geldig identiteitsbewijs.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Recht op rectificatie */}
            <section>
              <div className="flex items-start space-x-4 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <Edit className="h-8 w-8 text-blue-600 mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">2. Recht op rectificatie (Art. 16 AVG)</h3>
                  <p className="text-blue-700 mb-4">
                    U heeft het recht om onjuiste persoonlijke gegevens te laten corrigeren of incomplete gegevens aan te laten vullen.
                  </p>
                  
                  <h4 className="font-semibold text-blue-800 mb-2">Voorbeelden van rectificatie:</h4>
                  <ul className="list-disc list-inside text-blue-700 text-sm space-y-1 mb-4">
                    <li>Correctie van verkeerd gespelde naam of adres</li>
                    <li>Bijwerken van gewijzigde contactgegevens</li>
                    <li>Toevoegen van ontbrekende bedrijfsinformatie</li>
                    <li>Corrigeren van onjuiste financiële gegevens</li>
                  </ul>

                  <div className="p-3 bg-blue-100 rounded border border-blue-300">
                    <p className="text-blue-800 text-sm">
                      <strong>Automatische correctie:</strong> Veel gegevens kunt u zelf bijwerken via uw account instellingen. 
                      Voor andere gegevens kunt u contact opnemen via info@fiscavo.com.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Recht op wissing */}
            <section>
              <div className="flex items-start space-x-4 p-6 bg-red-50 border border-red-200 rounded-lg">
                <Trash2 className="h-8 w-8 text-red-600 mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-red-800 mb-3">3. Recht op wissing (Art. 17 AVG)</h3>
                  <p className="text-red-700 mb-4">
                    U heeft het recht om uw persoonlijke gegevens te laten wissen in bepaalde omstandigheden.
                  </p>
                  
                  <h4 className="font-semibold text-red-800 mb-2">Wanneer kunt u wissing verzoeken?</h4>
                  <ul className="list-disc list-inside text-red-700 text-sm space-y-1 mb-4">
                    <li>De gegevens zijn niet langer nodig voor de oorspronkelijke doeleinden</li>
                    <li>U trekt uw toestemming in en er is geen andere rechtsgrond</li>
                    <li>Uw gegevens zijn onrechtmatig verwerkt</li>
                    <li>Wissing is nodig voor naleving van een wettelijke verplichting</li>
                  </ul>

                  <div className="p-3 bg-red-100 rounded border border-red-300">
                    <p className="text-red-800 text-sm">
                      <strong>Belangrijke beperking:</strong> Wij kunnen uw verzoek weigeren als we wettelijk verplicht zijn 
                      gegevens te bewaren (bijv. belastinggegevens moeten 7 jaar bewaard blijven).
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Recht op beperking */}
            <section>
              <div className="flex items-start space-x-4 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                <UserX className="h-8 w-8 text-yellow-600 mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-yellow-800 mb-3">4. Recht op beperking van verwerking (Art. 18 AVG)</h3>
                  <p className="text-yellow-700 mb-4">
                    U kunt verzoeken om de verwerking van uw gegevens te beperken in plaats van te wissen.
                  </p>
                  
                  <h4 className="font-semibold text-yellow-800 mb-2">Wanneer kunt u beperking verzoeken?</h4>
                  <ul className="list-disc list-inside text-yellow-700 text-sm space-y-1 mb-4">
                    <li>U betwist de juistheid van de gegevens (tijdelijk tot verificatie)</li>
                    <li>Verwerking is onrechtmatig maar u wilt geen wissing</li>
                    <li>Wij hebben de gegevens niet meer nodig, maar u wel voor rechtsvorderingen</li>
                    <li>U heeft bezwaar gemaakt en wij overwegen uw verzoek</li>
                  </ul>

                  <div className="p-3 bg-yellow-100 rounded border border-yellow-300">
                    <p className="text-yellow-800 text-sm">
                      <strong>Gevolg van beperking:</strong> Wij mogen de gegevens alleen opslaan en niet meer gebruiken, 
                      behalve met uw toestemming of voor rechtsvorderingen.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Recht op overdraagbaarheid */}
            <section>
              <div className="flex items-start space-x-4 p-6 bg-purple-50 border border-purple-200 rounded-lg">
                <Download className="h-8 w-8 text-purple-600 mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-purple-800 mb-3">5. Recht op gegevensoverdraagbaarheid (Art. 20 AVG)</h3>
                  <p className="text-purple-700 mb-4">
                    U heeft het recht om uw gegevens in een leesbaar formaat te ontvangen en over te dragen naar een andere dienstverlener.
                  </p>
                  
                  <h4 className="font-semibold text-purple-800 mb-2">Welke gegevens kunt u overdragen?</h4>
                  <ul className="list-disc list-inside text-purple-700 text-sm space-y-1 mb-4">
                    <li>Gegevens die u ons heeft verstrekt</li>
                    <li>Gegevens die automatisch zijn gegenereerd door uw gebruik</li>
                    <li>Alleen gegevens verwerkt op basis van toestemming of contract</li>
                  </ul>

                  <h4 className="font-semibold text-purple-800 mb-2">Beschikbare formaten:</h4>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-2 bg-purple-100 rounded text-center">
                      <span className="text-purple-800 text-sm font-mono">JSON</span>
                    </div>
                    <div className="p-2 bg-purple-100 rounded text-center">
                      <span className="text-purple-800 text-sm font-mono">CSV</span>
                    </div>
                    <div className="p-2 bg-purple-100 rounded text-center">
                      <span className="text-purple-800 text-sm font-mono">XML</span>
                    </div>
                    <div className="p-2 bg-purple-100 rounded text-center">
                      <span className="text-purple-800 text-sm font-mono">PDF</span>
                    </div>
                  </div>

                  <div className="p-3 bg-purple-100 rounded border border-purple-300">
                    <p className="text-purple-800 text-sm">
                      <strong>Direct overdragen:</strong> Op verzoek kunnen wij uw gegevens direct overdragen 
                      naar een nieuwe dienstverlener, indien technisch mogelijk.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Recht van bezwaar */}
            <section>
              <div className="flex items-start space-x-4 p-6 bg-orange-50 border border-orange-200 rounded-lg">
                <AlertCircle className="h-8 w-8 text-orange-600 mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-orange-800 mb-3">6. Recht van bezwaar (Art. 21 AVG)</h3>
                  <p className="text-orange-700 mb-4">
                    U heeft het recht om bezwaar te maken tegen bepaalde verwerkingen van uw persoonlijke gegevens.
                  </p>
                  
                  <h4 className="font-semibold text-orange-800 mb-2">Tegen welke verwerking kunt u bezwaar maken?</h4>
                  <ul className="list-disc list-inside text-orange-700 text-sm space-y-1 mb-4">
                    <li>Verwerking op basis van gerechtvaardigd belang</li>
                    <li>Verwerking voor direct marketing doeleinden</li>
                    <li>Verwerking voor wetenschappelijk of historisch onderzoek</li>
                    <li>Geautomatiseerde besluitvorming en profiling</li>
                  </ul>

                  <div className="p-3 bg-orange-100 rounded border border-orange-300">
                    <p className="text-orange-800 text-sm">
                      <strong>Gevolg van bezwaar:</strong> Wij stoppen met de verwerking, tenzij wij dwingende 
                      gerechtvaardigde gronden kunnen aantonen die zwaarder wegen dan uw belangen.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Klachten indienen */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Klacht indienen</h2>
              <p className="text-gray-600 mb-4">
                Als u niet tevreden bent over hoe wij omgaan met uw persoonlijke gegevens of uw verzoeken, 
                kunt u een klacht indienen.
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Stap 1: Klacht bij Fiscavo</h4>
                  <p className="text-blue-700 text-sm mb-2">
                    Neem eerst contact op met onze Data Protection Officer (DPO):
                  </p>
                  <div className="space-y-1 text-blue-800 text-sm">
                    <p><strong>Email:</strong> <a href="mailto:dpo@fiscavo.com" className="text-blue-600 hover:underline">dpo@fiscavo.com</a></p>
                    <p><strong>Telefoon:</strong> <a href="tel:+31883472829" className="text-blue-600 hover:underline">088-3472829 (optie 3)</a></p>
                    <p><strong>Post:</strong> Fiscavo B.V., t.a.v. DPO, Amsterdam, Nederland</p>
                  </div>
                </div>

                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">Stap 2: Klacht bij de Autoriteit Persoonsgegevens</h4>
                  <p className="text-red-700 text-sm mb-2">
                    Als wij uw klacht niet naar tevredenheid oplossen, kunt u een klacht indienen bij de AP:
                  </p>
                  <div className="space-y-1 text-red-700 text-sm">
                    <p><strong>Website:</strong> <a href="https://autoriteitpersoonsgegevens.nl" className="text-red-600 hover:underline">autoriteitpersoonsgegevens.nl</a></p>
                    <p><strong>Telefoon:</strong> 088-1805 250</p>
                    <p><strong>Post:</strong> Autoriteit Persoonsgegevens, Postbus 93374, 2509 AJ Den Haag</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Hoe verzoeken indienen */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Hoe dient u een verzoek in?</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Vereiste informatie</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Uw volledige naam en e-mailadres gekoppeld aan uw account</li>
                    <li>Kopie van geldig identiteitsbewijs (zicht gedeelte)</li>
                    <li>Duidelijke omschrijving van uw verzoek</li>
                    <li>Specifieke gegevens waar het verzoek betrekking op heeft (indien relevant)</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Contactmogelijkheden</h4>
                  <div className="space-y-2 text-gray-600 text-sm">
                    <p><strong>Email (voorkeur):</strong> privacy@fiscavo.com</p>
                    <p><strong>Telefoon:</strong> 088-3472829 (ma-vr 9:00-17:00)</p>
                    <p><strong>Post:</strong> Fiscavo B.V., t.a.v. Privacy Officer, Amsterdam, Nederland</p>
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Verwerkingstijd</h4>
                  <p className="text-green-700 text-sm">
                    Wij behandelen alle verzoeken binnen <strong>30 dagen</strong> na ontvangst. 
                    In complexe gevallen kunnen wij deze termijn met maximaal 2 maanden verlengen, 
                    waarover wij u dan binnen 1 maand na ontvangst van uw verzoek informeren.
                  </p>
                </div>
              </div>
            </section>

            {/* Belangrijke opmerkingen */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Belangrijke opmerkingen</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">Wettelijke beperkingen</h4>
                  <p className="text-yellow-700 text-sm">
                    Sommige rechten kunnen beperkt zijn door Nederlandse wetgeving. Bijvoorbeeld, 
                    financiële administratie moet 7 jaar bewaard blijven conform de Wet bewaring bescheiden.
                  </p>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Identiteitsverificatie</h4>
                  <p className="text-blue-700 text-sm">
                    Om misbruik te voorkomen, vragen wij altijd om identiteitsverificatie voordat 
                    wij uw verzoek behandelen. Dit is een wettelijke verplichting.
                  </p>
                </div>

                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Kosteloze uitvoering</h4>
                  <p className="text-purple-700 text-sm">
                    Alle verzoeken zijn kosteloos, tenzij het verzoek kennelijk ongegrond of 
                    buitensporig is. In dat geval kunnen wij een redelijke vergoeding vragen.
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