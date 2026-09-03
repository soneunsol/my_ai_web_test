/**
 * 비밀번호를 SHA-256 으로 해싱한다.
 * 평문 저장을 피하기 위한 학습용 처리이며, 실서비스에서는
 * Supabase Auth 또는 서버측 bcrypt/argon2 사용을 권장한다.
 *
 * @param {string} password - 원본 비밀번호
 * @returns {Promise<string>} 16진수 해시 문자열
 */
export async function hashPassword(password) {
  const encoded = new TextEncoder().encode(`devign::${ password }`);
  const buffer = await crypto.subtle.digest('SHA-256', encoded);

  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}
