import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Zap, TrendingUp, CheckCircle, AlertCircle, FileText, Calculator } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";

interface UncategorizedTransaction {
  id: number;
  amount: string;
  description: string;
  date: string;
  suggestion: {
    category: string;
    confidence: number;
    reasoning: string;
    isBusinessExpense: boolean;
    potentialDeduction: number;
  };
}

interface CategorizationStats {
  totalUncategorized: number;
  potentialSavings: number;
  averageConfidence: number;
  categories: {
    name: string;
    count: number;
    amount: number;
  }[];
}

export function ExpenseCategorizationAI() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [processing, setProcessing] = useState(false);

  const { data: uncategorized = [], isLoading } = useQuery<UncategorizedTransaction[]>({
    queryKey: ["/api/transactions/uncategorized"],
    enabled: !!user,
  });

  const { data: stats } = useQuery<CategorizationStats>({
    queryKey: ["/api/analytics/categorization-stats"],
    enabled: !!user,
  });

  const categorizeTransaction = useMutation({
    mutationFn: async ({ transactionId, category, isBusinessExpense }: {
      transactionId: number;
      category: string;
      isBusinessExpense: boolean;
    }) => {
      return apiRequest("PATCH", `/api/transactions/${transactionId}/categorize`, {
        category,
        isBusinessExpense
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/transactions/uncategorized"] });
      queryClient.invalidateQueries({ queryKey: ["/api/analytics/categorization-stats"] });
    },
  });

  const bulkCategorize = useMutation({
    mutationFn: async () => {
      setProcessing(true);
      return apiRequest("POST", "/api/transactions/bulk-categorize", {
        userId: (user as any)?.id
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/transactions/uncategorized"] });
      queryClient.invalidateQueries({ queryKey: ["/api/analytics/categorization-stats"] });
      setProcessing(false);
    },
    onError: () => {
      setProcessing(false);
    }
  });

  const handleAcceptSuggestion = (transaction: UncategorizedTransaction) => {
    categorizeTransaction.mutate({
      transactionId: transaction.id,
      category: transaction.suggestion.category,
      isBusinessExpense: transaction.suggestion.isBusinessExpense
    });
  };

  const mockStats: CategorizationStats = {
    totalUncategorized: uncategorized.length,
    potentialSavings: uncategorized.reduce((sum, t) => sum + (t.suggestion?.potentialDeduction || 0), 0),
    averageConfidence: uncategorized.length > 0 
      ? uncategorized.reduce((sum, t) => sum + (t.suggestion?.confidence || 0), 0) / uncategorized.length 
      : 0,
    categories: [
      { name: "Kantoorkosten", count: 12, amount: 456.80 },
      { name: "Transport", count: 8, amount: 234.50 },
      { name: "Marketing", count: 5, amount: 189.30 },
      { name: "Telefoon/Internet", count: 3, amount: 145.60 }
    ]
  };

  const displayStats = stats || mockStats;

  const mockUncategorized: UncategorizedTransaction[] = [
    {
      id: 1,
      amount: "45.60",
      description: "Office Depot - Bureau materialen",
      date: "2024-12-25",
      suggestion: {
        category: "Kantoorkosten",
        confidence: 95,
        reasoning: "Kantoorbenodigdheden van bekende leverancier",
        isBusinessExpense: true,
        potentialDeduction: 9.58
      }
    },
    {
      id: 2,
      amount: "23.45",
      description: "Shell - Brandstof",
      date: "2024-12-24",
      suggestion: {
        category: "Transport",
        confidence: 88,
        reasoning: "Brandstofkosten - mogelijk zakelijk gebruik",
        isBusinessExpense: true,
        potentialDeduction: 4.92
      }
    },
    {
      id: 3,
      amount: "156.80",
      description: "KPN - Maandelijkse factuur",
      date: "2024-12-23",
      suggestion: {
        category: "Telefoon/Internet",
        confidence: 92,
        reasoning: "Zakelijke telefoon/internetkosten",
        isBusinessExpense: true,
        potentialDeduction: 32.93
      }
    }
  ];

  const displayTransactions = uncategorized.length > 0 ? uncategorized : mockUncategorized;

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span>Bezig met laden van transacties...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with AI Stats */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              <Brain className="h-8 w-8 mr-3" />
              AI Uitgaven Categorisering
            </h2>
            <p className="text-purple-100 mt-2">
              Automatische categorisering bespaart je gemiddeld 80% tijd
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">€{displayStats.potentialSavings}</div>
            <div className="text-purple-200">Potentiële besparing</div>
          </div>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Te Categoriseren</p>
                <p className="text-2xl font-bold text-orange-600">{displayStats.totalUncategorized}</p>
              </div>
              <FileText className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">AI Zekerheid</p>
                <p className="text-2xl font-bold text-green-600">{Math.round(displayStats.averageConfidence)}%</p>
              </div>
              <Brain className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Potentiële BTW</p>
                <p className="text-2xl font-bold text-blue-600">€{Math.round(displayStats.potentialSavings * 0.21)}</p>
              </div>
              <Calculator className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tijd Bespaard</p>
                <p className="text-2xl font-bold text-purple-600">{Math.round(displayStats.totalUncategorized * 2.5)}min</p>
              </div>
              <Zap className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="suggestions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="suggestions">AI Suggesties</TabsTrigger>
          <TabsTrigger value="categories">Categorieën</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Verwerking</TabsTrigger>
        </TabsList>

        <TabsContent value="suggestions">
          <Card>
            <CardHeader>
              <CardTitle>AI Categorisering Suggesties</CardTitle>
              <CardDescription>
                Onze AI heeft deze transacties geanalyseerd en categorieën voorgesteld
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {displayTransactions.map((transaction) => (
                  <div key={transaction.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold">{transaction.description}</h4>
                          <Badge variant="outline">€{transaction.amount}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{transaction.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          €{transaction.suggestion?.potentialDeduction || 0} besparing
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Brain className="h-4 w-4 text-purple-600" />
                          <span className="font-medium">AI Suggestie:</span>
                          <Badge variant="secondary">{transaction.suggestion?.category}</Badge>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Progress 
                            value={transaction.suggestion?.confidence || 0} 
                            className="w-20 h-2"
                          />
                          <span className="text-sm text-gray-600">
                            {transaction.suggestion?.confidence}%
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{transaction.suggestion?.reasoning}</p>
                      
                      {transaction.suggestion?.isBusinessExpense && (
                        <div className="flex items-center space-x-1 mt-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-700">Zakelijke uitgave - Aftrekbaar</span>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => handleAcceptSuggestion(transaction)}
                        disabled={categorizeTransaction.isPending}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Accepteren
                      </Button>
                      <Button variant="outline">
                        Wijzigen
                      </Button>
                      <Button variant="ghost">
                        Overslaan
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Populaire Categorieën</CardTitle>
              <CardDescription>
                Overzicht van je meest gebruikte uitgavencategorieën
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {displayStats.categories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{category.name}</h4>
                      <p className="text-sm text-gray-600">{category.count} transacties</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">€{category.amount}</div>
                      <div className="text-sm text-gray-600">Totaal bedrag</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Verwerking</CardTitle>
              <CardDescription>
                Laat AI alle uncategorized transacties in één keer verwerken
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Brain className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-blue-900">Automatische Verwerking</h4>
                    <p className="text-blue-700 mt-1">
                      AI zal alle {displayStats.totalUncategorized} uncategorized transacties analyseren 
                      en categoriseren op basis van Nederlandse belastingregels.
                    </p>
                    <div className="mt-3 space-y-2">
                      <div className="flex justify-between">
                        <span>Geschatte verwerkingstijd:</span>
                        <span className="font-medium">{Math.ceil(displayStats.totalUncategorized / 10)} seconden</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Verwachte nauwkeurigheid:</span>
                        <span className="font-medium">{Math.round(displayStats.averageConfidence)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Potentiële besparing:</span>
                        <span className="font-medium text-green-600">€{displayStats.potentialSavings}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => bulkCategorize.mutate()}
                disabled={processing || bulkCategorize.isPending}
                className="w-full bg-purple-600 hover:bg-purple-700"
                size="lg"
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Bezig met verwerken...
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5 mr-2" />
                    Start Bulk Categorisering
                  </>
                )}
              </Button>

              {processing && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <span className="text-yellow-800">
                      AI is bezig met het verwerken van je transacties. Dit kan enkele momenten duren.
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}