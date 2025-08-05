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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                    <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Simpel | Veilig | Accuraat belastingadvies voor Nederlandse ondernemers
              </p>
              <div className="space-y-1 text-xs text-gray-500">
                <p>BTW nr: NL123456789B01</p>
                <p>KvK nr: 12345678</p>
              </div>
            </div>

            {/* Diensten */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Diensten</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li><a href="/btw" className="hover:text-blue-600 transition-colors">BTW Aangifte</a></li>
                <li><a href="/tax-calculator" className="hover:text-blue-600 transition-colors">Inkomstenbelasting</a></li>
                <li><a href="/mileage" className="hover:text-blue-600 transition-colors">Boekhouden</a></li>
                <li><a href="/deductions" className="hover:text-blue-600 transition-colors">Belastingadvies</a></li>
                <li><a href="/transactions" className="hover:text-blue-600 transition-colors">Administratie</a></li>
              </ul>
            </div>

            {/* Ondersteuning */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Ondersteuning</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li><a href="/help" className="hover:text-blue-600 transition-colors">Help centrum</a></li>
                <li><a href="/contact" className="hover:text-blue-600 transition-colors">Contact</a></li>
                <li><a href="/faq" className="hover:text-blue-600 transition-colors">FAQ</a></li>
                <li><a href="/chat" className="hover:text-blue-600 transition-colors">Live chat</a></li>
                <li><a href="/support" className="hover:text-blue-600 transition-colors">Telefoon support</a></li>
              </ul>
            </div>

            {/* Juridisch */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Juridisch</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li><a href="/privacy" className="hover:text-blue-600 transition-colors">Privacyverklaring</a></li>
                <li><a href="/terms" className="hover:text-blue-600 transition-colors">Algemene voorwaarden</a></li>
                <li><a href="/cookies" className="hover:text-blue-600 transition-colors">Cookie beleid</a></li>
                <li><a href="/security" className="hover:text-blue-600 transition-colors">Disclaimer</a></li>
                <li><a href="/gdpr" className="hover:text-blue-600 transition-colors">Klachtenregeling</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
                <span>© 2025 B.V. Alle rechten voorbehouden. 
                Geregistreerd bij de Nederlandse Orde van Belastingadviseurs (NOB).</span>
              </div>
              <div className="flex space-x-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>SSL Beveiligd</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>🇳🇱</span>
                  <span>Nederlandse wet</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>GDPR Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}