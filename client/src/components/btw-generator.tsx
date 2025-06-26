import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Calculator, FileText, Download, Send } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface BtwReturn {
  id: number;
  quarter: number;
  year: number;
  totalSales: string;
  totalPurchases: string;
  btwOwed: string;
  btwPaid: string;
  netBtwDue: string;
  status: "draft" | "submitted" | "paid";
  submittedAt?: string;
  createdAt: string;
}

export function BtwGenerator() {
  const [selectedQuarter, setSelectedQuarter] = useState<number>(4);
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const queryClient = useQueryClient();

  const { data: btwReturns = [] } = useQuery<BtwReturn[]>({
    queryKey: ["/api/btw-returns"],
  });

  const generateBtwReturn = useMutation({
    mutationFn: async ({ quarter, year }: { quarter: number; year: number }) => {
      return apiRequest("/api/btw-returns/generate", {
        method: "POST",
        body: JSON.stringify({ userId: 1, quarter, year }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/btw-returns"] });
    },
  });

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR'
    }).format(parseFloat(amount));
  };

  const getQuarterLabel = (quarter: number) => {
    const quarters = {
      1: "Q1 (Jan-Mrt)",
      2: "Q2 (Apr-Jun)", 
      3: "Q3 (Jul-Sep)",
      4: "Q4 (Okt-Dec)"
    };
    return quarters[quarter as keyof typeof quarters];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft": return "secondary";
      case "submitted": return "default";
      case "paid": return "default";
      default: return "secondary";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "draft": return "Concept";
      case "submitted": return "Ingediend";
      case "paid": return "Betaald";
      default: return status;
    }
  };

  const handleGenerate = () => {
    generateBtwReturn.mutate({ quarter: selectedQuarter, year: selectedYear });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">BTW Aangifte Generator</h2>
          <p className="text-muted-foreground">
            Genereer automatisch je BTW aangifte op basis van je transacties
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Nieuwe BTW Aangifte
            </CardTitle>
            <CardDescription>
              Selecteer een kwartaal om een BTW aangifte te genereren
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="year">Jaar</Label>
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
              
              <div>
                <Label htmlFor="quarter">Kwartaal</Label>
                <Select
                  value={selectedQuarter.toString()}
                  onValueChange={(value) => setSelectedQuarter(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Q1 (Jan-Mrt)</SelectItem>
                    <SelectItem value="2">Q2 (Apr-Jun)</SelectItem>
                    <SelectItem value="3">Q3 (Jul-Sep)</SelectItem>
                    <SelectItem value="4">Q4 (Okt-Dec)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={handleGenerate}
              disabled={generateBtwReturn.isPending}
              className="w-full"
            >
              {generateBtwReturn.isPending ? (
                "Genereren..."
              ) : (
                <>
                  <Calculator className="h-4 w-4 mr-2" />
                  BTW Aangifte Genereren
                </>
              )}
            </Button>

            <div className="text-sm text-muted-foreground">
              <p>De aangifte wordt automatisch berekend op basis van:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Alle gecategoriseerde zakelijke transacties</li>
                <li>BTW percentages per transactie</li>
                <li>In- en verkopen in het geselecteerde kwartaal</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>BTW Deadlines 2024</CardTitle>
            <CardDescription>
              Belangrijke data voor BTW aangiften
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Q1 2024</span>
                <Badge variant="outline">30 April</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Q2 2024</span>
                <Badge variant="outline">31 Juli</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Q3 2024</span>
                <Badge variant="outline">31 Oktober</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Q4 2024</span>
                <Badge variant="destructive">31 Januari 2025</Badge>
              </div>
            </div>

            <Separator />

            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-2">Belangrijk:</p>
              <ul className="space-y-1">
                <li>• BTW-plichtig vanaf €20.000 omzet</li>
                <li>• Aangiften uiterlijk 23:59 indienen</li>
                <li>• Betaling binnen 1 maand na deadline</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Eerder Gegenereerde Aangiften</CardTitle>
          <CardDescription>
            Overzicht van je BTW aangiften per kwartaal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {btwReturns.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nog geen BTW aangiften gegenereerd</p>
                <p className="text-sm">Genereer je eerste aangifte hierboven</p>
              </div>
            ) : (
              btwReturns.map((btwReturn) => (
                <Card key={btwReturn.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">
                          BTW Aangifte {getQuarterLabel(btwReturn.quarter)} {btwReturn.year}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Aangemaakt op {new Date(btwReturn.createdAt).toLocaleDateString('nl-NL')}
                        </p>
                      </div>
                      <Badge variant={getStatusColor(btwReturn.status)}>
                        {getStatusLabel(btwReturn.status)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Totale Verkopen</p>
                        <p className="font-semibold">{formatCurrency(btwReturn.totalSales)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Totale Inkopen</p>
                        <p className="font-semibold">{formatCurrency(btwReturn.totalPurchases)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">BTW Verschuldigd</p>
                        <p className="font-semibold text-red-600">{formatCurrency(btwReturn.btwOwed)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Netto BTW</p>
                        <p className={`font-semibold ${
                          parseFloat(btwReturn.netBtwDue) >= 0 ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {formatCurrency(btwReturn.netBtwDue)}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Bekijken
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Downloaden
                      </Button>
                      {btwReturn.status === "draft" && (
                        <Button size="sm">
                          <Send className="h-4 w-4 mr-2" />
                          Indienen
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}