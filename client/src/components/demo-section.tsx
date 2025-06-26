import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, FileText, Car, MessageSquare, CheckSquare, BarChart3 } from "lucide-react";

interface DemoProps {
  onClose?: () => void;
}

export function DemoSection({ onClose }: DemoProps) {
  const [activeTab, setActiveTab] = useState("btw");
  const [btwSales, setBtwSales] = useState("50000");
  const [btwPurchases, setBtwPurchases] = useState("12000");
  const [income, setIncome] = useState("75000");
  const [expenses, setExpenses] = useState("15000");
  const [distance, setDistance] = useState("150");
  const [showUpgrade, setShowUpgrade] = useState(false);

  // BTW Calculator
  const calculateBTW = () => {
    const sales = parseFloat(btwSales) || 0;
    const purchases = parseFloat(btwPurchases) || 0;
    const salesBTW = sales * 0.21;
    const purchasesBTW = purchases * 0.21;
    const netBTW = salesBTW - purchasesBTW;
    return { salesBTW, purchasesBTW, netBTW };
  };

  // Tax Calculator
  const calculateTax = () => {
    const grossIncome = parseFloat(income) || 0;
    const businessExpenses = parseFloat(expenses) || 0;
    const taxableIncome = grossIncome - businessExpenses;
    
    let incomeTax = 0;
    if (taxableIncome > 73031) {
      incomeTax = 22731 + (taxableIncome - 73031) * 0.495;
    } else if (taxableIncome > 37149) {
      incomeTax = 9156 + (taxableIncome - 37149) * 0.378;
    } else {
      incomeTax = taxableIncome * 0.246;
    }
    
    const socialContributions = Math.min(taxableIncome * 0.28, 15000);
    const totalTax = incomeTax + socialContributions;
    
    return { taxableIncome, incomeTax, socialContributions, totalTax };
  };

  // Mileage Calculator
  const calculateMileage = () => {
    const km = parseFloat(distance) || 0;
    const rate = 0.23; // €0.23 per km
    const totalAmount = km * rate;
    return { km, rate, totalAmount };
  };

  const btwResults = calculateBTW();
  const taxResults = calculateTax();
  const mileageResults = calculateMileage();

  const demoFeatures = [
    {
      id: "btw",
      title: "BTW Calculator",
      icon: FileText,
      description: "Bereken automatisch je BTW aangifte",
      color: "text-blue-600"
    },
    {
      id: "tax",
      title: "Belasting Calculator", 
      icon: BarChart3,
      description: "Bereken je inkomstenbelasting",
      color: "text-green-600"
    },
    {
      id: "mileage",
      title: "Kilometer Registratie",
      icon: Car,
      description: "Track je zakelijke kilometers",
      color: "text-purple-600"
    },
    {
      id: "chat",
      title: "AI Assistent",
      icon: MessageSquare,
      description: "Krijg persoonlijk belastingadvies",
      color: "text-orange-600"
    },
    {
      id: "deductions",
      title: "Aftrekposten Checker",
      icon: CheckSquare,
      description: "Vind alle mogelijke aftrekposten",
      color: "text-red-600"
    },
    {
      id: "transactions",
      title: "Transactie Manager",
      icon: Calculator,
      description: "Beheer al je zakelijke uitgaven",
      color: "text-indigo-600"
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4" style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
            Interactieve Demo
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Probeer Fiscatax Nu
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Test onze tools met echte berekeningen. Zie direct hoe Fiscatax je tijd bespaart en fouten voorkomt.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {demoFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.id} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  activeTab === feature.id ? 'ring-2 ring-blue-500 shadow-lg' : ''
                }`}
                onClick={() => setActiveTab(feature.id)}
              >
                <CardContent className="p-4 text-center">
                  <Icon className={`h-8 w-8 mx-auto mb-2 ${feature.color}`} />
                  <h3 className="font-semibold text-sm">{feature.title}</h3>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="btw" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  BTW Calculator Demo
                </CardTitle>
                <CardDescription>
                  Bereken je BTW aangifte voor Q4 2024. Voer je omzet en inkopen in.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Omzet (excl. BTW)</label>
                      <Input
                        type="number"
                        value="50000"
                        disabled
                        className="text-lg bg-gray-100"
                      />
                      <p className="text-sm text-gray-500 mt-1">Demo waarden - upgrade voor eigen berekeningen</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Inkopen (excl. BTW)</label>
                      <Input
                        type="number"
                        value="12000"
                        disabled
                        className="text-lg bg-gray-100"
                      />
                      <p className="text-sm text-gray-500 mt-1">Demo waarden - upgrade voor eigen berekeningen</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4">BTW Berekening Q4 2024</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>BTW op omzet (21%):</span>
                        <span className="font-medium">€{btwResults.salesBTW.toLocaleString('nl-NL', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>BTW op inkopen (21%):</span>
                        <span className="font-medium">€{btwResults.purchasesBTW.toLocaleString('nl-NL', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <hr />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Te betalen BTW:</span>
                        <span style={{ color: 'var(--color-primary)' }}>
                          €{btwResults.netBTW.toLocaleString('nl-NL', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-center bg-yellow-50 p-3 rounded-lg border-2 border-dashed border-yellow-300">
                        <p className="text-sm text-yellow-800 font-medium">🔒 Upgrade voor volledige BTW functionaliteit</p>
                      </div>
                      <Button 
                        className="w-full" 
                        style={{ backgroundColor: 'var(--color-primary)' }}
                        onClick={onClose}
                      >
                        Start nu - Genereer echte BTW aangiftes
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tax" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  Belasting Calculator Demo
                </CardTitle>
                <CardDescription>
                  Bereken je inkomstenbelasting voor 2024. Nederlandse belastingtarieven worden automatisch toegepast.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Jaarinkomen</label>
                      <Input
                        type="number"
                        value="75000"
                        disabled
                        className="text-lg bg-gray-100"
                      />
                      <p className="text-sm text-gray-500 mt-1">Demo waarden - upgrade voor persoonlijke berekeningen</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Zakelijke uitgaven</label>
                      <Input
                        type="number"
                        value="15000"
                        disabled
                        className="text-lg bg-gray-100"
                      />
                      <p className="text-sm text-gray-500 mt-1">Demo waarden - upgrade voor persoonlijke berekeningen</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4">Belasting Berekening 2024</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Belastbaar inkomen:</span>
                        <span className="font-medium">€{taxResults.taxableIncome.toLocaleString('nl-NL')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Inkomstenbelasting:</span>
                        <span className="font-medium">€{taxResults.incomeTax.toLocaleString('nl-NL', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sociale premies:</span>
                        <span className="font-medium">€{taxResults.socialContributions.toLocaleString('nl-NL', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <hr />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Totale belasting:</span>
                        <span className="text-green-600">
                          €{taxResults.totalTax.toLocaleString('nl-NL', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-center bg-yellow-50 p-3 rounded-lg border-2 border-dashed border-yellow-300">
                        <p className="text-sm text-yellow-800 font-medium">🔒 Upgrade voor volledige belastingberekeningen</p>
                      </div>
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={onClose}
                      >
                        Start nu - Bereken je echte belasting
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mileage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-purple-600" />
                  Kilometer Registratie Demo
                </CardTitle>
                <CardDescription>
                  Registreer zakelijke kilometers tegen het Nederlandse tarief van €0,23 per km.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Afgelegde kilometers</label>
                      <Input
                        type="number"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                        placeholder="150"
                        className="text-lg"
                      />
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Tips:</strong> Vergeet niet om begin- en eindlocatie, datum en doel van de reis te noteren voor de belastingdienst.
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4">Kilometervergoeding</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Afstand:</span>
                        <span className="font-medium">{mileageResults.km} km</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tarief per km:</span>
                        <span className="font-medium">€{mileageResults.rate.toFixed(2)}</span>
                      </div>
                      <hr />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Totaal aftrekbaar:</span>
                        <span className="text-purple-600">
                          €{mileageResults.totalAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                      Voeg toe aan administratie
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-orange-600" />
                  AI Belasting Assistent Demo
                </CardTitle>
                <CardDescription>
                  Krijg direct antwoord op je belastingvragen van onze AI assistent.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-6 rounded-lg h-96 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="bg-white p-3 rounded-lg border-l-4 border-orange-500">
                      <p className="text-sm text-gray-600 mb-1">Gebruiker:</p>
                      <p>"Kan ik mijn thuiswerkplek aftrekken als ZZP'er?"</p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg border-l-4 border-orange-500">
                      <p className="text-sm text-orange-600 mb-1">Fiscatax AI:</p>
                      <p>Als ZZP'er kun je kosten voor je thuiswerkplek aftrekken als dit uitsluitend of nagenoeg uitsluitend voor je werk wordt gebruikt. Je kunt kiezen uit:</p>
                      <ul className="list-disc ml-4 mt-2 space-y-1">
                        <li><strong>Forfaitair:</strong> €2,35 per m² per jaar (max 30 m²)</li>
                        <li><strong>Werkelijke kosten:</strong> Deel van hypotheek, gas, water, licht</li>
                      </ul>
                      <p className="mt-2 text-sm">Voor een werkplek van 15 m² zou je forfaitair €35,25 per jaar kunnen aftrekken.</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border-l-4 border-gray-300">
                      <p className="text-sm text-gray-600 mb-1">Gebruiker:</p>
                      <p>"En wat met mijn laptop die ik ook privé gebruik?"</p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg border-l-4 border-orange-500">
                      <p className="text-sm text-orange-600 mb-1">Fiscatax AI:</p>
                      <p>Voor gemengd gebruik kun je een redelijk deel van de kosten aftrekken. Als je de laptop 70% zakelijk gebruikt, kun je 70% van de aanschafkosten en bijbehorende kosten (verzekering, software) aftrekken. Belangrijk: hou een logboek bij van je zakelijke gebruik.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center bg-yellow-50 p-3 rounded-lg border-2 border-dashed border-yellow-300">
                    <p className="text-sm text-yellow-800 font-medium">🔒 Upgrade voor persoonlijke AI belastingadvies</p>
                  </div>
                  <Button 
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    onClick={onClose}
                  >
                    Start nu - Chat met AI assistent
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deductions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckSquare className="h-5 w-5 text-red-600" />
                  Aftrekposten Checker Demo
                </CardTitle>
                <CardDescription>
                  Ontdek aftrekposten die je mogelijk over het hoofd ziet. Gebaseerd op Nederlandse belastingregels.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">Vaak vergeten aftrekposten voor ZZP'ers:</h3>
                    <div className="space-y-3">
                      {[
                        { item: "Thuiswerkplek", amount: "€35-€700", desc: "Forfaitair of werkelijke kosten" },
                        { item: "Telefoon & internet", amount: "€200-€600", desc: "Zakelijk deel van abonnement" },
                        { item: "Vakliteratuur", amount: "€150-€500", desc: "Boeken, tijdschriften, cursussen" },
                        { item: "Bankkosten", amount: "€50-€200", desc: "Zakelijke rekening en transacties" },
                        { item: "Verzekeringen", amount: "€300-€800", desc: "Beroepsaansprakelijkheid, rechtsbijstand" },
                        { item: "Marketing", amount: "€100-€1000", desc: "Website, visitekaartjes, advertenties" }
                      ].map((deduction, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <CheckSquare className="h-5 w-5 text-green-500" />
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{deduction.item}</span>
                              <Badge variant="outline" className="text-green-600">{deduction.amount}</Badge>
                            </div>
                            <p className="text-sm text-gray-600">{deduction.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4">Geschatte besparingen</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Totale extra aftrekposten:</span>
                        <span className="font-medium">€1.335 - €3.800</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Belastingvoordeel (37.8%):</span>
                        <span className="font-medium">€505 - €1.436</span>
                      </div>
                      <hr />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Jaarlijkse besparing:</span>
                        <span className="text-red-600">€505 - €1.436</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-red-50 rounded-lg">
                      <p className="text-sm text-red-800">
                        <strong>Let op:</strong> Deze berekening is indicatief. Werkelijke besparingen zijn afhankelijk van je specifieke situatie.
                      </p>
                    </div>
                    <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">
                      Start aftrekposten scan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-indigo-600" />
                  Transactie Manager Demo
                </CardTitle>
                <CardDescription>
                  Automatische categorisering van je banktransacties met AI-powered expense tracking.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">Recente transacties</h3>
                    <div className="space-y-2">
                      {[
                        { date: "26-12-2024", desc: "KPN Telecom", amount: "-€45.00", category: "Telefoon & Internet", btw: "€7.85" },
                        { date: "25-12-2024", desc: "Shell Tankstation", amount: "-€67.50", category: "Vervoer", btw: "€11.78" },
                        { date: "24-12-2024", desc: "Microsoft 365", amount: "-€12.99", category: "Software", btw: "€2.27" },
                        { date: "23-12-2024", desc: "Klant Betaling", amount: "+€1.250.00", category: "Omzet", btw: "€218.75" },
                        { date: "22-12-2024", desc: "Office Depot", amount: "-€28.45", category: "Kantoorbenodigdheden", btw: "€4.96" }
                      ].map((transaction, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{transaction.desc}</span>
                              <span className={`font-bold ${transaction.amount.startsWith('+') ? 'text-green-600' : 'text-gray-900'}`}>
                                {transaction.amount}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-600">
                              <span>{transaction.date}</span>
                              <div className="flex gap-2">
                                <Badge variant="outline" className="text-xs">{transaction.category}</Badge>
                                <Badge variant="outline" className="text-xs">BTW: {transaction.btw}</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <h4 className="font-semibold text-green-800">Totale Omzet</h4>
                      <p className="text-2xl font-bold text-green-600">€1.250,00</p>
                      <p className="text-sm text-green-600">BTW: €218,75</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg text-center">
                      <h4 className="font-semibold text-red-800">Totale Uitgaven</h4>
                      <p className="text-2xl font-bold text-red-600">€153,94</p>
                      <p className="text-sm text-red-600">BTW: €26,86</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <h4 className="font-semibold text-blue-800">Netto BTW</h4>
                      <p className="text-2xl font-bold text-blue-600">€191,89</p>
                      <p className="text-sm text-blue-600">Te betalen</p>
                    </div>
                  </div>
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                    Koppel je bankrekening
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Klaar om te beginnen? Start vandaag nog met je gratis proefperiode.
          </p>
          <Button 
            size="lg" 
            className="px-8 py-3 text-lg"
            style={{ backgroundColor: 'var(--color-primary)' }}
            onClick={onClose}
          >
            Begin nu gratis
          </Button>
        </div>
      </div>
    </div>
  );
}