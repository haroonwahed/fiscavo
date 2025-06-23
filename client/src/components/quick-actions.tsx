import { Card } from "@/components/ui/card";
import { Calculator, Calendar, CheckSquare, HelpCircle } from "lucide-react";

const actions = [
  {
    id: 'deduction-checker',
    title: 'Aftrekpost checker',
    description: 'Controleer of je uitgave aftrekbaar is',
    icon: Calculator,
    color: 'bg-secondary'
  },
  {
    id: 'btw-guide',
    title: 'BTW aangifte',
    description: 'Overzicht van je BTW verplichtingen',
    icon: Calendar,
    color: 'bg-tax-orange'
  },
  {
    id: 'todo-generator',
    title: 'To-do generator',
    description: 'Maak een checklist voor deadlines',
    icon: CheckSquare,
    color: 'bg-tax-purple'
  },
  {
    id: 'faq',
    title: 'Veelgestelde vragen',
    description: 'Antwoorden op veelgestelde vragen',
    icon: HelpCircle,
    color: 'bg-tax-red'
  }
];

export function QuickActions() {
  const handleActionClick = (actionId: string) => {
    // Scroll to relevant section
    const element = document.getElementById(actionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Snelle acties</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {actions.map((action) => {
          const IconComponent = action.icon;
          return (
            <Card
              key={action.id}
              className="p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleActionClick(action.id)}
            >
              <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                <IconComponent className="text-white" size={24} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{action.title}</h4>
              <p className="text-gray-600 text-sm">{action.description}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
