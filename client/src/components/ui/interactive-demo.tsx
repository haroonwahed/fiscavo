import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, TrendingUp, PiggyBank, Sparkles } from "lucide-react";

export function InteractiveDemo() {
  const [demoData, setDemoData] = useState({
    income: "60000",
    expenses: "15000",
    mileage: "8000"
  });
  
  const [showResults, setShowResults] = useState(false);

  const calculateSavings = () => {
    const income = parseFloat(demoData.income) || 0;
    const expenses = parseFloat(demoData.expenses) || 0;
    const mileage = parseFloat(demoData.mileage) || 0;
    
    // Dutch tax calculation approximations
    const mileageDeduction = mileage * 0.23; // €0.23 per km
    const taxableIncome = Math.max(0, income - expenses - mileageDeduction);
    const taxRate = income <= 37149 ? 0.3693 : 0.3793; // Simplified Dutch tax brackets
    const estimatedTax = taxableIncome * taxRate;
    const socialContributions = Math.min(taxableIncome, 73031) * 0.31;
    const totalTax = estimatedTax + socialContributions;
    const netIncome = income - totalTax;
    
    // Potential additional savings with Fiscavo
    const additionalDeductions = income * 0.08; // 8% average additional deductions found
    const taxSavings = additionalDeductions * taxRate;
    const btwOptimization = income * 0.02; // 2% BTW optimization
    const totalPotentialSavings = taxSavings + btwOptimization + (mileageDeduction * 0.1);
    
    return {
      netIncome: Math.round(netIncome),
      currentTax: Math.round(totalTax),
      mileageDeduction: Math.round(mileageDeduction),
      potentialSavings: Math.round(totalPotentialSavings),
      additionalDeductions: Math.round(additionalDeductions)
    };
  };

  const results = showResults ? calculateSavings() : null;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <h3 className="text-2xl font-bold text-gray-900">Bereken je potentiële besparing</h3>
          </div>
          <p className="text-gray-600">
            Ontdek hoeveel je kunt besparen met slimme belastingoptimalisatie
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                Jouw gegevens
              </CardTitle>
              <CardDescription>
                Vul je geschatte cijfers in voor een realistische berekening
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="income">Jaarlijkse omzet (€)</Label>
                <Input
                  id="income"
                  type="number"
                  value={demoData.income}
                  onChange={(e) => setDemoData(prev => ({ ...prev, income: e.target.value }))}
                  placeholder="60000"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="expenses">Huidige aftrekbare kosten (€)</Label>
                <Input
                  id="expenses"
                  type="number"
                  value={demoData.expenses}
                  onChange={(e) => setDemoData(prev => ({ ...prev, expenses: e.target.value }))}
                  placeholder="15000"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="mileage">Zakelijke kilometers per jaar</Label>
                <Input
                  id="mileage"
                  type="number"
                  value={demoData.mileage}
                  onChange={(e) => setDemoData(prev => ({ ...prev, mileage: e.target.value }))}
                  placeholder="8000"
                  className="mt-1"
                />
              </div>

              <Button
                onClick={() => setShowResults(true)}
                className="w-full btn-primary"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Bereken mijn besparing
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className={`shadow-lg border-0 transition-all duration-500 ${showResults ? 'opacity-100' : 'opacity-50'}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PiggyBank className="w-5 h-5 text-green-600" />
                Jouw besparingspotentieel
              </CardTitle>
              <CardDescription>
                {showResults ? "Gebaseerd op je gegevens" : "Vul het formulier in om je besparing te zien"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {results ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-700">
                      €{results.potentialSavings.toLocaleString()}
                    </div>
                    <div className="text-sm text-green-600">Jaarlijkse extra besparing met Fiscavo</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-semibold text-blue-900">Kilometeraftrek</div>
                      <div className="text-blue-700">€{results.mileageDeduction.toLocaleString()}</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-semibold text-blue-900">Extra aftrekposten</div>
                      <div className="text-blue-700">€{results.additionalDeductions.toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500 mb-2">
                      *Schatting gebaseerd op gemiddelde Fiscavo gebruiker
                    </div>
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-4 text-white">
                      <div className="font-bold mb-1">ROI: {Math.round((results.potentialSavings / (19 * 12)) * 100)}%</div>
                      <div className="text-sm text-blue-100">
                        Fiscavo betaalt zichzelf {Math.round(results.potentialSavings / (19 * 12))}x terug
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Bereken je potentiële besparing door het formulier in te vullen</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {showResults && (
          <div className="mt-8 text-center">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-2">
                🎯 Klaar om te beginnen met besparen?
              </h4>
              <p className="text-gray-600 mb-4">
                Deze berekening toont wat mogelijk is. Start vandaag nog en ontdek je echte besparingspotentieel.
              </p>
              <Button className="btn-primary">
                Start gratis trial van 30 dagen
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}