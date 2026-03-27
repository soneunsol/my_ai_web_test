import { supabase } from './supabase';

export const getPosts = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select('*, profiles(username)')
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

export const createPost = async (title, content, userId) => {
  const { data, error } = await supabase
    .from('posts')
    .insert({ title, content, user_id: userId })
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deletePost = async (id) => {
  const { error } = await supabase.from('posts').delete().eq('id', id);
  if (error) throw error;
};
