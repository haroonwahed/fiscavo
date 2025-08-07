import { DashboardLayout } from "@/components/ui/dashboard-layout";
import { TransactionManager } from "@/components/transaction-manager";

export default function TransactionManagementPage() {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <TransactionManager />
      </div>
    </DashboardLayout>
  );
}