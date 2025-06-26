import { TaxCalculator } from "@/components/tax-calculator";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function TaxCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-main mb-2">Belastingcalculator</h1>
            <p className="text-muted">Bereken je inkomstenbelasting en sociale premies</p>
          </div>
          <TaxCalculator />
        </div>
      </main>
      <Footer />
    </div>
  );
}