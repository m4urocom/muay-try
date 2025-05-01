import { createClient } from '@/lib/supabase/client';

export async function getFavorites() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { gyms: [], trainings: [] };

  const { data: gymFavorites } = await supabase
    .from('favorites')
    .select('gym_id')
    .eq('user_id', user.id)
    .not('gym_id', 'is', null);

  const { data: trainingFavorites } = await supabase
    .from('favorites')
    .select('training_id')
    .eq('user_id', user.id)
    .not('training_id', 'is', null);

  return {
    gyms: (gymFavorites || []).map(f => f.gym_id),
    trainings: (trainingFavorites || []).map(f => f.training_id)
  };
} 