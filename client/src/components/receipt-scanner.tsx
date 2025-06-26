import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, Check, X, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface ReceiptAnalysis {
  vendor: string;
  amount: number;
  date: string;
  category: string;
  confidence: number;
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  vatAmount?: number;
  vatRate?: number;
}

export function ReceiptScanner() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<ReceiptAnalysis | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const analyzeMutation = useMutation({
    mutationFn: async (base64Image: string) => {
      return await apiRequest('/api/ai/analyze-receipt-image', 'POST', { image: base64Image });
    },
    onSuccess: (result) => {
      setAnalysis(result);
      toast({
        title: "Bon geanalyseerd",
        description: `${result.vendor} - €${result.amount} (${Math.round(result.confidence * 100)}% zeker)`,
      });
    },
    onError: (error) => {
      toast({
        title: "Analyse mislukt",
        description: "Kon de bon niet analyseren. Probeer opnieuw.",
        variant: "destructive",
      });
    }
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeReceipt = () => {
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = (e.target?.result as string).split(',')[1];
      analyzeMutation.mutate(base64);
    };
    reader.readAsDataURL(selectedFile);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "bg-green-100 text-green-800";
    if (confidence >= 0.6) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Bon Scanner
          </CardTitle>
          <p className="text-sm text-gray-600">
            Upload een foto van je bon voor automatische gegevensextractie
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            {preview ? (
              <div className="space-y-4">
                <img src={preview} alt="Receipt preview" className="max-h-64 mx-auto rounded-lg" />
                <div className="flex gap-2 justify-center">
                  <Button
                    onClick={analyzeReceipt}
                    disabled={analyzeMutation.isPending}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {analyzeMutation.isPending ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Camera className="h-4 w-4 mr-2" />
                    )}
                    Analyseer Bon
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreview(null);
                      setAnalysis(null);
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Verwijder
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium">Upload een bon</p>
                  <p className="text-sm text-gray-500">
                    Ondersteunt JPG, PNG, PDF bestanden
                  </p>
                </div>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Selecteer Bestand
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {analysis && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Geanalyseerde Gegevens
              <Badge className={getConfidenceColor(analysis.confidence)}>
                {Math.round(analysis.confidence * 100)}% zeker
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Leverancier</Label>
                <Input value={analysis.vendor} readOnly />
              </div>
              <div>
                <Label>Datum</Label>
                <Input value={analysis.date} readOnly />
              </div>
              <div>
                <Label>Totaalbedrag</Label>
                <Input value={`€${analysis.amount}`} readOnly />
              </div>
              <div>
                <Label>Categorie</Label>
                <Input value={analysis.category} readOnly />
              </div>
              {analysis.vatAmount && (
                <>
                  <div>
                    <Label>BTW Bedrag</Label>
                    <Input value={`€${analysis.vatAmount}`} readOnly />
                  </div>
                  <div>
                    <Label>BTW Tarief</Label>
                    <Input value={`${analysis.vatRate}%`} readOnly />
                  </div>
                </>
              )}
            </div>

            {analysis.items.length > 0 && (
              <div>
                <Label className="text-base font-semibold">Items</Label>
                <div className="mt-2 space-y-2">
                  {analysis.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="font-medium">{item.description}</span>
                      <span className="text-sm text-gray-600">
                        {item.quantity}x €{item.unitPrice} = €{item.total}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-4 border-t">
              <Button className="bg-green-600 hover:bg-green-700">
                <Check className="h-4 w-4 mr-2" />
                Toevoegen aan Transacties
              </Button>
              <Button variant="outline">
                <X className="h-4 w-4 mr-2" />
                Gegevens Aanpassen
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}