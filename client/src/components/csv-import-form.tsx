import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, CheckCircle, AlertCircle, Download } from "lucide-react";

const importSchema = z.object({
  bankAccountId: z.string().min(1, "Selecteer een bankrekening"),
  bankType: z.string().min(1, "Selecteer een banktype"),
  csvFile: z.instanceof(File).optional(),
});

type ImportFormData = z.infer<typeof importSchema>;

interface BankAccount {
  id: number;
  bankName: string;
  accountNumber: string;
  accountType: string;
  isActive: boolean;
}

interface CSVImportFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function CSVImportForm({ onSuccess, onCancel }: CSVImportFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [importResults, setImportResults] = useState<{ imported: number; transactions: any[] } | null>(null);

  const { data: bankAccounts = [] } = useQuery<BankAccount[]>({
    queryKey: ["/api/bank-accounts"],
  });

  const form = useForm<ImportFormData>({
    resolver: zodResolver(importSchema),
    defaultValues: {
      bankAccountId: "",
      bankType: "",
    },
  });

  const importTransactionsMutation = useMutation({
    mutationFn: async (data: { csvData: string; bankAccountId: string; bankType: string }) => {
      const response = await apiRequest("POST", "/api/transactions/import", data);
      return await response.json();
    },
    onSuccess: (result: { imported: number; transactions: any[] }) => {
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
      setImportResults(result);
      toast({
        title: "Import succesvol",
        description: `${result.imported} transacties zijn geïmporteerd.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Import mislukt",
        description: error.message || "Er is een fout opgetreden bij het importeren.",
        variant: "destructive",
      });
    },
  });

  const bankTypes = [
    { value: "ing", label: "ING Bank" },
    { value: "rabobank", label: "Rabobank" },
    { value: "abn", label: "ABN AMRO" },
    { value: "generic", label: "Algemeen CSV formaat" },
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setSelectedFile(file);
      form.setValue('csvFile', file);
    } else {
      toast({
        title: "Ongeldig bestand",
        description: "Selecteer een geldig CSV bestand.",
        variant: "destructive",
      });
    }
  };

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target?.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  const onSubmit = async (data: ImportFormData) => {
    if (!selectedFile) {
      toast({
        title: "Geen bestand geselecteerd",
        description: "Selecteer eerst een CSV bestand om te importeren.",
        variant: "destructive",
      });
      return;
    }

    try {
      setUploadProgress(25);
      const csvData = await readFileAsText(selectedFile);
      
      setUploadProgress(50);
      await importTransactionsMutation.mutateAsync({
        csvData,
        bankAccountId: data.bankAccountId,
        bankType: data.bankType,
      });
      
      setUploadProgress(100);
    } catch (error) {
      setUploadProgress(0);
    }
  };

  const downloadSampleCSV = (bankType: string) => {
    let sampleData = '';
    
    switch (bankType) {
      case 'ing':
        sampleData = 'Datum,Naam / Omschrijving,Rekening,Tegenrekening,Code,Af Bij,Bedrag,Munt,Toelichting\n2024-01-15,Supermarkt betaling,NL12INGB1234567890,NL98ABNA9876543210,BA,Af,45.67,EUR,Boodschappen\n2024-01-16,Salaris,NL12INGB1234567890,NL11RABO1111111111,GT,Bij,2500.00,EUR,Maandloon';
        break;
      case 'rabobank':
        sampleData = 'IBAN/BBAN,Munt,Datum,Bedrag,Naam,Omschrijving,Tegenrekening,Code\nNL12RABO1234567890,EUR,2024-01-15,-45.67,Supermarkt,Boodschappen,NL98ABNA9876543210,BA\nNL12RABO1234567890,EUR,2024-01-16,2500.00,Werkgever,Salaris,NL11RABO1111111111,GT';
        break;
      case 'abn':
        sampleData = 'Datum,Bedrag,Munt,Omschrijving,Naam,Tegenrekening,Code\n2024-01-15,-45.67,EUR,Boodschappen,Supermarkt,NL98ABNA9876543210,BA\n2024-01-16,2500.00,EUR,Salaris,Werkgever,NL11RABO1111111111,GT';
        break;
      default:
        sampleData = 'Datum,Bedrag,Omschrijving\n2024-01-15,-45.67,Supermarkt boodschappen\n2024-01-16,2500.00,Salaris ontvangen';
    }

    const blob = new Blob([sampleData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `voorbeeld-${bankType}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (importResults) {
    return (
      <div className="w-full">
        <div className="mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            Import Voltooid
          </h2>
          <p className="text-muted-foreground">
            Uw transacties zijn succesvol geïmporteerd
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
            <div>
              <h4 className="font-medium text-green-900">
                {importResults.imported} transacties geïmporteerd
              </h4>
              <p className="text-sm text-green-700">
                Alle transacties zijn toegevoegd aan je administratie
              </p>
            </div>
            <Badge variant="default" className="bg-green-600">
              Voltooid
            </Badge>
          </div>

          <div className="space-y-2">
            <h5 className="font-medium">Volgende stappen:</h5>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Controleer de geïmporteerde transacties</li>
              <li>Categoriseer zakelijke uitgaven voor belastingaftrek</li>
              <li>Upload bonnetjes voor belangrijke uitgaven</li>
            </ul>
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={onCancel}>
              Sluiten
            </Button>
            <Button onClick={onSuccess}>
              Transacties Bekijken
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Upload className="h-6 w-6" />
          CSV Transacties Importeren
        </h2>
        <p className="text-muted-foreground">
          Importeer transacties direct vanuit je bankafschrift
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
                        <SelectValue placeholder="Selecteer de doelrekening" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {bankAccounts.map((account) => (
                        <SelectItem key={account.id} value={account.id.toString()}>
                          {account.bankName} - {account.accountNumber}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Bank Type Selection */}
            <FormField
              control={form.control}
              name="bankType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Type / CSV Formaat</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecteer je bank" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {bankTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Elke bank heeft een eigen CSV-formaat. Selecteer de juiste voor de beste resultaten.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* File Upload Area */}
            <div className="space-y-4">
              <FormLabel>CSV Bestand</FormLabel>
              <div
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                {selectedFile ? (
                  <div className="flex flex-col items-center gap-2">
                    <FileText className="h-12 w-12 text-green-600" />
                    <div>
                      <p className="font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(selectedFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-12 w-12 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Sleep je CSV bestand hierheen</p>
                      <p className="text-sm text-muted-foreground">
                        of klik om een bestand te selecteren
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Importeren...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="w-full" />
              </div>
            )}

            {/* Sample Download */}
            {form.watch("bankType") && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-blue-900">Voorbeeld CSV downloaden</h4>
                    <p className="text-sm text-blue-800 mt-1">
                      Download een voorbeeld CSV bestand om het juiste formaat te zien
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => downloadSampleCSV(form.watch("bankType"))}
                    className="shrink-0"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            )}

            {/* Supported Formats */}
            <div className="space-y-2">
              <h5 className="font-medium text-sm">Ondersteunde formaten:</h5>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div>• ING Bank CSV exports</div>
                <div>• Rabobank CSV exports</div>
                <div>• ABN AMRO CSV exports</div>
                <div>• Standaard CSV formaten</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Annuleren
              </Button>
              <Button
                type="submit"
                disabled={importTransactionsMutation.isPending || !selectedFile}
              >
                {importTransactionsMutation.isPending ? "Importeren..." : "Transacties Importeren"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}