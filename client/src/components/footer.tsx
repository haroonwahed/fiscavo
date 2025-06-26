import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export function Footer() {

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-blue-50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Premium Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Logo size="lg" variant="default" className="mb-6" />
            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-lg">
              De complete belastingoplossing voor Nederlandse ondernemers. 
              Automatiseer je administratie en blijf altijd compliant met de nieuwste regelgeving.
            </p>
            
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="bg-white/80 backdrop-blur-sm border-0 hover:shadow-lg transition-all duration-300 rounded-xl shadow-sm">
                <div className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email ons</p>
                      <a href="mailto:info@fiscavo.com" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                        info@fiscavo.com
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-sm border-0 hover:shadow-lg transition-all duration-300 rounded-xl shadow-sm">
                <div className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <Phone className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Bel ons</p>
                      <a href="tel:+31208007456" className="font-semibold text-green-600 hover:text-green-700 transition-colors">
                        020-800-7456
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          
          {/* Platform Links */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-6">Platform</h4>
            <ul className="space-y-4">
              <li>
                <Button 
                  variant="ghost" 
                  className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-0 h-auto font-medium justify-start"
                  onClick={() => document.querySelector('#faq-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Veelgestelde vragen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-0 h-auto font-medium justify-start"
                  onClick={() => window.location.href = '/about'}
                >
                  Over ons
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-0 h-auto font-medium justify-start"
                  onClick={() => window.location.href = 'mailto:info@fiscavo.com'}
                >
                  Contact
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-0 h-auto font-medium justify-start"
                  onClick={() => window.location.href = '/support'}
                >
                  Support Center
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </li>
            </ul>
          </div>
          
          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-6">Juridisch</h4>
            <ul className="space-y-4">
              <li>
                <Button 
                  variant="ghost" 
                  className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-0 h-auto font-medium justify-start"
                  onClick={() => window.location.href = '/privacy'}
                >
                  Privacybeleid
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-0 h-auto font-medium justify-start"
                  onClick={() => window.location.href = '/terms'}
                >
                  Algemene voorwaarden
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-0 h-auto font-medium justify-start"
                  onClick={() => window.location.href = '/cookies'}
                >
                  Cookie beleid
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-0 h-auto font-medium justify-start"
                  onClick={() => window.location.href = '/security'}
                >
                  Beveiliging
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-0 h-auto font-medium justify-start"
                  onClick={() => window.location.href = '/gdpr'}
                >
                  AVG/GDPR Rechten
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <p className="text-gray-600 font-medium">
                © 2024 Fiscavo. Alle rechten voorbehouden.
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>KvK: 87654321</span>
                <span>•</span>
                <span>BTW: NL123456789B01</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <MapPin className="h-4 w-4" />
                <span>Amsterdam, Nederland</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}