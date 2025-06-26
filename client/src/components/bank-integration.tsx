import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  Banknote, 
  Plus, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle, 
  Download,
  ExternalLink,
  Shield,
  Clock
} from "lucide-react";

interface BankAccount {
  id: string;
  iban: string;
  bankName: string;
  accountType: 'business' | 'personal';
  balance: number;
  currency: string;
}

export function BankIntegration() {
  const [showAddBank, setShowAddBank] = useState(false);
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [iban, setIban] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [ibanValidation, setIbanValidation] = useState<{ isValid: boolean; bankName?: string } | null>(null);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: accounts = [], isLoading } = useQuery({
    queryKey: ['/api/banks/accounts'],
  });

  const validateIbanMutation = useMutation({
    mutationFn: async (iban: string) => {
      return await apiRequest('/api/banks/validate-iban', {
        method: 'POST',
        body: { iban }
      });
    },
    onSuccess: (data) => {
      setIbanValidation(data);
      if (data.isValid && data.bankName) {
        setSelectedBank(data.bankName);
      }
    }
  });

  const connectBankMutation = useMutation({
    mutationFn: async ({ bankCode, credentials }: { bankCode: string; credentials: any }) => {
      return await apiRequest('/api/banks/connect', {
        method: 'POST',
        body: { bankCode, credentials }
      });
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Bank verbonden",
          description: "Je bank is succesvol verbonden en transacties worden gesynchroniseerd.",
        });
        queryClient.invalidateQueries({ queryKey: ['/api/banks/accounts'] });
        setShowAddBank(false);
        setIban("");
        setSelectedBank("");
        setIbanValidation(null);
      } else {
        toast({
          title: "Verbinding mislukt",
          description: data.error || "Er ging iets mis bij het verbinden van je bank.",
          variant: "destructive",
        });
      }
    }
  });

  const syncTransactionsMutation = useMutation({
    mutationFn: async (accountId: string) => {
      return await apiRequest(`/api/banks/${accountId}/sync`, {
        method: 'POST',
      });
    },
    onSuccess: (data) => {
      toast({
        title: "Transacties gesynchroniseerd",
        description: `${data.newTransactions} nieuwe transacties toegevoegd.`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/transactions'] });
    }
  });

  const handleValidateIban = async () => {
    if (!iban.trim()) return;
    
    setIsValidating(true);
    await validateIbanMutation.mutateAsync(iban);
    setIsValidating(false);
  };

  const handleConnectBank = () => {
    if (!selectedBank || !iban) {
      toast({
        title: "Vul alle velden in",
        description: "Selecteer een bank en voer je IBAN in.",
        variant: "destructive",
      });
      return;
    }

    connectBankMutation.mutate({
      bankCode: selectedBank.toUpperCase().replace(/\s/g, ''),
      credentials: { iban }
    });
  };

  const dutchBanks = [
    "ING Bank",
    "ABN AMRO",
    "Rabobank",
    "SNS Bank",
    "ASN Bank",
    "Triodos Bank",
    "Knab",
    "bunq"
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Bankintegratie</h2>
          <p className="text-gray-600">Verbind je bankrekeningen voor automatische transactiesynchronisatie</p>
        </div>
        <Button onClick={() => setShowAddBank(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Bank toevoegen
        </Button>
      </div>

      {/* Security Notice */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900">Veilig en betrouwbaar</h3>
              <p className="text-sm text-blue-700 mt-1">
                Alle bankverbindingen maken gebruik van bank-level encryptie en voldoen aan Nederlandse 
                financiële regelgeving. Je inloggegevens worden nooit opgeslagen.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Connected Accounts */}
      {accounts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Verbonden rekeningen</h3>
          {accounts.map((account: BankAccount) => (
            <Card key={account.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Banknote className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{account.bankName}</h4>
                      <p className="text-sm text-gray-600">{account.iban}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant={account.accountType === 'business' ? 'default' : 'secondary'}>
                          {account.accountType === 'business' ? 'Zakelijk' : 'Privé'}
                        </Badge>
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Actief
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                      €{account.balance.toLocaleString('nl-NL', { minimumFractionDigits: 2 })}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => syncTransactionsMutation.mutate(account.id)}
                      disabled={syncTransactionsMutation.isPending}
                      className="mt-2"
                    >
                      {syncTransactionsMutation.isPending ? (
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <RefreshCw className="h-4 w-4 mr-2" />
                      )}
                      Synchroniseren
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* No accounts state */}
      {accounts.length === 0 && !isLoading && (
        <Card className="text-center py-12">
          <CardContent>
            <Banknote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Geen bankrekeningen verbonden</h3>
            <p className="text-gray-600 mb-6">
              Verbind je bankrekening om automatisch transacties te importeren en je administratie te vereenvoudigen.
            </p>
            <Button onClick={() => setShowAddBank(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Eerste bank toevoegen
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Add Bank Modal/Form */}
      {showAddBank && (
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle>Bank toevoegen</CardTitle>
            <CardDescription>
              Verbind je Nederlandse bankrekening voor automatische transactiesynchronisatie
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="iban">IBAN</Label>
              <div className="flex space-x-2">
                <Input
                  id="iban"
                  placeholder="NL91 ABNA 0417 1643 00"
                  value={iban}
                  onChange={(e) => {
                    setIban(e.target.value);
                    setIbanValidation(null);
                  }}
                  className={ibanValidation?.isValid === false ? "border-red-500" : ""}
                />
                <Button
                  variant="outline"
                  onClick={handleValidateIban}
                  disabled={isValidating || !iban.trim()}
                >
                  {isValidating ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    "Valideren"
                  )}
                </Button>
              </div>
              {ibanValidation && (
                <div className={`flex items-center space-x-2 text-sm ${
                  ibanValidation.isValid ? 'text-green-600' : 'text-red-600'
                }`}>
                  {ibanValidation.isValid ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <span>
                    {ibanValidation.isValid 
                      ? `Geldig IBAN - ${ibanValidation.bankName}` 
                      : 'Ongeldig IBAN'
                    }
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bank">Bank</Label>
              <Select value={selectedBank} onValueChange={setSelectedBank}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecteer je bank" />
                </SelectTrigger>
                <SelectContent>
                  {dutchBanks.map((bank) => (
                    <SelectItem key={bank} value={bank}>
                      {bank}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Coming Soon Notice */}
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="pt-4">
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-900">Binnenkort beschikbaar</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Directe bankintegratie wordt momenteel ontwikkeld. Voor nu kun je transacties handmatig toevoegen 
                      of CSV-bestanden importeren vanuit je online banking.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Separator />

            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowAddBank(false);
                  setIban("");
                  setSelectedBank("");
                  setIbanValidation(null);
                }}
              >
                Annuleren
              </Button>
              <Button 
                onClick={handleConnectBank}
                disabled={!selectedBank || !ibanValidation?.isValid || connectBankMutation.isPending}
              >
                {connectBankMutation.isPending ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Verbinden...
                  </>
                ) : (
                  "Bank verbinden"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Snelle acties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <div className="flex items-center space-x-2 mb-1">
                  <Download className="h-4 w-4" />
                  <span className="font-semibold">CSV importeren</span>
                </div>
                <p className="text-sm text-gray-600">Upload transacties vanuit je bank</p>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <div className="flex items-center space-x-2 mb-1">
                  <ExternalLink className="h-4 w-4" />
                  <span className="font-semibold">Online banking</span>
                </div>
                <p className="text-sm text-gray-600">Open je online banking</p>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <div className="flex items-center space-x-2 mb-1">
                  <Plus className="h-4 w-4" />
                  <span className="font-semibold">Handmatig toevoegen</span>
                </div>
                <p className="text-sm text-gray-600">Voeg transactie handmatig toe</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}