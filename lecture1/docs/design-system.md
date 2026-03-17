# 디자인 시스템 가이드

## 색상 팔레트

### Primary
- main: #1976d2
- light: #42a5f5
- dark: #1565c0

### Secondary
- main: #9c27b0
- light: #ba68c8
- dark: #7b1fa2

### 상태 색상
- error: #d32f2f
- warning: #ed6c02
- info: #0288d1
- success: #2e7d32

### 중립 색상
- background: #f5f5f5
- surface: #ffffff
- text.primary: rgba(0,0,0,0.87)
- text.secondary: rgba(0,0,0,0.6)

## 타이포그래피

### 폰트
- 기본 폰트: Roboto (Google Fonts / @fontsource/roboto)
- 폴백: Helvetica, Arial, sans-serif

### 크기 체계
| 요소 | fontSize | fontWeight |
|------|----------|-----------|
| h1   | 2.125rem | 500       |
| h2   | 1.5rem   | 500       |
| h3   | 1.25rem  | 500       |
| body1| 1rem     | 400       |
| body2| 0.875rem | 400       |
| caption | 0.75rem | 400    |

## 간격 (Spacing)
- 기본 단위: 8px
- 사용: theme.spacing(1) = 8px, theme.spacing(2) = 16px

## 그림자 (Elevation)
- 카드: elevation={2}
- 모달: elevation={8}
- 네비게이션: elevation={4}

## 반응형 브레이크포인트
- xs: 0px
- sm: 600px
- md: 900px
- lg: 1200px
- xl: 1536px

## 컴포넌트 기본 원칙
- 버튼: variant="contained" (주요), variant="outlined" (보조)
- 텍스트필드: variant="outlined" 사용
- 카드: 항상 elevation과 padding 지정
- 아이콘: @mui/icons-material에서 가져오기
