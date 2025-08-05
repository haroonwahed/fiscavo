import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { AuthProvider } from "@/hooks/useAuth";
import Dashboard from "@/pages/dashboard";
import Landing from "@/pages/landing";
import AuthPage from "@/pages/auth-page";
import SignupPage from "@/pages/signup";
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
import About from "@/pages/about";
import Support from "@/pages/support";
import Analytics from "@/pages/analytics";
import AICategorization from "@/pages/ai-categorization";
import AIFeatures from "@/pages/ai-features";


function Router() {
  return (
    <AuthProvider>
      <InnerRouter />
    </AuthProvider>
  );
}

function InnerRouter() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/btw-calculator" component={BtwCalculator} />
      <Route path="/transactions" component={Transactions} />
      <Route path="/mileage" component={Mileage} />
      <Route path="/tax-calculator" component={TaxCalculatorPage} />
      <Route path="/chat" component={Chat} />
      <Route path="/deductions" component={Deductions} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/ai-categorization" component={AICategorization} />
      <Route path="/ai-features" component={AIFeatures} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/cookies" component={Cookies} />
      <Route path="/gdpr" component={GDPR} />
      <Route path="/security" component={Security} />
      <Route path="/about" component={About} />
      <Route path="/support" component={Support} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="fiscavo-ui-theme">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
