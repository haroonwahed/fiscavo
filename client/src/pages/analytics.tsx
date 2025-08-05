import { DashboardAnalytics } from "@/components/dashboard-analytics";
import { DashboardLayout } from "@/components/ui/dashboard-layout";

export default function Analytics() {
  return (
    <DashboardLayout 
      title="Analytics Dashboard" 
      subtitle="Inzichten in je belastingbesparingen en voortgang"
    >
      <div className="max-w-7xl mx-auto">
        <DashboardAnalytics />
      </div>
    </DashboardLayout>
  );
}