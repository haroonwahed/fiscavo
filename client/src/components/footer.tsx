export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Fiscatax</h3>
            <p className="text-gray-300 mb-4">Simpel, veilig en accuraat belastingbeheer voor Nederlandse ondernemers. Automatiseer je BTW, track uitgaven en bereken belastingen in realtime.</p>
            <p className="text-sm text-gray-400">
              Dit is geen vervanging voor professioneel belastingadvies. Raadpleeg altijd een boekhouder voor complexe situaties.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Functies</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#transactions" className="hover:text-white transition-colors">Transactiebeheer</a></li>
              <li><a href="#btw" className="hover:text-white transition-colors">BTW Aangifte Generator</a></li>
              <li><a href="#mileage" className="hover:text-white transition-colors">Kilometerregistratie</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">Belastingcalculator</a></li>
              <li><a href="#receipts" className="hover:text-white transition-colors">Bonnetjes Scanner</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#faq" className="hover:text-white transition-colors">Veelgestelde vragen</a></li>
              <li className="text-gray-300">support@fiscatax.nl</li>
              <li className="text-gray-300">088-3472829</li>
              <li className="text-gray-300">Chat: 24/7 beschikbaar</li>
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy & Beveiliging</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Fiscatax B.V. • KvK: 85234567 • BTW: NL863456789B01</p>
        </div>
      </div>
    </footer>
  );
}