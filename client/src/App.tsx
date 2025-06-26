import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import Dashboard from "@/pages/dashboard";
import Landing from "@/pages/landing";
import NotFound from "@/pages/not-found";
import BtwCalculator from "@/pages/btw-calculator";
import Transactions from "@/pages/transactions";
import Mileage from "@/pages/mileage";
import TaxCalculatorPage from "@/pages/tax-calculator";
import Chat from "@/pages/chat";
import Deductions from "@/pages/deductions";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Cookies from "@/pages/cookies";
import GDPR from "@/pages/gdpr";
import Security from "@/pages/security";


function Router() {
  const { isAuthenticated, isLoading } = useAuth();
  
  console.log("Router rendering, isAuthenticated:", isAuthenticated);
  
  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
        <>
          <Route path="/" component={Landing} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <Route path="/cookies" component={Cookies} />
          <Route path="/gdpr" component={GDPR} />
          <Route path="/security" component={Security} />
        </>
      ) : (
        <>
          <Route path="/" component={Dashboard} />
          <Route path="/btw-calculator" component={BtwCalculator} />
          <Route path="/transactions" component={Transactions} />
          <Route path="/mileage" component={Mileage} />
          <Route path="/tax-calculator" component={TaxCalculatorPage} />
          <Route path="/chat" component={Chat} />
          <Route path="/deductions" component={Deductions} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <Route path="/cookies" component={Cookies} />
          <Route path="/gdpr" component={GDPR} />
          <Route path="/security" component={Security} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
