import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Car, Plus, MapPin, Calculator } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";

interface MileageEntry {
  id: number;
  date: string;
  startLocation: string;
  endLocation: string;
  distance: string;
  purpose: string;
  rate: string;
  totalAmount: string;
  isApproved: boolean;
  createdAt: string;
}

export function MileageTracker() {
  const { user } = useAuth();
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    startLocation: "",
    endLocation: "",
    distance: "",
    purpose: "",
    rate: "0.23"
  });
  const queryClient = useQueryClient();

  const { data: entries = [] } = useQuery<MileageEntry[]>({
    queryKey: ["/api/mileage"],
  });

  const addEntry = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("POST", "/api/mileage", {
        ...data,
        userId: (user as any)?.id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/mileage"] });
      setShowAddEntry(false);
      setFormData({
        date: new Date().toISOString().split('T')[0],
        startLocation: "",
        endLocation: "",
        distance: "",
        purpose: "",
        rate: "0.23"
      });
    },
  });

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR'
    }).format(parseFloat(amount));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-NL');
  };

  const calculateEstimatedAmount = () => {
    const distance = parseFloat(formData.distance || "0");
    const rate = parseFloat(formData.rate || "0.23");
    return (distance * rate).toFixed(2);
  };

  const totalKilometers = entries.reduce((sum, entry) => sum + parseFloat(entry.distance), 0);
  const totalDeduction = entries.reduce((sum, entry) => sum + parseFloat(entry.totalAmount), 0);
  const approvedEntries = entries.filter(entry => entry.isApproved).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEntry.mutate(formData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Kilometerregistratie</h2>
          <p className="text-muted-foreground">
            Registreer zakelijke ritten voor €0.23 per kilometer aftrek
          </p>
        </div>
        <Dialog open={showAddEntry} onOpenChange={setShowAddEntry}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Rit Toevoegen
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Nieuwe Zakelijke Rit</DialogTitle>
              <DialogDescription>
                Voeg een zakelijke rit toe voor kilometerkostenvergoeding
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="date">Datum</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startLocation">Van</Label>
                  <Input
                    id="startLocation"
                    placeholder="Startlocatie"
                    value={formData.startLocation}
                    onChange={(e) => setFormData({...formData, startLocation: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="endLocation">Naar</Label>
                  <Input
                    id="endLocation"
                    placeholder="Eindlocatie"
                    value={formData.endLocation}
                    onChange={(e) => setFormData({...formData, endLocation: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="distance">Kilometers</Label>
                  <Input
                    id="distance"
                    type="number"
                    step="0.1"
                    placeholder="0.0"
                    value={formData.distance}
                    onChange={(e) => setFormData({...formData, distance: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="rate">Tarief per km</Label>
                  <Input
                    id="rate"
                    type="number"
                    step="0.01"
                    value={formData.rate}
                    onChange={(e) => setFormData({...formData, rate: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="purpose">Doel van de rit</Label>
                <Textarea
                  id="purpose"
                  placeholder="Beschrijf het zakelijke doel van deze rit"
                  value={formData.purpose}
                  onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                  required
                />
              </div>

              {formData.distance && (
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium">
                    Geschatte aftrek: {formatCurrency(calculateEstimatedAmount())}
                  </p>
                </div>
              )}

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddEntry(false)}
                >
                  Annuleren
                </Button>
                <Button type="submit" disabled={addEntry.isPending}>
                  {addEntry.isPending ? "Opslaan..." : "Rit Opslaan"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Car className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{totalKilometers.toFixed(1)} km</p>
                <p className="text-sm text-muted-foreground">Totaal gereden</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{formatCurrency(totalDeduction.toString())}</p>
                <p className="text-sm text-muted-foreground">Totale aftrek</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{approvedEntries}</p>
                <p className="text-sm text-muted-foreground">Goedgekeurde ritten</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recente Ritten</CardTitle>
          <CardDescription>
            Overzicht van je geregistreerde zakelijke ritten
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {entries.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Car className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nog geen ritten geregistreerd</p>
                <p className="text-sm">Voeg je eerste zakelijke rit toe</p>
              </div>
            ) : (
              entries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">
                        {entry.startLocation} → {entry.endLocation}
                      </span>
                      {entry.isApproved && (
                        <Badge variant="default" className="text-xs">Goedgekeurd</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {entry.purpose}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(entry.date)}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-medium">
                      {parseFloat(entry.distance).toFixed(1)} km
                    </div>
                    <div className="text-sm text-green-600">
                      {formatCurrency(entry.totalAmount)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      €{entry.rate}/km
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Kilometervergoeding Info</CardTitle>
          <CardDescription>
            Belangrijke informatie over zakelijke kilometerregistratie
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Huidige tarieven 2024:</h4>
              <ul className="text-sm space-y-1">
                <li>• €0.23 per kilometer voor zakelijke ritten</li>
                <li>• Maximaal 40.000 km per jaar aftrekbaar</li>
                <li>• Woon-werkverkeer is niet aftrekbaar</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Vereiste registratie:</h4>
              <ul className="text-sm space-y-1">
                <li>• Datum en tijd van de rit</li>
                <li>• Start- en eindlocatie</li>
                <li>• Aantal kilometers</li>
                <li>• Zakelijk doel van de rit</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Tips:</h4>
              <ul className="text-sm space-y-1">
                <li>• Gebruik een rittenregistratie-app voor automatische tracking</li>
                <li>• Bewaar tankbonnen als extra bewijs</li>
                <li>• Registreer ritten direct na afloop</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}