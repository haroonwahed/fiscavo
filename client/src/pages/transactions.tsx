import { TransactionManager } from "@/components/transaction-manager";
import { DashboardLayout } from "@/components/ui/dashboard-layout";

export default function Transactions() {
  return (
    <DashboardLayout 
      title="Transacties" 
      subtitle="Beheer je bankrekeningen en transacties"
    >
      <div className="max-w-6xl mx-auto">
        <TransactionManager />
      </div>
    </DashboardLayout>
  );
}