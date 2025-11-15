import { Building2, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  const cities = ['Patna', 'Raipur','Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata'];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Building2 className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold text-white">NestHub</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Your trusted partner for zero brokerage rentals across India. Find your perfect home
              without any hidden charges or brokerage fees.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Cities We Cover</h3>
            <ul className="space-y-2">
              {cities.map((city) => (
                <li key={city}>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    {city}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="tel:+919771626100" className="hover:text-blue-500 transition-colors">
                  +919199768778
                </a>
              </li>
              <li>
                <a href="mailto:adarsh.kumar919976@gmail.com" className="hover:text-blue-500 transition-colors">
                  adarsh.kumar919976@gmail.com
                </a>
              </li>
              <li className="text-gray-400">
                Raipur, India
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} NestHub. All rights reserved. Zero Brokerage Rentals.</p>
        </div>
      </div>
    </footer>
  );
}
