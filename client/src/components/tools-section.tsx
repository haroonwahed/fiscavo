import { Card } from "@/components/ui/card";
import { DeductionChecker } from "@/components/deduction-checker";
import { TodoGenerator } from "@/components/todo-generator";

export function ToolsSection() {
  return (
    <section className="mt-12" id="todo-generator">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Handige tools</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div id="deduction-checker">
          <DeductionChecker />
        </div>
        <TodoGenerator />
      </div>
    </section>
  );
}
