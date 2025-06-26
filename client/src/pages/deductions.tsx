import { DeductionChecker } from "@/components/deduction-checker";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Deductions() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-main mb-2">Aftrekposten Checker</h1>
            <p className="text-muted">Ontdek welke zakelijke uitgaven je kunt aftrekken</p>
          </div>
          <DeductionChecker />
        </div>
      </main>
      <Footer />
    </div>
  );
}