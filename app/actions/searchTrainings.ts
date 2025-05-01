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
  type?: string;
  level?: string;
  duration?: string;
}

interface SearchResult {
  trainings: any[];
  error: string | null;
  filters?: SearchFilters;
}

export async function searchTrainings(query: string): Promise<SearchResult> {
  try {
    // Use OpenAI to interpret the search query
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant that interprets Muay Thai training program search queries and extracts structured data.
          Extract the following information:
          - type (from: group-class-session, group-class-period, private-class, package)
          - level (from: all-levels, beginner, intermediate, advanced, fighter, kids)
          - duration (from: 1-day, 1-week, 2-weeks, 3-weeks, 1-month, 2-months, 3-months, 6-months, 1-year)
          
          You must return ONLY a JSON object in this exact format, nothing else:
          {
            "type": "string or null",
            "level": "string or null",
            "duration": "string or null"
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
      .from('trainings')
      .select(`
        *,
        gyms (
          name,
          city
        )
      `);

    if (filters.type) {
      queryBuilder = queryBuilder.eq('type', filters.type);
    }

    if (filters.level) {
      queryBuilder = queryBuilder.eq('level', filters.level);
    }

    if (filters.duration) {
      queryBuilder = queryBuilder.eq('duration', filters.duration);
    }

    const { data: trainings, error } = await queryBuilder;

    if (error) throw error;

    return { trainings, error: null, filters };
  } catch (error) {
    console.error('Search error:', error);
    return { trainings: [], error: 'Failed to search trainings', filters: undefined };
  }
} 