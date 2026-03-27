import { supabase } from './supabase';

export const getComments = async (postId) => {
  const { data, error } = await supabase
    .from('comments')
    .select('*, profiles(username)')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
};

export const createComment = async (content, postId, userId) => {
  const { data, error } = await supabase
    .from('comments')
    .insert({ content, post_id: postId, user_id: userId })
    .select('*, profiles(username)')
    .single();
  if (error) throw error;
  return data;
};

export const deleteComment = async (id) => {
  const { error } = await supabase.from('comments').delete().eq('id', id);
  if (error) throw error;
};
