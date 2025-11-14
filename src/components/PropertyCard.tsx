import { Bed, Bath, Square, MapPin, IndianRupee } from 'lucide-react';
import { PropertyWithCity } from '../lib/supabase';

interface PropertyCardProps {
  property: PropertyWithCity;
  onClick: () => void;
}

export function PropertyCard({ property, onClick }: PropertyCardProps) {
  const mainImage = property.images[0] || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg';

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={mainImage}
          alt={property.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {property.property_type}
        </div>
        {!property.is_available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
              Not Available
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {property.title}
        </h3>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.locality}, {property.cities.name}</span>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4 text-sm text-gray-700">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1 text-gray-500" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1 text-gray-500" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1 text-gray-500" />
            <span>{property.area_sqft} sqft</span>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Monthly Rent</p>
              <div className="flex items-center text-2xl font-bold text-blue-600">
                <IndianRupee className="h-5 w-5" />
                <span>{property.rent_amount.toLocaleString()}</span>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
