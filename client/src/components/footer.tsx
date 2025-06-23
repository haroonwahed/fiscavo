export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">BelastingAssistent</h3>
            <p className="text-gray-300 mb-4">Simpel belastingadvies voor ZZP'ers en BV's. Bespaar tijd, stress en geld met onze persoonlijke assistent.</p>
            <p className="text-sm text-gray-400">
              Dit is geen vervanging voor professioneel belastingadvies. Raadpleeg altijd een boekhouder voor complexe situaties.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Tools</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Aftrekpost checker</a></li>
              <li><a href="#" className="hover:text-white transition-colors">BTW assistent</a></li>
              <li><a href="#" className="hover:text-white transition-colors">To-do generator</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Deadline tracker</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Veelgestelde vragen</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy beleid</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gebruiksvoorwaarden</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 BelastingAssistent. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
}