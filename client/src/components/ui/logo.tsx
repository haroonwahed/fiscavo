import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "light" | "dark";
  size?: "sm" | "md" | "lg" | "xl";
}

export function Logo({ className, variant = "default", size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  const iconColors = {
    default: "#2563EB", // blue-600
    light: "#FFFFFF",
    dark: "#1E293B"
  };

  const textColors = {
    default: "text-gray-900",
    light: "text-white",
    dark: "text-gray-900"
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn("rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg", sizeClasses[size])}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={cn("transition-all", size === "sm" ? "w-4 h-4" : size === "md" ? "w-5 h-5" : size === "lg" ? "w-6 h-6" : "w-8 h-8")}
        >
          <path
            d="M9 3V1H15V3H21V5H19V7C19 8.1 18.1 9 17 9H15V11H17C18.1 11 19 11.9 19 13V15H21V17H15V19H9V17H3V15H5V13C5 11.9 5.9 11 7 11H9V9H7C5.9 9 5 8.1 5 7V5H3V3H9Z"
            fill="white"
          />
          <path
            d="M11 5H13V7H11V5Z"
            fill="white"
          />
          <path
            d="M11 13H13V15H11V13Z"
            fill="white"
          />
        </svg>
      </div>
      <span className={cn("font-bold tracking-tight", textColors[variant], 
        size === "sm" ? "text-lg" : size === "md" ? "text-xl" : size === "lg" ? "text-2xl" : "text-3xl")}>
        Taxenzo
      </span>
    </div>
  );
}