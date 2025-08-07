import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Banknote, Building2 } from "lucide-react";

const bankAccountSchema = z.object({
  bankName: z.string().min(1, "Selecteer een bank"),
  accountNumber: z.string().min(1, "Voer een rekeningnummer in"),
  accountType: z.string().min(1, "Selecteer een type rekening"),
});

type BankAccountFormData = z.infer<typeof bankAccountSchema>;

interface AddBankAccountFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function AddBankAccountForm({ onSuccess, onCancel }: AddBankAccountFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<BankAccountFormData>({
    resolver: zodResolver(bankAccountSchema),
    defaultValues: {
      bankName: "",
      accountNumber: "",
      accountType: "",
    },
  });

  const addBankAccountMutation = useMutation({
    mutationFn: async (data: BankAccountFormData) => {
      return apiRequest("POST", "/api/bank-accounts", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bank-accounts"] });
      toast({
        title: "Bankrekening toegevoegd",
        description: "De bankrekening is succesvol toegevoegd.",
      });
      onSuccess();
    },
    onError: () => {
      toast({
        title: "Fout",
        description: "Er is een fout opgetreden bij het toevoegen van de bankrekening.",
        variant: "destructive",
      });
    },
  });

  const dutchBanks = [
    "ING",
    "Rabobank", 
    "ABN AMRO",
    "ASN Bank",
    "Bunq",
    "Knab",
    "RegioBank",
    "SNS Bank",
    "Triodos Bank",
    "Van Lanschot",
    "Overig"
  ];

  const accountTypes = [
    { value: "zakelijk", label: "Zakelijke rekening" },
    { value: "privé", label: "Privé rekening" },
    { value: "spaarrekening", label: "Spaarrekening" }
  ];

  const validateIBAN = (iban: string): boolean => {
    // Basic IBAN validation for Dutch format
    const cleanIban = iban.replace(/\s/g, '').toUpperCase();
    if (cleanIban.length !== 18) return false;
    if (!cleanIban.startsWith('NL')) return false;
    
    // Basic checksum validation (simplified)
    const rearranged = cleanIban.slice(4) + cleanIban.slice(0, 4);
    const numericString = rearranged.replace(/[A-Z]/g, (char) => (char.charCodeAt(0) - 65 + 10).toString());
    
    // Modulo 97 check
    let remainder = 0;
    for (let i = 0; i < numericString.length; i += 7) {
      const chunk = numericString.slice(i, i + 7);
      remainder = (remainder + parseInt(chunk)) % 97;
    }
    
    return remainder === 1;
  };

  const formatIBAN = (value: string): string => {
    // Remove spaces and convert to uppercase
    const cleanValue = value.replace(/\s/g, '').toUpperCase();
    
    // Add spaces every 4 characters
    return cleanValue.match(/.{1,4}/g)?.join(' ') || cleanValue;
  };

  const onSubmit = (data: BankAccountFormData) => {
    // Validate IBAN format
    const cleanIban = data.accountNumber.replace(/\s/g, '');
    if (cleanIban.startsWith('NL') && !validateIBAN(cleanIban)) {
      toast({
        title: "Ongeldig IBAN",
        description: "Het ingevoerde IBAN nummer is niet geldig.",
        variant: "destructive",
      });
      return;
    }
    
    addBankAccountMutation.mutate(data);
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Nieuwe Bankrekening Toevoegen
        </CardTitle>
        <CardDescription>
          Voeg een nieuwe bankrekening toe om transacties te kunnen importeren en beheren
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Bank Selection */}
            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecteer je bank" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {dutchBanks.map((bank) => (
                        <SelectItem key={bank} value={bank}>
                          {bank}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Account Number */}
            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rekeningnummer / IBAN</FormLabel>
                  <div className="relative">
                    <Banknote className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="NL12 ABCD 1234 5678 90"
                        className="pl-9 uppercase"
                        onChange={(e) => {
                          const formatted = formatIBAN(e.target.value);
                          field.onChange(formatted);
                        }}
                        maxLength={22} // Max length for formatted Dutch IBAN
                      />
                    </FormControl>
                  </div>
                  <FormDescription>
                    Voer je IBAN nummer in (Nederlandse rekening: NL + 16 cijfers)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Account Type */}
            <FormField
              control={form.control}
              name="accountType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type Rekening</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecteer het type rekening" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {accountTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Zakelijke rekeningen zijn beter geschikt voor belastingdoeleinden
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Additional Info */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">💡 Tip</h4>
              <p className="text-sm text-blue-800">
                Na het toevoegen van je bankrekening kun je CSV-bestanden van je bank importeren 
                om al je transacties automatisch toe te voegen.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Annuleren
              </Button>
              <Button
                type="submit"
                disabled={addBankAccountMutation.isPending}
              >
                {addBankAccountMutation.isPending ? "Toevoegen..." : "Bankrekening Toevoegen"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}