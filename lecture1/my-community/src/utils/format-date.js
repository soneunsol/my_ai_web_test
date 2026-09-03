/**
 * 작성 시각을 '방금 전 / N분 전 / N시간 전 / N일 전 / YYYY.MM.DD' 형태로 변환한다.
 *
 * @param {string} isoString - ISO 8601 형식의 시각 문자열
 * @returns {string} 사람이 읽기 쉬운 상대 시간
 */
export function formatRelativeTime(isoString) {
  if (!isoString) return '';

  const target = new Date(isoString);
  const diffSeconds = Math.floor((Date.now() - target.getTime()) / 1000);

  if (diffSeconds < 60) return '방금 전';
  if (diffSeconds < 3600) return `${ Math.floor(diffSeconds / 60) }분 전`;
  if (diffSeconds < 86400) return `${ Math.floor(diffSeconds / 3600) }시간 전`;
  if (diffSeconds < 604800) return `${ Math.floor(diffSeconds / 86400) }일 전`;

  return formatFullDate(isoString);
}

/**
 * 작성 시각을 'YYYY.MM.DD HH:mm' 형태로 변환한다.
 *
 * @param {string} isoString - ISO 8601 형식의 시각 문자열
 * @returns {string} 전체 날짜 문자열
 */
export function formatFullDate(isoString) {
  if (!isoString) return '';

  const target = new Date(isoString);
  const pad = (value) => String(value).padStart(2, '0');

  return `${ target.getFullYear() }.${ pad(target.getMonth() + 1) }.${ pad(target.getDate()) } ${ pad(target.getHours()) }:${ pad(target.getMinutes()) }`;
}
