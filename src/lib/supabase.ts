import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface City {
  id: string;
  name: string;
  state: string;
  slug: string;
  created_at: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  area_sqft: number;
  rent_amount: number;
  deposit_amount: number;
  city_id: string;
  address: string;
  locality: string;
  is_available: boolean;
  amenities: string[];
  images: string[];
  contact_phone: string;
  contact_email: string | null;
  created_at: string;
  updated_at: string;
}

export interface PropertyWithCity extends Property {
  cities: City;
}

export interface Inquiry {
  property_id: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
}
