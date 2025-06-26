import { ChatAssistant } from "@/components/chat-assistant";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Chat() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-main mb-2">Belasting Assistent</h1>
            <p className="text-muted">Stel je vragen over Nederlandse belastingen</p>
          </div>
          <ChatAssistant />
        </div>
      </main>
      <Footer />
    </div>
  );
}