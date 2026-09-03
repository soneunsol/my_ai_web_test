import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';

/**
 * EmptyState 컴포넌트
 * 목록이 비어 있을 때 보여줄 안내 영역.
 *
 * Props:
 * @param {string} title - 굵게 표시할 안내 제목 [Required]
 * @param {string} description - 부가 설명 문구 [Optional, 기본값: '']
 *
 * Example usage:
 * <EmptyState title="아직 게시물이 없어요" description="첫 글을 남겨보세요!" />
 */
function EmptyState({ title, description = '' }) {
  return (
    <Box
      sx={ {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        py: { xs: 6, md: 10 },
        color: 'text.secondary',
      } }
    >
      <InboxRoundedIcon sx={ { fontSize: { xs: 44, md: 56 }, color: 'primary.light' } } />

      <Typography component="p" sx={ { fontSize: { xs: '1rem', md: '1.125rem' }, fontWeight: 700, color: 'text.primary' } }>
        { title }
      </Typography>

      { description && (
        <Typography component="p" sx={ { fontSize: { xs: '0.875rem', md: '0.9375rem' } } }>
          { description }
        </Typography>
      ) }
    </Box>
  );
}

export default EmptyState;
