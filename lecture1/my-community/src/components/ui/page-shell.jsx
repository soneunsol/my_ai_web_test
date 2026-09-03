import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

/**
 * PageShell 컴포넌트
 * 모든 페이지에 동일한 중앙 정렬·반응형 여백을 적용하는 레이아웃 래퍼.
 *
 * Props:
 * @param {node} children - 페이지 본문 [Required]
 * @param {string} maxWidth - Container 최대 너비 [Optional, 기본값: 'md']
 * @param {boolean} isCentered - 화면 세로 중앙 정렬 여부 [Optional, 기본값: false]
 *
 * Example usage:
 * <PageShell maxWidth="sm" isCentered><LoginForm /></PageShell>
 */
function PageShell({ children, maxWidth = 'md', isCentered = false }) {
  return (
    <Box
      sx={ {
        width: '100%',
        minHeight: isCentered ? '100vh' : 'auto',
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: isCentered ? 'center' : 'flex-start',
        py: { xs: 2, md: 4 },
      } }
    >
      <Container maxWidth={ maxWidth } sx={ { py: { xs: 2, md: 4 }, px: { xs: 2, md: 3 } } }>
        { children }
      </Container>
    </Box>
  );
}

export default PageShell;
