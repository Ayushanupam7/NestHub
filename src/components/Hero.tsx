import { Search } from 'lucide-react';
import { City } from '../lib/supabase';

interface HeroProps {
  cities: City[];
  selectedCity: string;
  searchQuery: string;
  onCityChange: (city: string) => void;
  onSearchChange: (query: string) => void;
}

export function Hero({ cities, selectedCity, searchQuery, onCityChange, onSearchChange }: HeroProps) {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Find Your Dream Home
          </h1>
          <p className="text-xl sm:text-2xl text-blue-100 mb-2">
            Zero Brokerage Rentals Across India
          </p>
          <p className="text-blue-200">
            Browse properties in major cities without any brokerage fees
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <select
                id="city"
                value={selectedCity}
                onChange={(e) => onCityChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.slug}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Properties
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search by locality, property type, or features..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
