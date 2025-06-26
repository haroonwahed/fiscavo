import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingChatButtonProps {
  className?: string;
}

export function FloatingChatButton({ className }: FloatingChatButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleChatClick = () => {
    window.location.href = '/chat';
  };

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      {/* Chat Button */}
      <Button
        onClick={handleChatClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "w-16 h-16 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110",
          "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
          "border-4 border-white relative overflow-hidden group"
        )}
      >
        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full blur-sm"></div>
        
        {/* Icon */}
        <div className="relative z-10 flex items-center justify-center">
          <MessageCircle className="h-7 w-7 text-white group-hover:scale-110 transition-transform duration-300" />
        </div>
        
        {/* Pulse Animation */}
        <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-75"></div>
        
        {/* Notification Dot */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </div>
      </Button>

      {/* Tooltip */}
      <div className={cn(
        "absolute bottom-20 right-0 transition-all duration-300 transform",
        isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
      )}>
        <div className="bg-gray-900 text-white px-4 py-2 rounded-xl shadow-lg text-sm font-medium whitespace-nowrap">
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-yellow-400" />
            <span>Chat met AI Belastingassistent</span>
          </div>
          {/* Arrow */}
          <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
        </div>
      </div>
    </div>
  );
}