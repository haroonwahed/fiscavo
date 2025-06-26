import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, DollarSign, PieChart, Download, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ProfitLossData {
  period: string;
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  profitMargin: number;
  expenseBreakdown: Record<string, number>;
}

export function ProfitLossDashboard() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [selectedQuarter, setSelectedQuarter] = useState<string>("");

  const { data: profitLossData, isLoading } = useQuery({
    queryKey: ['/api/analytics/profit-loss', { year: selectedYear, quarter: selectedQuarter }],
    retry: false,
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const getProfitColor = (profit: number) => {
    return profit >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const exportReport = async () => {
    try {
      const response = await fetch(`/api/export/profit-loss?year=${selectedYear}&quarter=${selectedQuarter}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `winst-verlies-${selectedYear}${selectedQuarter ? `-q${selectedQuarter}` : ''}.csv`;
      a.click();
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          Winst & verlies gegevens laden...
        </CardContent>
      </Card>
    );
  }

  const data: ProfitLossData = profitLossData || {
    period: 'Geen data',
    totalIncome: 0,
    totalExpenses: 0,
    netProfit: 0,
    profitMargin: 0,
    expenseBreakdown: {}
  };

  const expenseCategories = Object.entries(data.expenseBreakdown)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            Winst & Verlies Overzicht
          </CardTitle>
          <div className="flex gap-2">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Jaar" />
              </SelectTrigger>
              <SelectContent>
                {[2024, 2023, 2022].map(year => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedQuarter} onValueChange={setSelectedQuarter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Kwartaal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Hele jaar</SelectItem>
                <SelectItem value="1">Q1</SelectItem>
                <SelectItem value="2">Q2</SelectItem>
                <SelectItem value="3">Q3</SelectItem>
                <SelectItem value="4">Q4</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={exportReport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <h3 className="text-lg font-medium text-gray-600">Periode: {data.period}</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-600">
                  {formatCurrency(data.totalIncome)}
                </h3>
                <p className="text-gray-600">Totale Inkomsten</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingDown className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-red-600">
                  {formatCurrency(data.totalExpenses)}
                </h3>
                <p className="text-gray-600">Totale Uitgaven</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className={`h-8 w-8 ${data.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                </div>
                <h3 className={`text-2xl font-bold ${getProfitColor(data.netProfit)}`}>
                  {formatCurrency(data.netProfit)}
                </h3>
                <p className="text-gray-600">Netto Winst</p>
                <Badge variant={data.netProfit >= 0 ? "default" : "destructive"} className="mt-2">
                  {data.profitMargin.toFixed(1)}% marge
                </Badge>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Uitgaven per Categorie</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {expenseCategories.length > 0 ? (
                  expenseCategories.map(([category, amount]) => {
                    const percentage = data.totalExpenses > 0 ? (amount / data.totalExpenses) * 100 : 0;
                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{category}</span>
                          <span>{formatCurrency(amount)} ({percentage.toFixed(1)}%)</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500 text-center py-4">Geen uitgaven geregistreerd</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Financiële Gezondheid</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Winstmarge</span>
                    <Badge variant={data.profitMargin >= 20 ? "default" : data.profitMargin >= 10 ? "secondary" : "destructive"}>
                      {data.profitMargin.toFixed(1)}%
                    </Badge>
                  </div>
                  <Progress value={Math.min(data.profitMargin, 50)} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Uitgaven Ratio</span>
                    <span className="text-sm">
                      {data.totalIncome > 0 ? ((data.totalExpenses / data.totalIncome) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                  <Progress 
                    value={data.totalIncome > 0 ? Math.min((data.totalExpenses / data.totalIncome) * 100, 100) : 0} 
                    className="h-2" 
                  />
                </div>

                <div className="pt-4 border-t space-y-2">
                  <h4 className="font-medium">Aanbevelingen</h4>
                  {data.profitMargin < 10 && (
                    <p className="text-sm text-amber-600">⚠️ Lage winstmarge - overweeg kostenreductie</p>
                  )}
                  {data.netProfit < 0 && (
                    <p className="text-sm text-red-600">🚨 Verlies - bekijk uitgavenpatroon</p>
                  )}
                  {data.profitMargin >= 20 && (
                    <p className="text-sm text-green-600">✅ Gezonde winstmarge</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}