/** 아이디 규칙: 영문 소문자/숫자/언더바 4~20자 */
export const USERNAME_PATTERN = /^[a-z0-9_]{4,20}$/;

/**
 * 아이디 유효성을 검사한다.
 *
 * @param {string} username - 검사할 아이디
 * @returns {{ isValid: boolean, message: string }} 검사 결과와 안내 메시지
 */
export function validateUsername(username) {
  if (!username) {
    return { isValid: false, message: '아이디를 입력해 주세요.' };
  }
  if (!USERNAME_PATTERN.test(username)) {
    return { isValid: false, message: '영문 소문자·숫자·_ 조합 4~20자로 입력해 주세요.' };
  }

  return { isValid: true, message: '사용 가능한 형식입니다.' };
}

/**
 * 비밀번호 규칙 4가지를 각각 검사한다.
 * (회원가입 화면에서 규칙 체크리스트를 그리는 데 사용)
 *
 * @param {string} password - 검사할 비밀번호
 * @returns {Array<{ key: string, label: string, isPassed: boolean }>} 규칙별 통과 여부
 */
export function getPasswordRules(password) {
  const value = password ?? '';

  return [
    { key: 'length', label: '8자 이상', isPassed: value.length >= 8 },
    { key: 'letter', label: '영문 포함', isPassed: /[a-zA-Z]/.test(value) },
    { key: 'number', label: '숫자 포함', isPassed: /[0-9]/.test(value) },
    { key: 'special', label: '특수문자 포함', isPassed: /[^a-zA-Z0-9]/.test(value) },
  ];
}

/**
 * 비밀번호가 모든 규칙을 통과했는지 확인한다.
 *
 * @param {string} password - 검사할 비밀번호
 * @returns {boolean} 전체 통과 여부
 */
export function isPasswordValid(password) {
  return getPasswordRules(password).every((rule) => rule.isPassed);
}
