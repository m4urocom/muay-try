'use client'

import { useEffect, useState } from 'react';
import { GymCard } from "@/components/gyms/GymCard"
import { GymFilters } from "@/components/gyms/GymFilters"
import AISearchInput from '../components/AISearchInput';
import { searchGyms } from '../actions/searchGyms';
import { createClient } from '@/lib/supabase/client';
import { getFavorites } from '@/lib/favorites';

const supabase = createClient();

interface Gym {
  id: string;
  name: string;
  city: string;
  image_url: string;
  description: string | null;
  amenities: Record<string, boolean>;
}

const GYM_IMAGE_URL = "https://nadglrjrjalxcxrwswpg.supabase.co/storage/v1/object/sign/gym-images/manasak1.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzY2ZmFkNmIwLWVhZDctNGZkNS1iNDFiLWZjZjg5ODkzZGU5NCJ9.eyJ1cmwiOiJneW0taW1hZ2VzL21hbmFzYWsxLmpwZyIsImlhdCI6MTc0NjAwNTQ0MCwiZXhwIjoxODQwNjEzNDQwfQ.cnX2HKpqns4hoQrtbjQdA9Bi_uXRWqEBOcy1c0NbyfY"

export default function GymsPage() {
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favoriteGymIds, setFavoriteGymIds] = useState<string[]>([]);

  // Fetch favorites when user changes
  useEffect(() => {
    async function loadFavorites() {
      const { gyms } = await getFavorites();
      setFavoriteGymIds(gyms);
    }
    loadFavorites();

    // Subscribe to auth changes to update favorites
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      loadFavorites();
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch all gyms on initial load
  useEffect(() => {
    async function fetchGyms() {
      let query = supabase.from('gyms').select('*');

      if (selectedCities.length > 0) {
        query = query.in('city', selectedCities);
      }

      if (selectedAmenities.length > 0) {
        selectedAmenities.forEach(amenity => {
          query = query.eq(`amenities->${amenity}`, true);
        });
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching gyms:', error);
        return;
      }

      setGyms(data || []);
    }

    fetchGyms();
  }, [selectedCities, selectedAmenities]);

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setError(null);
    
    try {
      const result = await searchGyms(query);
      if (result.error) {
        setError(result.error);
      } else {
        setGyms(result.gyms);
        // Only update filters that were explicitly mentioned in the search
        if (result.filters) {
          if (result.filters.city) {
            setSelectedCities([result.filters.city]);
          } else {
            setSelectedCities([]); // Clear city filter if not mentioned
          }
          if (result.filters.amenities && result.filters.amenities.length > 0) {
            setSelectedAmenities(result.filters.amenities);
          } else {
            setSelectedAmenities([]); // Clear amenities if not mentioned
          }
        }
      }
    } catch (error) {
      console.error('Search error:', error);
      setError('Failed to search gyms');
    } finally {
      setIsSearching(false);
    }
  };

  const handleCityChange = (city: string) => {
    setSelectedCities((prev) =>
      prev.includes(city)
        ? prev.filter((c) => c !== city)
        : [...prev, city]
    )
  }

  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    )
  }

  const handleFavoriteChange = (gymId: string, isFavorited: boolean) => {
    setFavoriteGymIds(prev => 
      isFavorited 
        ? [...prev, gymId]
        : prev.filter(id => id !== gymId)
    )
  }

  return (
    <main className="container max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-4 gap-6 py-6">
        <aside className="space-y-4">
          <div className="mb-6">
            <AISearchInput onSearch={handleSearch} isLoading={isSearching} />
            {error && (
              <div className="text-red-500 text-sm mt-2">{error}</div>
            )}
          </div>
          <GymFilters
            selectedCities={selectedCities}
            selectedAmenities={selectedAmenities}
            onCityChange={handleCityChange}
            onAmenityChange={handleAmenityChange}
          />
        </aside>
        <section className="col-span-3">
          <div className="grid grid-cols-3 gap-4">
            {gyms.map((gym) => (
              <GymCard
                key={gym.id}
                id={gym.id}
                name={gym.name}
                city={gym.city}
                imageUrl={gym.image_url || GYM_IMAGE_URL}
                isFavorited={favoriteGymIds.includes(gym.id)}
                onFavoriteChange={handleFavoriteChange}
              />
            ))}
          </div>
          {gyms.length === 0 && !isSearching && !error && (
            <p className="text-center text-gray-500 mt-8">
              Start searching to find gyms that match your criteria!
            </p>
          )}
        </section>
      </div>
    </main>
  );
} 