import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PropertyList } from './components/PropertyList';
import { PropertyModal } from './components/PropertyModal';
import { InquiryModal } from './components/InquiryModal';
import { Footer } from './components/Footer';
import { supabase, City, PropertyWithCity } from './lib/supabase';

function App() {
  const [cities, setCities] = useState<City[]>([]);
  const [properties, setProperties] = useState<PropertyWithCity[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<PropertyWithCity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<PropertyWithCity | null>(null);
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  useEffect(() => {
    fetchCities();
    fetchProperties();
  }, []);

  useEffect(() => {
    filterProperties();
  }, [properties, selectedCity, searchQuery]);

  const fetchCities = async () => {
    try {
      const { data, error } = await supabase
        .from('cities')
        .select('*')
        .order('name');

      if (error) throw error;
      setCities(data || []);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*, cities(*)')
        .eq('is_available', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProperties = () => {
    let filtered = [...properties];

    if (selectedCity) {
      filtered = filtered.filter((property) => property.cities.slug === selectedCity);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(query) ||
          property.locality.toLowerCase().includes(query) ||
          property.property_type.toLowerCase().includes(query) ||
          property.description.toLowerCase().includes(query) ||
          property.amenities.some((amenity) => amenity.toLowerCase().includes(query))
      );
    }

    setFilteredProperties(filtered);
  };

  const handleInquirySuccess = () => {
    setShowInquiryModal(false);
    alert('Your inquiry has been submitted successfully! We will contact you soon.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero
        cities={cities}
        selectedCity={selectedCity}
        searchQuery={searchQuery}
        onCityChange={setSelectedCity}
        onSearchChange={setSearchQuery}
      />
      <PropertyList
        properties={filteredProperties}
        loading={loading}
        onPropertyClick={setSelectedProperty}
      />
      <Footer />

      {selectedProperty && !showInquiryModal && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onInquire={() => setShowInquiryModal(true)}
        />
      )}

      {selectedProperty && showInquiryModal && (
        <InquiryModal
          property={selectedProperty}
          onClose={() => setShowInquiryModal(false)}
          onSuccess={handleInquirySuccess}
        />
      )}
    </div>
  );
}

export default App;
