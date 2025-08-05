import { MileageTracker } from "@/components/mileage-tracker";
import { DashboardLayout } from "@/components/ui/dashboard-layout";

export default function Mileage() {
  return (
    <DashboardLayout 
      title="Kilometerregistratie" 
      subtitle="Registreer zakelijke kilometers (€0,23/km)"
    >
      <div className="max-w-4xl mx-auto">
        <MileageTracker />
      </div>
    </DashboardLayout>
  );
}