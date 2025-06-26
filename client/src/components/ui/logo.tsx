import { cn } from "@/lib/utils";
import fiscavoLogo from "@assets/fiscavo_1750940880782.png";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "white" | "gradient";
}

export function Logo({ className, size = "md", variant = "default" }: LogoProps) {
  const imageHeights = {
    sm: "h-16",
    md: "h-28", 
    lg: "h-40",
    xl: "h-52"
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
    md: "h-14",
    lg: "h-20", 
    xl: "h-26",
    "2xl": "h-32"
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