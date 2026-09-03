/**
 * 해시태그 입력 문자열을 태그 배열로 변환한다.
 * '#react, #디자인 시스템' → ['react', '디자인']
 *
 * @param {string} rawText - 사용자가 입력한 해시태그 문자열
 * @returns {string[]} 중복 제거된 태그 배열 (최대 5개)
 */
export function parseHashtags(rawText) {
  if (!rawText) return [];

  const tags = rawText
    .split(/[\s,]+/)
    .map((chunk) => chunk.replace(/^#+/, '').trim().toLowerCase())
    .filter(Boolean);

  return Array.from(new Set(tags)).slice(0, 5);
}
