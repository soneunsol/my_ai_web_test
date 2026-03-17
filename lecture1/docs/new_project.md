# 새 프로젝트 준비 가이드

## 개요
새 React 프로젝트를 빠르게 시작하기 위한 표준 절차입니다.
`_template_settings` 디렉토리를 복사하여 사용합니다.

## 절차

### 1. 템플릿 복사
```bash
# lecture1 디렉토리에서 실행
cp -r _template_settings <새프로젝트명>
cd <새프로젝트명>
```

### 2. 패키지 이름 변경
`package.json`에서 name 필드 수정:
```json
{
  "name": "<새프로젝트명>",
  ...
}
```

### 3. 의존성 설치 (node_modules가 없는 경우)
```bash
npm install
```

### 4. 개발 서버 실행
```bash
npm run dev
```

## 포함된 패키지 목록

### 핵심 패키지
| 패키지 | 버전 | 용도 |
|--------|------|------|
| react | ^18.x | UI 라이브러리 |
| react-dom | ^18.x | DOM 렌더링 |
| react-router-dom | ^6.x | 라우팅 |

### MUI 패키지
| 패키지 | 버전 | 용도 |
|--------|------|------|
| @mui/material | ^5.x | MUI 컴포넌트 |
| @emotion/react | ^11.x | CSS-in-JS |
| @emotion/styled | ^11.x | 스타일드 컴포넌트 |
| @mui/icons-material | ^5.x | MUI 아이콘 |
| @fontsource/roboto | ^5.x | Roboto 폰트 |

## 기본 파일 구조

### theme.js
MUI 커스텀 테마가 설정되어 있습니다.
- Primary/Secondary 색상
- Roboto 타이포그래피
- 8px 기본 간격

### main.jsx
ThemeProvider와 CssBaseline이 적용되어 있습니다.

### src/
기본 App.jsx가 있습니다. 개발 시작 전 내용을 교체하세요.

## 새 프로젝트 시작 체크리스트
- [ ] 템플릿 복사 완료
- [ ] package.json name 변경
- [ ] npm install 실행 (필요시)
- [ ] npm run dev로 동작 확인
- [ ] src/ 디렉토리 구조 설계
- [ ] 라우터 설정
- [ ] API 서비스 설정
