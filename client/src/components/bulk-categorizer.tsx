import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Brain, Check, X, AlertCircle, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category?: string;
}

interface CategorySuggestion {
  id: string;
  category: string;
  confidence: number;
  isBusinessExpense: boolean;
  reasoning: string;
}

export function BulkCategorizer() {
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<CategorySuggestion[]>([]);
  const { toast } = useToast();

  const { data: uncategorizedTransactions, isLoading } = useQuery({
    queryKey: ['/api/transactions/uncategorized'],
    retry: false,
  });

  const categorizeMutation = useMutation({
    mutationFn: async (transactions: Array<{ id: string; description: string; amount: number }>) => {
      return await apiRequest('/api/ai/bulk-categorize', 'POST', { transactions });
    },
    onSuccess: (results) => {
      setSuggestions(results);
      toast({
        title: "Categorisering voltooid",
        description: `${results.length} transacties geanalyseerd`,
      });
    },
    onError: (error) => {
      toast({
        title: "Categorisering mislukt",
        description: "Kon transacties niet categoriseren. Probeer opnieuw.",
        variant: "destructive",
      });
    }
  });

  const applyCategoriesMutation = useMutation({
    mutationFn: async (categories: Array<{ id: string; category: string; isBusinessExpense: boolean }>) => {
      // Apply categories to transactions
      return await Promise.all(
        categories.map(cat => 
          apiRequest(`/api/transactions/${cat.id}/categorize`, 'PATCH', { 
            category: cat.category, 
            isBusinessExpense: cat.isBusinessExpense 
          })
        )
      );
    },
    onSuccess: () => {
      toast({
        title: "Categorieën toegepast",
        description: "Alle geselecteerde categorieën zijn opgeslagen",
      });
      setSuggestions([]);
      setSelectedTransactions([]);
    },
    onError: (error) => {
      toast({
        title: "Opslaan mislukt",
        description: "Kon categorieën niet opslaan. Probeer opnieuw.",
        variant: "destructive",
      });
    }
  });

  const toggleTransaction = (id: string) => {
    setSelectedTransactions(prev => 
      prev.includes(id) 
        ? prev.filter(t => t !== id)
        : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedTransactions.length === uncategorizedTransactions?.length) {
      setSelectedTransactions([]);
    } else {
      setSelectedTransactions(uncategorizedTransactions?.map((t: Transaction) => t.id) || []);
    }
  };

  const categorizeSelected = () => {
    if (selectedTransactions.length === 0) return;
    
    const transactions = uncategorizedTransactions?.filter((t: Transaction) => 
      selectedTransactions.includes(t.id)
    ).map((t: Transaction) => ({
      id: t.id,
      description: t.description,
      amount: t.amount
    }));

    categorizeMutation.mutate(transactions);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "bg-green-100 text-green-800";
    if (confidence >= 0.6) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const acceptedSuggestions = suggestions.filter(s => s.confidence >= 0.7);
  const applyCategories = () => {
    applyCategoriesMutation.mutate(
      acceptedSuggestions.map(s => ({
        id: s.id,
        category: s.category,
        isBusinessExpense: s.isBusinessExpense
      }))
    );
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          Transacties laden...
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Bulk Categorisering
          </CardTitle>
          <p className="text-sm text-gray-600">
            Gebruik AI om meerdere transacties tegelijk te categoriseren
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {uncategorizedTransactions?.length === 0 ? (
            <div className="text-center py-8">
              <Check className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <p className="text-lg font-medium">Alle transacties zijn gecategoriseerd!</p>
              <p className="text-gray-600">Er zijn geen ongecategoriseerde transacties.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedTransactions.length === uncategorizedTransactions?.length}
                    onCheckedChange={toggleAll}
                  />
                  <span className="text-sm font-medium">
                    {selectedTransactions.length} van {uncategorizedTransactions?.length} geselecteerd
                  </span>
                </div>
                <Button
                  onClick={categorizeSelected}
                  disabled={selectedTransactions.length === 0 || categorizeMutation.isPending}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {categorizeMutation.isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Brain className="h-4 w-4 mr-2" />
                  )}
                  Categoriseer Geselecteerde
                </Button>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {uncategorizedTransactions?.map((transaction: Transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <Checkbox
                      checked={selectedTransactions.includes(transaction.id)}
                      onCheckedChange={() => toggleTransaction(transaction.id)}
                    />
                    <div className="flex-1">
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-gray-600">
                        €{transaction.amount} • {transaction.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {suggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              AI Suggesties
              <div className="flex items-center gap-2">
                <Progress 
                  value={(acceptedSuggestions.length / suggestions.length) * 100} 
                  className="w-32" 
                />
                <span className="text-sm text-gray-600">
                  {acceptedSuggestions.length}/{suggestions.length} geaccepteerd
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {suggestions.map((suggestion, index) => {
                const transaction = uncategorizedTransactions?.find((t: Transaction) => t.id === suggestion.id);
                if (!transaction) return null;

                return (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-gray-600">€{transaction.amount}</p>
                      </div>
                      <Badge className={getConfidenceColor(suggestion.confidence)}>
                        {Math.round(suggestion.confidence * 100)}% zeker
                      </Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Categorie: </span>
                        {suggestion.category}
                      </div>
                      <div>
                        <span className="font-medium">Zakelijke uitgave: </span>
                        {suggestion.isBusinessExpense ? (
                          <span className="text-green-600">Ja</span>
                        ) : (
                          <span className="text-red-600">Nee</span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-2">
                      <AlertCircle className="h-3 w-3 inline mr-1" />
                      {suggestion.reasoning}
                    </p>
                  </div>
                );
              })}
            </div>

            {acceptedSuggestions.length > 0 && (
              <div className="flex gap-2 pt-4 border-t">
                <Button
                  onClick={applyCategories}
                  disabled={applyCategoriesMutation.isPending}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {applyCategoriesMutation.isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4 mr-2" />
                  )}
                  Accepteer Alle Hoge Vertrouwen ({acceptedSuggestions.length})
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSuggestions([])}
                >
                  <X className="h-4 w-4 mr-2" />
                  Annuleren
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}