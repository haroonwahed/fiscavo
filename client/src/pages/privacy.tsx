import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Database, Users, Eye, ArrowLeft } from "lucide-react";

export default function Privacy() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacybeleid</h1>
          <p className="text-lg text-gray-600">
            Laatst bijgewerkt: 26 december 2024
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Overzicht
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Taxenzo B.V. respecteert uw privacy en is toegewijd aan het beschermen van uw persoonlijke gegevens. 
                Dit privacybeleid legt uit hoe wij uw informatie verzamelen, gebruiken en beschermen wanneer u onze 
                belastingbeheersoftware gebruikt.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-green-600" />
                Welke gegevens verzamelen wij?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Persoonlijke gegevens:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Naam en contactgegevens</li>
                    <li>KvK-nummer en BTW-nummer</li>
                    <li>Bankgegevens (alleen voor BTW-berekeningen)</li>
                    <li>Transactiegegevens voor belastingdoeleinden</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Technische gegevens:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>IP-adres en locatiegegevens</li>
                    <li>Browser- en apparaatinformatie</li>
                    <li>Gebruik van de applicatie voor verbetering</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Hoe gebruiken wij uw gegevens?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Het leveren van belastingbeheerdiensten</li>
                <li>Het berekenen van BTW-aangiftes en belastingen</li>
                <li>Het verbeteren van onze software en dienstverlening</li>
                <li>Het naleven van wettelijke verplichtingen</li>
                <li>Het versturen van belangrijke updates over uw account</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-red-600" />
                Beveiliging van uw gegevens
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Wij implementeren industry-standaard beveiligingsmaatregelen om uw gegevens te beschermen:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>256-bit SSL-encryptie voor alle datatransmissie</li>
                  <li>Veilige opslag in Nederlandse datacenters</li>
                  <li>Regelmatige beveiligingsaudits</li>
                  <li>Beperkte toegang tot gegevens op need-to-know basis</li>
                  <li>Two-factor authenticatie voor accounts</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-orange-600" />
                Uw rechten onder de AVG
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Onder de Algemene Verordening Gegevensbescherming (AVG) heeft u de volgende rechten:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li><strong>Recht op inzage:</strong> U kunt een kopie van uw persoonlijke gegevens opvragen</li>
                  <li><strong>Recht op rectificatie:</strong> U kunt onjuiste gegevens laten corrigeren</li>
                  <li><strong>Recht op vergetelheid:</strong> U kunt verzoeken om verwijdering van uw gegevens</li>
                  <li><strong>Recht op beperking:</strong> U kunt de verwerking van uw gegevens beperken</li>
                  <li><strong>Recht op overdraagbaarheid:</strong> U kunt uw gegevens in een gestructureerd formaat ontvangen</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Voor vragen over dit privacybeleid of om uw rechten uit te oefenen, kunt u contact met ons opnemen:
              </p>
              <div className="space-y-2 text-gray-600">
                <p><strong>Email:</strong> <a href="mailto:privacy@taxenzo.com" className="text-blue-600 hover:underline">privacy@taxenzo.com</a></p>
                <p><strong>Telefoon:</strong> <a href="tel:+31883472829" className="text-blue-600 hover:underline">088-3472829</a></p>
                <p><strong>Adres:</strong> Taxenzo B.V., Amsterdam, Nederland</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}