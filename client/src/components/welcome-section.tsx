import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { OnboardingFlow } from "./onboarding-flow";

export function WelcomeSection() {
  const { user } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  return (
    <section className="mb-8">
      <div className="gradient-primary rounded-xl text-white p-8">
        <h2 className="text-3xl font-bold mb-4">
          Welkom{user ? ` ${(user as any)?.firstName || 'terug'}` : ''} bij Taxenzo
        </h2>
        <p className="text-xl mb-6" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          {user ? 'Beheer je belastingen eenvoudig en accuraat' : 'Simpel, veilig en accuraat belastingbeheer voor ondernemers'}
        </p>
        <div className="flex flex-wrap gap-4">
          <Button 
            className="bg-white text-primary hover:bg-gray-50"
            onClick={() => {
              const element = document.getElementById('deduction-checker');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Check gemiste aftrekposten
          </Button>
          <Button 
            className="text-white hover:opacity-90"
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