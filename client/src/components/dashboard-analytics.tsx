import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Euro, Calendar, Target, AlertTriangle, CheckCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";

interface DashboardAnalytics {
  totalSavings: number;
  quarterlyProgress: {
    btw: { completed: number; total: number; amount: number };
    income: { completed: number; total: number; amount: number };
    deductions: { completed: number; total: number; amount: number };
  };
  recentActivity: {
    id: string;
    type: string;
    description: string;
    amount: number;
    date: string;
    status: 'completed' | 'pending' | 'warning';
  }[];
  upcomingDeadlines: {
    id: string;
    title: string;
    date: string;
    priority: 'high' | 'medium' | 'low';
    daysLeft: number;
  }[];
  monthlyTrends: {
    month: string;
    income: number;
    expenses: number;
    savings: number;
  }[];
  complianceScore: number;
  recommendations: {
    id: string;
    title: string;
    description: string;
    potential_saving: number;
    priority: 'high' | 'medium' | 'low';
  }[];
}

export function DashboardAnalytics() {
  const { user } = useAuth();
  const [selectedQuarter, setSelectedQuarter] = useState("Q4 2024");

  const { data: analytics, isLoading } = useQuery<DashboardAnalytics>({
    queryKey: ["/api/analytics/dashboard"],
    enabled: !!user,
  });

  const { data: insights } = useQuery({
    queryKey: ["/api/analytics/insights"],
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const mockAnalytics: DashboardAnalytics = {
    totalSavings: 2847,
    quarterlyProgress: {
      btw: { completed: 8, total: 12, amount: 1247 },
      income: { completed: 3, total: 4, amount: 892 },
      deductions: { completed: 15, total: 20, amount: 708 }
    },
    recentActivity: [
      {
        id: "1",
        type: "BTW",
        description: "Q3 BTW aangifte ingediend",
        amount: 432.50,
        date: "2024-12-24",
        status: "completed"
      },
      {
        id: "2",
        type: "Deduction",
        description: "Kantoorkosten geregistreerd",
        amount: 156.80,
        date: "2024-12-23",
        status: "completed"
      },
      {
        id: "3",
        type: "Mileage",
        description: "Zakelijke kilometers toegevoegd",
        amount: 78.20,
        date: "2024-12-22",
        status: "pending"
      }
    ],
    upcomingDeadlines: [
      {
        id: "1",
        title: "BTW Q4 2024 aangifte",
        date: "2025-01-31",
        priority: "high",
        daysLeft: 36
      },
      {
        id: "2",
        title: "Jaaraangifte 2024",
        date: "2025-04-01",
        priority: "medium",
        daysLeft: 96
      }
    ],
    monthlyTrends: [
      { month: "Sep", income: 4200, expenses: 1800, savings: 340 },
      { month: "Okt", income: 3900, expenses: 1650, savings: 425 },
      { month: "Nov", income: 4500, expenses: 1900, savings: 380 },
      { month: "Dec", income: 4100, expenses: 1750, savings: 395 }
    ],
    complianceScore: 94,
    recommendations: [
      {
        id: "1",
        title: "Optimaliseer kantoorkosten aftrek",
        description: "Je kunt nog €156 meer aftrekken aan kantoorkosten dit kwartaal",
        potential_saving: 156,
        priority: "high"
      },
      {
        id: "2",
        title: "Zakelijke kilometers registreren",
        description: "Upload je laatste ritten voor €78 extra aftrek",
        potential_saving: 78,
        priority: "medium"
      }
    ]
  };

  const data = analytics || mockAnalytics;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-2">
          Welkom terug, {(user as any)?.firstName || 'gebruiker'}!
        </h2>
        <p className="text-blue-100">
          Je hebt dit kwartaal al <span className="font-bold">€{data.totalSavings}</span> bespaard met Fiscatax
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Totale Besparingen</p>
                <p className="text-2xl font-bold text-green-600">€{data.totalSavings}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">+12% vs vorig kwartaal</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Compliance Score</p>
                <p className="text-2xl font-bold text-blue-600">{data.complianceScore}%</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Uitstekend niveau</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Aanstaande Deadlines</p>
                <p className="text-2xl font-bold text-orange-600">{data.upcomingDeadlines.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Eerstvolgende: {data.upcomingDeadlines[0]?.daysLeft} dagen
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Potentiële Besparingen</p>
                <p className="text-2xl font-bold text-purple-600">
                  €{data.recommendations.reduce((sum, rec) => sum + rec.potential_saving, 0)}
                </p>
              </div>
              <Euro className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Nog te realiseren</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>Kwartaal Voortgang - {selectedQuarter}</CardTitle>
          <CardDescription>
            Overzicht van je belastingverplichtingen en besparingen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* BTW Progress */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">BTW Aangifte</h4>
                <Badge variant="secondary">€{data.quarterlyProgress.btw.amount}</Badge>
              </div>
              <Progress 
                value={(data.quarterlyProgress.btw.completed / data.quarterlyProgress.btw.total) * 100} 
                className="h-2"
              />
              <p className="text-sm text-gray-600">
                {data.quarterlyProgress.btw.completed} van {data.quarterlyProgress.btw.total} taken voltooid
              </p>
            </div>

            {/* Income Tax Progress */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Inkomstenbelasting</h4>
                <Badge variant="secondary">€{data.quarterlyProgress.income.amount}</Badge>
              </div>
              <Progress 
                value={(data.quarterlyProgress.income.completed / data.quarterlyProgress.income.total) * 100} 
                className="h-2"
              />
              <p className="text-sm text-gray-600">
                {data.quarterlyProgress.income.completed} van {data.quarterlyProgress.income.total} taken voltooid
              </p>
            </div>

            {/* Deductions Progress */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Aftrekposten</h4>
                <Badge variant="secondary">€{data.quarterlyProgress.deductions.amount}</Badge>
              </div>
              <Progress 
                value={(data.quarterlyProgress.deductions.completed / data.quarterlyProgress.deductions.total) * 100} 
                className="h-2"
              />
              <p className="text-sm text-gray-600">
                {data.quarterlyProgress.deductions.completed} van {data.quarterlyProgress.deductions.total} uitgaven gecategoriseerd
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for detailed analytics */}
      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="activity">Recente Activiteit</TabsTrigger>
          <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
          <TabsTrigger value="recommendations">Aanbevelingen</TabsTrigger>
        </TabsList>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recente Activiteit</CardTitle>
              <CardDescription>
                Je laatste belastingactiviteiten en transacties
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {activity.status === 'completed' ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : activity.status === 'warning' ? (
                        <AlertTriangle className="h-5 w-5 text-orange-600" />
                      ) : (
                        <Calendar className="h-5 w-5 text-blue-600" />
                      )}
                      <div>
                        <p className="font-medium">{activity.description}</p>
                        <p className="text-sm text-gray-600">{activity.date}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={activity.status === 'completed' ? 'default' : 'secondary'}
                      className="text-green-600"
                    >
                      €{activity.amount}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deadlines">
          <Card>
            <CardHeader>
              <CardTitle>Aanstaande Deadlines</CardTitle>
              <CardDescription>
                Belangrijke belastingdeadlines en termijnen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Calendar className={`h-5 w-5 ${
                        deadline.priority === 'high' ? 'text-red-600' :
                        deadline.priority === 'medium' ? 'text-orange-600' : 'text-green-600'
                      }`} />
                      <div>
                        <p className="font-medium">{deadline.title}</p>
                        <p className="text-sm text-gray-600">{deadline.date}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={deadline.priority === 'high' ? 'destructive' : 'secondary'}
                    >
                      {deadline.daysLeft} dagen
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle>Slimme Aanbevelingen</CardTitle>
              <CardDescription>
                Personalized tips to maximize your tax savings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.recommendations.map((rec) => (
                  <div key={rec.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                      <Badge 
                        variant={rec.priority === 'high' ? 'destructive' : 'secondary'}
                        className="text-green-600"
                      >
                        €{rec.potential_saving}
                      </Badge>
                    </div>
                    <p className="text-gray-600">{rec.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}