import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, createContext, useContext } from "react";
import Dashboard from "@/pages/dashboard";
import Landing from "@/pages/landing";
import NotFound from "@/pages/not-found";
import BtwCalculator from "@/pages/btw-calculator";
import Transactions from "@/pages/transactions";
import Mileage from "@/pages/mileage";
import TaxCalculatorPage from "@/pages/tax-calculator";
import Chat from "@/pages/chat";
import Deductions from "@/pages/deductions";

// Simple authentication context for demo purposes
const AuthContext = createContext<{
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export const useAuth = () => useContext(AuthContext);

function Router() {
  const { isAuthenticated } = useAuth();
  
  return (
    <Switch>
      <Route path="/">
        {isAuthenticated ? <Dashboard /> : <Landing />}
      </Route>
      {isAuthenticated && (
        <>
          <Route path="/btw-calculator" component={BtwCalculator} />
          <Route path="/transactions" component={Transactions} />
          <Route path="/mileage" component={Mileage} />
          <Route path="/tax-calculator" component={TaxCalculatorPage} />
          <Route path="/chat" component={Chat} />
          <Route path="/deductions" component={Deductions} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
