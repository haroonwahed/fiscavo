import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { OnboardingFlow } from "./onboarding-flow";

export function WelcomeSection() {
  const { user } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  return (
    <section className="mb-8">
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl text-white p-8 shadow-xl">
        <h2 className="text-4xl font-bold mb-4 tracking-tight">
          Welkom{user ? ` ${(user as any)?.firstName || 'terug'}` : ''} bij Fiscavo
        </h2>
        <p className="text-xl mb-6" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          {user ? 'Beheer je belastingen eenvoudig en accuraat' : 'Simpel, veilig en accuraat belastingbeheer voor ondernemers'}
        </p>
        <div className="flex flex-wrap gap-4">
          <Button 
            className="bg-white text-blue-600 hover:bg-gray-50 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            onClick={() => {
              const element = document.getElementById('deduction-checker');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Check gemiste aftrekposten
          </Button>
          <Button 
            variant="outline"
            className="text-white border-white/30 hover:bg-white/10 hover:border-white/50 font-semibold rounded-xl transition-all duration-300"
            style={{ backgroundColor: 'var(--color-primary-dark)' }}
            onClick={() => {
              const element = document.getElementById('todo-generator');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Genereer to-do lijst
          </Button>
        </div>
      </div>
    </section>
  );
}