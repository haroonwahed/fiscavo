import { Link, useLocation } from "wouter";
import { Calculator, FileText, Car, MessageSquare, CheckSquare, BarChart3, Home } from "lucide-react";

export function Header() {
  const [location] = useLocation();

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
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex-shrink-0 cursor-pointer">
                <h1 className="text-2xl font-bold text-primary">Fiscatax</h1>
                <p className="text-xs text-gray-500">Simpel | Veilig | Accuraat</p>
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
                        ? 'text-primary bg-blue-50 border border-blue-200' 
                        : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                    }`}>
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </div>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}