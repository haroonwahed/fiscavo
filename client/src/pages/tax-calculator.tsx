import { TaxCalculator } from "@/components/tax-calculator";
import { DashboardLayout } from "@/components/ui/dashboard-layout";

export default function TaxCalculatorPage() {
  return (
    <DashboardLayout 
      title="Belastingcalculator" 
      subtitle="Bereken je inkomstenbelasting en sociale premies"
    >
      <div className="max-w-4xl mx-auto">
        <TaxCalculator />
      </div>
    </DashboardLayout>
  );
}