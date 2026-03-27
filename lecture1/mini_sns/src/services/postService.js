import { supabase } from './supabase';

const FOOD_KEYWORDS = ['burger', 'pizza', 'sushi', 'ramen', 'pasta', 'tacos', 'steak', 'salad', 'curry', 'bbq'];

export const getRandomFoodImage = () => {
  const keyword = FOOD_KEYWORDS[Math.floor(Math.random() * FOOD_KEYWORDS.length)];
  const seed = Math.floor(Math.random() * 1000);
  return `https://source.unsplash.com/400x400/?${keyword},food&sig=${seed}`;
};

export const fetchPosts = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      users (id, nickname, profile_image_url),
      comments (
        id, content, created_at,
        users (id, nickname)
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const createPost = async ({ userId, imageUrl, caption, hashtags, location }) => {
  const { data, error } = await supabase
    .from('posts')
    .insert({ user_id: userId, image_url: imageUrl, caption, hashtags, location })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const toggleLike = async ({ postId, userId }) => {
  const { data: existing } = await supabase
    .from('likes')
    .select('id')
    .eq('post_id', postId)
    .eq('user_id', userId)
    .maybeSingle();

  if (existing) {
    await supabase.from('likes').delete().eq('id', existing.id);
    await supabase.from('posts').update({ like_count: supabase.rpc('decrement', { x: 1 }) }).eq('id', postId);
    return false;
  } else {
    await supabase.from('likes').insert({ post_id: postId, user_id: userId });
    await supabase.from('posts').update({ like_count: supabase.raw('like_count + 1') }).eq('id', postId);
    return true;
  }
};

export const addComment = async ({ postId, userId, content }) => {
  const { data, error } = await supabase
    .from('comments')
    .insert({ post_id: postId, user_id: userId, content })
    .select(`*, users(id, nickname)`)
    .single();

  if (error) throw error;
  return data;
};

export const fetchComments = async (postId) => {
  const { data, error } = await supabase
    .from('comments')
    .select(`*, users(id, nickname)`)
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
};

export const fetchUserPosts = async (userId) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getUserLikedPosts = async (userId) => {
  const { data, error } = await supabase
    .from('likes')
    .select('post_id')
    .eq('user_id', userId);

  if (error) return [];
  return data.map(l => l.post_id);
};
