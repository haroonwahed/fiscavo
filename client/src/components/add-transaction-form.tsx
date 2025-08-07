import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Euro } from "lucide-react";

const transactionSchema = z.object({
  bankAccountId: z.string().min(1, "Selecteer een bankrekening"),
  amount: z.string().min(1, "Voer een bedrag in"),
  description: z.string().min(1, "Voer een beschrijving in"),
  date: z.string().min(1, "Voer een datum in"),
  category: z.string().optional(),
  isBusinessExpense: z.boolean().default(false),
  btwRate: z.string().optional(),
  btwAmount: z.string().optional(),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

interface BankAccount {
  id: number;
  bankName: string;
  accountNumber: string;
  accountType: string;
  isActive: boolean;
}

interface AddTransactionFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function AddTransactionForm({ onSuccess, onCancel }: AddTransactionFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [calculateBTW, setCalculateBTW] = useState(false);

  const { data: bankAccounts = [] } = useQuery<BankAccount[]>({
    queryKey: ["/api/bank-accounts"],
  });

  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      bankAccountId: "",
      amount: "",
      description: "",
      date: new Date().toISOString().split('T')[0],
      category: "",
      isBusinessExpense: false,
      btwRate: "",
      btwAmount: "",
    },
  });

  const addTransactionMutation = useMutation({
    mutationFn: async (data: TransactionFormData) => {
      return apiRequest("POST", "/api/transactions", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
      toast({
        title: "Transactie toegevoegd",
        description: "De transactie is succesvol toegevoegd.",
      });
      onSuccess();
    },
    onError: () => {
      toast({
        title: "Fout",
        description: "Er is een fout opgetreden bij het toevoegen van de transactie.",
        variant: "destructive",
      });
    },
  });

  const categories = [
    "kantoorkosten",
    "transport", 
    "marketing",
    "software",
    "communicatie",
    "onderwijs",
    "representatie",
    "overig"
  ];

  const btwRates = ["21", "9", "0"];

  // Calculate BTW amount when amount or rate changes
  const calculateBTWAmount = (amount: string, rate: string) => {
    if (!amount || !rate) return "";
    const amountNum = parseFloat(amount);
    const rateNum = parseFloat(rate);
    if (isNaN(amountNum) || isNaN(rateNum)) return "";
    
    // Calculate BTW from gross amount
    const btwAmount = (amountNum * rateNum) / (100 + rateNum);
    return btwAmount.toFixed(2);
  };

  const onSubmit = (data: TransactionFormData) => {
    addTransactionMutation.mutate(data);
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Nieuwe Transactie Toevoegen</h2>
        <p className="text-muted-foreground">
          Voeg een nieuwe transactie handmatig toe aan je administratie
        </p>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Bank Account Selection */}
            <FormField
              control={form.control}
              name="bankAccountId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bankrekening</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecteer een bankrekening" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {bankAccounts.map((account) => (
                        <SelectItem key={account.id} value={account.id.toString()}>
                          {account.bankName} - {account.accountNumber} ({account.accountType})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Amount and Date */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bedrag</FormLabel>
                    <div className="relative">
                      <Euro className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          className="pl-9"
                          onChange={(e) => {
                            field.onChange(e);
                            if (calculateBTW && form.watch("btwRate")) {
                              const btwAmount = calculateBTWAmount(e.target.value, form.watch("btwRate") || "");
                              form.setValue("btwAmount", btwAmount);
                            }
                          }}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Datum</FormLabel>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          {...field}
                          type="date"
                          className="pl-9"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Beschrijving</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Beschrijf waar deze transactie over gaat..."
                      className="min-h-[80px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Business Expense Toggle */}
            <FormField
              control={form.control}
              name="isBusinessExpense"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Zakelijke uitgave</FormLabel>
                    <FormDescription>
                      Is dit een zakelijke uitgave die aftrekbaar is voor belasting?
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        setCalculateBTW(checked);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Category (only when business expense) */}
            {form.watch("isBusinessExpense") && (
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categorie</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecteer een categorie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* BTW Section (only for business expenses) */}
            {form.watch("isBusinessExpense") && (
              <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium">BTW Informatie</h4>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="btwRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>BTW Tarief (%)</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            if (form.watch("amount")) {
                              const btwAmount = calculateBTWAmount(form.watch("amount"), value);
                              form.setValue("btwAmount", btwAmount);
                            }
                          }}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecteer BTW%" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {btwRates.map((rate) => (
                              <SelectItem key={rate} value={rate}>
                                {rate}%
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="btwAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>BTW Bedrag</FormLabel>
                        <div className="relative">
                          <Euro className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              step="0.01"
                              placeholder="0.00"
                              className="pl-9"
                              readOnly={calculateBTW}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Het BTW bedrag wordt automatisch berekend op basis van het totaalbedrag en tarief.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Annuleren
              </Button>
              <Button
                type="submit"
                disabled={addTransactionMutation.isPending}
              >
                {addTransactionMutation.isPending ? "Toevoegen..." : "Transactie Toevoegen"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}