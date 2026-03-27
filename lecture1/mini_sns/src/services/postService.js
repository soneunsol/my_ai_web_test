import { supabase } from './supabase';

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

/**
 * Unsplash API를 호출하여 음식 관련 랜덤 이미지 URL을 반환합니다.
 * API 키가 없거나 호출 실패 시 picsum.photos로 폴백합니다.
 */
export const getRandomFoodImage = async (query = 'food') => {
  if (!UNSPLASH_ACCESS_KEY || UNSPLASH_ACCESS_KEY === '여기에_Unsplash_Access_Key_입력') {
    return `https://picsum.photos/400/400?random=${Date.now()}`;
  }

  try {
    const res = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=squarish&client_id=${UNSPLASH_ACCESS_KEY}`
    );
    if (!res.ok) throw new Error('Unsplash API 오류');
    const data = await res.json();
    return data.urls.regular;
  } catch {
    return `https://picsum.photos/400/400?random=${Date.now()}`;
  }
};

export const fetchPosts = async () => {
  const { data, error } = await supabase
    .from('sns_posts')
    .select(`
      *,
      sns_users (id, nickname, profile_image_url),
      sns_comments (
        id, content, created_at,
        sns_users (id, nickname)
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const createPost = async ({ userId, imageUrl, caption, hashtags, location }) => {
  const { data, error } = await supabase
    .from('sns_posts')
    .insert({ user_id: userId, image_url: imageUrl, caption, hashtags, location })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const toggleLike = async ({ postId, userId, currentLiked, currentCount }) => {
  if (currentLiked) {
    await supabase.from('sns_likes').delete().eq('post_id', postId).eq('user_id', userId);
    await supabase.from('sns_posts').update({ like_count: Math.max(0, currentCount - 1) }).eq('id', postId);
    return false;
  } else {
    await supabase.from('sns_likes').insert({ post_id: postId, user_id: userId });
    await supabase.from('sns_posts').update({ like_count: currentCount + 1 }).eq('id', postId);
    return true;
  }
};

export const addComment = async ({ postId, userId, content }) => {
  const { data, error } = await supabase
    .from('sns_comments')
    .insert({ post_id: postId, user_id: userId, content })
    .select(`*, sns_users(id, nickname)`)
    .single();

  if (error) throw error;
  return data;
};

export const fetchComments = async (postId) => {
  const { data, error } = await supabase
    .from('sns_comments')
    .select(`*, sns_users(id, nickname)`)
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
};

export const fetchUserPosts = async (userId) => {
  const { data, error } = await supabase
    .from('sns_posts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getUserLikedPosts = async (userId) => {
  const { data, error } = await supabase
    .from('sns_likes')
    .select('post_id')
    .eq('user_id', userId);

  if (error) return [];
  return data.map(l => l.post_id);
};
