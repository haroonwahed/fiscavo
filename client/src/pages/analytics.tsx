import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DashboardAnalytics } from "@/components/dashboard-analytics";

export default function Analytics() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Inzichten in je belastingbesparingen en voortgang
            </p>
          </div>
          <DashboardAnalytics />
        </div>
      </main>
      <Footer />
    </div>
  );
}