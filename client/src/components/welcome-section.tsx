import { Button } from "@/components/ui/button";

export function WelcomeSection() {
  return (
    <section className="mb-8">
      <div className="gradient-primary rounded-xl text-white p-8">
        <h2 className="text-3xl font-bold mb-4">Welkom bij je persoonlijke belastingassistent</h2>
        <p className="text-xl mb-6 text-blue-100">Bespaar tijd, stress en geld met simpel belastingadvies voor ZZP'ers en BV's</p>
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
            className="bg-blue-500 text-white hover:bg-blue-400"
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