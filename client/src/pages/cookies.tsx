import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Cookie, Settings, BarChart3, Target } from "lucide-react";
import { useLocation } from "wouter";

export default function Cookies() {
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
              <Cookie className="mr-3 h-8 w-8" />
              Cookiebeleid
            </CardTitle>
            <p className="text-blue-100">Laatst bijgewerkt: 26 december 2024</p>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            
            {/* Wat zijn cookies */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Wat zijn cookies?</h2>
              <p className="text-gray-600 mb-4">
                Cookies zijn kleine tekstbestanden die op uw apparaat (computer, smartphone, tablet) worden opgeslagen 
                wanneer u onze website bezoekt. Deze bestanden bevatten informatie die wordt gebruikt om uw ervaring 
                op onze website te verbeteren en om bepaalde functionaliteiten mogelijk te maken.
              </p>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Waarom gebruiken wij cookies?</h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Om onze website goed te laten functioneren</li>
                  <li>• Om uw voorkeuren en instellingen te onthouden</li>
                  <li>• Om de beveiliging van uw gegevens te waarborgen</li>
                  <li>• Om de prestaties van onze website te analyseren</li>
                  <li>• Om u relevante informatie te kunnen tonen</li>
                </ul>
              </div>
            </section>

            {/* Soorten cookies */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Welke soorten cookies gebruiken wij?</h2>
              
              <div className="space-y-6">
                {/* Noodzakelijke cookies */}
                <div className="border border-green-200 rounded-lg p-6 bg-green-50">
                  <div className="flex items-start space-x-4">
                    <Settings className="h-6 w-6 text-green-600 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-green-800 mb-3">Noodzakelijke cookies</h3>
                      <p className="text-green-700 text-sm mb-4">
                        Deze cookies zijn essentieel voor het functioneren van onze website. 
                        Zonder deze cookies kunnen bepaalde delen van de website niet werken.
                      </p>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-green-200">
                              <th className="text-left py-2 text-green-800">Cookie naam</th>
                              <th className="text-left py-2 text-green-800">Doel</th>
                              <th className="text-left py-2 text-green-800">Looptijd</th>
                            </tr>
                          </thead>
                          <tbody className="text-green-700">
                            <tr className="border-b border-green-100">
                              <td className="py-2 font-mono">session_id</td>
                              <td className="py-2">Gebruikerssessie beheren</td>
                              <td className="py-2">Browser sessie</td>
                            </tr>
                            <tr className="border-b border-green-100">
                              <td className="py-2 font-mono">csrf_token</td>
                              <td className="py-2">Beveiliging tegen CSRF-aanvallen</td>
                              <td className="py-2">Browser sessie</td>
                            </tr>
                            <tr className="border-b border-green-100">
                              <td className="py-2 font-mono">cookie_consent</td>
                              <td className="py-2">Uw cookie voorkeuren</td>
                              <td className="py-2">1 jaar</td>
                            </tr>
                            <tr>
                              <td className="py-2 font-mono">theme_preference</td>
                              <td className="py-2">Dark/light mode instelling</td>
                              <td className="py-2">1 jaar</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Functionele cookies */}
                <div className="border border-blue-200 rounded-lg p-6 bg-blue-50">
                  <div className="flex items-start space-x-4">
                    <Settings className="h-6 w-6 text-blue-600 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-blue-800 mb-3">Functionele cookies</h3>
                      <p className="text-blue-700 text-sm mb-4">
                        Deze cookies verbeteren de functionaliteit van onze website door uw voorkeuren 
                        en instellingen te onthouden.
                      </p>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-blue-200">
                              <th className="text-left py-2 text-blue-800">Cookie naam</th>
                              <th className="text-left py-2 text-blue-800">Doel</th>
                              <th className="text-left py-2 text-blue-800">Looptijd</th>
                            </tr>
                          </thead>
                          <tbody className="text-blue-700">
                            <tr className="border-b border-blue-100">
                              <td className="py-2 font-mono">user_preferences</td>
                              <td className="py-2">Dashboard instellingen</td>
                              <td className="py-2">6 maanden</td>
                            </tr>
                            <tr className="border-b border-blue-100">
                              <td className="py-2 font-mono">language_setting</td>
                              <td className="py-2">Taalvoorkeur</td>
                              <td className="py-2">1 jaar</td>
                            </tr>
                            <tr>
                              <td className="py-2 font-mono">notification_prefs</td>
                              <td className="py-2">Notificatie instellingen</td>
                              <td className="py-2">1 jaar</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analytische cookies */}
                <div className="border border-purple-200 rounded-lg p-6 bg-purple-50">
                  <div className="flex items-start space-x-4">
                    <BarChart3 className="h-6 w-6 text-purple-600 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-purple-800 mb-3">Analytische cookies</h3>
                      <p className="text-purple-700 text-sm mb-4">
                        Deze cookies helpen ons begrijpen hoe bezoekers onze website gebruiken, zodat we 
                        de prestaties en gebruikerservaring kunnen verbeteren.
                      </p>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-purple-200">
                              <th className="text-left py-2 text-purple-800">Cookie naam</th>
                              <th className="text-left py-2 text-purple-800">Doel</th>
                              <th className="text-left py-2 text-purple-800">Looptijd</th>
                            </tr>
                          </thead>
                          <tbody className="text-purple-700">
                            <tr className="border-b border-purple-100">
                              <td className="py-2 font-mono">_analytics_session</td>
                              <td className="py-2">Sessie tracking</td>
                              <td className="py-2">30 minuten</td>
                            </tr>
                            <tr className="border-b border-purple-100">
                              <td className="py-2 font-mono">_user_journey</td>
                              <td className="py-2">Gebruikersgedrag analyse</td>
                              <td className="py-2">2 jaar</td>
                            </tr>
                            <tr>
                              <td className="py-2 font-mono">_performance_metrics</td>
                              <td className="py-2">Website prestatie meting</td>
                              <td className="py-2">1 jaar</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Marketing cookies */}
                <div className="border border-orange-200 rounded-lg p-6 bg-orange-50">
                  <div className="flex items-start space-x-4">
                    <Target className="h-6 w-6 text-orange-600 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-orange-800 mb-3">Marketing cookies</h3>
                      <p className="text-orange-700 text-sm mb-4">
                        Deze cookies worden gebruikt om relevante advertenties en content te tonen 
                        en de effectiviteit van onze marketingcampagnes te meten.
                      </p>
                      
                      <div className="p-3 bg-orange-100 rounded border border-orange-200 mb-4">
                        <p className="text-orange-800 text-sm font-medium">
                          ⚠️ Deze cookies worden alleen geplaatst met uw expliciete toestemming
                        </p>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-orange-200">
                              <th className="text-left py-2 text-orange-800">Cookie naam</th>
                              <th className="text-left py-2 text-orange-800">Doel</th>
                              <th className="text-left py-2 text-orange-800">Looptijd</th>
                            </tr>
                          </thead>
                          <tbody className="text-orange-700">
                            <tr className="border-b border-orange-100">
                              <td className="py-2 font-mono">_marketing_id</td>
                              <td className="py-2">Advertentie personalisatie</td>
                              <td className="py-2">1 jaar</td>
                            </tr>
                            <tr className="border-b border-orange-100">
                              <td className="py-2 font-mono">_campaign_source</td>
                              <td className="py-2">Campagne tracking</td>
                              <td className="py-2">30 dagen</td>
                            </tr>
                            <tr>
                              <td className="py-2 font-mono">_conversion_tracking</td>
                              <td className="py-2">Conversie meting</td>
                              <td className="py-2">90 dagen</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Externe cookies */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Cookies van derden</h2>
              <p className="text-gray-600 mb-4">
                Onze website kan ook cookies van externe partijen bevatten. Deze cookies worden beheerd 
                door de betreffende externe partijen en vallen onder hun privacybeleid.
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Replit (Hosting platform)</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    Voor hosting en applicatie-infrastructuur
                  </p>
                  <p className="text-gray-500 text-xs">
                    Privacybeleid: <a href="https://replit.com/privacy" className="text-blue-600 hover:underline">https://replit.com/privacy</a>
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Antropic Claude (AI Services)</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    Voor AI-gestuurde belastingadvies en categorisering
                  </p>
                  <p className="text-gray-500 text-xs">
                    Privacybeleid: <a href="https://www.anthropic.com/privacy" className="text-blue-600 hover:underline">https://www.anthropic.com/privacy</a>
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">SendGrid (E-mail services)</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    Voor het verzenden van e-mailnotificaties en nieuwsbrieven
                  </p>
                  <p className="text-gray-500 text-xs">
                    Privacybeleid: <a href="https://sendgrid.com/policies/privacy" className="text-blue-600 hover:underline">https://sendgrid.com/policies/privacy</a>
                  </p>
                </div>
              </div>
            </section>

            {/* Cookie toestemming */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Uw cookie voorkeuren</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Toestemming geven</h4>
                  <p className="text-green-700 text-sm">
                    Bij uw eerste bezoek aan onze website verschijnt een cookiebanner. U kunt kiezen welke 
                    categorieën cookies u wilt accepteren. Noodzakelijke cookies kunnen niet worden uitgeschakeld.
                  </p>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Toestemming wijzigen</h4>
                  <p className="text-blue-700 text-sm">
                    U kunt uw cookie voorkeuren op elk moment wijzigen via de cookie-instellingen in de footer 
                    van onze website of door contact met ons op te nemen.
                  </p>
                </div>

                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Browser instellingen</h4>
                  <p className="text-purple-700 text-sm">
                    U kunt ook uw browserinstellingen aanpassen om cookies te blokkeren of om een melding 
                    te krijgen voordat cookies worden geplaatst. Houd er rekening mee dat dit de functionaliteit 
                    van onze website kan beïnvloeden.
                  </p>
                </div>
              </div>
            </section>

            {/* Browser instellingen */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Cookies beheren in uw browser</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Google Chrome</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    Instellingen → Privacy en beveiliging → Cookies en andere sitegegevens
                  </p>
                  <a href="https://support.google.com/chrome/answer/95647" className="text-blue-600 text-xs hover:underline">
                    Meer informatie
                  </a>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Mozilla Firefox</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    Instellingen → Privacy en beveiliging → Cookies en sitegegevens
                  </p>
                  <a href="https://support.mozilla.org/nl/kb/cookies-verwijderen-websites-opgeslagen-gegevens" className="text-blue-600 text-xs hover:underline">
                    Meer informatie
                  </a>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Safari</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    Voorkeuren → Privacy → Cookies en websitegegevens beheren
                  </p>
                  <a href="https://support.apple.com/nl-nl/guide/safari/sfri11471/mac" className="text-blue-600 text-xs hover:underline">
                    Meer informatie
                  </a>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Microsoft Edge</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    Instellingen → Cookies en machtigingen → Cookies en sitegegevens beheren
                  </p>
                  <a href="https://support.microsoft.com/nl-nl/microsoft-edge/cookies-verwijderen-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-blue-600 text-xs hover:underline">
                    Meer informatie
                  </a>
                </div>
              </div>
            </section>

            {/* Beveiliging */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Cookie beveiliging</h2>
              <p className="text-gray-600 mb-4">
                Wij nemen de beveiliging van cookies serieus en hebben verschillende maatregelen getroffen:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Technische maatregelen</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Secure cookies (alleen via HTTPS)</li>
                    <li>HttpOnly cookies (niet toegankelijk via JavaScript)</li>
                    <li>SameSite attributen voor CSRF-bescherming</li>
                    <li>Regelmatige beveililigingsupdates</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Privacy maatregelen</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>Minimale gegevensverzameling</li>
                    <li>Pseudonimisering van gebruikersdata</li>
                    <li>Automatische verwijdering na verloop van tijd</li>
                    <li>Encryptie van gevoelige cookie-data</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Wijzigingen */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Wijzigingen in dit cookiebeleid</h2>
              <p className="text-gray-600 mb-4">
                Wij kunnen dit cookiebeleid van tijd tot tijd bijwerken om wijzigingen in onze praktijken 
                of wettelijke vereisten te reflecteren. Belangrijke wijzigingen zullen we communiceren 
                via onze website of per e-mail.
              </p>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  <strong>Tip:</strong> Bezoek deze pagina regelmatig om op de hoogte te blijven van 
                  eventuele wijzigingen in ons cookiebeleid.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Contact</h2>
              <p className="text-gray-600 mb-4">
                Voor vragen over ons cookie beleid kunt u contact met ons opnemen:
              </p>
              <div className="space-y-2 text-gray-600">
                <p><strong>Email:</strong> <a href="mailto:privacy@fiscavo.com" className="text-blue-600 hover:underline">privacy@fiscavo.com</a></p>
                <p><strong>Telefoon:</strong> <a href="tel:+31883472829" className="text-blue-600 hover:underline">088-3472829</a></p>
                <p><strong>Adres:</strong> Fiscavo B.V., Amsterdam, Nederland</p>
              </div>
            </section>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}