# 코드 컨벤션 가이드

## 파일 및 디렉토리 네이밍

### 컴포넌트 파일
- PascalCase 사용: `UserProfile.jsx`, `NavBar.jsx`
- 컴포넌트당 하나의 파일

### 유틸리티/훅 파일
- camelCase 사용: `useAuth.js`, `formatDate.js`

### 상수 파일
- UPPER_SNAKE_CASE: `API_ENDPOINTS.js`

### 스타일 파일
- 컴포넌트와 동일한 이름: `UserProfile.styles.js`

## 디렉토리 구조
```
src/
├── components/       # 재사용 컴포넌트
│   ├── common/      # 공통 컴포넌트
│   └── layout/      # 레이아웃 컴포넌트
├── pages/           # 페이지 컴포넌트
├── hooks/           # 커스텀 훅
├── utils/           # 유틸리티 함수
├── constants/       # 상수
├── services/        # API 서비스
├── store/           # 상태관리
├── theme.js         # MUI 테마
└── main.jsx         # 엔트리포인트
```

## React 컴포넌트 규칙

### 함수형 컴포넌트만 사용
```jsx
// Good
const UserCard = ({ name, email }) => {
  return <Box>{name}</Box>;
};

// Bad - 클래스형 컴포넌트 사용 금지
```

### Props 구조분해
```jsx
// Good
const Button = ({ label, onClick, disabled = false }) => {};

// Bad
const Button = (props) => { props.label };
```

### 훅 사용 규칙
- 훅은 컴포넌트 최상단에서만 호출
- 커스텀 훅은 `use` 접두사 필수

## Import 순서
1. React 관련
2. 외부 라이브러리 (MUI 등)
3. 내부 모듈 (절대 경로)
4. 상대 경로
5. 스타일/에셋

```jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useAuth } from '@/hooks/useAuth';
import UserCard from './UserCard';
```

## MUI 사용 규칙
- sx prop 사용 권장 (인라인 스타일 대신)
- styled() 함수는 복잡한 스타일에만 사용
- theme 값 항상 참조 (하드코딩 금지)

```jsx
// Good
<Box sx={{ mt: 2, p: { xs: 1, md: 2 }, color: 'primary.main' }}>

// Bad
<Box style={{ marginTop: '16px', padding: '8px', color: '#1976d2' }}>
```

## 주석 규칙
- 함수/컴포넌트: JSDoc 스타일
- 복잡한 로직만 주석 추가
- 당연한 코드에 주석 금지
