import { cn } from "@/lib/utils";
import fiscavoLogo from "@assets/image_1750927155072.png";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "white" | "gradient";
}

export function Logo({ className, size = "md", variant = "default" }: LogoProps) {
  const imageHeights = {
    sm: "h-8",
    md: "h-12", 
    lg: "h-16",
    xl: "h-20"
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
    sm: "h-8",
    md: "h-12",
    lg: "h-16", 
    xl: "h-20",
    "2xl": "h-24"
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