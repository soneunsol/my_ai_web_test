import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * BrandLogo 컴포넌트
 * 개발(</>)과 디자인(브러시)을 겹쳐 표현한 아트형 SVG 로고.
 *
 * Props:
 * @param {number} size - 로고 아이콘의 한 변 크기(px) [Optional, 기본값: 72]
 * @param {boolean} isVertical - 아이콘과 텍스트를 세로로 배치할지 여부 [Optional, 기본값: true]
 * @param {boolean} hasTagline - 하단 태그라인 노출 여부 [Optional, 기본값: true]
 *
 * Example usage:
 * <BrandLogo size={ 96 } isVertical hasTagline />
 */
function BrandLogo({ size = 72, isVertical = true, hasTagline = true }) {
  return (
    <Box
      sx={ {
        display: 'flex',
        flexDirection: isVertical ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: isVertical ? 1.5 : 1.25,
      } }
    >
      <Box
        component="svg"
        viewBox="0 0 96 96"
        role="img"
        aria-label="DEVIGN 로고"
        sx={ { width: size, height: size, flexShrink: 0 } }
      >
        <defs>
          <linearGradient id="devign-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5B4BE8" />
            <stop offset="55%" stopColor="#A05BE8" />
            <stop offset="100%" stopColor="#F26DA8" />
          </linearGradient>
        </defs>

        <rect x="4" y="4" width="88" height="88" rx="26" fill="url(#devign-gradient)" />
        <circle cx="70" cy="26" r="16" fill="#ffffff" opacity="0.16" />

        <path
          d="M34 34 L22 48 L34 62"
          fill="none"
          stroke="#ffffff"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M62 34 L74 48 L62 62"
          fill="none"
          stroke="#ffffff"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.75"
        />
        <path
          d="M53 28 L43 68"
          fill="none"
          stroke="#ffffff"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </Box>

      <Box sx={ { textAlign: isVertical ? 'center' : 'left' } }>
        <Typography
          component="p"
          sx={ {
            fontSize: isVertical ? { xs: '1.75rem', md: '2.125rem' } : '1.25rem',
            fontWeight: 800,
            letterSpacing: '0.16em',
            lineHeight: 1.2,
            background: 'linear-gradient(120deg, #5B4BE8 0%, #A05BE8 55%, #F26DA8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          } }
        >
          DEVIGN
        </Typography>

        { hasTagline && (
          <Typography
            component="p"
            sx={ {
              mt: 0.5,
              fontSize: { xs: '0.75rem', md: '0.8125rem' },
              letterSpacing: '0.08em',
              color: 'text.secondary',
            } }
          >
            SHARE DESIGN &amp; DEVELOPMENT
          </Typography>
        ) }
      </Box>
    </Box>
  );
}

export default BrandLogo;
