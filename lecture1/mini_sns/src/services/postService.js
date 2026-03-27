import { supabase } from './supabase';

// Unsplash 음식 사진 photo ID 목록 (정방형, CDN 직접 접근)
const FOOD_PHOTO_IDS = [
  'photo-1567620905732-2d1ec7ab7445', // 팬케이크
  'photo-1565299624946-b28f40a0ae38', // 피자
  'photo-1568901346375-23c9450c58cd', // 버거
  'photo-1562967914-608f82629710',    // 라멘
  'photo-1540189549336-e6e99eb4b875', // 스시
  'photo-1476718406336-bb5a9690ee2a', // 파스타
  'photo-1546069901-ba9599a7e63c',    // 샐러드
  'photo-1555939594-58d7cb561ad1',    // 타코
  'photo-1504754524776-8f4f37790ca0', // 카레
  'photo-1455619452474-d2be8b1e70cd', // 비빔밥
  'photo-1498654896293-37aacf113fd9', // 에그베네딕트
  'photo-1572490122747-3e9c1efb27b0', // 샌드위치
  'photo-1569050467447-ce54b3bbc37d', // 스시롤
  'photo-1414235077428-338989a2e8c0', // 레스토랑 음식
  'photo-1504674900247-0877df9cc836', // 스테이크
  'photo-1606755962773-d324e0a13086', // 한식
  'photo-1583394838336-acd977736f90', // 딤섬
  'photo-1525351484163-7529414344d8', // 디저트
  'photo-1481070414801-51fd0d591058', // 브런치
  'photo-1484723091739-30anefed75df', // 프렌치토스트
];

export const getRandomFoodImage = () => {
  const photoId = FOOD_PHOTO_IDS[Math.floor(Math.random() * FOOD_PHOTO_IDS.length)];
  return `https://images.unsplash.com/${photoId}?w=400&h=400&fit=crop&q=80`;
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
