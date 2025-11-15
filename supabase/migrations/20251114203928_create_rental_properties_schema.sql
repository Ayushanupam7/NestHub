/*
  # Rental Properties Schema

  1. New Tables
    - `cities`
      - `id` (uuid, primary key)
      - `name` (text, unique, not null) - City name
      - `state` (text, not null) - State name
      - `slug` (text, unique, not null) - URL-friendly slug
      - `created_at` (timestamptz) - Creation timestamp
    
    - `properties`
      - `id` (uuid, primary key)
      - `title` (text, not null) - Property title
      - `description` (text, not null) - Property description
      - `property_type` (text, not null) - Type (apartment, house, villa, etc.)
      - `bedrooms` (integer, not null) - Number of bedrooms
      - `bathrooms` (integer, not null) - Number of bathrooms
      - `area_sqft` (integer, not null) - Area in square feet
      - `rent_amount` (integer, not null) - Monthly rent amount
      - `deposit_amount` (integer, not null) - Security deposit amount
      - `city_id` (uuid, foreign key) - Reference to cities table
      - `address` (text, not null) - Full address
      - `locality` (text, not null) - Locality/neighborhood
      - `is_available` (boolean, default true) - Availability status
      - `amenities` (text[], default empty array) - Array of amenities
      - `images` (text[], default empty array) - Array of image URLs
      - `contact_phone` (text, not null) - Contact phone number
      - `contact_email` (text) - Contact email (optional)
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
    
    - `inquiries`
      - `id` (uuid, primary key)
      - `property_id` (uuid, foreign key) - Reference to properties table
      - `name` (text, not null) - Inquirer name
      - `email` (text, not null) - Inquirer email
      - `phone` (text, not null) - Inquirer phone
      - `message` (text) - Inquiry message
      - `created_at` (timestamptz) - Creation timestamp

  2. Security
    - Enable RLS on all tables
    - Properties and cities are publicly readable (no authentication required)
    - Inquiries can be inserted by anyone but only readable by authenticated admins
*/

CREATE TABLE IF NOT EXISTS cities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  state text NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  property_type text NOT NULL,
  bedrooms integer NOT NULL,
  bathrooms integer NOT NULL,
  area_sqft integer NOT NULL,
  rent_amount integer NOT NULL,
  deposit_amount integer NOT NULL,
  city_id uuid REFERENCES cities(id) ON DELETE CASCADE,
  address text NOT NULL,
  locality text NOT NULL,
  is_available boolean DEFAULT true,
  amenities text[] DEFAULT '{}',
  images text[] DEFAULT '{}',
  contact_phone text NOT NULL,
  contact_email text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cities are publicly readable"
  ON cities FOR SELECT
  USING (true);

CREATE POLICY "Properties are publicly readable"
  ON properties FOR SELECT
  USING (true);

CREATE POLICY "Anyone can submit inquiries"
  ON inquiries FOR INSERT
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_properties_city_id ON properties(city_id);
CREATE INDEX IF NOT EXISTS idx_properties_is_available ON properties(is_available);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_property_id ON inquiries(property_id);

INSERT INTO cities (name, state, slug) VALUES
  ('Patna', 'Bihar', 'patna'),
  ('Raipur', 'Chhattisgarh', 'raipur'),
  ('Delhi', 'Delhi', 'delhi'),
  ('Mumbai', 'Maharashtra', 'mumbai'),
  ('Bangalore', 'Karnataka', 'bangalore'),
  ('Hyderabad', 'Telangana', 'hyderabad'),
  ('Chennai', 'Tamil Nadu', 'chennai'),
  ('Kolkata', 'West Bengal', 'kolkata')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO properties (title, description, property_type, bedrooms, bathrooms, area_sqft, rent_amount, deposit_amount, city_id, address, locality, amenities, images, contact_phone, contact_email) 
SELECT 
  '2BHK Furnished Apartment in Boring Road',
  'Beautiful fully furnished 2BHK apartment with modern amenities. Perfect for families and working professionals. The apartment features spacious rooms, modular kitchen, and parking space.',
  'Apartment',
  2,
  2,
  1200,
  15000,
  30000,
  id,
  'Boring Road, Near Patna High Court',
  'Boring Road',
  ARRAY['Parking', 'Power Backup', 'Security', 'Gym', 'Lift'],
  ARRAY['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg', 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg'],
  '+919771626100',
  'contact@home.com'
FROM cities WHERE slug = 'patna'
ON CONFLICT DO NOTHING;

INSERT INTO properties (title, description, property_type, bedrooms, bathrooms, area_sqft, rent_amount, deposit_amount, city_id, address, locality, amenities, images, contact_phone, contact_email)
SELECT 
  '3BHK Luxury Villa in Rajendra Nagar',
  'Spacious 3BHK independent villa with garden and parking. Located in prime residential area with excellent connectivity.',
  'Villa',
  3,
  3,
  2000,
  35000,
  70000,
  id,
  'Rajendra Nagar, Exhibition Road',
  'Rajendra Nagar',
  ARRAY['Garden', 'Parking', 'Security', 'Power Backup', 'Modular Kitchen'],
  ARRAY['https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg', 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'],
  '+919771626100',
  'contact@home.com'
FROM cities WHERE slug = 'patna'
ON CONFLICT DO NOTHING;

INSERT INTO properties (title, description, property_type, bedrooms, bathrooms, area_sqft, rent_amount, deposit_amount, city_id, address, locality, amenities, images, contact_phone, contact_email)
SELECT 
  '1BHK Modern Apartment in Koramangala',
  'Compact and well-designed 1BHK apartment perfect for bachelors or young couples. Located in the heart of Bangalore with easy access to IT parks.',
  'Apartment',
  1,
  1,
  650,
  18000,
  36000,
  id,
  'Koramangala 5th Block',
  'Koramangala',
  ARRAY['WiFi', 'Power Backup', 'Lift', 'Security', 'Parking'],
  ARRAY['https://images.pexels.com/photos/2029731/pexels-photo-2029731.jpeg', 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg'],
  '+919771626100',
  'contact@home.com'
FROM cities WHERE slug = 'bangalore'
ON CONFLICT DO NOTHING;

INSERT INTO properties (title, description, property_type, bedrooms, bathrooms, area_sqft, rent_amount, deposit_amount, city_id, address, locality, amenities, images, contact_phone, contact_email)
SELECT 
  '2BHK Sea View Apartment in Bandra',
  'Premium 2BHK apartment with stunning sea views. High-rise building with world-class amenities and security.',
  'Apartment',
  2,
  2,
  1100,
  55000,
  110000,
  id,
  'Bandra West, Linking Road',
  'Bandra',
  ARRAY['Sea View', 'Swimming Pool', 'Gym', 'Club House', 'Security', 'Lift', 'Parking'],
  ARRAY['https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg', 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg'],
  '+919771626100',
  'contact@home.com'
FROM cities WHERE slug = 'mumbai'
ON CONFLICT DO NOTHING;