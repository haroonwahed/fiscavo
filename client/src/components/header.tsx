import { Link, useLocation } from "wouter";
import { Calculator, FileText, Car, MessageSquare, CheckSquare, BarChart3, Home, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/ui/logo";

export function Header() {
  const [location] = useLocation();
  const { user, isAuthenticated, isLoading } = useAuth();

  const navigationItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/btw-calculator", label: "BTW", icon: FileText },
    { href: "/transactions", label: "Transacties", icon: Calculator },
    { href: "/mileage", label: "Kilometers", icon: Car },
    { href: "/tax-calculator", label: "Belasting", icon: BarChart3 },
    { href: "/chat", label: "Assistent", icon: MessageSquare },
    { href: "/deductions", label: "Aftrekposten", icon: CheckSquare },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex-shrink-0 cursor-pointer">
                <Logo size="xl" variant="default" />
              </div>
            </Link>
          </div>
          <nav className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive 
                        ? 'border' 
                        : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                    }`} style={isActive ? { 
                      color: 'var(--color-primary)', 
                      backgroundColor: 'rgba(54, 141, 217, 0.1)', 
                      borderColor: 'var(--color-primary)' 
                    } : {}}>
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </div>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* User Authentication Controls */}
          <div className="flex items-center space-x-4">
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
            ) : isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 h-8">
                    {(user as any)?.profileImageUrl ? (
                      <img 
                        src={(user as any).profileImageUrl} 
                        alt="Profile" 
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">
                      {(user as any)?.firstName || (user as any)?.email || 'Gebruiker'}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => window.location.href = '/api/logout'}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Uitloggen
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={() => window.location.href = '/api/login'}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Inloggen
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}