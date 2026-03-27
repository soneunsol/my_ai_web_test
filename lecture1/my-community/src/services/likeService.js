import { supabase } from './supabase';

export const getLikes = async (postId) => {
  const { data, error } = await supabase
    .from('likes')
    .select('user_id')
    .eq('post_id', postId);
  if (error) throw error;
  return data;
};

export const addLike = async (postId, userId) => {
  const { error } = await supabase
    .from('likes')
    .insert({ post_id: postId, user_id: userId });
  if (error) throw error;
};

export const removeLike = async (postId, userId) => {
  const { error } = await supabase
    .from('likes')
    .delete()
    .eq('post_id', postId)
    .eq('user_id', userId);
  if (error) throw error;
};
