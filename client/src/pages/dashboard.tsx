import { QuickActions } from "@/components/quick-actions";
import { ChatAssistant } from "@/components/chat-assistant";
import { UpcomingDeadlines } from "@/components/upcoming-deadlines";
import { ToolsSection } from "@/components/tools-section";
import { FaqSection } from "@/components/faq-section";
import { TransactionManager } from "@/components/transaction-manager";
import { BtwGenerator } from "@/components/btw-generator";
import { MileageTracker } from "@/components/mileage-tracker";
import { TaxCalculator } from "@/components/tax-calculator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WelcomeSection />
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overzicht</TabsTrigger>
            <TabsTrigger value="transactions">Transacties</TabsTrigger>
            <TabsTrigger value="btw">BTW Aangifte</TabsTrigger>
            <TabsTrigger value="mileage">Kilometers</TabsTrigger>
            <TabsTrigger value="calculator">Belasting</TabsTrigger>
            <TabsTrigger value="assistant">Assistent</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <QuickActions />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ChatAssistant />
              </div>
              <div className="space-y-6">
                <UpcomingDeadlines />
              </div>
            </div>

            <ToolsSection />
            <FaqSection />
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionManager />
          </TabsContent>

          <TabsContent value="btw">
            <BtwGenerator />
          </TabsContent>

          <TabsContent value="mileage">
            <MileageTracker />
          </TabsContent>

          <TabsContent value="calculator">
            <TaxCalculator />
          </TabsContent>

          <TabsContent value="assistant">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ChatAssistant />
              </div>
              <div className="space-y-6">
                <UpcomingDeadlines />
                <FaqSection />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary">BelastingAssistent</h1>
              <p className="text-xs text-gray-500">Voor ZZP'ers & BV's</p>
            </div>
          </div>
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#dashboard" className="text-primary px-3 py-2 rounded-md text-sm font-medium bg-blue-50">Dashboard</a>
              <a href="#aftrekposten" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Aftrekposten</a>
              <a href="#deadlines" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Deadlines</a>
              <a href="#faq" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">FAQ</a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

function WelcomeSection() {
  return (
    <section className="mb-8">
      <div className="gradient-primary rounded-xl text-white p-8">
        <h2 className="text-3xl font-bold mb-4">Welkom bij je persoonlijke belastingassistent</h2>
        <p className="text-xl mb-6 text-blue-100">Bespaar tijd, stress en geld met simpel belastingadvies voor ZZP'ers en BV's</p>
        <div className="flex flex-wrap gap-4">
          <button className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            <i className="fas fa-search mr-2"></i>
            Check gemiste aftrekposten
          </button>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-400 transition-colors">
            <i className="fas fa-list mr-2"></i>
            Genereer to-do lijst
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">BelastingAssistent</h3>
            <p className="text-gray-300 mb-4">Simpel belastingadvies voor ZZP'ers en BV's. Bespaar tijd, stress en geld met onze persoonlijke assistent.</p>
            <p className="text-sm text-gray-400">
              <i className="fas fa-info-circle mr-1"></i>
              Dit is geen vervanging voor professioneel belastingadvies. Raadpleeg altijd een boekhouder voor complexe situaties.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Tools</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Aftrekpost checker</a></li>
              <li><a href="#" className="hover:text-white transition-colors">BTW assistent</a></li>
              <li><a href="#" className="hover:text-white transition-colors">To-do generator</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Deadline tracker</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Veelgestelde vragen</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy beleid</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gebruiksvoorwaarden</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 BelastingAssistent. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
}
