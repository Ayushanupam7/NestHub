import { PropertyWithCity } from '../lib/supabase';
import { PropertyCard } from './PropertyCard';

interface PropertyListProps {
  properties: PropertyWithCity[];
  loading: boolean;
  onPropertyClick: (property: PropertyWithCity) => void;
}

export function PropertyList({ properties, loading, onPropertyClick }: PropertyListProps) {
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-5">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-3 w-2/3"></div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="border-t pt-4">
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Properties Found</h3>
          <p className="text-gray-600">Try adjusting your search filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {properties.length} {properties.length === 1 ? 'Property' : 'Properties'} Available
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onClick={() => onPropertyClick(property)}
          />
        ))}
      </div>
    </div>
  );
}
