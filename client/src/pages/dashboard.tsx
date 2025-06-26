import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calculator, 
  FileText, 
  Car, 
  CreditCard, 
  MessageSquare, 
  Settings,
  Home,
  BarChart3,
  Receipt,
  Calendar,
  HelpCircle,
  Bell,
  Menu,
  X,
  Users,
  TrendingUp,
  DollarSign,
  Clock
} from "lucide-react";
import { WelcomeSection } from "@/components/welcome-section";
import { QuickActions } from "@/components/quick-actions";
import { UpcomingDeadlines } from "@/components/upcoming-deadlines";
import { ToolsSection } from "@/components/tools-section";
import { FaqSection } from "@/components/faq-section";
import { ChatAssistant } from "@/components/chat-assistant";
import { TransactionManager } from "@/components/transaction-manager";
import { BtwGenerator } from "@/components/btw-generator";
import { MileageTracker } from "@/components/mileage-tracker";
import { TaxCalculator } from "@/components/tax-calculator";
import { DeductionChecker } from "@/components/deduction-checker";
import { TodoGenerator } from "@/components/todo-generator";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "transactions", label: "Transacties", icon: CreditCard },
    { id: "btw", label: "BTW Aangifte", icon: FileText },
    { id: "mileage", label: "Kilometerstaten", icon: Car },
    { id: "calculator", label: "Belastingcalculator", icon: Calculator },
    { id: "deductions", label: "Aftrekposten", icon: Receipt },
    { id: "deadlines", label: "Deadlines", icon: Calendar },
    { id: "assistant", label: "AI Assistent", icon: MessageSquare },
    { id: "reports", label: "Rapportages", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* TaxBuddy-style Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden mr-2"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <Calculator className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Fiscatax</h1>
                  <p className="text-xs text-emerald-600 font-medium">Simpel | Veilig | Accuraat</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500">3</Badge>
              </Button>
              <div className="hidden sm:flex items-center space-x-2">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Jan Ondernemer</p>
                  <p className="text-gray-500 text-xs">Eenmanszaak</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* TaxBuddy-style Sidebar */}
        <aside className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out`}>
          <div className="flex flex-col h-full pt-4">
            <nav className="flex-1 px-3 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-emerald-50 text-emerald-700 border-r-2 border-emerald-500'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`mr-3 h-5 w-5 ${
                      activeTab === item.id ? 'text-emerald-500' : 'text-gray-400'
                    }`} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
            
            {/* TaxBuddy-style Quick Stats */}
            <div className="p-3 border-t border-gray-200">
              <div className="bg-emerald-50 rounded-lg p-3">
                <h3 className="text-sm font-medium text-emerald-800 mb-2">Huidige periode</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-emerald-600">Omzet</span>
                    <span className="text-sm font-semibold text-emerald-800">€45.230</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-emerald-600">BTW schuld</span>
                    <span className="text-sm font-semibold text-emerald-800">€9.498</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                {/* TaxBuddy-style Dashboard Header */}
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
                  <h2 className="text-2xl font-bold mb-2">Welkom terug, Jan!</h2>
                  <p className="text-emerald-100 mb-4">Hier is je belastingoverzicht voor dit kwartaal</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-emerald-100 text-sm">BTW te betalen</p>
                          <p className="text-2xl font-bold">€9.498</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-emerald-200" />
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-emerald-100 text-sm">Openstaande facturen</p>
                          <p className="text-2xl font-bold">€12.450</p>
                        </div>
                        <DollarSign className="h-8 w-8 text-emerald-200" />
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-emerald-100 text-sm">Dagen tot deadline</p>
                          <p className="text-2xl font-bold">12</p>
                        </div>
                        <Clock className="h-8 w-8 text-emerald-200" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab("transactions")}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="h-4 w-4 text-blue-600" />
                        </div>
                        <CardTitle className="text-sm">Transacties</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-gray-600">Beheer inkomsten en uitgaven</p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab("btw")}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-4 w-4 text-green-600" />
                        </div>
                        <CardTitle className="text-sm">BTW Aangifte</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-gray-600">Automatische BTW berekening</p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab("calculator")}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Calculator className="h-4 w-4 text-purple-600" />
                        </div>
                        <CardTitle className="text-sm">Belastingcalculator</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-gray-600">Bereken je belastingdruk</p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab("assistant")}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                          <MessageSquare className="h-4 w-4 text-orange-600" />
                        </div>
                        <CardTitle className="text-sm">AI Assistent</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-gray-600">24/7 belastingadvies</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity & Deadlines */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div id="upcoming-deadlines">
                    <UpcomingDeadlines />
                  </div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recente activiteit</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">BTW Q3 aangifte ingediend</p>
                            <p className="text-xs text-gray-500">2 dagen geleden</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">15 nieuwe transacties geïmporteerd</p>
                            <p className="text-xs text-gray-500">1 week geleden</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Kilometerregistratie bijgewerkt</p>
                            <p className="text-xs text-gray-500">2 weken geleden</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* FAQ Section */}
                <div id="faq-section">
                  <FaqSection />
                </div>
              </div>
            )}

            {activeTab === "transactions" && <TransactionManager />}
            {activeTab === "btw" && <BtwGenerator />}
            {activeTab === "mileage" && <MileageTracker />}
            {activeTab === "calculator" && <TaxCalculator />}
            {activeTab === "deductions" && <DeductionChecker />}
            {activeTab === "deadlines" && <UpcomingDeadlines />}
            {activeTab === "assistant" && <ChatAssistant />}
            {activeTab === "reports" && (
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Rapportages</h2>
                <p className="text-gray-600">Hier komen uitgebreide rapportages en analyses van je belastinggegevens.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}