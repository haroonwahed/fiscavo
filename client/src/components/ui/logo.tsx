import { cn } from "@/lib/utils";
import fiscavoLogo from "@assets/fiscavo_1750937448386.png";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "white" | "gradient";
}

export function Logo({ className, size = "md", variant = "default" }: LogoProps) {
  const imageHeights = {
    sm: "h-12",
    md: "h-20", 
    lg: "h-28",
    xl: "h-36"
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
    sm: "h-12",
    md: "h-20",
    lg: "h-28", 
    xl: "h-36",
    "2xl": "h-44"
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