import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ReceiptOCR } from "@/components/receipt-ocr";

export default function Receipts() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Bonnetjes Scanner</h1>
            <p className="text-gray-600 mt-2">
              Scan en beheer je bonnetjes met AI-powered OCR technologie
            </p>
          </div>
          <ReceiptOCR />
        </div>
      </main>
      <Footer />
    </div>
  );
}