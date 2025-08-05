import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Header } from '@/components/header';
import { Logo } from '@/components/ui/logo';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  const { user } = useAuth();
  
  const getUserName = () => {
    if (user) {
      const userData = user as any;
      if (userData.firstName) {
        return userData.firstName;
      }
      if (userData.email) {
        return userData.email.split('@')[0];
      }
      return 'Gebruiker';
    }
    return 'Gebruiker';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <Header />
      
      <main className="flex-1">
        {/* Welcome Header */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {title || `Welkom terug, ${getUserName()}!`}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {subtitle || "Beheer je belastingen met vertrouwen"}
                </p>
              </div>
              <div className="hidden md:flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Vandaag</div>
                  <div className="text-lg font-semibold text-blue-600">
                    {new Date().toLocaleDateString('nl-NL', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      {/* Dashboard Footer */}
      <footer className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/30 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <Logo size="md" variant="default" className="mx-auto mb-6" />
            <div className="space-y-2 text-gray-600 dark:text-gray-300">
              <p className="font-medium">
                Fiscavo © 2025 B.V. | <span className="text-blue-600">Simpel • Veilig • Accuraat</span> belastingadvies
              </p>
              <div className="flex justify-center items-center gap-6 text-sm">
                <span>BTW nr: NL123456789B01</span>
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <span>KvK nr: 12345678</span>
              </div>
              <div className="flex justify-center items-center gap-6 text-sm mt-4">
                <a href="/privacy" className="hover:text-blue-600 transition-colors">
                  Privacybeleid
                </a>
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <a href="/terms" className="hover:text-blue-600 transition-colors">
                  Algemene Voorwaarden
                </a>
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <a href="/security" className="hover:text-blue-600 transition-colors">
                  Beveiliging
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}