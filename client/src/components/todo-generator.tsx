import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { CheckSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function TodoGenerator() {
  const [selectedDeadline, setSelectedDeadline] = useState<string>('');
  const [enableReminders, setEnableReminders] = useState(true);
  const [generatedTodos, setGeneratedTodos] = useState<string[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const generateTodoMutation = useMutation({
    mutationFn: async () => {
      const [title, dateStr] = selectedDeadline.split(' (');
      const deadline = new Date(dateStr.replace(')', ''));
      
      // Generate context-aware todos based on deadline type
      let tasks: string[] = [];
      
      if (title.includes('BTW')) {
        tasks = [
          'Verzamel alle inkomsten van het kwartaal',
          'Verzamel alle uitgaven en bonnetjes',
          'Controleer of alle facturen zijn verstuurd',
          'Bereken BTW over verkopen',
          'Bereken voorbelasting over inkopen',
          'Log in op Mijn Belastingdienst',
          'Vul BTW aangifte in',
          'Controleer en verstuur aangifte'
        ];
      } else if (title.includes('IB')) {
        tasks = [
          'Verzamel alle jaaromzet gegevens',
          'Maak overzicht van alle kosten',
          'Controleer aftrekposten',
          'Bereken winst over het jaar',
          'Vul inkomstenbelasting aangifte in',
          'Verstuur aangifte voor deadline'
        ];
      } else if (title.includes('Jaarrekening')) {
        tasks = [
          'Maak balans per 31 december',
          'Stel winst- en verliesrekening op',
          'Controleer alle boekingen',
          'Laat jaarrekening controleren door accountant',
          'Verstuur naar Kamer van Koophandel',
          'Verstuur naar Belastingdienst'
        ];
      }

      const response = await apiRequest('POST', '/api/todo-lists', {
        title: `${title} Checklist`,
        deadline,
        businessType: 'zzp',
        sector: 'IT',
        tasks
      });
      
      return response.json();
    },
    onSuccess: (data) => {
      setGeneratedTodos(data.tasks);
      queryClient.invalidateQueries({ queryKey: ['/api/todo-lists'] });
      toast({
        title: "Todo lijst gegenereerd!",
        description: `${data.tasks.length} taken toegevoegd voor ${data.title}`,
      });
    },
    onError: () => {
      toast({
        title: "Fout",
        description: "Er ging iets mis bij het genereren van de todo lijst.",
        variant: "destructive",
      });
    }
  });

  const deadlineOptions = [
    'BTW Q3 2024 (31 oktober 2024)',
    'IB Q4 2024 (31 december 2024)',
    'Jaarrekening 2023 (30 september 2024)',
    'BTW Q4 2024 (31 januari 2025)'
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-tax-purple rounded-lg flex items-center justify-center mr-3">
          <CheckSquare className="text-white" size={20} />
        </div>
        <h4 className="text-lg font-semibold text-gray-900">To-do generator</h4>
      </div>
      
      <p className="text-gray-600 mb-4">
        Genereer een persoonlijke checklist voor je aankomende belastingverplichtingen.
      </p>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Voor welke deadline?
          </label>
          <Select value={selectedDeadline} onValueChange={setSelectedDeadline}>
            <SelectTrigger>
              <SelectValue placeholder="Selecteer deadline..." />
            </SelectTrigger>
            <SelectContent>
              {deadlineOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="reminders"
            checked={enableReminders}
            onCheckedChange={setEnableReminders}
          />
          <label htmlFor="reminders" className="text-sm text-gray-700">
            Stuur me herinneringen
          </label>
        </div>
      </div>
      
      <Button
        className="w-full bg-tax-purple text-white hover:bg-purple-600 mt-4"
        onClick={() => generateTodoMutation.mutate()}
        disabled={!selectedDeadline || generateTodoMutation.isPending}
      >
        {generateTodoMutation.isPending ? 'Genereren...' : 'Genereer to-do lijst'}
      </Button>
      
      {generatedTodos.length > 0 && (
        <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h5 className="font-medium text-purple-900 mb-3">
            Je persoonlijke checklist:
          </h5>
          <ul className="space-y-2">
            {generatedTodos.map((task, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Checkbox className="mt-0.5" />
                <span className="text-sm text-purple-800">{task}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
