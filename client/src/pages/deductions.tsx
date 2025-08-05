import { DeductionChecker } from "@/components/deduction-checker";
import { DashboardLayout } from "@/components/ui/dashboard-layout";

export default function Deductions() {
  return (
    <DashboardLayout 
      title="Aftrekposten Checker" 
      subtitle="Ontdek welke zakelijke uitgaven je kunt aftrekken"
    >
      <div className="max-w-4xl mx-auto">
        <DeductionChecker />
      </div>
    </DashboardLayout>
  );
}