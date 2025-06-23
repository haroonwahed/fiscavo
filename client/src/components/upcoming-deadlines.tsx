import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Clock, Lightbulb, History } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { nl } from "date-fns/locale";

interface TaxDeadline {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  category: string;
  businessType: string;
  isCompleted: boolean;
}

export function UpcomingDeadlines() {
  const { data: deadlines = [], isLoading } = useQuery<TaxDeadline[]>({
    queryKey: ['/api/deadlines'],
  });

  const getDeadlineUrgency = (dueDate: string) => {
    const days = differenceInDays(new Date(dueDate), new Date());
    if (days <= 7) return 'urgent';
    if (days <= 30) return 'warning';
    return 'normal';
  };

  const getUrgencyStyles = (urgency: string) => {
    switch (urgency) {
      case 'urgent':
        return 'bg-red-50 border-red-200 text-red-900';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-900';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-900';
    }
  };

  const getBadgeStyles = (urgency: string) => {
    switch (urgency) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-3">
              <div className="h-16 bg-gray-100 rounded"></div>
              <div className="h-16 bg-gray-100 rounded"></div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Upcoming Deadlines */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Clock className="text-orange-500 mr-2" size={20} />
          Aankomende deadlines
        </h4>
        <div className="space-y-3">
          {deadlines.slice(0, 3).map((deadline) => {
            const urgency = getDeadlineUrgency(deadline.dueDate);
            const daysUntil = differenceInDays(new Date(deadline.dueDate), new Date());
            
            return (
              <div
                key={deadline.id}
                className={`flex items-center justify-between p-3 border rounded-lg ${getUrgencyStyles(urgency)}`}
              >
                <div>
                  <p className="font-medium">{deadline.title}</p>
                  <p className="text-sm opacity-80">
                    {format(new Date(deadline.dueDate), 'd MMMM yyyy', { locale: nl })}
                  </p>
                </div>
                <Badge className={`text-xs ${getBadgeStyles(urgency)}`}>
                  {daysUntil <= 0 ? 'Vandaag!' : `${daysUntil} dagen`}
                </Badge>
              </div>
            );
          })}
        </div>
        <Button variant="ghost" className="w-full mt-4 text-primary">
          Bekijk alle deadlines →
        </Button>
      </Card>

      {/* Quick Tips */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Lightbulb className="text-yellow-500 mr-2" size={20} />
          Tip van de week
        </h4>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-900 font-medium mb-2">Vergeet je thuiswerkplek niet!</p>
          <p className="text-green-800 text-sm">
            Als ZZP'er kun je tot €2 per dag aftrekken voor je thuiswerkplek. 
            Voor 2024 is dat maximaal €520 per jaar - geen bonnetjes nodig!
          </p>
        </div>
      </Card>

      {/* Recent Tools Used */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <History className="text-gray-500 mr-2" size={20} />
          Recent gebruikt
        </h4>
        <div className="space-y-2">
          {[
            { name: "Aftrekpost checker", time: "2 uur geleden" },
            { name: "BTW Q2 to-do lijst", time: "1 dag geleden" },
            { name: "Kilometervergoed.", time: "3 dagen geleden" }
          ].map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start p-2 h-auto"
            >
              <div className="text-left">
                <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                <p className="text-xs text-gray-500">{item.time}</p>
              </div>
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}
