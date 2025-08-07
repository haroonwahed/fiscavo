import { DashboardLayout } from "@/components/ui/dashboard-layout";
import { TransactionManager } from "@/components/transaction-manager";
import { useAuth } from "@/hooks/useAuth";
import { useDemoLogin } from "@/hooks/useDemoLogin";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function TransactionManagementPage() {
  const { user, isLoading } = useAuth();
  const { loginMutation } = useDemoLogin();

  // Auto-login demo user for testing
  useEffect(() => {
    if (!isLoading && !user) {
      loginMutation.mutate();
    }
  }, [user, isLoading, loginMutation]);

  if (isLoading || loginMutation.isPending) {
    return (
      <DashboardLayout>
        <div className="container mx-auto py-6 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold">Laden...</h2>
            <p className="text-muted-foreground">Verbinding maken met demo account...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!user) {
    return (
      <DashboardLayout>
        <div className="container mx-auto py-6 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold">Demo Login Vereist</h2>
            <p className="text-muted-foreground">Klik hieronder om in te loggen als demo gebruiker</p>
            <Button onClick={() => loginMutation.mutate()} disabled={loginMutation.isPending}>
              {loginMutation.isPending ? "Inloggen..." : "Demo Login"}
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <TransactionManager />
      </div>
    </DashboardLayout>
  );
}