import { Building2, Phone } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">NestHub</span>
            <span className="text-sm text-gray-500 hidden sm:inline">Rentals</span>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="tel:+000000000000"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Phone className="h-5 w-5" />
              <span className="hidden sm:inline font-medium">+91 9XXXXXXXXX0</span>
            </a>
          </div>
        </div>
      </div>

      <div className="bg-blue-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium">Zero Brokerage | Find Your Perfect Home</p>
        </div>
      </div>
    </header>
  );
}
