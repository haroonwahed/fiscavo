import { cn } from "@/lib/utils";
import fiscavoLogo from "@assets/image_1750927155072.png";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "white" | "gradient";
}

export function Logo({ className, size = "md", variant = "default" }: LogoProps) {
  const imageHeights = {
    sm: "h-6",
    md: "h-8", 
    lg: "h-10",
    xl: "h-12"
  };

  return (
    <div className={cn("flex items-center", className)}>
      <img 
        src={fiscavoLogo} 
        alt="Fiscavo - Simpel | Veilig | Accuraat" 
        className={cn("object-contain", imageHeights[size])}
      />
    </div>
  );
}

interface LogoTextOnlyProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  variant?: "default" | "white" | "gradient";
}

export function LogoTextOnly({ className, size = "md", variant = "default" }: LogoTextOnlyProps) {
  const imageHeights = {
    sm: "h-6",
    md: "h-10",
    lg: "h-12", 
    xl: "h-16",
    "2xl": "h-20"
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <img 
        src={fiscavoLogo} 
        alt="Fiscavo - Simpel | Veilig | Accuraat" 
        className={cn("object-contain", imageHeights[size])}
      />
    </div>
  );
}