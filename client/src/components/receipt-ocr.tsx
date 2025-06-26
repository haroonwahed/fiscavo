import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Upload, FileText, CheckCircle, AlertCircle, Scan, Euro } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";

interface ExtractedReceiptData {
  merchant: string;
  amount: number;
  date: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  vatAmount: number;
  vatRate: number;
  category: string;
  confidence: number;
}

interface Receipt {
  id: number;
  transactionId?: number;
  imageUrl: string;
  extractedData: ExtractedReceiptData;
  isVerified: boolean;
  createdAt: string;
}

export function ReceiptOCR() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [processing, setProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedReceiptData | null>(null);
  const [editMode, setEditMode] = useState(false);

  const { data: receipts = [], isLoading } = useQuery<Receipt[]>({
    queryKey: ["/api/receipts"],
    enabled: !!user,
  });

  const uploadReceipt = useMutation({
    mutationFn: async (file: File) => {
      setProcessing(true);
      const formData = new FormData();
      formData.append('receipt', file);
      formData.append('userId', (user as any)?.id);
      
      return apiRequest("POST", "/api/receipts/upload", formData);
    },
    onSuccess: (data: any) => {
      setExtractedData(data.extractedData);
      setProcessing(false);
      queryClient.invalidateQueries({ queryKey: ["/api/receipts"] });
    },
    onError: () => {
      setProcessing(false);
    }
  });

  const saveReceipt = useMutation({
    mutationFn: async (data: ExtractedReceiptData) => {
      return apiRequest("POST", "/api/receipts", {
        userId: (user as any)?.id,
        extractedData: data,
        isVerified: true
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/receipts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
      setExtractedData(null);
      setEditMode(false);
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadReceipt.mutate(file);
    }
  };

  const handleCameraCapture = () => {
    // Simulate camera capture for demo
    const mockExtractedData: ExtractedReceiptData = {
      merchant: "Office Depot Nederland",
      amount: 45.60,
      date: new Date().toISOString().split('T')[0],
      items: [
        { description: "Printerpapier A4", quantity: 1, unitPrice: 12.50, total: 12.50 },
        { description: "Balpennen (set)", quantity: 2, unitPrice: 8.95, total: 17.90 },
        { description: "Ordners", quantity: 3, unitPrice: 5.10, total: 15.30 }
      ],
      vatAmount: 9.58,
      vatRate: 21,
      category: "Kantoorkosten",
      confidence: 94
    };
    
    setProcessing(true);
    setTimeout(() => {
      setExtractedData(mockExtractedData);
      setProcessing(false);
    }, 2000);
  };

  const handleSave = () => {
    if (extractedData) {
      saveReceipt.mutate(extractedData);
    }
  };

  const calculateTotalDeduction = (data: ExtractedReceiptData) => {
    return data.amount * 0.21; // 21% BTW
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-xl">
        <h2 className="text-2xl font-bold flex items-center">
          <Scan className="h-8 w-8 mr-3" />
          Bonnetjes Scanner
        </h2>
        <p className="text-green-100 mt-2">
          Scan je bonnetjes en laat AI automatisch alle gegevens extraheren
        </p>
      </div>

      {/* Upload Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Camera className="h-5 w-5 mr-2" />
              Foto Maken
            </CardTitle>
            <CardDescription>
              Maak een foto van je bonnetje met je camera
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleCameraCapture}
              disabled={processing}
              className="w-full bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              <Camera className="h-5 w-5 mr-2" />
              Open Camera
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              Bestand Uploaden
            </CardTitle>
            <CardDescription>
              Upload een foto van je bonnetje vanaf je apparaat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button 
              onClick={() => fileInputRef.current?.click()}
              disabled={processing}
              variant="outline"
              className="w-full"
              size="lg"
            >
              <Upload className="h-5 w-5 mr-2" />
              Selecteer Bestand
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Processing State */}
      {processing && (
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <h3 className="text-lg font-semibold">AI analyseert je bonnetje...</h3>
              <p className="text-gray-600">
                Onze AI extraheert automatisch alle relevante informatie
              </p>
              <Progress value={processing ? 65 : 0} className="w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Extracted Data Review */}
      {extractedData && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  Geëxtraheerde Gegevens
                </CardTitle>
                <CardDescription>
                  Controleer en bewerk de gegevens voordat je opslaat
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">
                  {extractedData.confidence}% zekerheid
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setEditMode(!editMode)}
                >
                  {editMode ? 'Bekijken' : 'Bewerken'}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Leverancier</Label>
                {editMode ? (
                  <Input 
                    value={extractedData.merchant}
                    onChange={(e) => setExtractedData({
                      ...extractedData,
                      merchant: e.target.value
                    })}
                  />
                ) : (
                  <div className="font-semibold">{extractedData.merchant}</div>
                )}
              </div>
              <div>
                <Label>Datum</Label>
                {editMode ? (
                  <Input 
                    type="date"
                    value={extractedData.date}
                    onChange={(e) => setExtractedData({
                      ...extractedData,
                      date: e.target.value
                    })}
                  />
                ) : (
                  <div className="font-semibold">{extractedData.date}</div>
                )}
              </div>
              <div>
                <Label>Categorie</Label>
                {editMode ? (
                  <Select 
                    value={extractedData.category}
                    onValueChange={(value) => setExtractedData({
                      ...extractedData,
                      category: value
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kantoorkosten">Kantoorkosten</SelectItem>
                      <SelectItem value="Transport">Transport</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Telefoon/Internet">Telefoon/Internet</SelectItem>
                      <SelectItem value="Overig">Overig</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge variant="secondary">{extractedData.category}</Badge>
                )}
              </div>
            </div>

            {/* Items Table */}
            <div>
              <Label className="text-base font-semibold">Artikelen</Label>
              <div className="border rounded-lg mt-2">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3">Beschrijving</th>
                      <th className="text-right p-3">Aantal</th>
                      <th className="text-right p-3">Prijs</th>
                      <th className="text-right p-3">Totaal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {extractedData.items.map((item, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-3">{item.description}</td>
                        <td className="text-right p-3">{item.quantity}</td>
                        <td className="text-right p-3">€{item.unitPrice.toFixed(2)}</td>
                        <td className="text-right p-3">€{item.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-sm text-gray-600">Subtotaal</div>
                  <div className="text-lg font-bold">
                    €{(extractedData.amount - extractedData.vatAmount).toFixed(2)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">BTW ({extractedData.vatRate}%)</div>
                  <div className="text-lg font-bold text-blue-600">
                    €{extractedData.vatAmount.toFixed(2)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">Totaal</div>
                  <div className="text-xl font-bold">
                    €{extractedData.amount.toFixed(2)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">Aftrekbaar</div>
                  <div className="text-xl font-bold text-green-600">
                    €{calculateTotalDeduction(extractedData).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <Button 
                onClick={handleSave}
                disabled={saveReceipt.isPending}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Opslaan & Toevoegen aan Transacties
              </Button>
              <Button variant="outline">
                Opnieuw Scannen
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Receipts */}
      <Card>
        <CardHeader>
          <CardTitle>Recente Bonnetjes</CardTitle>
          <CardDescription>
            Je laatst gescande en geverifieerde bonnetjes
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse flex space-x-3 p-3 border rounded-lg">
                  <div className="w-16 h-16 bg-gray-200 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : receipts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>Nog geen bonnetjes gescand</p>
              <p className="text-sm">Begin met het uploaden van je eerste bonnetje</p>
            </div>
          ) : (
            <div className="space-y-3">
              {receipts.slice(0, 5).map((receipt) => (
                <div key={receipt.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                    <FileText className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold">{receipt.extractedData.merchant}</h4>
                      {receipt.isVerified && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {receipt.extractedData.date} • {receipt.extractedData.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">€{receipt.extractedData.amount.toFixed(2)}</div>
                    <div className="text-sm text-green-600">
                      €{calculateTotalDeduction(receipt.extractedData).toFixed(2)} aftrek
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}