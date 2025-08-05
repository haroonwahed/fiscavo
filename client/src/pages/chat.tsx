import { ChatAssistant } from "@/components/chat-assistant";
import { DashboardLayout } from "@/components/ui/dashboard-layout";

export default function Chat() {
  return (
    <DashboardLayout 
      title="AI Assistent" 
      subtitle="Stel je vragen over Nederlandse belastingen"
    >
      <div className="max-w-4xl mx-auto">
        <ChatAssistant />
      </div>
    </DashboardLayout>
  );
}