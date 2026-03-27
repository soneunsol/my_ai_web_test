import { supabase } from './supabase';

export const getPosts = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select('*, profiles(username), comments(count), likes(count)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const getPost = async (id) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*, profiles(username)')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
};

export const incrementViews = async (id) => {
  await supabase.rpc('increment_post_views', { post_id: id });
};

export const createPost = async (title, content, userId, imageUrl = null, hashtags = []) => {
  const { data, error } = await supabase
    .from('posts')
    .insert({ title, content, user_id: userId, image_url: imageUrl, hashtags })
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deletePost = async (id) => {
  const { error } = await supabase.from('posts').delete().eq('id', id);
  if (error) throw error;
};
