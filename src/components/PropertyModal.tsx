import { X, Bed, Bath, Square, MapPin, IndianRupee, Phone, Mail, Check } from 'lucide-react';
import { PropertyWithCity } from '../lib/supabase';
import { useState } from 'react';

interface PropertyModalProps {
  property: PropertyWithCity;
  onClose: () => void;
  onInquire: () => void;
}

export function PropertyModal({ property, onClose, onInquire }: PropertyModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={onClose}
              className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          <div className="bg-white">
            <div className="relative h-96">
              <img
                src={property.images[currentImageIndex] || property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              {property.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-3xl font-bold text-gray-900">{property.title}</h2>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {property.property_type}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{property.address}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <Bed className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-2xl font-bold text-gray-900">{property.bedrooms}</p>
                  <p className="text-sm text-gray-600">Bedrooms</p>
                </div>
                <div className="text-center">
                  <Bath className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-2xl font-bold text-gray-900">{property.bathrooms}</p>
                  <p className="text-sm text-gray-600">Bathrooms</p>
                </div>
                <div className="text-center">
                  <Square className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-2xl font-bold text-gray-900">{property.area_sqft}</p>
                  <p className="text-sm text-gray-600">Sq. Ft.</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>

              {property.amenities.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center text-gray-700">
                        <Check className="h-5 w-5 mr-2 text-green-500" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t border-b py-6 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Monthly Rent</p>
                    <div className="flex items-center text-3xl font-bold text-blue-600">
                      <IndianRupee className="h-7 w-7" />
                      <span>{property.rent_amount.toLocaleString()}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Security Deposit</p>
                    <div className="flex items-center text-3xl font-bold text-gray-900">
                      <IndianRupee className="h-7 w-7" />
                      <span>{property.deposit_amount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Contact Information</h3>
                <div className="space-y-3">
                  <a
                    href={`tel:${property.contact_phone}`}
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <Phone className="h-5 w-5 mr-3 text-blue-600" />
                    <span className="font-medium">{property.contact_phone}</span>
                  </a>
                  {property.contact_email && (
                    <a
                      href={`mailto:${property.contact_email}`}
                      className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <Mail className="h-5 w-5 mr-3 text-blue-600" />
                      <span className="font-medium">{property.contact_email}</span>
                    </a>
                  )}
                </div>
              </div>

              <button
                onClick={onInquire}
                className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
              >
                Send Inquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
