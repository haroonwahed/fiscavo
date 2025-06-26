import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, TrendingUp, PieChart, AlertTriangle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface TaxCalculation {
  id: number;
  year: number;
  totalIncome: string;
  totalExpenses: string;
  taxableIncome: string;
  incomeTax: string;
  socialContributions: string;
  totalTaxDue: string;
  calculatedAt: string;
}

export function TaxCalculator() {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const queryClient = useQueryClient();

  const { data: calculations = [] } = useQuery<TaxCalculation[]>({
    queryKey: ["/api/tax-calculations"],
  });

  const { data: transactions = [] } = useQuery({
    queryKey: ["/api/transactions"],
  });

  const { data: mileageEntries = [] } = useQuery({
    queryKey: ["/api/mileage"],
  });

  const calculateTax = useMutation({
    mutationFn: async ({ year }: { year: number }) => {
      return apiRequest("/api/tax-calculations/calculate", {
        method: "POST",
        body: JSON.stringify({ userId: 1, year }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tax-calculations"] });
    },
  });

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR'
    }).format(parseFloat(amount));
  };

  const getCurrentCalculation = () => {
    return calculations.find(calc => calc.year === selectedYear);
  };

  const calculateTaxRate = (taxableIncome: number, incomeTax: number) => {
    if (taxableIncome === 0) return 0;
    return (incomeTax / taxableIncome) * 100;
  };

  const getTaxBracket = (taxableIncome: number) => {
    if (taxableIncome <= 37149) return "Eerste schijf (36.93%)";
    if (taxableIncome <= 73031) return "Tweede schijf (37.93%)";
    return "Derde schijf (49.5%)";
  };

  const currentCalc = getCurrentCalculation();
  const taxableIncome = parseFloat(currentCalc?.taxableIncome || "0");
  const incomeTax = parseFloat(currentCalc?.incomeTax || "0");
  const effectiveRate = calculateTaxRate(taxableIncome, incomeTax);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Belastingcalculator</h2>
          <p className="text-muted-foreground">
            Bereken je inkomstenbelasting en krijg inzicht in je belastingpositie
          </p>
        </div>
      </div>

      <Tabs defaultValue="calculator" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="analysis">Analyse</TabsTrigger>
          <TabsTrigger value="history">Geschiedenis</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Belastingberekening {selectedYear}
              </CardTitle>
              <CardDescription>
                Selecteer een jaar en bereken je verwachte belastingen
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Label htmlFor="year">Belastingjaar</Label>
                  <Select
                    value={selectedYear.toString()}
                    onValueChange={(value) => setSelectedYear(Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  onClick={() => calculateTax.mutate({ year: selectedYear })}
                  disabled={calculateTax.isPending}
                  className="mt-6"
                >
                  {calculateTax.isPending ? (
                    "Berekenen..."
                  ) : (
                    <>
                      <Calculator className="h-4 w-4 mr-2" />
                      Belasting Berekenen
                    </>
                  )}
                </Button>
              </div>

              {currentCalc && (
                <div className="mt-6 p-6 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-4">Belastingberekening {selectedYear}</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Totale Inkomsten</p>
                      <p className="text-lg font-semibold text-green-600">
                        {formatCurrency(currentCalc.totalIncome)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Totale Uitgaven</p>
                      <p className="text-lg font-semibold text-red-600">
                        {formatCurrency(currentCalc.totalExpenses)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Belastbaar Inkomen</p>
                      <p className="text-lg font-semibold">
                        {formatCurrency(currentCalc.taxableIncome)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Totaal Verschuldigd</p>
                      <p className="text-xl font-bold text-red-600">
                        {formatCurrency(currentCalc.totalTaxDue)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Inkomstenbelasting</span>
                      <span className="font-medium">{formatCurrency(currentCalc.incomeTax)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Sociale premies</span>
                      <span className="font-medium">{formatCurrency(currentCalc.socialContributions)}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between items-center font-bold">
                      <span>Totaal verschuldigd</span>
                      <span>{formatCurrency(currentCalc.totalTaxDue)}</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-background rounded border">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">Belastingdruk</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <Progress value={effectiveRate} className="h-2" />
                      </div>
                      <span className="font-medium">{effectiveRate.toFixed(1)}%</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {getTaxBracket(taxableIncome)}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Inkomen vs Uitgaven
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentCalc ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Bruto Inkomen</span>
                        <span className="font-medium">{formatCurrency(currentCalc.totalIncome)}</span>
                      </div>
                      <Progress 
                        value={100} 
                        className="h-3"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Aftrekbare Kosten</span>
                        <span className="font-medium">{formatCurrency(currentCalc.totalExpenses)}</span>
                      </div>
                      <Progress 
                        value={(parseFloat(currentCalc.totalExpenses) / parseFloat(currentCalc.totalIncome)) * 100} 
                        className="h-3"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Belastbaar Inkomen</span>
                        <span className="font-medium">{formatCurrency(currentCalc.taxableIncome)}</span>
                      </div>
                      <Progress 
                        value={(parseFloat(currentCalc.taxableIncome) / parseFloat(currentCalc.totalIncome)) * 100} 
                        className="h-3"
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-center py-8 text-muted-foreground">
                    Bereken eerst je belastingen om een analyse te zien
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Belastingtips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-1">Uitgaven optimaliseren</h4>
                    <p className="text-sm text-blue-700">
                      Registreer alle zakelijke uitgaven om je belastbaar inkomen te verlagen
                    </p>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-900 mb-1">Kilometerregistratie</h4>
                    <p className="text-sm text-green-700">
                      €0.23 per kilometer kan flink oplopen. Vergeet geen zakelijke ritten
                    </p>
                  </div>
                  
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="font-medium text-orange-900 mb-1">Pensioenopbouw</h4>
                    <p className="text-sm text-orange-700">
                      Overweeg een pensioenregeling voor extra belastingvoordeel
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Belastinggeschiedenis</CardTitle>
              <CardDescription>
                Overzicht van eerder berekende belastingen per jaar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {calculations.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nog geen belastingberekeningen</p>
                    <p className="text-sm">Bereken je eerste belasting hierboven</p>
                  </div>
                ) : (
                  calculations.map((calc) => (
                    <div
                      key={calc.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h3 className="font-semibold">Belastingjaar {calc.year}</h3>
                        <p className="text-sm text-muted-foreground">
                          Berekend op {new Date(calc.calculatedAt).toLocaleDateString('nl-NL')}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-semibold">
                          {formatCurrency(calc.totalTaxDue)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {((parseFloat(calc.incomeTax) / parseFloat(calc.taxableIncome)) * 100).toFixed(1)}% tarief
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}