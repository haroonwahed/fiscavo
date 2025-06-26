import { TransactionManager } from "@/components/transaction-manager";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Transactions() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-main mb-2">Transacties</h1>
            <p className="text-muted">Beheer je bankrekeningen en transacties</p>
          </div>
          <TransactionManager />
        </div>
      </main>
      <Footer />
    </div>
  );
}