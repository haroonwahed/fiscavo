import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "white" | "gradient";
}

export function Logo({ className, size = "md", variant = "default" }: LogoProps) {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl", 
    lg: "text-3xl",
    xl: "text-4xl"
  };

  const variants = {
    default: "text-blue-600",
    white: "text-white",
    gradient: "bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent"
  };

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      {/* Premium Logo Icon */}
      <div className={cn(
        "relative flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 shadow-lg",
        size === "sm" && "w-8 h-8",
        size === "md" && "w-10 h-10", 
        size === "lg" && "w-12 h-12",
        size === "xl" && "w-16 h-16"
      )}>
        {/* T Symbol */}
        <div className={cn(
          "font-black text-white relative",
          size === "sm" && "text-sm",
          size === "md" && "text-lg",
          size === "lg" && "text-xl", 
          size === "xl" && "text-2xl"
        )}>
          T
        </div>
        
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 opacity-20 blur-sm"></div>
        
        {/* Highlight */}
        <div className="absolute top-1 left-1 w-2 h-2 bg-white/30 rounded-full blur-[1px]"></div>
      </div>
      
      {/* Premium Typography */}
      <div className="flex flex-col">
        <span className={cn(
          "font-black tracking-tight leading-none",
          sizes[size],
          variants[variant]
        )}>
          Tax<span className="text-blue-800">enzo</span>
        </span>
        <span className={cn(
          "text-xs font-medium leading-none mt-0.5",
          variant === "white" ? "text-blue-100" : "text-gray-500"
        )}>
          Simpel | Veilig | Accuraat
        </span>
      </div>
    </div>
  );
}

interface LogoTextOnlyProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  variant?: "default" | "white" | "gradient";
}

export function LogoTextOnly({ className, size = "md", variant = "default" }: LogoTextOnlyProps) {
  const sizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl", 
    xl: "text-4xl",
    "2xl": "text-5xl"
  };

  const variants = {
    default: "text-blue-600",
    white: "text-white",
    gradient: "bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent"
  };

  return (
    <div className={cn("relative", className)}>
      <span className={cn(
        "font-black tracking-tight relative z-10",
        sizes[size],
        variants[variant]
      )}>
        Tax
        <span className={cn(
          variant === "gradient" 
            ? "bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 bg-clip-text text-transparent"
            : variant === "white" 
              ? "text-blue-100"
              : "text-blue-800"
        )}>
          enzo
        </span>
      </span>
      
      {/* Premium Shadow Effect */}
      {variant === "gradient" && (
        <span className="absolute top-0 left-0 font-black tracking-tight text-blue-900/20 blur-sm -z-10" style={{ fontSize: "inherit" }}>
          Taxenzo
        </span>
      )}
    </div>
  );
}