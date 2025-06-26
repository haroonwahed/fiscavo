import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  Bell, 
  Mail, 
  Calendar, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign
} from "lucide-react";

interface NotificationSettings {
  deadlineReminders: boolean;
  deadlineReminderDays: number;
  weeklyReports: boolean;
  weeklyReportDay: string;
  transactionAlerts: boolean;
  btwDeadlines: boolean;
  taxUpdates: boolean;
  emailFrequency: 'immediate' | 'daily' | 'weekly';
}

export function NotificationSettings() {
  const [settings, setSettings] = useState<NotificationSettings>({
    deadlineReminders: true,
    deadlineReminderDays: 7,
    weeklyReports: true,
    weeklyReportDay: 'monday',
    transactionAlerts: false,
    btwDeadlines: true,
    taxUpdates: true,
    emailFrequency: 'weekly'
  });

  const { toast } = useToast();

  const saveSettingsMutation = useMutation({
    mutationFn: async (newSettings: NotificationSettings) => {
      return await apiRequest('/api/user/notification-settings', {
        method: 'PUT',
        body: newSettings
      });
    },
    onSuccess: () => {
      toast({
        title: "Instellingen opgeslagen",
        description: "Je notificatie-instellingen zijn bijgewerkt.",
      });
    },
    onError: () => {
      toast({
        title: "Fout bij opslaan",
        description: "Er ging iets mis bij het opslaan van je instellingen.",
        variant: "destructive",
      });
    }
  });

  const testReminderMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest('/api/notifications/deadline-reminder', {
        method: 'POST',
        body: {
          deadline: {
            title: "Test Herinnering",
            description: "Dit is een test van je notificatie-instellingen.",
            deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
          }
        }
      });
    },
    onSuccess: () => {
      toast({
        title: "Test email verzonden",
        description: "Controleer je inbox voor de test herinnering.",
      });
    }
  });

  const updateSetting = (key: keyof NotificationSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    saveSettingsMutation.mutate(settings);
  };

  const dayOptions = [
    { value: 'monday', label: 'Maandag' },
    { value: 'tuesday', label: 'Dinsdag' },
    { value: 'wednesday', label: 'Woensdag' },
    { value: 'thursday', label: 'Donderdag' },
    { value: 'friday', label: 'Vrijdag' },
    { value: 'saturday', label: 'Zaterdag' },
    { value: 'sunday', label: 'Zondag' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Notificatie-instellingen</h2>
        <p className="text-gray-600">Beheer wanneer en hoe je berichten van Fiscavo ontvangt</p>
      </div>

      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-blue-600" />
            <CardTitle>Email notificaties</CardTitle>
          </div>
          <CardDescription>
            Ontvang belangrijke updates en herinneringen via email
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium">Deadline herinneringen</Label>
              <p className="text-sm text-gray-600">
                Krijg een email voordat belangrijke belastingdeadlines verlopen
              </p>
            </div>
            <Switch
              checked={settings.deadlineReminders}
              onCheckedChange={(checked) => updateSetting('deadlineReminders', checked)}
            />
          </div>

          {settings.deadlineReminders && (
            <div className="ml-6 space-y-2">
              <Label htmlFor="reminderDays">Aantal dagen van tevoren</Label>
              <Select 
                value={settings.deadlineReminderDays.toString()} 
                onValueChange={(value) => updateSetting('deadlineReminderDays', parseInt(value))}
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 dag</SelectItem>
                  <SelectItem value="3">3 dagen</SelectItem>
                  <SelectItem value="7">7 dagen</SelectItem>
                  <SelectItem value="14">14 dagen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium">Wekelijks rapport</Label>
              <p className="text-sm text-gray-600">
                Ontvang een overzicht van je financiële activiteiten
              </p>
            </div>
            <Switch
              checked={settings.weeklyReports}
              onCheckedChange={(checked) => updateSetting('weeklyReports', checked)}
            />
          </div>

          {settings.weeklyReports && (
            <div className="ml-6 space-y-2">
              <Label htmlFor="reportDay">Verzenddag</Label>
              <Select 
                value={settings.weeklyReportDay} 
                onValueChange={(value) => updateSetting('weeklyReportDay', value)}
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dayOptions.map(day => (
                    <SelectItem key={day.value} value={day.value}>
                      {day.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium">BTW deadline meldingen</Label>
              <p className="text-sm text-gray-600">
                Specifieke herinneringen voor BTW-aangiftes
              </p>
            </div>
            <Switch
              checked={settings.btwDeadlines}
              onCheckedChange={(checked) => updateSetting('btwDeadlines', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium">Belastingwet updates</Label>
              <p className="text-sm text-gray-600">
                Blijf op de hoogte van wijzigingen in Nederlandse belastingwetgeving
              </p>
            </div>
            <Switch
              checked={settings.taxUpdates}
              onCheckedChange={(checked) => updateSetting('taxUpdates', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Smart Alerts */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-orange-600" />
            <CardTitle>Slimme waarschuwingen</CardTitle>
          </div>
          <CardDescription>
            Automatische meldingen gebaseerd op je activiteiten
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium">Transactie waarschuwingen</Label>
              <p className="text-sm text-gray-600">
                Krijg een melding bij grote of ongebruikelijke uitgaven
              </p>
            </div>
            <Switch
              checked={settings.transactionAlerts}
              onCheckedChange={(checked) => updateSetting('transactionAlerts', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Email Frequency */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-green-600" />
            <CardTitle>Email frequentie</CardTitle>
          </div>
          <CardDescription>
            Hoe vaak wil je emails ontvangen?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select 
            value={settings.emailFrequency} 
            onValueChange={(value: 'immediate' | 'daily' | 'weekly') => updateSetting('emailFrequency', value)}
          >
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediate">Onmiddellijk</SelectItem>
              <SelectItem value="daily">Dagelijks samengevat</SelectItem>
              <SelectItem value="weekly">Wekelijks samengevat</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-600 mt-2">
            {settings.emailFrequency === 'immediate' && 'Krijg emails zodra er iets gebeurt'}
            {settings.emailFrequency === 'daily' && 'Ontvang één email per dag met alle updates'}
            {settings.emailFrequency === 'weekly' && 'Ontvang één email per week met alle updates'}
          </p>
        </CardContent>
      </Card>

      {/* Test Notifications */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-blue-600" />
            <CardTitle>Test je instellingen</CardTitle>
          </div>
          <CardDescription>
            Verstuur een test email om te controleren of alles goed werkt
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            variant="outline" 
            onClick={() => testReminderMutation.mutate()}
            disabled={testReminderMutation.isPending}
            className="border-blue-300 text-blue-700 hover:bg-blue-100"
          >
            {testReminderMutation.isPending ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Verzenden...
              </>
            ) : (
              <>
                <Mail className="h-4 w-4 mr-2" />
                Test email versturen
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Save Settings */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline">
          Annuleren
        </Button>
        <Button 
          onClick={handleSave}
          disabled={saveSettingsMutation.isPending}
        >
          {saveSettingsMutation.isPending ? (
            <>
              <Clock className="h-4 w-4 mr-2 animate-spin" />
              Opslaan...
            </>
          ) : (
            "Instellingen opslaan"
          )}
        </Button>
      </div>
    </div>
  );
}