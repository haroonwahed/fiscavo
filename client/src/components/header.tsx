export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary">Fiscatax</h1>
              <p className="text-xs text-gray-500">Simpel | Veilig | Accuraat</p>
            </div>
          </div>
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#dashboard" className="text-primary px-3 py-2 rounded-md text-sm font-medium bg-blue-50">Dashboard</a>
              <a href="#aftrekposten" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Aftrekposten</a>
              <a href="#deadlines" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Deadlines</a>
              <a href="#faq" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">FAQ</a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}