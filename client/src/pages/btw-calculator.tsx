import { BtwGenerator } from "@/components/btw-generator";
import { DashboardLayout } from "@/components/ui/dashboard-layout";

export default function BtwCalculator() {
  return (
    <DashboardLayout 
      title="BTW Aangifte" 
      subtitle="Bereken automatisch je BTW-aangifte"
    >
      <div className="max-w-4xl mx-auto">
        <BtwGenerator />
      </div>
    </DashboardLayout>
  );
}