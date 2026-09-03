import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

/**
 * HashtagList 컴포넌트
 * 게시물에 달린 해시태그를 칩 형태로 나열한다.
 *
 * Props:
 * @param {array} tags - 표시할 태그 문자열 배열 [Required]
 * @param {string} size - Chip 크기 ('small' | 'medium') [Optional, 기본값: 'small']
 * @param {function} onTagClick - 태그 클릭 시 실행할 함수 [Optional]
 *
 * Example usage:
 * <HashtagList tags={ ['react', 'ui'] } onTagClick={ handleTagClick } />
 */
function HashtagList({ tags, size = 'small', onTagClick }) {
  if (!tags || tags.length === 0) return null;

  return (
    <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 0.75 } }>
      { tags.map((tag) => (
        <Chip
          key={ tag }
          label={ `#${ tag }` }
          size={ size }
          onClick={ onTagClick ? () => onTagClick(tag) : undefined }
          sx={ {
            fontWeight: 600,
            fontSize: '0.75rem',
            color: 'primary.dark',
            bgcolor: 'rgba(91, 75, 232, 0.08)',
            border: '1px solid',
            borderColor: 'rgba(91, 75, 232, 0.16)',
          } }
        />
      )) }
    </Box>
  );
}

export default HashtagList;
