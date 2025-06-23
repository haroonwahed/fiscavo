import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";

interface DeductionRule {
  id: number;
  category: string;
  item: string;
  description: string;
  conditions: string;
  percentage: number | null;
  businessType: string;
  sector: string | null;
}

export function DeductionChecker() {
  const [businessType, setBusinessType] = useState<string>('');
  const [sector, setSector] = useState<string>('');
  const [showResults, setShowResults] = useState(false);

  const { data: deductionRules = [] } = useQuery<DeductionRule[]>({
    queryKey: ['/api/deductions', businessType, sector],
    enabled: businessType !== '',
  });

  const handleStartCheck = () => {
    if (businessType) {
      setShowResults(true);
    }
  };

  const getRelevantDeductions = () => {
    return deductionRules.filter(rule => 
      rule.businessType === businessType || rule.businessType === 'both'
    );
  };

  return (
    <Card className="p-6">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center mr-3">
          <Search className="text-white" size={20} />
        </div>
        <h4 className="text-lg font-semibold text-gray-900">Aftrekpost checker</h4>
      </div>
      
      <p className="text-gray-600 mb-4">
        Stel een paar vragen en ontdek welke uitgaven je mogelijk mist voor aftrek.
      </p>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Wat is je bedrijfsvorm?
          </label>
          <Select value={businessType} onValueChange={setBusinessType}>
            <SelectTrigger>
              <SelectValue placeholder="Kies je bedrijfsvorm..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="zzp">ZZP'er (eenmanszaak)</SelectItem>
              <SelectItem value="bv">BV (besloten vennootschap)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            In welke sector werk je?
          </label>
          <Select value={sector} onValueChange={setSector}>
            <SelectTrigger>
              <SelectValue placeholder="Selecteer sector..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="IT">IT / Webdevelopment</SelectItem>
              <SelectItem value="Consultancy">Consultancy</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Fotografie">Fotografie</SelectItem>
              <SelectItem value="Anders">Anders</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Button 
        className="w-full bg-secondary text-white hover:bg-green-600 mt-4"
        onClick={handleStartCheck}
        disabled={!businessType}
      >
        Start aftrekpost check
      </Button>
      
      {showResults && deductionRules.length > 0 && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h5 className="font-medium text-green-900 mb-3">
            Relevante aftrekposten voor jou:
          </h5>
          <div className="space-y-2">
            {getRelevantDeductions().map((rule) => (
              <div key={rule.id} className="text-sm">
                <p className="font-medium text-green-800">• {rule.item}</p>
                <p className="text-green-700 ml-2">{rule.description}</p>
                <p className="text-green-600 text-xs ml-2">{rule.conditions}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
