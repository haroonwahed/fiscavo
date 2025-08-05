import { ExpenseCategorizationAI } from "@/components/expense-categorization-ai";
import { DashboardLayout } from "@/components/ui/dashboard-layout";

export default function AICategorization() {
  return (
    <DashboardLayout 
      title="AI Categorisering" 
      subtitle="Laat AI je uitgaven automatisch categoriseren voor belastingdoeleinden"
    >
      <div className="max-w-4xl mx-auto">
        <ExpenseCategorizationAI />
      </div>
    </DashboardLayout>
  );
}