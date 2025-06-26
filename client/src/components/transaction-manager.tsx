import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Plus, CheckCircle, AlertCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface Transaction {
  id: number;
  amount: string;
  description: string;
  date: string;
  category?: string;
  isBusinessExpense: boolean;
  btwRate?: string;
  btwAmount?: string;
  isApproved: boolean;
  createdAt: string;
}

interface BankAccount {
  id: number;
  bankName: string;
  accountNumber: string;
  accountType: string;
  isActive: boolean;
}

export function TransactionManager() {
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const queryClient = useQueryClient();

  const { data: accounts = [] } = useQuery<BankAccount[]>({
    queryKey: ["/api/bank-accounts"],
  });

  const { data: transactions = [] } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions", selectedAccount],
    enabled: !!selectedAccount,
  });

  const categorizeTransaction = useMutation({
    mutationFn: async ({ id, category, isBusinessExpense }: { 
      id: number; 
      category: string; 
      isBusinessExpense: boolean; 
    }) => {
      return apiRequest("PATCH", `/api/transactions/${id}/categorize`, { category, isBusinessExpense });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
    },
  });

  const addTransaction = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("POST", "/api/transactions", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
      setShowAddTransaction(false);
    },
  });

  const handleCategorize = (transactionId: number, category: string, isBusinessExpense: boolean) => {
    categorizeTransaction.mutate({ id: transactionId, category, isBusinessExpense });
  };

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR'
    }).format(parseFloat(amount));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-NL');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Transactiebeheer</h2>
          <p className="text-muted-foreground">
            Beheer je banktransacties en categoriseer zakelijke uitgaven
          </p>
        </div>
        <Button onClick={() => setShowAddTransaction(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Transactie Toevoegen
        </Button>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transacties</TabsTrigger>
          <TabsTrigger value="upload">Import</TabsTrigger>
          <TabsTrigger value="accounts">Bankrekeningen</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Selecteer Bankrekening</CardTitle>
              <CardDescription>
                Kies een bankrekening om transacties te bekijken
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select
                value={selectedAccount?.toString() || ""}
                onValueChange={(value) => setSelectedAccount(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecteer een bankrekening" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id.toString()}>
                      {account.bankName} - {account.accountNumber} ({account.accountType})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {selectedAccount && (
            <Card>
              <CardHeader>
                <CardTitle>Transacties</CardTitle>
                <CardDescription>
                  Categoriseer transacties als zakelijke uitgaven voor belastingaftrek
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{transaction.description}</span>
                          {transaction.isApproved && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(transaction.date)}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className={`font-medium ${
                            parseFloat(transaction.amount) >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {formatCurrency(transaction.amount)}
                          </div>
                          {transaction.btwAmount && (
                            <div className="text-sm text-muted-foreground">
                              BTW: {formatCurrency(transaction.btwAmount)}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {transaction.isBusinessExpense ? (
                            <Badge variant="default">Zakelijk</Badge>
                          ) : (
                            <Badge variant="secondary">Privé</Badge>
                          )}
                          
                          {transaction.category && (
                            <Badge variant="outline">{transaction.category}</Badge>
                          )}
                        </div>

                        <Select
                          value={transaction.category || ""}
                          onValueChange={(category) => 
                            handleCategorize(transaction.id, category, true)
                          }
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Categoriseren" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kantoorkosten">Kantoorkosten</SelectItem>
                            <SelectItem value="transport">Transport</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="software">Software</SelectItem>
                            <SelectItem value="communicatie">Communicatie</SelectItem>
                            <SelectItem value="onderwijs">Onderwijs</SelectItem>
                            <SelectItem value="representatie">Representatie</SelectItem>
                            <SelectItem value="overig">Overig</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bankafschrift Importeren</CardTitle>
              <CardDescription>
                Upload een CSV-bestand van je bank (ING, Rabobank, ABN AMRO)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Sleep bestanden hierheen</h3>
                <p className="text-muted-foreground mb-4">
                  of klik om een bestand te selecteren
                </p>
                <Button>Bestand Selecteren</Button>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-2">Ondersteunde formaten:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• ING CSV exports</li>
                  <li>• Rabobank CSV exports</li>
                  <li>• ABN AMRO CSV exports</li>
                  <li>• Standaard CSV met datum, bedrag, omschrijving</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bankrekeningen</CardTitle>
              <CardDescription>
                Beheer je gekoppelde bankrekeningen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {accounts.map((account) => (
                  <div
                    key={account.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{account.bankName}</div>
                      <div className="text-sm text-muted-foreground">
                        {account.accountNumber} • {account.accountType}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {account.isActive ? (
                        <Badge variant="default">Actief</Badge>
                      ) : (
                        <Badge variant="secondary">Inactief</Badge>
                      )}
                      <Button variant="outline" size="sm">
                        Bewerken
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Bankrekening Toevoegen
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}