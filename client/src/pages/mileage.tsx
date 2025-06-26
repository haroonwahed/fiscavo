import { MileageTracker } from "@/components/mileage-tracker";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Mileage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-main mb-2">Kilometerregistratie</h1>
            <p className="text-muted">Registreer zakelijke kilometers (€0,23/km)</p>
          </div>
          <MileageTracker />
        </div>
      </main>
      <Footer />
    </div>
  );
}