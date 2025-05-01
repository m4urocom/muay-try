'use server';

import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface SearchFilters {
  city?: string;
  amenities?: string[];
}

interface SearchResult {
  gyms: any[];
  error: string | null;
  filters?: SearchFilters;
}

export async function searchGyms(query: string): Promise<SearchResult> {
  try {
    // Use OpenAI to interpret the search query
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant that interprets gym search queries and extracts structured data.
          Extract the following information:
          - city (if mentioned)
          - amenities (from the following list: pool, shop, shower, free_wifi, restrooms, restaurant, weight_room, group_classes, massage_and_spa, personal_trainer, onsite_accommodation)
          
          You must return ONLY a JSON object in this exact format, nothing else:
          {
            "city": "string or null",
            "amenities": ["array of amenities or empty array"]
          }`
        },
        {
          role: "user",
          content: query
        }
      ],
      model: "gpt-3.5-turbo",
      temperature: 0
    });

    if (!completion.choices[0].message.content) {
      throw new Error('No response from OpenAI');
    }

    const filters: SearchFilters = JSON.parse(completion.choices[0].message.content);
    
    // Build the Supabase query
    let queryBuilder = supabase
      .from('gyms')
      .select('*');

    if (filters.city) {
      queryBuilder = queryBuilder.ilike('city', `%${filters.city}%`);
    }

    if (filters.amenities && filters.amenities.length > 0) {
      filters.amenities.forEach(amenity => {
        queryBuilder = queryBuilder.eq(`amenities->${amenity}`, true);
      });
    }

    const { data: gyms, error } = await queryBuilder;

    if (error) throw error;

    return { gyms, error: null, filters };
  } catch (error) {
    console.error('Search error:', error);
    return { gyms: [], error: 'Failed to search gyms', filters: undefined };
  }
} 